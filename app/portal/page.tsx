"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { OwnerDashboard } from "@/components/admin/OwnerDashboard";

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col">
      {/* Top Secure Header */}
      <header className="sticky top-0 z-40 bg-[#0c0c0e]/95 backdrop-blur-md border-b border-zinc-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 text-xs font-mono transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Site</span>
          </Link>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <Shield className="w-3.5 h-3.5" />
              <span>Private Founder Environment</span>
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
            slec.site/portal
          </span>
        </div>
      </header>

      {/* Main Dashboard Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
        <OwnerDashboard />
      </main>
    </div>
  );
}
