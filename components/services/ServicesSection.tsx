"use client";

import React from "react";
import { Globe, Layers, Cpu, Terminal, Check, Clock, Sparkles } from "lucide-react";
import { SERVICES_DATA, WORKFLOW_STEPS } from "@/data/portfolioData";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ServicesSectionProps {
  onOpenCal: () => void;
  onGoToInquire?: (serviceTitle?: string) => void;
}

export function ServicesSection({ onOpenCal, onGoToInquire }: ServicesSectionProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case "Globe":
        return <Globe className="w-5 h-5 text-white" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-zinc-300" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-white" />;
      case "Terminal":
        return <Terminal className="w-5 h-5 text-zinc-300" />;
      default:
        return <Sparkles className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section id="services" className="py-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="silver" className="mb-3">
            Services & Engagement Models
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">
            <span className="text-white">How We Can </span>
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Partner
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            End-to-end full-stack web development, IoT telemetry engineering, esports broadcast ops, and digital marketing funnels.
          </p>
        </div>

        {/* 4 Pillars Card Layout */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="relative rounded-3xl bg-zinc-900/50 border border-zinc-800 p-7 flex flex-col justify-between hover:border-zinc-500/60 transition-all duration-300 glow-border-hover"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="p-3 rounded-2xl bg-black border border-zinc-800 text-white">
                    {getIcon(service.iconName)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 bg-black px-2.5 py-1 rounded-full border border-zinc-800">
                      <Clock className="w-3 h-3 text-white" />
                      {service.turnaround}
                    </span>
                    <Badge variant="silver">{service.badge}</Badge>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="mt-5 text-xl font-bold text-white">{service.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">{service.description}</p>

                {/* Deliverables Checklist */}
                <div className="mt-5 space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">Key Deliverables:</h4>
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <Check className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Stack & CTA */}
              <div className="mt-7 pt-5 border-t border-zinc-800/80">
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {service.typicalStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-black text-zinc-300 border border-zinc-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onGoToInquire?.(service.title)}
                    className="w-full justify-center text-xs font-bold shadow-md"
                  >
                    Select for Project
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onOpenCal}
                    className="shrink-0 text-xs"
                  >
                    Discuss
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Milestone Workflow Preview */}
        <div className="mt-16 pt-12 border-t border-zinc-800/80">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white">Delivery Workflow</h3>
            <p className="mt-1.5 text-xs sm:text-sm text-zinc-400">
              Clear stages, transparent progress, and rapid iterations from day one to launch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WORKFLOW_STEPS.map((step) => (
              <div
                key={step.step}
                className="relative p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800"
              >
                <span className="text-2xl font-mono font-extrabold text-zinc-600">{step.step}</span>
                <h4 className="mt-1.5 text-sm font-bold text-zinc-200">{step.title}</h4>
                <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
