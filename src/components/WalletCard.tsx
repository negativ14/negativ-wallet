import { Eye, EyeOff, Trash } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { useWalletStore } from "@/store/walletStore";

interface WalletCardProps {
  index: number;
  publicKey: string;
  privateKey: string;
  walletIndex: number;
  visiblePrivateKey: boolean;
  togglePrivateKeyVisibility: (value: number) => void;
}

const WalletCard = ({
  index,
  publicKey,
  privateKey,
  visiblePrivateKey,
  walletIndex,
  togglePrivateKeyVisibility,
}: WalletCardProps) => {
  // const { deleteWallet, copyToClipboard } = useWalletStore()
  const deleteWallet = useWalletStore((state) => state.deleteWallet);
  const copyToClipboard = useWalletStore((state) => state.copyToClipboard);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      exit={{ opacity: 0, y: 20 }}
      className="flex flex-col border border-primary/10 rounded-lg  dark:bg-primary/10 mb-8"
    >
      <div className="flex justify-between items-center font-bold text-2xl md:text-3xl tracking-tighter p-4">
        <h2>Wallet-{index + 1}</h2>

        <Button className="cursor-pointer" variant={"ghost"} onClick={() => deleteWallet(walletIndex)}>
          <Trash className="size-4 text-destructive" />
        </Button>
      </div>

      <div className=" p-4 rounded-lg dark:bg-background bg-foreground/5">
        <div className="flex flex-col">
          <h3 className="font-semibold tracking-tight text-lg md:text-xl">
            Public Key
          </h3>
          <p
            className="font-light/loose text-primary/70 text-sm cursor-pointer truncate overflow-hidden md:text-base whitespace-nowrap hover:text-primary transition-all duration-300 max-w-[90%]"
            onClick={() => copyToClipboard(publicKey)}
          >
            {publicKey}
          </p>
        </div>

        <div className="flex flex-col">
          <h3 className="font-semibold tracking-tight text-lg mt-3 -mb-2 md:text-xl">
            Private Key
          </h3>
          <div className="flex justify-between items-center">
            <p
              className={`font-light/loose text-primary/70 md:text-base cursor-pointer text-sm truncate overflow-hidden whitespace-nowrap hover:text-primary transition-all duration-300`}
              onClick={() => copyToClipboard(privateKey)}
            >
              {visiblePrivateKey ? privateKey : "•".repeat(privateKey.length)}
            </p>
            <Button
            className="cursor-pointer"
              variant={"ghost"}
              onClick={() => togglePrivateKeyVisibility(walletIndex)}
            >
              {visiblePrivateKey ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WalletCard;
