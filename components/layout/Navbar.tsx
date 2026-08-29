"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Terminal, Calendar, Send, Menu, X, FileText, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PROFILE_DATA } from "@/data/portfolioData";

interface NavbarProps {
  onOpenCal: () => void;
  onOpenResume: () => void;
}

export function Navbar({ onOpenCal, onOpenResume }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Case Studies", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Price Estimator", href: "#estimator" },
    { label: "Book Call", href: "#calendar-booking" },
    { label: "Tech Arsenal", href: "#tech-stack" },
    { label: "Experience", href: "#experience" },
    { label: "FAQ", href: "#faq" },
    { label: "Inquire", href: "#inquire" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "glass-nav py-3.5 shadow-xl shadow-black/40" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-3 focus:outline-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all">
            <Terminal className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="font-bold text-base text-slate-100 tracking-tight flex items-center gap-1.5">
              <span>{PROFILE_DATA.name}</span>
              <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">DEV</span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Full-Stack & Systems Architect</p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/70 rounded-full transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenResume}
            icon={<Sparkles className="w-3.5 h-3.5" />}
            className="text-zinc-300 border-zinc-700/80"
          >
            About
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenCal}
            icon={<Calendar className="w-3.5 h-3.5 text-cyan-400" />}
            className="text-slate-200 hover:text-white"
          >
            Book 15m Chat
          </Button>

          <a href="#inquire">
            <Button
              variant="primary"
              size="sm"
              icon={<Send className="w-3.5 h-3.5" />}
            >
              Inquire
            </Button>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenCal}
            className="text-xs px-2.5 py-1.5"
            icon={<Calendar className="w-3.5 h-3.5 text-cyan-400" />}
          >
            15m Chat
          </Button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800 px-6 py-5 mt-2 space-y-4">
          <div className="flex items-center gap-2 pb-2">
            <Badge variant="emerald">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for Q3/Q4 Projects
            </Badge>
          </div>
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
              >
                {link.label}
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              icon={<Sparkles className="w-3.5 h-3.5" />}
              className="w-full justify-center"
            >
              About
            </Button>
            <a href="#inquire" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="primary"
                size="sm"
                icon={<Send className="w-3.5 h-3.5" />}
                className="w-full justify-center"
              >
                Inquire Now
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
