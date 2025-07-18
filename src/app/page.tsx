"use client";

import Navbar from "@/components/Navbar";
import Wallets from "@/components/Wallets";

export default function Page() {

  return (
    <main className="max-w-7xl mx-auto flex flex-col gap-4 p-4 min-h-[92vh]">
      <Navbar />
      <Wallets />
    </main>
  );
}
