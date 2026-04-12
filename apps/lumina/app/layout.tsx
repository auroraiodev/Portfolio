import type { Metadata } from "next";
import "@repo/ui/theme.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "DEMIS RINCON | ARCHIVE_033",
  description: "The Ethereal Archive - Lumina Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="grain-overlay"></div>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
