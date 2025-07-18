import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Theme-Provider";
import GradientBackground from "@/components/GradientBackground";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Negativ Wallet",
  description: "Generate or Access your wallet keys instantly.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <GradientBackground />
          <Toaster
            position="bottom-right"
            duration={3000} 
            expand={true} 
            visibleToasts={2}
          />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
