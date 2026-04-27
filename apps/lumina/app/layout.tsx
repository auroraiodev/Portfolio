import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CustomCursor } from "../components/CustomCursor";
import { Noto_Serif, Manrope } from "next/font/google";
import Head from "next/head";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-serif",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "DEMIS RINCON | RESUME_01",
  description: "The Prime Archive - Lumina Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${notoSerif.variable} ${manrope.variable}`}

    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body>
        <div className="grain-overlay"></div>
        <CustomCursor />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
