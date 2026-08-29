"use client";

import React from "react";
import { X, ExternalLink, Mail, Phone, MapPin, Award, CheckCircle2, Trophy, GraduationCap, Cpu, Layers } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PROFILE_DATA, EXPERIENCE_TIMELINE, CERTIFICATIONS_LIST, TECH_ARSENAL } from "@/data/portfolioData";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0c0e] border border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Action Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-[#070709]">
          <div className="flex items-center gap-2">
            <Badge variant="silver">About Engr. Sean Lloyd E. Casalme</Badge>
            <span className="text-xs text-zinc-400 font-mono hidden sm:inline">Founder & CEO • ChampZero Esports</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Printable Profile Content */}
        <div className="flex-1 p-6 sm:p-10 overflow-y-auto space-y-8 text-zinc-200 text-xs sm:text-sm font-sans leading-relaxed">
          {/* Header Info */}
          <div className="border-b border-zinc-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
                {PROFILE_DATA.name}
              </h1>
              <p className="text-sm font-semibold text-zinc-300 font-mono">
                {PROFILE_DATA.title}
              </p>
              <p className="text-xs text-zinc-400 flex items-center gap-1.5 pt-0.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <span>{PROFILE_DATA.location} • Willing to relocate / Global Remote</span>
              </p>
            </div>

            <div className="flex flex-col sm:items-end gap-1.5 text-xs font-mono text-zinc-300 shrink-0">
              <a href={`mailto:${PROFILE_DATA.email}`} className="flex items-center gap-2 hover:text-white transition-colors whitespace-nowrap">
                <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>{PROFILE_DATA.email}</span>
              </a>
              <a href={PROFILE_DATA.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors whitespace-nowrap">
                <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>{PROFILE_DATA.phone}</span>
              </a>
              <a href={PROFILE_DATA.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors whitespace-nowrap">
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>linkedin.com/in/sean-casalme</span>
              </a>
              <a href={PROFILE_DATA.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors whitespace-nowrap">
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>github.com/sello-cmd</span>
              </a>
            </div>
          </div>

          {/* Key Competencies & Technical Skills Grid */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-white" />
              <span>Core Skills & Professional Competencies</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Pillar 1: Esports Event Broadcasting Production */}
              <div className="p-4 rounded-2xl bg-black border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-xs font-heading">Esports Event Broadcasting Production</h3>
                  <Badge variant="silver">Live Production</Badge>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Engineering professional multi-camera live broadcast feeds, studio control room workflows, and high-impact tournament streams.
                </p>
                <ul className="text-[11px] text-zinc-300 space-y-1 pt-1 list-disc list-inside">
                  <li><span className="text-white font-medium">Vision Mixing & Software:</span> OBS Studio & vMix live scene switching, dynamic transitions, and instant replay triggers.</li>
                  <li><span className="text-white font-medium">Dynamic Stream Overlays:</span> Custom HTML/CSS real-time match scoreboards and lower-thirds browser sources.</li>
                  <li><span className="text-white font-medium">Audio & Video Routing:</span> Multi-channel digital audio mixers, caster microphones, game sound isolation, and NDI/RTMP feeds.</li>
                  <li><span className="text-white font-medium">Post-Production:</span> Video highlight packages, tournament trailers, and montage color grading in Premiere Pro & DaVinci Resolve.</li>
                </ul>
              </div>

              {/* Pillar 2: Esports Event Management & Operations */}
              <div className="p-4 rounded-2xl bg-black border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-xs font-heading">Esports Event Management & Operations</h3>
                  <Badge variant="silver">Executive Ops</Badge>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Directing end-to-end competitive esports tournaments, LAN stage operations, and community championships from rulebook to prize distribution.
                </p>
                <ul className="text-[11px] text-zinc-300 space-y-1 pt-1 list-disc list-inside">
                  <li><span className="text-white font-medium">Tournament Directing:</span> Automated bracket pipelines (Single/Double Elimination, Swiss), match scheduling, and dispute resolution.</li>
                  <li><span className="text-white font-medium">Rulebooks & Governance:</span> Drafting official tournament rulebooks, athlete eligibility guidelines, and competitive code of conduct.</li>
                  <li><span className="text-white font-medium">Stage & LAN Logistics:</span> Player booth setup, tournament network infrastructure, referee marshaling, and intercom systems.</li>
                  <li><span className="text-white font-medium">Sponsor Activations:</span> Commercial partner deliverables, on-stage brand integration, and prize pool escrow management.</li>
                </ul>
              </div>

              {/* Pillar 3: Social Media Management & Marketing */}
              <div className="p-4 rounded-2xl bg-black border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-xs font-heading">Social Media Management & Growth Marketing</h3>
                  <Badge variant="silver">Community & Reach</Badge>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Executing multi-channel social media strategies that drive organic reach, community engagement, brand authority, and sponsor conversions.
                </p>
                <ul className="text-[11px] text-zinc-300 space-y-1 pt-1 list-disc list-inside">
                  <li><span className="text-white font-medium">Multi-Platform Strategy:</span> Content calendars and publishing pipelines across Facebook, Instagram, TikTok, YouTube & Discord.</li>
                  <li><span className="text-white font-medium">Visual Creative Design:</span> High-impact marketing banners, tournament promotional posters, and social graphics in Photoshop & Canva.</li>
                  <li><span className="text-white font-medium">Community Engagement:</span> Managing community hubs, athlete registration funnels, interactive polls, and fan discussions.</li>
                  <li><span className="text-white font-medium">Analytics & Insights:</span> Monitoring reach metrics, CTR, impression velocity, audience demographics, and campaign ROI.</li>
                </ul>
              </div>

              {/* Pillar 4: Full-Stack Web & IoT Telemetry Development */}
              <div className="p-4 rounded-2xl bg-black border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-xs font-heading">Full-Stack Web & Embedded IoT Development</h3>
                  <Badge variant="silver">Core Engineering</Badge>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Building high-performance web platforms, canvas tools, and embedded IoT disaster mitigation telemetry systems.
                </p>
                <ul className="text-[11px] text-zinc-300 space-y-1 pt-1 list-disc list-inside">
                  <li><span className="text-white font-medium">Web Technologies:</span> Next.js (App Router), React 19, TypeScript, Tailwind CSS, Zod validation, and Konva.js canvas.</li>
                  <li><span className="text-white font-medium">Embedded Firmware:</span> Bare-metal C++, Assembly (x86), FreeRTOS dual-core task scheduling on ESP32 microcontrollers.</li>
                  <li><span className="text-white font-medium">Cloud & Real-Time Sync:</span> Firebase Realtime DB, WebSockets, REST APIs, and sub-second telemetry architectures.</li>
                  <li><span className="text-white font-medium">CAD & 3D Engineering:</span> Parametric mechanical design, part assemblies, and technical drafting in AutoCAD & Onshape.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Professional Experience & Leadership */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-white" />
              <span>Leadership & Professional Experience</span>
            </h2>
            <div className="space-y-4">
              {EXPERIENCE_TIMELINE.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                  <div className="flex flex-wrap justify-between items-start gap-1">
                    <div>
                      <h3 className="font-bold text-white text-sm sm:text-base">{item.role}</h3>
                      <p className="text-xs text-zinc-300 font-mono">{item.company} • {item.location}</p>
                    </div>
                    <span className="text-xs font-mono text-zinc-400 bg-black px-2 py-0.5 rounded border border-zinc-800">
                      {item.period}
                    </span>
                  </div>
                  <div className="mt-3 space-y-1">
                    {item.achievements.map((ach, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Awards & Recognitions */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-white" />
              <span>Awards & Recognitions</span>
            </h2>
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
              <div>
                <h4 className="font-bold text-white text-xs mb-1.5">STI College Batangas Gawad 2024 Personal Awards:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-xl bg-black border border-zinc-800 text-xs">
                    <span className="font-bold text-white block">Most Attentive Leader</span>
                    <span className="text-[11px] text-zinc-400">Recognizing strong leadership and focus.</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black border border-zinc-800 text-xs">
                    <span className="font-bold text-white block">Most Resilient</span>
                    <span className="text-[11px] text-zinc-400">Demonstrating perseverance and ability to overcome challenges.</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black border border-zinc-800 text-xs">
                    <span className="font-bold text-white block">Change Adept Awardee</span>
                    <span className="text-[11px] text-zinc-400">Highlighting adaptability and ability to navigate change.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800/80">
                <h4 className="font-bold text-white text-xs mb-1">STI College Batangas Gawad 2024 Organizational Award:</h4>
                <p className="text-xs text-zinc-300">
                  <span className="font-bold text-white">Best in Teamwork</span> — Acknowledging effective collaboration and collective success under leadership.
                </p>
              </div>
            </div>
          </div>

          {/* Education & Certifications Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Education */}
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-white" />
                <span>Education</span>
              </h2>
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm">STI COLLEGE BATANGAS</h3>
                  <Badge variant="emerald">Leadership Awardee</Badge>
                </div>
                <p className="text-emerald-300 font-mono font-semibold">B.S. in Computer Engineering • Graduated with Leadership Award</p>
                <div className="pt-2 text-zinc-300 space-y-1">
                  <p className="text-white font-medium flex items-center gap-1.5">
                    <span className="text-emerald-400">🎖️</span>
                    <span>Leadership Awardee (Graduation Honor)</span>
                  </p>
                  <p className="text-zinc-400">• President (2024–2025), Computer Engineering Student Org</p>
                  <p className="text-zinc-400">• Vice-President (2023–2024)</p>
                  <p className="text-zinc-400">• Social Media Manager (2022–2023)</p>
                  <p className="text-zinc-400">• STI Brand Ambassador Graphic Designer (2022–2023)</p>
                </div>
              </div>
            </div>

            {/* Certifications & Trainings */}
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-white" />
                <span>Training Attended & Certifications</span>
              </h2>
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-xs space-y-2">
                {CERTIFICATIONS_LIST.map((c) => (
                  <div key={c.title} className="flex justify-between items-center text-zinc-300 py-0.5 border-b border-zinc-850 last:border-0">
                    <div>
                      <span className="font-medium text-white block">{c.title}</span>
                      <span className="text-[10px] text-zinc-500">{c.issuer}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black text-zinc-300 border border-zinc-800 shrink-0 ml-2">
                      {c.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
