"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Send, Sparkles } from "lucide-react";

interface QuickActionDockProps {
  onOpenCal: () => void;
  onOpenResume: () => void;
}

export function QuickActionDock({ onOpenCal, onOpenResume }: QuickActionDockProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[90vw] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-full bg-[#0a0a0c]/90 border border-zinc-700/90 backdrop-blur-xl shadow-2xl shadow-black/90">
        {/* Availability Dot */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-zinc-200 border-r border-zinc-800 mr-1">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>Available</span>
        </div>

        <button
          onClick={onOpenCal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all group"
        >
          <Calendar className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
          <span>Book 15m</span>
        </button>

        <button
          onClick={onOpenResume}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
          <span>About</span>
        </button>
      </div>
    </div>
  );
}
