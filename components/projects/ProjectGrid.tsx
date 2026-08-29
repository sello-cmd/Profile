"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ExternalLink, Github, ChevronRight } from "lucide-react";
import { Project, ProjectDomain } from "@/types/portfolio";
import { PROJECTS_DATA } from "@/data/portfolioData";
import { Badge } from "@/components/ui/Badge";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { motion, AnimatePresence } from "framer-motion";

export function ProjectGrid() {
  const [selectedDomain, setSelectedDomain] = useState<ProjectDomain>("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filterTabs = [
    { id: "all", label: "All Engineering Works" },
    { id: "web-saas", label: "Web & SaaS" },
    { id: "systems-iot", label: "Systems & IoT" },
    { id: "interactive-tools", label: "Interactive Tools & Canvas" },
  ];

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (selectedDomain === "all") return true;
    return project.domain === selectedDomain;
  });

  return (
    <section id="projects" className="py-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="silver" className="mb-3">
            Case Studies & Architecture
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">
            <span className="text-white">Featured </span>
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Production Works
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            Real-world systems, IoT telemetry pipelines, interactive strategy engines, and esports broadcast platforms.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {filterTabs.map((tab) => {
            const isActive = selectedDomain === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedDomain(tab.id as ProjectDomain)}
                className={`relative px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "text-black font-bold bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    : "text-zinc-400 hover:text-white bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="group relative flex flex-col rounded-3xl bg-zinc-900/50 border border-zinc-800 overflow-hidden hover:border-zinc-500/60 hover:shadow-2xl hover:shadow-white/[0.04] transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative w-full h-56 sm:h-60 overflow-hidden bg-[#0a0a0c] flex items-center justify-center">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className={`transition-transform duration-500 group-hover:scale-105 ${
                      project.id === "champzero-org"
                        ? "object-cover object-center"
                        : project.id === "champzero-entprod"
                        ? "object-cover object-center"
                        : project.id === "floodlock"
                        ? "object-cover object-top"
                        : "object-cover object-center"
                    }`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <Badge variant="silver">{project.categoryLabel}</Badge>
                  </div>

                  {/* Quick Action Overlay */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-black/90 text-white hover:text-white border border-zinc-700 hover:border-white shadow-md transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-black/90 text-white hover:text-white border border-zinc-700 hover:border-white shadow-md transition-colors"
                        title="Source Code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-xs font-mono text-zinc-400">
                      {project.tagline}
                    </p>
                    <p className="mt-3 text-xs sm:text-sm text-zinc-300 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-zinc-800/80 space-y-4">
                    {/* Metrics Row */}
                    <div className="grid grid-cols-2 gap-2 bg-black/60 p-2.5 rounded-2xl border border-zinc-800">
                      {project.metrics.slice(0, 2).map((m, idx) => (
                        <div key={idx}>
                          <div className="text-sm font-mono font-bold text-white">{m.value}</div>
                          <div className="text-[10px] text-zinc-400 truncate">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-950 text-zinc-300 border border-zinc-800"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-1.5 py-0.5 text-[11px] font-mono text-zinc-500">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Deep Dive Action */}
                    <button
                      onClick={() => setActiveProject(project)}
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-zinc-200 hover:text-white bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/80 hover:border-zinc-500 transition-all group/btn"
                    >
                      <span>Explore Architecture & Metrics</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Deep Dive Modal */}
      <ProjectModal
        project={activeProject}
        isOpen={Boolean(activeProject)}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
