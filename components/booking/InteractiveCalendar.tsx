"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Clock, Video, CheckCircle2, MessageSquare, Globe, AlertCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PROFILE_DATA } from "@/data/portfolioData";
import confetti from "canvas-confetti";

export function InteractiveCalendar() {
  const [meetingType, setMeetingType] = useState<"15min" | "30min" | "60min">("15min");
  const [selectedDate, setSelectedDate] = useState<string>("2026-09-01");
  const [selectedTime, setSelectedTime] = useState<string>("10:30 AM (UTC+8)");
  const [platform, setPlatform] = useState<"Google Meet" | "WhatsApp" | "Phone">("Google Meet");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Live booked slots from DB
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
    fetchBookedSlots();
  }, []);

  const meetingDetails = {
    "15min": {
      title: "15-Min Intro & Discovery Call",
      desc: "Fast, focused discussion to evaluate project fit, timeline, and high-level requirements.",
      badge: "Free Consultation",
      duration: "15 Minutes"
    },
    "30min": {
      title: "30-Min Project Scoping & Tech Strategy",
      desc: "Detailed technical breakdown, architectural recommendations, and milestone estimations.",
      badge: "Deep Scoping",
      duration: "30 Minutes"
    },
    "60min": {
      title: "60-Min Architecture, Code Audit & Strategy",
      desc: "Comprehensive review of existing codebases, database performance, or esports broadcast infrastructure.",
      badge: "Full Technical Audit",
      duration: "60 Minutes"
    }
  };

  const availableDates = [
    { day: "Mon", dateStr: "Sep 01", value: "2026-09-01" },
    { day: "Tue", dateStr: "Sep 02", value: "2026-09-02" },
    { day: "Wed", dateStr: "Sep 03", value: "2026-09-03" },
    { day: "Thu", dateStr: "Sep 04", value: "2026-09-04" },
    { day: "Fri", dateStr: "Sep 05", value: "2026-09-05" },
    { day: "Mon", dateStr: "Sep 08", value: "2026-09-08" },
    { day: "Tue", dateStr: "Sep 09", value: "2026-09-09" }
  ];

  const allTimeWindows = [
    "09:30 AM (UTC+8)",
    "10:30 AM (UTC+8)",
    "01:30 PM (UTC+8)",
    "03:00 PM (UTC+8)",
    "05:00 PM (UTC+8)",
    "08:00 PM (UTC+8)"
  ];

  // Check if a specific slot is taken for selectedDate
  const isTimeSlotTaken = (dateVal: string, timeVal: string) => {
    return bookedSlots.some((slot) => slot.date === dateVal && slot.time === timeVal);
  };

  // Calculate available slots per day
  const getDayAvailableCount = (dateVal: string) => {
    const takenCount = bookedSlots.filter((slot) => slot.date === dateVal).length;
    return Math.max(0, allTimeWindows.length - takenCount);
  };

  // Ensure selected time is valid for the selected date
  useEffect(() => {
    if (isTimeSlotTaken(selectedDate, selectedTime)) {
      const firstAvailable = allTimeWindows.find((t) => !isTimeSlotTaken(selectedDate, t));
      if (firstAvailable) {
        setSelectedTime(firstAvailable);
      }
    }
  }, [selectedDate, bookedSlots]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim() || !email.trim()) {
      setErrorMessage("Please provide your name and email address.");
      return;
    }

    if (isTimeSlotTaken(selectedDate, selectedTime)) {
      setErrorMessage(`The slot on ${selectedDate} at ${selectedTime} is already booked. Please choose an open slot.`);
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
          type: meetingDetails[meetingType].title,
          date: selectedDate,
          time: selectedTime,
          platform,
          notes: notes.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.message || "This slot is no longer available. Please select another time.");
        await fetchBookedSlots();
        return;
      }

      // Add to local booked slots to lock immediately
      setBookedSlots((prev) => [...prev, { date: selectedDate, time: selectedTime }]);
      setIsBooked(true);

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#ffffff", "#e4e4e7", "#71717a"],
      });
    } catch (err) {
      setErrorMessage("Failed to connect to the booking server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="calendar-booking" className="py-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="silver" className="mb-3">
            Real-Time 1-on-1 Scheduling
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Schedule a Strategy Call with Sean
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Reserve a direct consultation slot. Confirmed bookings are locked in real-time in the database to prevent duplicate appointments.
          </p>
        </div>

        {/* Booking Card */}
        <div className="mt-10 rounded-3xl bg-zinc-900/50 border border-zinc-800 p-6 sm:p-8 backdrop-blur-sm">
          {isBooked ? (
            <div className="py-12 text-center max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-zinc-800 border border-zinc-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <Badge variant="silver">Appointment Confirmed & Reserved</Badge>
              <h3 className="text-2xl font-bold text-white">Strategy Session Booked!</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Thank you, <strong className="text-white">{name}</strong>! Your session for <strong className="text-white font-mono">{meetingDetails[meetingType].title}</strong> is locked for <strong className="text-white font-mono">{selectedDate} @ {selectedTime}</strong> via <strong className="text-white">{platform}</strong>.
              </p>
              <div className="p-4 rounded-2xl bg-black border border-zinc-800 text-xs font-mono text-zinc-400 space-y-1">
                <div>Confirmation email sent to: <span className="text-white">{email}</span></div>
                <div>Status: <span className="text-white font-bold">Locked in Database</span></div>
              </div>
              <div className="pt-3 flex flex-wrap justify-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsBooked(false);
                    setName("");
                    setEmail("");
                    setNotes("");
                    fetchBookedSlots();
                  }}
                  className="text-xs"
                >
                  Book Another Call
                </Button>
                <a href={PROFILE_DATA.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="sm" icon={<MessageSquare className="w-3.5 h-3.5 text-black" />} className="text-xs">
                    Message Sean on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBooking}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Meeting Duration & Intro */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold mb-3">
                      1. Select Consultation Scope
                    </h3>
                    <div className="space-y-2.5">
                      {(["15min", "30min", "60min"] as const).map((type) => {
                        const item = meetingDetails[type];
                        const isSelected = meetingType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setMeetingType(type)}
                            className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 ${
                              isSelected
                                ? "bg-white text-zinc-950 border-white shadow-lg"
                                : "bg-black/50 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold font-mono">{item.duration}</span>
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                                isSelected ? "bg-zinc-200 text-black border-zinc-300 font-bold" : "bg-zinc-900 border-zinc-800 text-zinc-400"
                              }`}>
                                {item.badge}
                              </span>
                            </div>
                            <h4 className="mt-1 text-xs sm:text-sm font-bold">{item.title}</h4>
                            <p className={`mt-1 text-xs leading-relaxed ${isSelected ? "text-zinc-700" : "text-zinc-400"}`}>
                              {item.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black border border-zinc-800 space-y-2 text-xs text-zinc-400">
                    <div className="flex items-center gap-2 text-zinc-300 font-medium">
                      <Globe className="w-4 h-4 text-white" />
                      <span>Timezone: Asia/Manila (UTC+8) / Global Friendly</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-zinc-300" />
                      <span>Google Meet link auto-generated or direct phone</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Date & Slot Selection + Attendee Info */}
                <div className="lg:col-span-7 space-y-5">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold">
                        2. Choose Date & Time
                      </h3>
                      <span className="text-[11px] font-mono text-zinc-400">
                        {getDayAvailableCount(selectedDate)} slot(s) available on selected date
                      </span>
                    </div>

                    {/* Date Grid */}
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {availableDates.map((d) => {
                        const isSelected = selectedDate === d.value;
                        const openSlots = getDayAvailableCount(d.value);
                        const isFullyBooked = openSlots === 0;
                        return (
                          <button
                            key={d.value}
                            type="button"
                            disabled={isFullyBooked}
                            onClick={() => setSelectedDate(d.value)}
                            className={`p-2 rounded-xl border text-center transition-all ${
                              isFullyBooked
                                ? "opacity-30 cursor-not-allowed bg-zinc-950 border-zinc-900 text-zinc-600"
                                : isSelected
                                ? "bg-white text-zinc-950 font-bold border-white shadow-md"
                                : "bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                            }`}
                          >
                            <div className={`text-[10px] font-mono uppercase ${isSelected ? "text-zinc-700" : "text-zinc-500"}`}>{d.day}</div>
                            <div className="text-xs font-bold mt-0.5">{d.dateStr}</div>
                            <div className={`text-[9px] font-mono mt-0.5 ${
                              isFullyBooked ? "text-red-500" : isSelected ? "text-zinc-950 font-bold" : "text-zinc-400"
                            }`}>
                              {isFullyBooked ? "Full" : `${openSlots} slots`}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Time Slots */}
                    <div className="mt-4">
                      <label className="block text-xs font-medium text-zinc-400 mb-2">Available Time Windows:</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {allTimeWindows.map((time) => {
                          const isTaken = isTimeSlotTaken(selectedDate, time);
                          const isSelected = selectedTime === time && !isTaken;
                          return (
                            <button
                              key={time}
                              type="button"
                              disabled={isTaken}
                              onClick={() => setSelectedTime(time)}
                              className={`p-2.5 rounded-xl border text-xs font-mono font-medium transition-all flex items-center justify-center gap-1.5 ${
                                isTaken
                                  ? "opacity-35 cursor-not-allowed bg-zinc-950/80 border-zinc-900 text-zinc-600 line-through"
                                  : isSelected
                                  ? "bg-white text-zinc-950 font-bold border-white shadow-md"
                                  : "bg-zinc-950/40 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                              }`}
                            >
                              {isTaken && <Lock className="w-3 h-3 text-zinc-600" />}
                              <span>{time}</span>
                              {isTaken && <span className="text-[9px] text-red-400/80 font-normal no-underline">(Booked)</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Attendee Form */}
                  <div className="pt-4 border-t border-zinc-800 space-y-3">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold">
                      3. Your Details
                    </h3>

                    {errorMessage && (
                      <div className="p-3 rounded-xl bg-red-950/40 border border-red-900 text-xs text-red-300 flex items-center gap-2 font-mono">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">Your Full Name *</label>
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
                        <label className="block text-xs text-zinc-400 mb-1">Work Email Address *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. jordan@company.com"
                          className="w-full px-3.5 py-2 rounded-xl bg-black border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-all font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Preferred Meeting Platform</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["Google Meet", "WhatsApp", "Phone"] as const).map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setPlatform(p)}
                            className={`p-2 rounded-xl border text-xs font-mono transition-all ${
                              platform === p
                                ? "bg-zinc-200 text-black font-bold border-white"
                                : "bg-black border-zinc-800 text-zinc-400 hover:border-zinc-700"
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Project Goals or Notes (Optional)</label>
                      <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Brief overview of what you'd like to build or discuss..."
                        className="w-full px-3.5 py-2 rounded-xl bg-black border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-all font-sans"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      isLoading={isSubmitting}
                      icon={<Clock className="w-4 h-4 text-black" />}
                      className="w-full justify-center text-xs py-3 font-bold"
                    >
                      Lock Slot: {selectedDate} @ {selectedTime}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
