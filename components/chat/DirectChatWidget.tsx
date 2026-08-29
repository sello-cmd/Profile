"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Phone, ArrowUpRight, ExternalLink, Mail, Calendar } from "lucide-react";
import { PROFILE_DATA } from "@/data/portfolioData";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

interface ChatMsg {
  id: string;
  sender: "sean" | "user";
  text: string;
  time: string;
  options?: { label: string; action: string; externalUrl?: string }[];
}

interface DirectChatWidgetProps {
  onOpenCal: () => void;
}

export function DirectChatWidget({ onOpenCal }: DirectChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: ChatMsg[] = [
    {
      id: "1",
      sender: "sean",
      text: `Hi there! 👋 I'm Sean Lloyd E. Casalme, Founder & CEO of ChampZero Esports and Full-Stack Developer. How can I help you today?`,
      time: "Just now",
      options: [
        { label: "🚀 I need a custom Web App / MVP", action: "web_mvp" },
        { label: "📅 Book a 15-min Discovery Call", action: "book_call" },
        { label: "🎮 ChampZero Esports / Media Collab", action: "champzero_collab" },
        { label: "⚡ IoT / ESP32 Hardware Project", action: "iot_project" },
        { label: "💬 Chat on WhatsApp (+63 994 770 7833)", action: "open_whatsapp" },
      ]
    }
  ];

  const [messages, setMessages] = useState<ChatMsg[]>(initialMessages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [isOpen, messages]);

  const handleOptionClick = (option: { label: string; action: string; externalUrl?: string }) => {
    const userMsg: ChatMsg = {
      id: Date.now().toString(),
      sender: "user",
      text: option.label,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let replyText = "";
      let options: { label: string; action: string; externalUrl?: string }[] | undefined = undefined;

      switch (option.action) {
        case "web_mvp":
          replyText = `Awesome! I build full-stack Next.js, React 19, TypeScript, and Firebase platforms. Would you like to schedule an intro call, explore our services, or message me directly on WhatsApp?`;
          options = [
            { label: "💬 Message Sean on WhatsApp", action: "open_whatsapp" },
            { label: "📅 Schedule 15m Video Call", action: "book_call" },
            { label: "💼 View Services & Deliverables", action: "goto_services" },
          ];
          break;

        case "book_call":
          replyText = `Let's make it happen! I opened the consultation calendar. You can also reach me directly on WhatsApp anytime!`;
          onOpenCal();
          options = [
            { label: "💬 Direct WhatsApp (+63 994 770 7833)", action: "open_whatsapp" },
            { label: "✉️ Send Project Inquiry", action: "goto_inquiry" },
          ];
          break;

        case "champzero_collab":
          replyText = `Exciting! Through ChampZero Esports Organization & Entertainment Production, we direct competitive tournaments, live broadcast engineering (OBS/vMix), visual branding, and digital marketing. Let's discuss your event!`;
          options = [
            { label: "💬 Message Sean on WhatsApp", action: "open_whatsapp" },
            { label: "📅 Schedule Discovery Meeting", action: "book_call" },
          ];
          break;

        case "iot_project":
          replyText = `I have extensive experience architecting IoT telemetry pipelines (like Floodlock) using ESP32, C/C++, WebSockets, and real-time cloud databases. Message me on WhatsApp or submit specs on the inquiry form.`;
          options = [
            { label: "💬 Message on WhatsApp", action: "open_whatsapp" },
            { label: "📝 Fill Inquiry Specs Form", action: "goto_inquiry" },
          ];
          break;

        case "open_whatsapp":
          window.open(PROFILE_DATA.whatsappUrl, "_blank");
          replyText = `Opening WhatsApp chat with Sean (+63 994 770 7833)... Talk soon!`;
          break;

        case "goto_services":
          replyText = `Switching to the Services & Scope section for you!`;
          window.location.href = "#services";
          break;

        case "goto_inquiry":
          replyText = `Switching to the Inquiry Hub for you!`;
          window.location.href = "#inquire";
          break;

        default:
          replyText = `Thanks! You can reach me directly on WhatsApp at +63 994 770 7833 or via email at ${PROFILE_DATA.email}.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "sean",
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          options,
        },
      ]);
    }, 600);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setInputText("");

    const userMsg: ChatMsg = {
      id: Date.now().toString(),
      sender: "user",
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const waPrefillUrl = `https://api.whatsapp.com/send?phone=639947707833&text=${encodeURIComponent(userText)}`;

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "sean",
          text: `Got your message: "${userText}". To chat live with me right now on my phone, click below to open our WhatsApp thread or book a 15-minute call!`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          options: [
            { label: "💬 Send directly to Sean on WhatsApp", action: "open_whatsapp_custom", externalUrl: waPrefillUrl },
            { label: "📅 Book 15m Video Call with Sean", action: "book_call" },
            { label: "✉️ Submit Full Project Specs", action: "goto_inquiry" },
          ],
        },
      ]);
    }, 700);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-3 w-[92vw] sm:w-[380px] h-[500px] rounded-3xl bg-[#0c0c0e] border border-zinc-800 shadow-2xl shadow-black backdrop-blur-xl flex flex-col overflow-hidden animate-in fade-in duration-150">
          {/* Header */}
          <div className="p-3.5 bg-[#070709] border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-zinc-700 bg-zinc-900">
                <Image
                  src={PROFILE_DATA.avatarUrl}
                  alt={PROFILE_DATA.name}
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399] border border-black" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Sean Casalme</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/40">CEO</span>
                </h4>
                <p className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399] animate-pulse" />
                  Active Now • Personal Response
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Direct Social Links Bar */}
          <div className="px-3.5 py-2 bg-black border-b border-zinc-850 flex items-center justify-between text-xs text-zinc-400">
            <span>Direct to My Phone:</span>
            <div className="flex gap-1.5">
              <a
                href={PROFILE_DATA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <Phone className="w-3 h-3 text-emerald-400" />
                <span>WhatsApp (+63 994 770 7833)</span>
              </a>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-emerald-400 text-zinc-950 font-semibold rounded-tr-none shadow-md"
                      : "bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-tl-none"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <span className="text-[9px] text-zinc-500 mt-0.5 px-1">{msg.time}</span>

                {/* Interactive Preset Action Buttons */}
                {msg.options && msg.options.length > 0 && (
                  <div className="mt-2 space-y-1.5 w-full">
                    {msg.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (opt.externalUrl) {
                            window.open(opt.externalUrl, "_blank");
                          } else {
                            handleOptionClick(opt);
                          }
                        }}
                        className="w-full text-left p-2 rounded-xl bg-black hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-500 text-zinc-200 text-[11px] font-medium transition-colors flex items-center justify-between group"
                      >
                        <span>{opt.label}</span>
                        <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover:text-white transition-colors" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-zinc-900 border border-zinc-800 w-14">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-3 bg-[#070709] border-t border-zinc-800 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message or question for Sean..."
              className="flex-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2 rounded-xl bg-white text-black hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Chat Trigger Button - Fixed and Stationary */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-400 text-zinc-950 font-bold text-xs sm:text-sm shadow-[0_4px_20px_rgba(52,211,153,0.35)] hover:bg-emerald-300 transition-colors border border-emerald-300 select-none"
        aria-label="Open Direct Chat"
      >
        <MessageSquare className="w-4 h-4" />
        <span>Direct Chat</span>
      </button>
    </div>
  );
}
