"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/providers/auth-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { ToastContainer } from "@/components/feedback/toast/toast";

export default function VendorLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="min-h-screen bg-[var(--color-background)]">
          <div className="flex">
            <aside className="fixed left-0 top-0 z-40 h-screen w-[var(--spacing-sidebar-width)] bg-[var(--color-sidebar-bg)] text-white flex flex-col">
              <div className="flex items-center h-[var(--spacing-header-height)] px-4 border-b border-white/10">
                <span className="text-lg font-bold tracking-tight">VendorBridge</span>
              </div>
              <nav className="flex-1 py-4 px-2 space-y-1">
                {[
                  { label: "Dashboard", href: "/dashboard" },
                  { label: "My RFQs", href: "/vendor/rfqs" },
                ].map((item) => (
                  <a key={item.href} href={item.href} className="flex items-center gap-3 rounded-[var(--radius-default)] px-3 py-2 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white">
                    {item.label}
                  </a>
                ))}
              </nav>
            </aside>
            <div className="ml-[var(--spacing-sidebar-width)] flex-1">
              <header className="sticky top-0 z-30 flex h-[var(--spacing-header-height)] items-center border-b border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)] px-6">
                <h1 className="text-lg font-semibold">Vendor Portal</h1>
              </header>
              <main className="p-[var(--spacing-container-padding)]">{children}</main>
            </div>
          </div>
        </div>
        <ToastContainer />
      </ToastProvider>
    </AuthProvider>
  );
}
