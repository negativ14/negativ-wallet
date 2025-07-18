"use client";

import GradientXIcon from "./icons/GradientXIcon";
import { motion } from "motion/react";

const Footer = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="relative max-w-7xl mx-auto  px-4 flex justify-center items-center"
    >
      {/* Fading top border line left/right */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />

      <p className="text-foreground tracking-tight font-bold flex items-center gap-2 mt-5">
        Connect on{" "}
        <a
          href="https://x.com/RohitMehta1409?t=n5-RF9x5Bx6anWj0BjSaSA&s=09"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center cursor-pointer"
        >
          <GradientXIcon className="size-4" />
        </a>
      </p>
    </motion.section>
  );
};

export default Footer;
