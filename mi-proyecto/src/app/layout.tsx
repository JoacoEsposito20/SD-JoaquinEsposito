'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className = "flex justify-center items-center">
          <Link href="/" className="navbar-link-principal">
          Lista Principal
          </Link>
        </header>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        <footer>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, corporis aspernatur eaque labore sapiente, nemo velit modi esse soluta delectus praesentium illum nam consequuntur sed vel ullam, iste necessitatibus perspiciatis!</footer>
      </body>
    </html>
  );
}
