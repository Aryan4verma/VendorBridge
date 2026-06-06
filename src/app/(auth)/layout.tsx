"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/providers/auth-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { ToastContainer } from "@/components/feedback/toast/toast";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="flex min-h-screen">
          {/* Left panel - Brand */}
          <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[var(--color-primary)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] via-[#3a3cb8] to-[#2a2ca0] opacity-90" />
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
            </div>
            <div className="relative z-10 flex flex-col justify-center px-16 text-white">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                  </div>
                  <span className="text-xl font-bold tracking-tight">VendorBridge</span>
                </div>
                <h2 className="text-3xl font-bold leading-tight mb-4">
                  AI-Powered<br />Procurement ERP
                </h2>
                <p className="text-white/70 text-base leading-relaxed max-w-sm">
                  Streamline vendor management, automate RFQs, and make data-driven procurement decisions with intelligent AI assistance.
                </p>
              </div>
              <div className="space-y-3 mt-4">
                {["Smart Vendor Matching", "Automated Approval Workflows", "Real-time Spend Analytics"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    <span className="text-sm text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel - Form */}
          <div className="flex w-full lg:w-1/2 items-center justify-center p-8 bg-[var(--color-surface)]">
            <div className="w-full max-w-[400px]">
              <div className="lg:hidden flex items-center gap-2 mb-8">
                <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-primary)] flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-on-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                </div>
                <span className="text-lg font-bold text-[var(--color-on-surface)]">VendorBridge</span>
              </div>
              {children}
            </div>
          </div>
        </div>
        <ToastContainer />
      </ToastProvider>
    </AuthProvider>
  );
}
