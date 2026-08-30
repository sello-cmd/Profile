"use client";

import React, { useState, useEffect } from "react";
import { X, Calendar, Clock, Video, CheckCircle2, MessageSquare, AlertCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PROFILE_DATA } from "@/data/portfolioData";
import confetti from "canvas-confetti";

import { getUpcomingBookingDates } from "@/lib/utils";

interface CalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CalModal({ isOpen, onClose }: CalModalProps) {
  const dynamicDates = getUpcomingBookingDates(5);
  const [selectedDate, setSelectedDate] = useState<string>(dynamicDates[0]?.value || "");
  const [selectedSlot, setSelectedSlot] = useState<string>("10:30 AM (UTC+8)");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [bookedSlots, setBookedSlots] = useState<{ date: string; time: string }[]>([]);

  const fetchBookedSlots = async () => {
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      if (data.success && Array.isArray(data.bookedSlots)) {
        setBookedSlots(data.bookedSlots);
      }
    } catch (err) {
      console.error("Error fetching booked slots:", err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchBookedSlots();
      setIsBooked(false);
      setErrorMessage("");
      const upcoming = getUpcomingBookingDates(5);
      if (upcoming.length > 0) {
        setSelectedDate(upcoming[0].value);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const dates = dynamicDates;

  const slots = [
    "09:30 AM (UTC+8)",
    "10:30 AM (UTC+8)",
    "01:30 PM (UTC+8)",
    "03:00 PM (UTC+8)",
    "05:00 PM (UTC+8)",
    "08:00 PM (UTC+8)",
  ];

  const isTimeSlotTaken = (dateVal: string, timeVal: string) => {
    return bookedSlots.some((slot) => slot.date === dateVal && slot.time === timeVal);
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim() || !email.trim()) {
      setErrorMessage("Please fill in your name and email.");
      return;
    }

    if (isTimeSlotTaken(selectedDate, selectedSlot)) {
      setErrorMessage(`The slot on ${selectedDate} at ${selectedSlot} is already booked.`);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          type: "15-Min Intro & Discovery Call",
          date: selectedDate,
          time: selectedSlot,
          platform: "Google Meet",
          notes: notes.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.message || "Slot no longer available.");
        await fetchBookedSlots();
        return;
      }

      setBookedSlots((prev) => [...prev, { date: selectedDate, time: selectedSlot }]);
      setIsBooked(true);

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#ffffff", "#e4e4e7", "#a1a1aa"],
      });
    } catch (err) {
      setErrorMessage("Could not connect to booking server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#0c0c0e] border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading">15-Min Discovery Consultation</h3>
              <p className="text-xs text-zinc-400 font-mono">1-on-1 with Engr. Sean Lloyd E. Casalme</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isBooked ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-zinc-800 border border-zinc-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-white font-heading">Discovery Call Scheduled!</h4>
            <p className="text-xs text-zinc-300 max-w-xs mx-auto">
              Confirmed for <span className="text-white font-mono font-bold">{selectedDate} @ {selectedSlot}</span>. A calendar invitation has been prepared for <span className="text-white font-mono">{email}</span>.
            </p>
            <div className="pt-2 flex justify-center gap-2.5">
              <Button variant="primary" size="sm" onClick={onClose} className="text-xs">
                Close
              </Button>
              <a href={PROFILE_DATA.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="sm" icon={<MessageSquare className="w-3.5 h-3.5 text-zinc-300" />} className="text-xs">
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="mt-5 space-y-4">
            {errorMessage && (
              <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-900 text-xs text-red-300 flex items-center gap-2 font-mono">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Date selector */}
            <div>
              <label className="block text-xs font-mono text-zinc-300 font-bold uppercase mb-1.5">
                Select Date:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                {dates.map((d) => {
                  const isSelected = selectedDate === d.value;
                  return (
                    <button
                      key={d.value}
                      type="button"
                      onClick={() => setSelectedDate(d.value)}
                      className={`p-1.5 rounded-xl border text-[11px] font-mono transition-all text-center ${
                        isSelected
                          ? "bg-white text-black font-bold border-white"
                          : "bg-black border-zinc-800 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      {d.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slot selector */}
            <div>
              <label className="block text-xs font-mono text-zinc-300 font-bold uppercase mb-1.5">
                Select Available Slot:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {slots.map((slot) => {
                  const isTaken = isTimeSlotTaken(selectedDate, slot);
                  const isSelected = selectedSlot === slot && !isTaken;
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={isTaken}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2 rounded-xl border text-xs font-mono transition-all flex items-center justify-center gap-1 ${
                        isTaken
                          ? "opacity-35 cursor-not-allowed bg-black border-zinc-900 text-zinc-600 line-through"
                          : isSelected
                          ? "bg-white text-black font-bold border-white"
                          : "bg-black border-zinc-800 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      {isTaken && <Lock className="w-3 h-3 text-zinc-600" />}
                      <span>{slot}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-2.5">
              <div>
                <label className="block text-xs text-zinc-300 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jordan Taylor"
                  className="w-full px-3.5 py-2 rounded-xl bg-black border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-all font-sans"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-300 mb-1">Your Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. jordan@techcorp.com"
                  className="w-full px-3.5 py-2 rounded-xl bg-black border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-all font-sans"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-300 mb-1">Topic / Project Brief</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. SaaS MVP architecture, IoT telemetry, or esports broadcast..."
                  className="w-full px-3.5 py-2 rounded-xl bg-black border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-all font-sans"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              icon={<Calendar className="w-4 h-4 text-black" />}
              className="w-full justify-center text-xs py-2.5 font-bold"
            >
              Confirm 15m Video Session
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
