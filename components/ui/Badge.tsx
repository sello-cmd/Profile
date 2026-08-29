import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "cyber" | "silver" | "emerald" | "amber" | "purple" | "outline" | "white";
  children: React.ReactNode;
}

export function Badge({ variant = "default", className, children, ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-zinc-900/90 text-zinc-300 border-zinc-800",
    cyber: "bg-emerald-950/40 text-emerald-300 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]",
    silver: "bg-zinc-900/90 text-emerald-300 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]",
    white: "bg-emerald-400 text-zinc-950 font-bold border-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.3)]",
    emerald: "bg-emerald-950/60 text-emerald-300 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]",
    amber: "bg-zinc-900 text-amber-300 border-amber-700/50",
    purple: "bg-zinc-900 text-purple-300 border-purple-700/50",
    outline: "bg-transparent text-zinc-400 border-zinc-800 hover:border-emerald-500/40 hover:text-emerald-300",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border tracking-wide transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
