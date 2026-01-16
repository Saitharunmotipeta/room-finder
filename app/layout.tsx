import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PageContainer from "@/components/layout/PageContainer";
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Room Finder",
  description: "Find rooms. List rooms. Simple.",
};

const NAVBAR_HEIGHT = 64
const FOOTER_HEIGHT = 48

const body = {
  margin: 0,
  height: "100vh",
  display: "flex",
  flexDirection: "column" as const,
  overflow: "hidden", // ❗ critical
}

const header = {
  height: NAVBAR_HEIGHT,
  textcolor: "#111827",
  flexShrink: 0,
  borderBottom: "1px solid #e5e7eb",
  background: "#ffffff",
  position: "sticky" as const,
  top: 0,
  zIndex: 50,
}

const main = {
  flex: 1,
  overflowY: "auto" as const, // ✅ ONLY scrollable area
  padding: 24,
  background: "#f8fafc",
}

const footer = {
  height: FOOTER_HEIGHT,
  flexShrink: 0,
  color: "#111827",
  borderTop: "1px solid #e5e7eb",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#ffffff",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={body}>
        {/* Top */}
        <header style={header}>
          <Navbar />
        </header>

        {/* Middle (scrollable) */}
        <main style={main}>
          {children}
        </main>

        {/* Bottom */}
        <footer style={footer}>
          <p style={{ fontSize: 18 }}>
            Developed by <strong>Saitharun</strong>
          </p>
        </footer>
      </body>
    </html>
  );
}
