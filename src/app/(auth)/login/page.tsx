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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-[var(--font-size-title-sm)] font-semibold text-[var(--color-on-surface)]">Sign In</h2>
        <p className="text-sm text-[var(--color-on-surface-variant)] mt-1">Enter your credentials to access your account</p>
      </div>
      <FormField label="Email" required>
        <Input type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
      </FormField>
      <FormField label="Password" required>
        <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
      </FormField>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
      <p className="text-center text-sm text-[var(--color-on-surface-variant)]">
        Don&apos;t have an account? <Link href="/signup" className="text-[var(--color-primary)] hover:underline">Sign up</Link>
      </p>
    </form>
  );
}
