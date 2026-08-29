"use client";

import React from "react";
import { EXPERIENCE_TIMELINE, CERTIFICATIONS_LIST } from "@/data/portfolioData";
import { Badge } from "@/components/ui/Badge";
import { Calendar, MapPin, CheckCircle2, TrendingUp, Award, GraduationCap } from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-8 relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="silver" className="mb-3">
            Track Record & Leadership
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Experience, Leadership & Honors
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            Founder & CEO of ChampZero Esports, Student Organization President at STI College, and verified industry certifications.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="mt-10 space-y-6">
          {EXPERIENCE_TIMELINE.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-zinc-900/50 border border-zinc-800 p-6 sm:p-7 hover:border-zinc-500/60 transition-all glow-border-hover"
            >
              {/* Top metadata */}
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">{item.role}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-400 font-mono">
                    <span className="text-zinc-200 font-bold">{item.company}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-zinc-500" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono text-zinc-300 bg-black border border-zinc-800">
                    <Calendar className="w-3 h-3 text-white" />
                    {item.period}
                  </span>
                  <Badge variant="silver">{item.type}</Badge>
                </div>
              </div>

              {/* Highlight Metric */}
              {item.highlightMetric && (
                <div className="mt-3.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-800/80 border border-zinc-700 text-zinc-200 text-xs font-mono">
                  <TrendingUp className="w-3.5 h-3.5 text-white" />
                  <span>{item.highlightMetric}</span>
                </div>
              )}

              {/* Achievements */}
              <div className="mt-4 space-y-2">
                {item.achievements.map((ach, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{ach}</span>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="mt-5 pt-4 border-t border-zinc-800/80 flex flex-wrap gap-1.5">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-black text-zinc-300 border border-zinc-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Education & Certifications Row */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Education */}
          <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800">
            <div className="flex items-center gap-2.5 text-white font-bold mb-3">
              <GraduationCap className="w-5 h-5 text-white" />
              <h3 className="text-base">Education & Leadership</h3>
            </div>
            <div className="text-xs text-zinc-300 space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-white">STI COLLEGE BATANGAS</h4>
                <Badge variant="emerald">Leadership Awardee</Badge>
              </div>
              <p className="text-emerald-300 font-mono text-xs font-semibold">B.S. in Computer Engineering • Graduated with Leadership Award</p>
              <div className="pt-2 space-y-1 text-zinc-400">
                <p className="text-white font-medium">🎖️ Leadership Awardee (Graduation Honor)</p>
                <p>• President (2024–2025), Computer Engineering Student Org</p>
                <p>• 4x Gawad Leadership Awardee & STI Brand Ambassador</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800">
            <div className="flex items-center gap-2.5 text-white font-bold mb-3">
              <Award className="w-5 h-5 text-white" />
              <h3 className="text-base">Certifications & Training</h3>
            </div>
            <div className="space-y-2 text-xs text-zinc-300">
              {CERTIFICATIONS_LIST.map((cert) => (
                <div key={cert.title} className="flex justify-between items-center py-1 border-b border-zinc-850 last:border-0">
                  <span className="font-medium text-zinc-200">{cert.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black text-zinc-400 border border-zinc-800">
                    {cert.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
