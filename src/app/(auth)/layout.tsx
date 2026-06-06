"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/providers/auth-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { ToastContainer } from "@/components/feedback/toast/toast";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)] p-4">
          <div className="w-full max-w-[400px]">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-[var(--color-on-surface)]">VendorBridge</h1>
              <p className="text-sm text-[var(--color-on-surface-variant)] mt-1">AI-Powered Procurement ERP</p>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)] p-6 shadow-[var(--shadow-soft-lift)]">
              {children}
            </div>
          </div>
        </div>
        <ToastContainer />
      </ToastProvider>
    </AuthProvider>
  );
}
