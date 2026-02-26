import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr. Ahmed Altan — The Architect of Hair",
  description:
    "Natural hairline design & Micro-FUE strategy by Dr. Ahmed Altan. High-end surgical craftsmanship in Istanbul.",
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
        <SmoothScrollProvider>
          <Preloader />
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
