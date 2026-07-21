import React from "react";
import { Link, useLocation } from "wouter";
import { ShoppingBag, Package, LayoutDashboard, Settings } from "lucide-react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();
  const { itemCount } = useCart();

  const links = [
    { href: "/", label: "Catalog", icon: Package },
    { href: "/dashboard", label: "Orders", icon: LayoutDashboard },
    { href: "/admin", label: "Admin", icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-6xl px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded flex items-center justify-center">
            M
          </div>
          ModernStore
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                location === link.href ? "text-foreground" : "text-foreground/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 container mx-auto max-w-6xl px-4 py-8">
        {children}
      </main>
      <footer className="border-t bg-muted/20 mt-auto">
        <div className="container mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ModernStore. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-foreground">Terms</Link>
            <Link href="/" className="hover:text-foreground">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
