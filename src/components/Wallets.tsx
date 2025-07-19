"use client";

import { motion } from "motion/react";
import { Button } from "./ui/button";
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from "bip39";
import { useWalletStore, Wallet } from "@/store/walletStore";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { ethers } from "ethers";
import { toast } from "sonner";
import Hero from "./Hero";
import WalletCard from "./WalletCard";
import { useEffect, useMemo, useRef, useState } from "react";
import Mnemonics from "./Mnemonics";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

type walletType = "solana" | "ethereum";

const Wallets = () => {
  const {
    setMnemonic,
    setCurrentWalletsDisplay,
    mnemonic,
    increaseEthereumWalletIndex,
    increaseSolanaWalletIndex,
    setWallets,
    ethereumWalletIndex,
    solanaWalletIndex,
    wallets,
    setMnemonicWords,
    currentWalletsDisplay,
    mode,
    setMode,
    deleteAllWallets,
  } = useWalletStore();

  const [visiblePrivateKey, setVisiblePrivateKey] = useState<
    Record<number, boolean>
  >({});

  const hasGenerated = useRef<boolean>(false);
  const isMnemonicValidated = useRef<boolean>(false);

  const walletsToDisplay = useMemo(() => {
    return wallets.filter(
      (wallet) => wallet.walletType === currentWalletsDisplay
    );
  }, [wallets, currentWalletsDisplay]);

  useEffect(() => {
    setVisiblePrivateKey(new Array(walletsToDisplay.length).fill(false));
  }, [walletsToDisplay]);

  const togglePrivateKeyVisibility = (walletIndex: number) => {
    setVisiblePrivateKey((prev) => {
      return {
        ...prev,
        [walletIndex]: !prev[walletIndex],
      };
    });
  };

  const generateSecretPhrase = () => {
    if (hasGenerated.current) return;
    hasGenerated.current = true;

    if (!mnemonic) {
      try {
        const mnemonicPhrase = generateMnemonic();
        isMnemonicValidated.current = true;
        console.log("generated mnemonic", mnemonicPhrase);
        setMnemonic(mnemonicPhrase);
        console.log("from generate mne", mnemonic);
        const mnemonicWords = mnemonicPhrase.trim().split(" ");
        setMnemonicWords(mnemonicWords);
        console.log("from generate wallet fn", mnemonicWords);
        toast.success("Mnemonic generated successfully");
        addWallet("solana");
        addWallet("ethereum");
      } catch (error) {
        toast.error("Failed to generate mnemonic. Please try again.");
        console.log("Error while generating mnemonic", error);
      }
    }
  };

  const addWallet = (walletType: walletType) => {
    if (walletType === "solana") {
      generatedSolanaWallet();
    } else if (walletType === "ethereum") {
      generateEthereumWallet();
    } else {
      toast.error("Unsupported blockchain.");
    }
  };

  const generateEthereumWallet = () => {
    try {
      if (!isMnemonicValidated.current) {
        return;
      }
      const seedBuffer = mnemonicToSeedSync(mnemonic);
      const hdNode = ethers.HDNodeWallet.fromSeed(seedBuffer);
      const ethWallet = hdNode.derivePath(
        `m/44/60'/0'/0/${ethereumWalletIndex}`
      );
      console.log("Ether wallet generated from HDNode", ethWallet);

      const wallet: Wallet = {
        publicKey: ethWallet.publicKey,
        privateKey: ethWallet.privateKey,
        walletIndex: ethereumWalletIndex,
        walletType: "ethereum",
      };

      setWallets((prev) => [...prev, wallet]);
      console.log("wallets after added", wallets);
      increaseEthereumWalletIndex();
      toast.success("Wallet added successfully");
      console.log("index after adding solana wallet", solanaWalletIndex);
    } catch (error) {
      toast.error("Failed to generate ethereum wallet. Please try again.");
      console.log("Error while generating eth wallet", error);
    }
  };

  const generatedSolanaWallet = () => {
    try {
      if (!isMnemonicValidated.current) {
        return;
      }
      const seedBuffer = mnemonicToSeedSync(mnemonic);
      const solanaPath = `m/44'/501'/${solanaWalletIndex}'/0'`;
      console.log("path is", solanaPath);
      const derivedSeed = derivePath(
        solanaPath,
        seedBuffer.toString("hex")
      ).key;
      console.log("derivedSedd is ", derivedSeed);
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      console.log("the secret from nacl secretKey", secret);
      console.log(Keypair.fromSecretKey(secret).publicKey.toBase58());

      const wallet: Wallet = {
        publicKey: Keypair.fromSecretKey(secret).publicKey.toBase58(),
        privateKey: bs58.encode(secret),
        walletIndex: solanaWalletIndex,
        walletType: "solana",
      };
      setWallets((prev) => [...prev, wallet]);
      console.log("wallets after added", wallets);
      increaseSolanaWalletIndex();
      toast.success("Wallet added successfully");
      console.log("index after adding solana wallet", solanaWalletIndex);
    } catch (error) {
      toast.error("Failed to generate solana wallet. Please try again");
      console.log("Error while generating sol wallet", error);
    }
  };

  const handleAccess = () => {
    if (mnemonic.trim()) {
      if (!validateMnemonic(mnemonic)) {
        toast.error("Invalid recovery phrase. Please try again.");
        return;
      }
    }

    isMnemonicValidated.current = true;
    addWallet("solana");
    addWallet("ethereum");
    const mnemonicArray = mnemonic.trim().split(" ");
    setMnemonicWords(mnemonicArray);
  };

  const handleGoBack = () => {
    setMode(null);
    setMnemonic("");
  };

  const handleDeleteAllWallets = () => {
    if (walletsToDisplay.length === 0) {
      toast.error("No wallet left to delete.");
      return;
    }

    deleteAllWallets();
  };

  return (
    <section>
      {mode === null && <Hero generateSecretPhrase={generateSecretPhrase} />}

      {mode === "access" && wallets.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="flex flex-col gap-4 my-6"
        >
          <h1 className="text-foreground text-4xl md:text-5xl font-extrabold tracking-tighter">
            Access Your Wallets
          </h1>

          <input
            type="text"
            placeholder="Enter the seed phrases"
            onChange={(e) => setMnemonic(e.target.value)}
            value={mnemonic}
            className="border border-border rounded-sm placeholder:text-sm placeholder:md:text-lg px-4 py-1.5 flex items-center text-sm md:text-lg text-foreground/90 tracking-wider placeholder:tracking-tight font-semibold focus:ring-ring"
          />

          <p className="text-sm font-medium md:text-lg text-foreground/70 -mt-1.5 mb-2">
            <span className="text-foreground/90 font-semibold">Note</span> :
            Don&apos;t share or loose your seed phrase.
          </p>

          <div className="flex items-center gap-4">
            <Button
              onClick={handleGoBack}
              size={"lg"}
              className="cursor-pointer"
            >
              Go Back
            </Button>

            <Button size="lg" className="cursor-pointer" onClick={handleAccess}>
              Access
            </Button>
          </div>
        </motion.div>
      )}

      {mnemonic.length > 0 && isMnemonicValidated.current && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Mnemonics />
          <div className="border-1 border-border p-4 py-8 flex flex-col gap-4 bg-background dark:bg-primary/10 my-10 rounded-lg">
            <h1 className="text-foreground text-3xl md:text-4xl font-extrabold tracking-tighter">
              Generate Wallets
            </h1>

            <div className="flex gap-4">
              <Button
                className="cursor-pointer"
                onClick={() => addWallet("solana")}
              >
                Add Solana Wallet
              </Button>

              <Button
                className="cursor-pointer"
                onClick={() => addWallet("ethereum")}
              >
                Add Ethereum Wallet
              </Button>
            </div>
          </div>

          <div className="py-4 px-1 flex flex-col gap-2 gap-y-6 my-10 mb-10">
            <h1 className="text-foreground text-3xl md:text-4xl font-extrabold tracking-tighter">
              View Wallets
            </h1>

            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <Button
                  onClick={() => setCurrentWalletsDisplay("solana")}
                  variant={
                    currentWalletsDisplay === "solana" ? "default" : "secondary"
                  }
                  className="cursor-pointer"
                >
                  Solana
                </Button>

                <Button
                  onClick={() => setCurrentWalletsDisplay("ethereum")}
                  variant={
                    currentWalletsDisplay === "ethereum"
                      ? "default"
                      : "secondary"
                  }
                  className="cursor-pointer"
                >
                  Ethereum
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button disabled={walletsToDisplay.length === 0} variant="destructive">Delete All</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will remove your
                        wallets.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive text-destructive-foreground hover:bg-destructive-hover "
                        onClick={handleDeleteAllWallets}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>

          {walletsToDisplay.map((wallet, index) => (
            <WalletCard
              key={index}
              index={index}
              walletIndex={wallet.walletIndex}
              visiblePrivateKey={visiblePrivateKey[index]}
              togglePrivateKeyVisibility={togglePrivateKeyVisibility}
              publicKey={wallet.publicKey}
              privateKey={wallet.privateKey}
            />
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default Wallets;
