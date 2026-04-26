import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import Header from "@/components/layout/Header";
import StickyCallButton from "@/components/layout/StickyCallButton";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "אמרלד אלומיניום – עבודות אלומיניום באיכות ללא פשרות",
  description:
    "שירותי אלומיניום מקצועיים – חלונות, תריסים חשמליים, שיפוץ ותיקון. ייעוץ והצעת מחיר ללא עלות. חייגו 050-535-4933",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heebo.variable} font-heebo antialiased`}>
        <Header />
        {children}
        <StickyCallButton />
      </body>
    </html>
  );
}
