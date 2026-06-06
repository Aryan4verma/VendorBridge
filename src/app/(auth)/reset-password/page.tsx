"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/primitives/button/button";
import { Input } from "@/components/primitives/input/input";
import { FormField } from "@/components/forms/form-field/form-field";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-[var(--font-size-title-sm)] font-semibold text-[var(--color-on-surface)]">Reset Password</h2>
        <p className="text-sm text-[var(--color-on-surface-variant)] mt-1">Enter your new password</p>
      </div>
      <FormField label="New Password" required>
        <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormField>
      <FormField label="Confirm Password" required>
        <Input type="password" placeholder="••••••••" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      </FormField>
      <Button className="w-full">Reset Password</Button>
      <p className="text-center text-sm text-[var(--color-on-surface-variant)]">
        <Link href="/login" className="text-[var(--color-primary)] hover:underline">Back to Sign In</Link>
      </p>
    </div>
  );
}
