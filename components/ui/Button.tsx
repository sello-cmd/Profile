import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "cyber" | "glow" | "silver";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  icon,
  iconPosition = "left",
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-400/50 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const sizes = {
    sm: "text-xs px-3.5 py-1.5 rounded-lg gap-1.5",
    md: "text-sm px-5 py-2.5 rounded-xl gap-2",
    lg: "text-base px-7 py-3.5 rounded-xl gap-2.5 font-semibold",
  };

  const variants = {
    primary: "bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_30px_rgba(52,211,153,0.5)] border border-emerald-300",
    secondary: "bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 border border-zinc-700/80 shadow-md",
    outline: "bg-transparent hover:bg-zinc-900 text-zinc-300 hover:text-emerald-300 border border-zinc-700 hover:border-emerald-500/50",
    ghost: "bg-transparent hover:bg-zinc-900/60 text-zinc-300 hover:text-white border-transparent",
    cyber: "bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 hover:from-emerald-300 hover:to-teal-200 text-zinc-950 font-bold shadow-[0_0_25px_rgba(52,211,153,0.35)] border border-emerald-300",
    silver: "bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-600 shadow-md",
    glow: "bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]",
  };

  return (
    <button
      className={cn(baseStyles, sizes[size], variants[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : (
        icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>
      )}
      {children}
      {!isLoading && icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </button>
  );
}
