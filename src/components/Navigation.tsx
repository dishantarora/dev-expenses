"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string): boolean => pathname === href;

  const navItems = [
    { href: "/", label: "Dashboard" },
    { href: "/expenses/new", label: "Add Expense" },
  ];

  return (
    <header className="bg-fuchsia-500 py-4">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">DevExpenses</h1>

        <nav className="flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-lg transition-colors ${
                    isActive(item.href)
                      ? "text-white font-bold border-b-2 border-white pb-1"
                      : "text-white hover:text-fuchsia-100"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            className="px-4 py-2 bg-white text-fuchsia-600 font-semibold rounded-lg hover:bg-fuchsia-50 transition-colors"
            aria-label="Contact support"
          >
            Call Us
          </button>
        </nav>
      </div>
    </header>
  );
}
