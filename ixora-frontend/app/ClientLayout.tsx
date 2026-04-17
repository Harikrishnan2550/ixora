"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Check if the current route is part of the admin dashboard
  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <>
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
    </>
  );
}