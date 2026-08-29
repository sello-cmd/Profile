"use client";

import React from "react";
import { ArrowRight, Sparkles, Github, Linkedin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PROFILE_DATA } from "@/data/portfolioData";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onOpenCal: () => void;
  onOpenResume: () => void;
  onGoToInquire?: () => void;
}

export function HeroSection({ onOpenCal, onOpenResume, onGoToInquire }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-6 pb-8 md:pt-10 md:pb-12 border-b border-zinc-800/80">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
          <span className="text-xs font-mono text-emerald-300 font-medium">
            Founder & CEO • Available for Contracts & Consulting
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] font-heading">
            <span className="text-white">Building </span>
            <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Web Apps
            </span>{" "}
            <span className="text-zinc-400 font-medium">&</span>{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Esports Productions
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-zinc-300 font-sans leading-relaxed">
            <strong className="text-white font-semibold">Engr. Sean Lloyd E. Casalme</strong> — Computer Engineer & Founder of ChampZero. I specialize in modern web platforms, competitive tournament systems, and live broadcast engineering.
          </p>
        </motion.div>

        {/* Streamlined Call to Action Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={onGoToInquire}
            icon={<ArrowRight className="w-4 h-4 text-black" />}
            iconPosition="right"
            className="font-bold shadow-lg"
          >
            Send Project Inquiry
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={onOpenCal}
            icon={<Calendar className="w-4 h-4 text-zinc-300" />}
            className="border-zinc-700 hover:border-zinc-500"
          >
            Book 15m Consultation
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={onOpenResume}
            icon={<Sparkles className="w-4 h-4 text-zinc-400" />}
            className="border-zinc-800 hover:border-zinc-600 hover:text-white"
          >
            About Sean
          </Button>
        </motion.div>

        {/* Clean Direct Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-xs text-zinc-400"
        >
          <a
            href={PROFILE_DATA.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 hover:border-zinc-600 hover:text-white transition-colors text-xs font-mono"
            title="Personal Facebook"
          >
            <span className="font-bold text-xs">FB</span>
            <span>Facebook</span>
          </a>

          <a
            href={PROFILE_DATA.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 hover:border-zinc-600 hover:text-white transition-colors text-xs font-mono"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <a
            href={PROFILE_DATA.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 hover:border-zinc-600 hover:text-white transition-colors text-xs font-mono"
          >
            <Linkedin className="w-3.5 h-3.5 text-zinc-300" />
            <span>LinkedIn</span>
          </a>
        </motion.div>

        {/* Metrics Grid Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-sm"
        >
          {PROFILE_DATA.heroStats.map((h, i) => (
            <div key={i} className="text-center p-2">
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono tracking-tight">
                {h.value}
              </div>
              <div className="text-[11px] text-zinc-400 font-mono mt-0.5">{h.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
