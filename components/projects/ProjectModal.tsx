"use client";

import React from "react";
import Image from "next/image";
import { X, ExternalLink, Github, CheckCircle2, Cpu, TrendingUp, Layers, Terminal } from "lucide-react";
import { Project } from "@/types/portfolio";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0c0c0e] border border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-[#070709]">
          <div className="flex items-center gap-2">
            <Badge variant="silver">{project.categoryLabel}</Badge>
            <span className="text-xs text-zinc-400 font-mono hidden sm:inline">Featured Work</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Banner Image */}
          <div className="relative w-full h-60 sm:h-80 rounded-2xl overflow-hidden bg-[#0a0a0c] border border-zinc-800">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className={
                project.id === "champzero-org"
                  ? "object-cover object-center"
                  : project.id === "champzero-entprod"
                  ? "object-cover object-center"
                  : project.id === "floodlock"
                  ? "object-cover object-top"
                  : "object-cover object-center"
              }
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">{project.title}</h2>
              <p className="text-xs text-zinc-300 font-mono">{project.tagline}</p>
            </div>
          </div>

          {/* Links Bar */}
          <div className="flex flex-wrap gap-2.5">
            {project.demoUrl && !project.facebookUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="sm" icon={<ExternalLink className="w-3.5 h-3.5 text-black" />}>
                  {project.id === "champzero-org" ? "Visit champzero.org" : "Live Production Demo"}
                </Button>
              </a>
            )}
            {project.facebookUrl && (
              <a href={project.facebookUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="sm" icon={<ExternalLink className="w-3.5 h-3.5 text-black" />}>
                  Facebook: czentprod
                </Button>
              </a>
            )}
            {project.instagramUrl && (
              <a href={project.instagramUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="sm" icon={<ExternalLink className="w-3.5 h-3.5 text-zinc-300" />}>
                  Instagram: @champzero.entprod
                </Button>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="sm" icon={<Github className="w-3.5 h-3.5 text-zinc-300" />}>
                  GitHub Repository
                </Button>
              </a>
            )}
            {!project.demoUrl && !project.facebookUrl && !project.instagramUrl && !project.githubUrl && (
              <div className="px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>Embedded Hardware & SCADA System • Thesis Defended</span>
              </div>
            )}
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-black border border-zinc-800 text-xs">
            {project.metrics.map((m, idx) => (
              <div key={idx}>
                <div className="text-xs text-zinc-500 font-mono">{m.label}</div>
                <div className="text-sm font-bold text-white font-mono mt-0.5">{m.value}</div>
              </div>
            ))}
          </div>

          {/* Full Narrative */}
          <div className="space-y-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
              Architecture & Problem Solved
            </h3>
            <p>{project.description}</p>
          </div>

          {/* Architecture Highlights */}
          {project.architectureHighlights && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                Technical Highlights
              </h3>
              <div className="space-y-2">
                {project.architectureHighlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold mb-2">
              Technologies Utilized
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-black text-zinc-300 border border-zinc-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
