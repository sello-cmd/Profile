"use client";

import React from "react";
import { PROFILE_DATA } from "@/data/portfolioData";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-850 bg-[#070709] py-12 px-4 sm:px-8 text-zinc-400">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Branding & Copyright */}
        <div className="text-center sm:text-left">
          <h3 className="text-sm font-bold text-white tracking-tight">
            {PROFILE_DATA.name}
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Founder & CEO, ChampZero Esports • Full-Stack Web & IoT Engineer
          </p>
          <p className="text-[11px] text-zinc-600 mt-2">
            © {new Date().getFullYear()} Sean Lloyd E. Casalme. All rights reserved.
          </p>
        </div>

        {/* Right: Clean Social Channels */}
        <div className="flex items-center gap-3">
          <a
            href={PROFILE_DATA.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:text-white transition-colors text-xs font-mono font-bold"
            title="Facebook Profile"
          >
            FB
          </a>
          <a
            href={PROFILE_DATA.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:text-white transition-colors"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={PROFILE_DATA.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:text-white transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={PROFILE_DATA.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:text-white transition-colors"
            title="WhatsApp"
          >
            <Phone className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${PROFILE_DATA.email}`}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:text-white transition-colors"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
