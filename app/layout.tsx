\
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KnowMe MVP",
  description: "Social quiz MVP prototype"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
