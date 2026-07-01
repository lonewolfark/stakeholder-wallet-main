import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stakeholder Wallet | Premium Community Treasury & Investment Platform",
  description:
    "Secure, transparent digital asset management for DAOs, investment clubs, and community treasuries. Track $125M+ in assets with enterprise-grade security.",
  keywords: [
    "crypto wallet",
    "community treasury",
    "DAO tools",
    "investment tracking",
    "portfolio management",
    "Web3",
  ],
  openGraph: {
    title: "Stakeholder Wallet",
    description: "Premium Community Treasury & Investment Platform",
    url: "https://stakeholderwallet.com",
    siteName: "Stakeholder Wallet",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stakeholder Wallet",
    description: "Premium Community Treasury & Investment Platform",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="relative min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
