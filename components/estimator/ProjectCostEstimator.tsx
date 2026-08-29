"use client";

import React, { useState } from "react";
import { Calculator, Check, ArrowRight, Clock, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface FeatureModule {
  id: string;
  name: string;
  desc: string;
  cost: number;
  days: number;
  category: "core" | "cloud" | "hardware" | "media";
}

export function ProjectCostEstimator() {
  const [projectType, setProjectType] = useState<"web-saas" | "iot-telemetry" | "canvas-tool" | "media-broadcast">("web-saas");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "auth-roles",
    "database-api",
    "responsive-ui"
  ]);
  const [speedMultiplier, setSpeedMultiplier] = useState<"standard" | "accelerated">("standard");

  const baseArchetypes = {
    "web-saas": { name: "Full-Stack Web App / SaaS", baseCost: 1200, baseDays: 10 },
    "iot-telemetry": { name: "IoT Sensor & Telemetry System", baseCost: 1500, baseDays: 14 },
    "canvas-tool": { name: "Interactive Canvas / Strategy Engine", baseCost: 1400, baseDays: 12 },
    "media-broadcast": { name: "Esports Broadcast & Media Platform", baseCost: 1100, baseDays: 8 },
  };

  const featureModules: FeatureModule[] = [
    { id: "auth-roles", name: "User Auth & RBAC", desc: "Firebase / JWT session control & permissions", cost: 300, days: 2, category: "core" },
    { id: "database-api", name: "Cloud DB & REST APIs", desc: "Firestore, SQL schemas, secure endpoints", cost: 400, days: 3, category: "core" },
    { id: "responsive-ui", name: "Custom Tailwind UI", desc: "Monochrome silver aesthetic, fluid grid", cost: 350, days: 2, category: "core" },
    { id: "stripe-billing", name: "Stripe Subscriptions & Checkout", desc: "Automated billing, webhooks, invoice generation", cost: 500, days: 3, category: "cloud" },
    { id: "realtime-ws", name: "WebSockets / Realtime DB Sync", desc: "Sub-50ms live data updates and alerts", cost: 450, days: 3, category: "cloud" },
    { id: "esp32-firmware", name: "ESP32 Hardware Firmware", desc: "C/C++ sensor drivers, Wi-Fi failover, sleep states", cost: 650, days: 5, category: "hardware" },
    { id: "analytics-admin", name: "Executive Admin Dashboard", desc: "Charts, user metrics, CSV export, telemetry logs", cost: 450, days: 3, category: "core" },
    { id: "stream-overlays", name: "OBS/vMix Live Stream Overlays", desc: "Interactive match scoreboards & dynamic graphics", cost: 400, days: 2, category: "media" },
    { id: "marketing-funnel", name: "Social Ad & Marketing Package", desc: "Multi-channel ad creatives, campaign setup", cost: 350, days: 2, category: "media" },
  ];

  const toggleFeature = (id: string) => {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  const base = baseArchetypes[projectType];
  const featureCost = selectedFeatures.reduce((acc, featId) => {
    const feat = featureModules.find((f) => f.id === featId);
    return acc + (feat ? feat.cost : 0);
  }, 0);

  const featureDays = selectedFeatures.reduce((acc, featId) => {
    const feat = featureModules.find((f) => f.id === featId);
    return acc + (feat ? feat.days : 0);
  }, 0);

  const rawTotalCost = base.baseCost + featureCost;
  const rawTotalDays = base.baseDays + featureDays;

  const totalCost = speedMultiplier === "accelerated" ? Math.round(rawTotalCost * 1.2) : rawTotalCost;
  const totalDays = speedMultiplier === "accelerated" ? Math.max(7, Math.round(rawTotalDays * 0.65)) : rawTotalDays;

  return (
    <section id="estimator" className="py-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="silver" className="mb-3">
            Scope & Price Estimator
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Instant Project Cost Calculator
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            Configure your technical requirements, select add-ons, and get a transparent estimate of your budget and turnaround time.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Options Column */}
          <div className="lg:col-span-7 space-y-7 rounded-3xl bg-zinc-900/50 border border-zinc-800 p-6 sm:p-7">
            {/* 1. Project Type Selector */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold mb-3">
                1. Select Project Archetype
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(Object.keys(baseArchetypes) as ("web-saas" | "iot-telemetry" | "canvas-tool" | "media-broadcast")[]).map((key) => {
                  const item = baseArchetypes[key];
                  const isSelected = projectType === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setProjectType(key)}
                      className={`p-3.5 rounded-2xl border text-left text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-white text-zinc-950 font-bold border-white shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                          : "bg-zinc-950/80 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                      }`}
                    >
                      <div className={isSelected ? "text-zinc-950 font-bold" : "text-white font-bold"}>{item.name}</div>
                      <div className={`mt-1 font-mono text-[11px] ${isSelected ? "text-zinc-700" : "text-zinc-400"}`}>
                        Base from ${item.baseCost} • ~{item.baseDays} days
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Feature Add-ons */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold mb-3">
                2. Select Included Features & Modules
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {featureModules.map((feat) => {
                  const isSelected = selectedFeatures.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      type="button"
                      onClick={() => toggleFeature(feat.id)}
                      className={`p-3 rounded-2xl border text-left transition-all flex items-start justify-between gap-2 ${
                        isSelected
                          ? "bg-zinc-800 border-zinc-400 text-white"
                          : "bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-zinc-200">{feat.name}</div>
                        <div className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">{feat.desc}</div>
                        <div className="text-[10px] font-mono text-zinc-300 mt-1">+${feat.cost} • +{feat.days}d</div>
                      </div>
                      <div
                        className={`w-4 h-4 rounded shrink-0 mt-0.5 flex items-center justify-center border ${
                          isSelected
                            ? "bg-white border-white text-black"
                            : "border-zinc-700 bg-zinc-900"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Delivery Speed */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold mb-3">
                3. Delivery Pace & Sprint Model
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSpeedMultiplier("standard")}
                  className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                    speedMultiplier === "standard"
                      ? "bg-white text-zinc-950 font-bold border-white shadow-md"
                      : "bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <div className="font-bold">Standard Delivery</div>
                  <div className={`text-[11px] mt-0.5 ${speedMultiplier === "standard" ? "text-zinc-700" : "text-zinc-400"}`}>
                    Regular sprint milestones
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setSpeedMultiplier("accelerated")}
                  className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                    speedMultiplier === "accelerated"
                      ? "bg-white text-zinc-950 font-bold border-white shadow-md"
                      : "bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <div className="font-bold flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Accelerated Sprint</span>
                  </div>
                  <div className={`text-[11px] mt-0.5 ${speedMultiplier === "accelerated" ? "text-zinc-700" : "text-zinc-400"}`}>
                    35% faster turnaround priority
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Sticky Summary Card */}
          <div className="lg:col-span-5 sticky top-20 rounded-3xl bg-zinc-900/90 border border-zinc-700/80 shadow-2xl p-6 sm:p-7 space-y-5 glow-border-hover">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <span className="text-xs font-mono text-zinc-400 font-bold uppercase">Estimated Investment</span>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono mt-1">
                  ${totalCost.toLocaleString()}
                  <span className="text-sm font-normal text-zinc-400 ml-1.5 font-sans">USD</span>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-800 border border-zinc-700 text-white">
                <Calculator className="w-5 h-5" />
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-black border border-zinc-800 text-xs font-mono">
              <div>
                <span className="text-zinc-500 block">Est. Timeline:</span>
                <span className="text-zinc-200 font-bold flex items-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  ~{totalDays} Days
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block">Add-ons:</span>
                <span className="text-white font-bold block mt-0.5">
                  {selectedFeatures.length} Modules
                </span>
              </div>
            </div>

            {/* Guarantees Checklist */}
            <div className="space-y-2 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-white shrink-0" />
                <span>100% IP & Source Code Ownership</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-white shrink-0" />
                <span>30-Day Post-Launch Bug Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-white shrink-0" />
                <span>Staging Previews & Continuous Async Updates</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-2">
              <a href="#inquire" className="block">
                <Button
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4 text-black" />}
                  iconPosition="right"
                  className="w-full justify-center text-xs py-3"
                >
                  Apply Estimate to Inquiry Form
                </Button>
              </a>

              <a href="#booking" className="block">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full justify-center text-xs"
                >
                  Book 15m Scoping Call with Sean
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
