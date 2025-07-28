import React from "react";
import { ModeToggle } from "./ui/theme-button";
import GradientDollarIcon from "./icons/GradientDollarIcon";
import { FaGithub } from "react-icons/fa";
import { motion } from "motion/react";
import Link from "next/link";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex justify-between items-center py-4"
    >
      <Link href="#hero">
        <div className="flex gap-3 items-center cursor-pointer">
          <GradientDollarIcon className="size-8" />
          <span className="text-3xl bg-gradient-to-b from-blue-400 to-blue-600 bg-clip-text text-transparent tracking-tighter font-extrabold flex items-center">
            NEGATIV
          </span>
        </div>
      </Link>

      <div className="flex gap-4 items-center">
        <ModeToggle />
        <a
          href="https://github.com/negativ14/N-WalletKit"
          target="_blank" //open it in a new tab
          rel="noopener noreferrer" //security and performance feature
          //noopener (Security)
          //noreferrer (Privacy)
        >
          <FaGithub className="size-5 text-foreground cursor-pointer" />
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
