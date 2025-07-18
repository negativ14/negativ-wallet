"use client";

import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, Copy } from "lucide-react";
import { useWalletStore } from "@/store/walletStore";

const Mnemonics = () => {
  const [showMnemonics, setShowMnemonics] = useState<boolean>(false);
  const mnemonicWords = useWalletStore((state) => state.mnemonicWords);
  const copyToClipboard = useWalletStore((state) => state.copyToClipboard);

  console.log("from mnemocs", mnemonicWords);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      layout
      className="border-border border p-6 max-w-7xl rounded-lg flex flex-col gap-4 w-full dark:bg-primary/10"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tighter md:text-3xl ml-4">
          Your Secret Phrase
        </h2>

        <Button
          onClick={() => setShowMnemonics(!showMnemonics)}
          variant={"ghost"}
          className="cursor-pointer"
        >
          {showMnemonics ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
        </Button>
      </div>

      <AnimatePresence initial={false}>
        {showMnemonics && (
          <motion.div
            key="mnemonic"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden w-full"
            onClick={() => copyToClipboard(mnemonicWords.join(" "))}
          >
            <div className="p-4 flex flex-col items-center justify-center gap-x-6 gap-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full">
                {mnemonicWords.map((word, index) => (
                  <p
                    key={index}
                    className="text-base md:text-lg bg-foreground/5 hover:bg-foreground/10 dark:bg-background dark:hover:bg-background/60 cursor-pointer transition-all duration-300 rounded-lg p-4"
                  >
                    {word}
                  </p>
                ))}
              </div>

              <div className="mt-4 -mb-2 text-sm md:text-base text-primary/50 flex gap-x-2 items-center transition-all duration-300 cursor-pointer">
                <Copy className="size-4" /> Click Anywhere To Copy
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default memo(Mnemonics);
