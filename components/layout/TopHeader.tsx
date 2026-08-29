"use client";

import React from "react";
import { Menu, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PROFILE_DATA } from "@/data/portfolioData";
import { NavTabId } from "./Sidebar";

interface TopHeaderProps {
  activeTab: NavTabId;
  onOpenMobileMenu: () => void;
  onOpenCal: () => void;
  onOpenResume: () => void;
  onSelectTab: (tab: NavTabId) => void;
}

export function TopHeader({
  activeTab,
  onOpenMobileMenu,
  onSelectTab,
}: TopHeaderProps) {
  const tabTitles: Record<NavTabId, { title: string; subtitle: string }> = {
    overview: { title: "Overview", subtitle: "Full-Stack Web • IoT Telemetry • Esports & Production" },
    projects: { title: "Featured Projects", subtitle: "Production Web Platforms, Embedded IoT Systems & Strategy Engines" },
    services: { title: "Services & Scope", subtitle: "Full-Stack MVPs, Hardware Bridges, Broadcast Ops & Digital Growth" },
    booking: { title: "1-on-1 Consultation", subtitle: "Schedule a Strategy & Scoping Call with Sean" },
    skills: { title: "Technical Skills", subtitle: "Languages, Embedded Hardware, 3D CAD & Media Production" },
    experience: { title: "Experience & Awards", subtitle: "Founder & CEO, Student Org President, Certifications & Honors" },
    faq: { title: "Frequently Asked Questions", subtitle: "Delivery Milestones, IP Ownership, Turnaround & Warranties" },
    inquire: { title: "Start a Project", subtitle: "Direct Inquiries & Project Consultation" },
    owner: { title: "Founder Portal", subtitle: "Client Inquiries, Consultations & Management" },
  };

  return (
    <header className="sticky top-0 z-30 bg-[#070709]/90 backdrop-blur-xl border-b border-zinc-800/80 py-3 px-4 sm:px-8 flex items-center justify-between">
      {/* Left: Mobile Toggle & Tab Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-xl text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 lg:hidden"
          aria-label="Open Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-200 font-bold uppercase tracking-wider">
              {tabTitles[activeTab].title}
            </span>
          </div>
          <p className="text-xs text-zinc-400 hidden sm:block truncate max-w-md">
            {tabTitles[activeTab].subtitle}
          </p>
        </div>
      </div>

      {/* Right: Single Clean Primary Action */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
          <span>Available for Projects</span>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => onSelectTab("inquire")}
          icon={<Send className="w-3.5 h-3.5 text-black" />}
          className="text-xs font-bold"
        >
          Inquire
        </Button>
      </div>
    </header>
  );
}
