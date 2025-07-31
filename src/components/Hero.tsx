"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useWalletStore } from "@/store/walletStore";

type HeroProps = {
  generateSecretPhrase: () => void;
};

const Hero = ({ generateSecretPhrase }: HeroProps) => {
  const [mounted, setMounted] = useState(false);
  const { setMode } = useWalletStore();

  const handleGenerate = () => {
    generateSecretPhrase();
    setMode("generate");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="hero" className="px-4">
      <motion.div
        className="flex flex-col gap-6 items-center mt-20 text-center space-y-2 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {/* <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight break-keep">
          Generate&nbsp;or&nbsp;
          <span className="bg-gradient-to-b from-blue-400 to-blue-600 bg-clip-text text-transparent (0px,0px,20px,.20) ">
            Access&nbsp;Crypto
          </span>
          <br />
          <span className="block">Wallets Instantly</span>
        </h1> */}

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-snug text-center break-words px-2">
          Generate or
          <br className="sm:hidden" /> {/* Break only on phones */}
          <span className="bg-gradient-to-b from-blue-400 to-blue-600 bg-clip-text text-transparent drop-shadow-md">
            Access Crypto
          </span>
          <br />
          <span className="block mt-2">Wallets Instantly</span>
        </h1>

        <p className="text-sm sm:text-md lg:text-lg text-foreground/80 max-w-xl font-semibold -mt-4">
          Secure key generation from your seed phrase.{" "}
          <span className="hidden sm:inline text-center">
            Nothing is stored.
          </span>
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="cursor-pointer" onClick={handleGenerate}>
            Generate
          </Button>
          <Button
            size="lg"
            className="cursor-pointer"
            onClick={() => setMode("access")}
          >
            Access
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
