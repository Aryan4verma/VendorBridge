"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/primitives/button/button";
import { Input } from "@/components/primitives/input/input";
import { FormField } from "@/components/forms/form-field/form-field";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-[var(--font-size-title-sm)] font-semibold text-[var(--color-on-surface)]">Forgot Password</h2>
        <p className="text-sm text-[var(--color-on-surface-variant)] mt-1">Enter your email to receive a reset link</p>
      </div>
      <FormField label="Email" required>
        <Input type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormField>
      <Button className="w-full">Send Reset Link</Button>
      <p className="text-center text-sm text-[var(--color-on-surface-variant)]">
        Remember your password? <Link href="/login" className="text-[var(--color-primary)] hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
