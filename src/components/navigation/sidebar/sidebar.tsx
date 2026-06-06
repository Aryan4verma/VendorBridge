"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/primitives/avatar/avatar";
import {
  LayoutDashboard, Building2, FileText, MessageSquare, CheckCircle,
  ShoppingCart, Receipt, BarChart3, ClipboardList,
  Shield, ChevronLeft, ChevronRight
} from "lucide-react";

interface NavItem { label: string; href: string; icon: React.ElementType; roles?: string[]; }

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Vendors", href: "/vendors", icon: Building2, roles: ["admin", "procurement"] },
  { label: "RFQs", href: "/rfqs", icon: FileText, roles: ["procurement"] },
  { label: "Quotations", href: "/quotations", icon: MessageSquare, roles: ["procurement"] },
  { label: "Purchase Orders", href: "/purchase-orders", icon: ShoppingCart, roles: ["procurement"] },
  { label: "Invoices", href: "/invoices", icon: Receipt, roles: ["procurement"] },
  { label: "Approvals", href: "/approvals", icon: CheckCircle, roles: ["manager"] },
  { label: "Analytics", href: "/analytics", icon: BarChart3, roles: ["admin", "procurement", "manager"] },
  { label: "Activity Logs", href: "/activity-logs", icon: ClipboardList, roles: ["admin"] },
  { label: "Admin", href: "/admin/users", icon: Shield, roles: ["admin"] },
];

const sections = [
  { title: "Overview", items: navItems.filter(n => n.href === "/dashboard") },
  { title: "Procurement", items: navItems.filter(n => ["/vendors", "/rfqs", "/quotations", "/purchase-orders", "/invoices"].includes(n.href)) },
  { title: "Workflow", items: navItems.filter(n => n.href === "/approvals") },
  { title: "Intelligence", items: navItems.filter(n => ["/analytics"].includes(n.href)) },
  { title: "System", items: navItems.filter(n => ["/activity-logs", "/admin/users"].includes(n.href)) },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn("fixed left-0 top-0 z-40 h-screen bg-[var(--color-sidebar-bg)] text-white transition-all duration-200 flex flex-col", collapsed ? "w-16" : "w-[var(--spacing-sidebar-width)]")}>
      {/* Logo */}
      <div className="flex items-center h-[var(--spacing-header-height)] px-4 border-b border-white/10">
        {!collapsed && <span className="text-lg font-bold tracking-tight">VendorBridge</span>}
        {collapsed && <span className="text-lg font-bold mx-auto">VB</span>}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {sections.map((section) => {
          const visibleItems = section.items.filter(n => !n.roles || n.roles.includes("procurement"));
          if (visibleItems.length === 0) return null;
          return (
            <div key={section.title} className="mb-4">
              {!collapsed && <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/40">{section.title}</p>}
              {visibleItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-[var(--radius-default)] px-3 py-2 text-sm font-medium transition-colors relative",
                      isActive ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-r bg-[var(--color-primary)]" />}
                    <item.icon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-2">
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-2">
            <Avatar size="sm" fallback="R" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Rahul Kumar</p>
              <p className="text-xs text-white/50 truncate">Procurement Officer</p>
            </div>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="flex items-center justify-center w-full p-2 text-white/60 hover:text-white rounded-[var(--radius-default)] hover:bg-white/5">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </aside>
  );
}
