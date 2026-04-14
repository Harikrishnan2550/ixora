"use client";

import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Audiowide, Inter } from "next/font/google";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { usePathname } from "next/navigation";

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-audiowide",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Check if the current route is part of the admin dashboard
  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <html lang="en" className={`${audiowide.variable} ${inter.variable}`}>
      <body className="bg-[#FAFAFA] font-sans antialiased selection:bg-orange-100 selection:text-orange-900">
        
        {/* Only show public components if NOT an admin page */}
        {!isAdminPage && <Navbar />}
        
        <main className="min-h-screen">
          {children}
        </main>

        {!isAdminPage && (
          <>
            <WhatsAppFloat />
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}