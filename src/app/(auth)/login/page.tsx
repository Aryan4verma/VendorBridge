"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/primitives/button/button";
import { Input } from "@/components/primitives/input/input";
import { FormField } from "@/components/forms/form-field/form-field";
import { useToast } from "@/providers/toast-provider";
import { authService } from "@/features/auth/services/auth.service";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast("Please fill in all fields", "error");
      return;
    }
    setIsLoading(true);
    try {
      await authService.signIn(email, password);
      toast("Signed in successfully", "success");
      router.push("/dashboard");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to sign in", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="mb-2">
        <h2 className="text-[var(--font-size-headline-md)] font-semibold text-[var(--color-on-surface)]">Welcome back</h2>
        <p className="text-sm text-[var(--color-on-surface-variant)] mt-1.5">Sign in to your VendorBridge account</p>
      </div>
      <div className="space-y-3">
        <FormField label="Email" required>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-outline)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </span>
            <Input type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} className="h-11 pl-10 text-sm rounded-[var(--radius-md)]" />
          </div>
        </FormField>
        <FormField label="Password" required>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-outline)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </span>
            <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} className="h-11 pl-10 text-sm rounded-[var(--radius-md)]" />
          </div>
        </FormField>
      </div>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded border-[var(--color-surface-border)] accent-[var(--color-primary)]" />
          <span className="text-sm text-[var(--color-on-surface-variant)]">Remember me</span>
        </label>
        <Link href="#" className="text-sm text-[var(--color-primary)] hover:underline font-medium">Forgot password?</Link>
      </div>
      <Button type="submit" className="w-full h-11 rounded-[var(--radius-md)] text-sm font-semibold" disabled={isLoading}>
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            Signing in...
          </span>
        ) : "Sign In"}
      </Button>
      <p className="text-center text-sm text-[var(--color-on-surface-variant)] pt-2">
        Don&apos;t have an account? <Link href="/signup" className="text-[var(--color-primary)] hover:underline font-medium">Request access</Link>
      </p>
    </form>
  );
}
