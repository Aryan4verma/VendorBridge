"use client";
import { usePathname, useRouter } from "next/navigation";
import { Bell, LogOut, Menu } from "lucide-react";
import { Avatar } from "@/components/primitives/avatar/avatar";
import { Breadcrumb } from "@/components/navigation/breadcrumb/breadcrumb";
import { useAuth } from "@/providers/auth-provider";
import { useToast } from "@/providers/toast-provider";
import { authService } from "@/features/auth/services/auth.service";

interface HeaderProps {
  onMenuToggle?: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await authService.signOut();
      router.push("/login");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to sign out", "error");
    }
  };

  const initials = user?.fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  return (
    <header className="sticky top-0 z-30 flex h-[var(--spacing-header-height)] items-center gap-4 border-b border-[var(--color-surface-border)] bg-[var(--color-surface-container-lowest)] px-6">
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-1 hover:bg-[var(--color-surface-container)] rounded-[var(--radius-default)]"
      >
        <Menu className="h-5 w-5" />
      </button>
      <Breadcrumb pathname={pathname} />
      <div className="ml-auto flex items-center gap-3">
        <button className="relative p-2 hover:bg-[var(--color-surface-container)] rounded-[var(--radius-default)]">
          <Bell className="h-5 w-5 text-[var(--color-on-surface-variant)]" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[var(--color-error)]" />
        </button>
        {user && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-[var(--color-on-surface)] hidden sm:inline">
              {user.fullName}
            </span>
            <Avatar size="sm" fallback={initials} src={user.avatarUrl ?? undefined} />
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-[var(--color-surface-container)] rounded-[var(--radius-default)]"
              title="Sign out"
            >
              <LogOut className="h-4 w-4 text-[var(--color-on-surface-variant)]" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
