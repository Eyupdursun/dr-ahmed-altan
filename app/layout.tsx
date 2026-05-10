import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import MotionProvider from "@/components/layout/MotionProvider";
import Preloader from "@/components/ui/Preloader";
import Header from "@/components/ui/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#f5f0e7",
};

export const metadata: Metadata = {
  title: "Dr. Ahmed Altan — The Architect of Hair",
  description:
    "Natural hairline design & Micro-FUE strategy by Dr. Ahmed Altan. High-end surgical craftsmanship in Istanbul.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Dr. Ahmed Altan — The Architect of Hair",
    description:
      "Natural hairline design & Micro-FUE strategy by Dr. Ahmed Altan in Istanbul.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="antialiased">
        <MotionProvider>
          <SmoothScrollProvider>
            <Preloader />
            <Header />
            {children}
          </SmoothScrollProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
