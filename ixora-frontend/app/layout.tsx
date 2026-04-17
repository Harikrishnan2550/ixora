import type { Metadata } from "next";
import "./globals.css";
import { Audiowide, Inter } from "next/font/google";
import ClientLayout from "./ClientLayout"; // <-- Importing your new wrapper

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-audiowide",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// ── GLOBAL SEO METADATA ──
export const metadata: Metadata = {
  title: {
    default: "Ixora Tech | Premium Solar Infrastructure",
    template: "%s | Ixora Tech" // Automatically appends brand name to other pages
  },
  description: "Architecting sustainable energy autonomy through precision technical engineering and high-output solar modules across Kerala. Backed by Protech Automation.",
  keywords: ["Solar Infrastructure", "Kerala Solar", "Renewable Energy", "Commercial Solar", "Protech Automation"],
  openGraph: {
    title: "Ixora Tech | Premium Solar Infrastructure",
    description: "Industrial-grade energy nodes and architectural solar ecosystems.",
    url: "https://ixoratech.com", // Update with your actual domain when ready
    siteName: "Ixora Tech",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${audiowide.variable} ${inter.variable}`}>
      <body className="bg-[#FAFAFA] font-sans antialiased selection:bg-orange-100 selection:text-orange-900">
        
        {/* We wrap the children in our Client Logic component */}
        <ClientLayout>
          {children}
        </ClientLayout>

      </body>
    </html>
  );
}