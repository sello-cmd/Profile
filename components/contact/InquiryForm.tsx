"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InquiryFormSchema, InquiryFormData } from "@/types/portfolio";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Send, CheckCircle2, AlertCircle, Calendar, Copy, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { PROFILE_DATA } from "@/data/portfolioData";

interface InquiryFormProps {
  onOpenCal: () => void;
  initialService?: string;
}

export function InquiryForm({ onOpenCal, initialService }: InquiryFormProps) {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState<string>("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const availableProjectTypes = [
    "Full-Stack Web App",
    "SaaS MVP & Billing",
    "IoT & SCADA Telemetry Dashboard",
    "Interactive Canvas Engine",
    "Esports Tournament Platform / Broadcast",
    "CAD 3D Modeling & Visual Design",
    "Technical Architecture / Advisory"
  ];

  const budgetOptions = [
    "< $1k",
    "$1k - $3k",
    "$3k - $5k",
    "$5k - $10k",
    "$10k+"
  ];

  const timelineOptions = [
    "Immediate (within 2 weeks)",
    "1 - 2 months",
    "3+ months / Flexible"
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<InquiryFormData>({
    resolver: zodResolver(InquiryFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      handle: "",
      projectTypes: ["Full-Stack Web App"],
      budget: "$3k - $5k",
      timeline: "1 - 2 months",
      scope: "",
    }
  });

  React.useEffect(() => {
    if (initialService) {
      if (initialService.toLowerCase().includes("iot") || initialService.toLowerCase().includes("telemetry") || initialService.toLowerCase().includes("hardware")) {
        setValue("projectTypes", ["IoT & SCADA Telemetry Dashboard"]);
      } else if (initialService.toLowerCase().includes("esports") || initialService.toLowerCase().includes("broadcast")) {
        setValue("projectTypes", ["Esports Tournament Platform / Broadcast"]);
      } else if (initialService.toLowerCase().includes("cad") || initialService.toLowerCase().includes("3d")) {
        setValue("projectTypes", ["CAD 3D Modeling & Visual Design"]);
      } else {
        setValue("projectTypes", ["Full-Stack Web App"]);
      }
    }
  }, [initialService, setValue]);

  const selectedProjectTypes = watch("projectTypes") || [];
  const selectedBudget = watch("budget");
  const selectedTimeline = watch("timeline");

  const toggleProjectType = (type: string) => {
    if (selectedProjectTypes.includes(type)) {
      if (selectedProjectTypes.length > 1) {
        setValue("projectTypes", selectedProjectTypes.filter((t) => t !== type));
      }
    } else {
      setValue("projectTypes", [...selectedProjectTypes, type]);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const onSubmit = async (data: InquiryFormData) => {
    setFormState("submitting");
    setServerMessage("");

    try {
      const response = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setFormState("success");
        setServerMessage(resData.message || "Your inquiry has been dispatched successfully!");
        
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#ffffff", "#e4e4e7", "#a1a1aa"]
          });
        } catch (e) {
          // ignore
        }

        reset();
      } else {
        setFormState("error");
        setServerMessage(resData.message || resData.error || "Failed to submit. Please try again.");
      }
    } catch (err: unknown) {
      setFormState("error");
      setServerMessage("Network error. Please check your connection or reach out directly.");
    }
  };

  return (
    <section id="inquire" className="py-8 relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="silver" className="mb-3">
            Client Acquisition & Scoping Hub
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let’s Build Something Exceptional
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            Tell me about your vision, technical requirements, or target timeline. You’ll receive an architectural breakdown and proposal within 24 hours.
          </p>
        </div>

        {/* Form Container */}
        <div className="mt-10 rounded-3xl bg-zinc-900/60 border border-zinc-800 shadow-2xl p-6 sm:p-9 relative overflow-hidden">
          {/* Quick Direct Schedule Bar */}
          <div className="mb-8 p-4 rounded-2xl bg-black border border-zinc-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Need immediate answers or direct scoping?</h4>
                <p className="text-xs text-zinc-400">Skip the form and jump straight onto a 15-minute video consultation.</p>
              </div>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={onOpenCal}
              icon={<Calendar className="w-4 h-4 text-black" />}
              className="shrink-0 w-full sm:w-auto justify-center text-xs"
            >
              Book 15m Discovery
            </Button>
          </div>

          {/* Success State View */}
          {formState === "success" ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-zinc-800 border border-zinc-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Project Inquiry Received!</h3>
              <p className="text-zinc-300 max-w-md mx-auto leading-relaxed text-sm">
                {serverMessage}
              </p>
              <div className="pt-3 flex flex-wrap justify-center gap-3">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setFormState("idle")}
                >
                  Send Another Inquiry
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onOpenCal}
                  icon={<Calendar className="w-4 h-4 text-zinc-300" />}
                >
                  Schedule Intro Call
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
              {/* Row 1: Contact Information */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold mb-3">
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Full Name <span className="text-white">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      {...register("fullName")}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-black border text-white placeholder-zinc-600 focus:outline-none focus:border-white text-xs transition-all ${
                        errors.fullName ? "border-red-500" : "border-zinc-800"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Email Address <span className="text-white">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="name@organization.com"
                      {...register("email")}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-black border text-white placeholder-zinc-600 focus:outline-none focus:border-white text-xs transition-all ${
                        errors.email ? "border-red-500" : "border-zinc-800"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Company / Organization <span className="text-zinc-500 text-[10px]">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Company or organization"
                      {...register("company")}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-zinc-800 focus:border-white text-white placeholder-zinc-600 focus:outline-none text-xs transition-all"
                    />
                  </div>

                  {/* WhatsApp / Discord / Handle */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-400 block flex items-center justify-between">
                      <span>
                        WhatsApp / Discord / Handle <span className="text-zinc-500 text-[10px]">(Optional)</span>
                      </span>
                    </label>
                    <input
                      {...register("handle")}
                      placeholder="+63 994... or @handle"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-all font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Project Scope / Type Multi-Select */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold mb-2">
                  2. Project Type / Domain <span className="text-zinc-500 font-normal">(Select all that apply)</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2.5">
                  {availableProjectTypes.map((type) => {
                    const isSelected = selectedProjectTypes.includes(type);
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => toggleProjectType(type)}
                        className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-white text-zinc-950 font-bold border-white shadow-md"
                            : "bg-black border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                        }`}
                      >
                        <span>{type}</span>
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isSelected
                              ? "bg-black border-black text-white"
                              : "border-zinc-700 bg-zinc-900"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {errors.projectTypes && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.projectTypes.message}
                  </p>
                )}
              </div>

              {/* Row 3: Budget Range */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold mb-2">
                  3. Estimated Budget Range
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-2.5">
                  {budgetOptions.map((b) => {
                    const isSelected = selectedBudget === b;
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setValue("budget", b)}
                        className={`p-2.5 rounded-xl border text-center text-xs font-mono font-bold transition-all ${
                          isSelected
                            ? "bg-white text-zinc-950 font-bold border-white shadow-md"
                            : "bg-black border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                        }`}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 4: Timeline */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold mb-2">
                  4. Target Timeline
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2.5">
                  {timelineOptions.map((t) => {
                    const isSelected = selectedTimeline === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setValue("timeline", t)}
                        className={`p-2.5 rounded-xl border text-center text-xs font-medium transition-all ${
                          isSelected
                            ? "bg-white text-zinc-950 font-bold border-white shadow-md"
                            : "bg-black border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 5: Project Scope */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold mb-2">
                  5. Project Scope & Requirements <span className="text-white">*</span>
                </h3>
                <textarea
                  rows={4}
                  placeholder="Share key requirements, existing codebase status, specific APIs or hardware targets, and what problem needs solving..."
                  {...register("scope")}
                  className={`w-full px-3.5 py-3 rounded-xl bg-black border text-white placeholder-zinc-600 focus:outline-none focus:border-white text-xs leading-relaxed transition-all ${
                    errors.scope ? "border-red-500" : "border-zinc-800"
                  }`}
                />
                {errors.scope && (
                  <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.scope.message}
                  </p>
                )}
              </div>

              {/* Server Error Message */}
              {formState === "error" && (
                <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{serverMessage}</span>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-800">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={formState === "submitting"}
                  icon={<Send className="w-4 h-4 text-black" />}
                  className="w-full sm:w-auto text-xs py-3"
                >
                  {formState === "submitting" ? "Dispatching Inquiry..." : "Submit Project Inquiry"}
                </Button>

                {/* Copy email fallback */}
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <span>Direct email:</span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1 text-white hover:text-zinc-300 underline underline-offset-2"
                  >
                    {copiedEmail ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Copied {PROFILE_DATA.email}
                      </span>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>{PROFILE_DATA.email}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
