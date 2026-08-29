"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070709] text-white flex items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-4">
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-400">
          404 • Page Not Found
        </span>
        <h1 className="text-4xl font-heading font-extrabold text-white">Lost in the Radar?</h1>
        <p className="text-xs text-zinc-400">
          The requested page or resource could not be found. Let&apos;s get you back to Sean Casalme&apos;s portfolio.
        </p>
        <div className="pt-2">
          <Link href="/">
            <Button variant="primary" size="md" icon={<Home className="w-4 h-4 text-black" />}>
              Return to Overview
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
