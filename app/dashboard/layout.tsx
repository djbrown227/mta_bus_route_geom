"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex bg-muted/40">
      
      {/* Sidebar */}
      <aside className="w-64 border-r bg-background p-6 hidden md:flex flex-col">
        <h2 className="text-xl font-bold mb-8">
          NYC Bus Metrics
        </h2>

        <nav className="space-y-3 text-sm">
          <Link
            href="/dashboard"
            className={`block rounded px-2 py-1 transition ${
              pathname === "/dashboard"
                ? "bg-muted font-semibold text-primary"
                : "text-muted-foreground hover:text-primary hover:bg-muted/50"
            }`}
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/metrics"
            className={`block rounded px-2 py-1 transition ${
              pathname === "/dashboard/metrics"
                ? "bg-muted font-semibold text-primary"
                : "text-muted-foreground hover:text-primary hover:bg-muted/50"
            }`}
          >
            Metrics Explained
          </Link>
        </nav>

        {/* Optional Footer */}
        <div className="mt-auto pt-8 text-xs text-muted-foreground">
          Data source: NYC Bus Route Analysis
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
