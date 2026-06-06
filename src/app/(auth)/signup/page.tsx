"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/primitives/button/button";
import { Input } from "@/components/primitives/input/input";
import { Select } from "@/components/primitives/select/select";
import { FormField } from "@/components/forms/form-field/form-field";
import { useToast } from "@/providers/toast-provider";
import { authService } from "@/features/auth/services/auth.service";

export default function SignupPage() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "", role: "vendor" });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.password) {
      toast("Please fill in all fields", "error");
      return;
    }
    setIsLoading(true);
    try {
      await authService.signUp(form.email, form.password, form.fullName, form.role);
      toast("Account created successfully! You can now sign in.", "success");
      window.location.href = "/login";
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to create account", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-[var(--font-size-title-sm)] font-semibold text-[var(--color-on-surface)]">Create Account</h2>
        <p className="text-sm text-[var(--color-on-surface-variant)] mt-1">Join VendorBridge today</p>
      </div>
      <FormField label="Full Name" required>
        <Input placeholder="John Doe" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} disabled={isLoading} />
      </FormField>
      <FormField label="Email" required>
        <Input type="email" placeholder="you@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={isLoading} />
      </FormField>
      <FormField label="Password" required>
        <Input type="password" placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} disabled={isLoading} />
      </FormField>
      <FormField label="Role" required>
        <Select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} disabled={isLoading}>
          <option value="vendor">Vendor</option>
          <option value="procurement">Procurement Officer</option>
          <option value="manager">Manager</option>
        </Select>
      </FormField>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>
      <p className="text-center text-sm text-[var(--color-on-surface-variant)]">
        Already have an account? <Link href="/login" className="text-[var(--color-primary)] hover:underline">Sign in</Link>
      </p>
    </form>
  );
}
