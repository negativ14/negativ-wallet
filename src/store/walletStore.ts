import { create } from "zustand";
import { toast } from "sonner"

type WalletMode = "access" | "generate" | null;
type walletType = "solana" | "ethereum";

export const pathTypeNames: { [key: string]: string } = {
    "solana": "501",
    "ethereum": "60"
}

export type Wallet = {
  privateKey: string;
  publicKey: string;
  walletType: walletType;
  walletIndex: number;
};

type WalletState = {
  mode: WalletMode;
  ethereumWalletIndex: number;
  solanaWalletIndex: number;
  mnemonic: string;
  wallets: Wallet[];
  mnemonicWords: string[];
  currentWalletsDisplay: walletType;
  setMode: (mode: WalletMode) => void;
  setMnemonic: (mnemonic: string) => void;
  setWallets: (wallets: Wallet[] | ((prev: Wallet[]) => Wallet[])) => void;
  setMnemonicWords: (mnemonic: string[]) => void;
  setCurrentWalletsDisplay: (walletType: walletType) => void;
  increaseEthereumWalletIndex: () => void;
  increaseSolanaWalletIndex: () => void;
  deleteWallet: (walletIndex: number) => void;
  deleteAllWallets: () => void;
  copyToClipboard: (value: string) => void;
};

export const useWalletStore = create<WalletState>()((set, get) => ({
  mode: null,
  mnemonic: "",
  wallets: [],
  ethereumWalletIndex: 0,
  solanaWalletIndex: 0,
  mnemonicWords: [],
  currentWalletsDisplay: "solana",

  setMode: (mode) => set({ mode: mode }),
  setMnemonic: (mnemonic) => set({ mnemonic: mnemonic }),
  setWallets: (wallets) =>
  typeof wallets === "function"
    ? set((state) => ({ wallets: wallets(state.wallets) }))
    : set({ wallets }),

  setMnemonicWords: (words) => set({ mnemonicWords: words }),
  setCurrentWalletsDisplay: (walletType) => set({ currentWalletsDisplay: walletType }),
  increaseEthereumWalletIndex: () => set({ethereumWalletIndex: get().ethereumWalletIndex + 1}),
  increaseSolanaWalletIndex: () => set({solanaWalletIndex: get().solanaWalletIndex + 1}),

  deleteWallet: (walletIndex) => {
    const updated = get().wallets.filter(
      (w) => !(w.walletIndex === walletIndex && w.walletType === get().currentWalletsDisplay)
    );
    set({ wallets: updated });
    toast.success("Wallet removed successfully.")
  },

  deleteAllWallets: () => {
    const updated = get().wallets.filter((w) => w.walletType !== get().currentWalletsDisplay);
    set({ wallets: updated });
    toast.success("All wallets removed successfully.")
  },

  copyToClipboard: async (value) => {
  try {
    await navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard.")
  } catch (err) {
    console.error("Clipboard error:", err);
  }
}

}));
