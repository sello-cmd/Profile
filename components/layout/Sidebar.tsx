"use client";

import React from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  FolderGit2,
  Briefcase,
  Calculator,
  Calendar,
  Cpu,
  Trophy,
  HelpCircle,
  Send,
  FileText,
  Github,
  Linkedin,
  Phone,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PROFILE_DATA } from "@/data/portfolioData";
import { Button } from "@/components/ui/Button";

export type NavTabId =
  | "overview"
  | "projects"
  | "services"
  | "booking"
  | "skills"
  | "experience"
  | "faq"
  | "inquire"
  | "owner";

interface SidebarProps {
  activeTab: NavTabId;
  setActiveTab: (tab: NavTabId) => void;
  onOpenCal: () => void;
  onOpenResume: () => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export function Sidebar({
  activeTab,
  setActiveTab,
  onOpenCal,
  onOpenResume,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "projects", label: "Projects & Case Studies", icon: FolderGit2, badge: "4 Works" },
    { id: "services", label: "Services", icon: Briefcase, badge: "4 Pillars" },
    { id: "booking", label: "Book Consultation", icon: Calendar, badge: "15m / 30m" },
    { id: "skills", label: "Technical Skills", icon: Cpu, badge: "Stack" },
    { id: "experience", label: "Experience & Awards", icon: Trophy, badge: "CEO" },
    { id: "faq", label: "FAQ", icon: HelpCircle, badge: "Info" },
    { id: "inquire", label: "Contact & Inquiries", icon: Send, badge: "Direct" },
  ];

  const handleTabClick = (id: NavTabId) => {
    setActiveTab(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0a0a0c] border-r border-zinc-850 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Profile Card */}
        <div className="p-5 border-b border-zinc-850 bg-[#070709]">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-zinc-700 bg-zinc-900 shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.08)]">
              <Image
                src={PROFILE_DATA.avatarUrl}
                alt={PROFILE_DATA.name}
                fill
                className="object-cover transition-all duration-300"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] border-2 border-black" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-bold text-white truncate tracking-tight">
                Engr. Sean Casalme
              </h2>
              <p className="text-[11px] font-mono text-emerald-300 truncate font-semibold">Founder & CEO</p>
              <p className="text-[10px] text-zinc-400 truncate">ChampZero Esports</p>
            </div>
          </div>

          <div className="mt-3.5">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
              <span>Available for Projects & Contracts</span>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
          <div className="px-3 pb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
            Navigation Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleTabClick(item.id as NavTabId)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-emerald-950/50 text-emerald-300 font-bold border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/90 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? "text-emerald-400" : "text-zinc-400 group-hover:text-zinc-200"
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      isActive
                        ? "bg-emerald-900/60 text-emerald-200 border-emerald-500/50 font-bold"
                        : "bg-zinc-900 text-zinc-400 border-zinc-800"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Actions & Social Channels */}
        <div className="p-4 border-t border-zinc-850 bg-[#070709] space-y-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenResume}
            icon={<Sparkles className="w-3.5 h-3.5" />}
            className="w-full justify-center text-xs border-zinc-800 hover:border-zinc-700 font-medium"
          >
            About Sean
          </Button>

          <div className="flex items-center justify-between pt-2 border-t border-zinc-900 px-1 text-zinc-400">
            <a
              href={PROFILE_DATA.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:text-white hover:bg-zinc-900 transition-colors text-xs font-mono font-bold"
              title="Facebook Profile"
            >
              FB
            </a>
            <a
              href={PROFILE_DATA.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:text-white hover:bg-zinc-900 transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PROFILE_DATA.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:text-white hover:bg-zinc-900 transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PROFILE_DATA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:text-white hover:bg-zinc-900 transition-colors"
              title="WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="p-1.5 rounded-lg hover:text-white hover:bg-zinc-900 transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
