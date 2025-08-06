import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { HomeProvider } from "@/providers/homes.provider";
import QueryProvider from "@/providers/query.provider";
import { UserProvider } from "@/providers/user.provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LakasInfo",
  description: "Created by Norbert Rozs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/logo.png"></link>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-gray-200`}
      >
        <HomeProvider>
          <UserProvider>
            <QueryProvider>
              <Navbar />

              <main className="pt-28 lg:px-12 px-4">
                <div className="max-w-7xl mx-auto">
                  {children}
                </div>
              </main>
            </QueryProvider>
          </UserProvider>
        </HomeProvider>
      </body>
    </html>
  );
}
