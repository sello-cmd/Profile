"use client";

import React, { useState } from "react";
import { CLIENT_FAQS } from "@/data/portfolioData";
import { Badge } from "@/components/ui/Badge";
import { ChevronDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ClientFAQProps {
  onOpenCal: () => void;
}

export function ClientFAQ({ onOpenCal }: ClientFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-8 relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="silver" className="mb-3">
            Client Assurance & Guarantees
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-400">
            Everything you need to know about working together, milestone contracts, intellectual property, and project delivery.
          </p>
        </div>

        {/* Accordion List */}
        <div className="mt-10 space-y-3">
          {CLIENT_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-2xl bg-zinc-900/50 border border-zinc-800 overflow-hidden transition-all duration-200 hover:border-zinc-600"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700 shrink-0">
                      {faq.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-white" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/80">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-10 p-6 rounded-3xl bg-zinc-900/40 border border-zinc-700/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-black border border-zinc-700 text-white shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Have a specific question or custom requirement?</h4>
              <p className="text-xs text-zinc-400">Ask via direct chat or book a 15-minute intro chat directly with Sean.</p>
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={onOpenCal}
            className="shrink-0 w-full sm:w-auto justify-center text-xs"
          >
            Ask on a 15m Call
          </Button>
        </div>
      </div>
    </section>
  );
}
