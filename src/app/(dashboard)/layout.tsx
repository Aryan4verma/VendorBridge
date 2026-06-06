"use client";

import { useState } from "react";
import { AuthProvider } from "@/providers/auth-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { Sidebar } from "@/components/navigation/sidebar/sidebar";
import { Header } from "@/components/navigation/header/header";
import { ContentArea } from "@/components/layout/content-area/content-area";
import { ToastContainer } from "@/components/feedback/toast/toast";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AuthProvider>
      <ToastProvider>
        <div className="min-h-screen bg-[var(--color-background)]">
          <Sidebar />
          <Header onMenuToggle={() => setMobileOpen(!mobileOpen)} />
          <ContentArea>{children}</ContentArea>
          <ToastContainer />
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}
