import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/CartContext";
import AuthProvider from "@/components/AuthProvider";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GoalBox - Seu clube de assinatura de chuteiras",
  description: "As melhores chuteiras do mundo, entregues na sua casa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="flex-grow container mx-auto p-4">
              {children}
            </main>
            <Toaster richColors />
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
