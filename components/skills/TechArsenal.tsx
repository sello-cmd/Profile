"use client";

import React from "react";
import { TECH_ARSENAL } from "@/data/portfolioData";
import { TechSkill } from "@/types/portfolio";
import { Badge } from "@/components/ui/Badge";
import { Code2, Layout, Server, Cpu, Terminal } from "lucide-react";

export function TechArsenal() {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Code2":
        return <Code2 className="w-5 h-5 text-white" />;
      case "Layout":
        return <Layout className="w-5 h-5 text-zinc-300" />;
      case "Server":
        return <Server className="w-5 h-5 text-zinc-200" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-white" />;
      default:
        return <Terminal className="w-5 h-5 text-zinc-400" />;
    }
  };

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case "Production Master":
        return "text-white bg-zinc-800 border-zinc-500 font-bold";
      case "Advanced":
        return "text-zinc-300 bg-zinc-900 border-zinc-700";
      default:
        return "text-zinc-400 bg-zinc-950 border-zinc-800";
    }
  };

  return (
    <section id="tech-stack" className="py-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="silver" className="mb-3">
            Capabilities & Technology Stack
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Technical Arsenal
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            A battle-tested stack spanning bare-metal embedded firmware, scalable web platforms, digital growth marketing, and live streaming systems.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {TECH_ARSENAL.map((category) => (
            <div
              key={category.title}
              className="relative rounded-3xl bg-zinc-900/50 border border-zinc-800 p-6 sm:p-7 hover:border-zinc-500/60 transition-all glow-border-hover"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
                <div className="p-2.5 rounded-2xl bg-black border border-zinc-800">
                  {getCategoryIcon(category.iconName)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{category.title}</h3>
                  <p className="text-xs text-zinc-400">{category.description}</p>
                </div>
              </div>

              {/* Skills List */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {category.skills.map((skill: TechSkill) => (
                  <div
                    key={skill.name}
                    className="p-3 rounded-2xl bg-black/60 border border-zinc-800/80 hover:border-zinc-600 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${getProficiencyColor(
                          skill.proficiency
                        )}`}
                      >
                        {skill.proficiency}
                      </span>
                    </div>
                    {skill.description && (
                      <p className="mt-1 text-[11px] text-zinc-400 leading-snug line-clamp-2">
                        {skill.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
