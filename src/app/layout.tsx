import type { Metadata } from "next";
import "./globals.css";
// ... imports ...

export const metadata: Metadata = {
  title: "Statmize | Smart Wearable for Athletes", // <--- CHANGE THIS TEXT
  description: "Track speed, angle, and power with the Statmize smart band.",
  icons: {
    icon: '/icon.png', // <--- This tells Next.js where to look for your logo
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
      {/* ... rest of your layout code ... */}
    </html>
  );
}