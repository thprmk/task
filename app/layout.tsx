import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hospital Appointment Booking System",
  description: "Book and manage hospital appointments with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased flex flex-col min-h-screen min-w-0 bg-gray-50 overflow-x-hidden`}
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1 w-full min-w-0 overflow-x-hidden px-4 sm:px-6 lg:pl-[87px] lg:pr-[87px] box-border">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
