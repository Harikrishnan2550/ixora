"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("admin");

    // allow login page
    if (pathname === "/admin/login") return;

    if (!token) {
      router.push("/admin/login");
    }
  }, [pathname]);

  return <>{children}</>;
}
