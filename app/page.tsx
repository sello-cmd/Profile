"use client";

import React, { useState } from "react";
import { Sidebar, NavTabId } from "@/components/layout/Sidebar";
import { TopHeader } from "@/components/layout/TopHeader";
import { HeroSection } from "@/components/hero/HeroSection";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ServicesSection } from "@/components/services/ServicesSection";
import { InteractiveCalendar } from "@/components/booking/InteractiveCalendar";
import { TechArsenal } from "@/components/skills/TechArsenal";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { ClientFAQ } from "@/components/faq/ClientFAQ";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { OwnerDashboard } from "@/components/admin/OwnerDashboard";
import { Footer } from "@/components/layout/Footer";
import { CalModal } from "@/components/contact/CalModal";
import { ResumeModal } from "@/components/contact/ResumeModal";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTabId>("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calModalOpen, setCalModalOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col lg:flex-row">
      {/* 1. Left Fixed Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCal={() => setCalModalOpen(true)}
        onOpenResume={() => setResumeModalOpen(true)}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
      />

      {/* 2. Main Workspace Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0 min-h-screen">
        {/* Space-efficient Top Sticky Header */}
        <TopHeader
          activeTab={activeTab}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenCal={() => setCalModalOpen(true)}
          onOpenResume={() => setResumeModalOpen(true)}
          onSelectTab={(tab) => setActiveTab(tab)}
        />

        {/* Dynamic Main Workspace Container */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-12"
              >
                {/* Hero Section */}
                <HeroSection
                  onOpenCal={() => setCalModalOpen(true)}
                  onOpenResume={() => setResumeModalOpen(true)}
                  onGoToInquire={() => setActiveTab("inquire")}
                />

                {/* Quick Section Jump Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <button
                    onClick={() => setActiveTab("projects")}
                    className="p-6 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-500 text-left transition-all glow-border-hover group"
                  >
                    <div className="text-xs font-mono text-zinc-400 font-bold uppercase">4 Featured Works</div>
                    <h3 className="mt-1.5 text-lg font-bold text-white group-hover:text-zinc-200">
                      Explore Case Studies &rarr;
                    </h3>
                    <p className="mt-1 text-xs text-zinc-400">
                      ChampZero Org (champzero.org), Entertainment Production, Floodlock IoT, and RadianTactics.
                    </p>
                  </button>

                  <button
                    onClick={() => setActiveTab("services")}
                    className="p-6 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-500 text-left transition-all glow-border-hover group"
                  >
                    <div className="text-xs font-mono text-zinc-400 font-bold uppercase">4 Core Pillars</div>
                    <h3 className="mt-1.5 text-lg font-bold text-white group-hover:text-zinc-200">
                      Services & Scope &rarr;
                    </h3>
                    <p className="mt-1 text-xs text-zinc-400">
                      Full-stack Next.js MVPs, embedded hardware telemetry, esports broadcast production & CAD design.
                    </p>
                  </button>

                  <button
                    onClick={() => setActiveTab("booking")}
                    className="p-6 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-500 text-left transition-all glow-border-hover group"
                  >
                    <div className="text-xs font-mono text-zinc-400 font-bold uppercase">1-on-1 Consultation</div>
                    <h3 className="mt-1.5 text-lg font-bold text-white group-hover:text-zinc-200">
                      Book Direct Call &rarr;
                    </h3>
                    <p className="mt-1 text-xs text-zinc-400">
                      Schedule a 15-min or 30-min strategy session via Google Meet, WhatsApp, or Phone.
                    </p>
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === "projects" && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectGrid />
              </motion.div>
            )}

            {activeTab === "services" && (
              <motion.div
                key="services"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <ServicesSection
                  onOpenCal={() => setCalModalOpen(true)}
                  onGoToInquire={(serviceTitle) => {
                    setSelectedService(serviceTitle);
                    setActiveTab("inquire");
                  }}
                />
              </motion.div>
            )}

            {activeTab === "booking" && (
              <motion.div
                key="booking"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <InteractiveCalendar />
              </motion.div>
            )}

            {activeTab === "skills" && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <TechArsenal />
              </motion.div>
            )}

            {activeTab === "experience" && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <ExperienceSection />
              </motion.div>
            )}

            {activeTab === "faq" && (
              <motion.div
                key="faq"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <ClientFAQ onOpenCal={() => setCalModalOpen(true)} />
              </motion.div>
            )}

            {activeTab === "inquire" && (
              <motion.div
                key="inquire"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <InquiryForm
                  onOpenCal={() => setCalModalOpen(true)}
                  initialService={selectedService}
                />
              </motion.div>
            )}

            {activeTab === "owner" && (
              <motion.div
                key="owner"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <OwnerDashboard />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Clean Footer */}
        <Footer />
      </div>

      {/* 15-Minute Discovery Quick Pop-up Modal */}
      <CalModal
        isOpen={calModalOpen}
        onClose={() => setCalModalOpen(false)}
      />

      {/* Executive Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
}
