"use client";

import React, { useState, useEffect } from "react";
import {
  Lock,
  Unlock,
  Inbox,
  Calendar,
  Settings,
  Trash2,
  Mail,
  Phone,
  ExternalLink,
  Search,
  RefreshCw,
  Database,
  ShieldCheck,
  AlertCircle,
  Download,
  CheckCircle2,
  Clock,
  TrendingUp,
  Filter,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PROFILE_DATA } from "@/data/portfolioData";
import { DbInquiry, DbBooking } from "@/lib/db";

const SESSION_STORAGE_KEY = "founder_portal_token";

export function OwnerDashboard() {
  // Always locked by default - require explicit PIN entry every time
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successToast, setSuccessToast] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<"leads" | "bookings" | "settings">("leads");

  // Live database state
  const [inquiries, setInquiries] = useState<DbInquiry[]>([]);
  const [bookings, setBookings] = useState<DbBooking[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [bookingFilter, setBookingFilter] = useState<string>("All");

  // Platform availability control
  const [availabilityStatus, setAvailabilityStatus] = useState("Available for Full-Stack, IoT & Esports Consulting");

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(""), 3000);
  };

  const fetchDatabaseRecords = async () => {
    setIsLoading(true);
    try {
      const [inqRes, bkRes] = await Promise.all([
        fetch("/api/inquire"),
        fetch("/api/bookings"),
      ]);
      const inqData = await inqRes.json();
      const bkData = await bkRes.json();

      if (inqData.success && Array.isArray(inqData.data)) {
        setInquiries(inqData.data);
      }
      if (bkData.success && Array.isArray(bkData.data)) {
        setBookings(bkData.data);
      }
      showToast("Database synced with live records.");
    } catch (err) {
      console.error("Error fetching database records:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDatabaseRecords();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setErrorMsg("Please enter your Founder PIN.");
      return;
    }

    setIsAuthenticating(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/owner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: passcode }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.token) {
        setIsAuthenticated(true);
        setAuthToken(data.token);
        setPasscode("");
        setErrorMsg("");
      } else {
        setErrorMsg(data.message || "Invalid PIN. Access denied.");
      }
    } catch (err) {
      setErrorMsg("Authentication service unavailable. Please try again.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthToken(null);
    setPasscode("");
    try {
      sessionStorage.clear();
    } catch {
      // ignore
    }
  };

  const updateLeadStatus = async (id: string, newStatus: DbInquiry["status"]) => {
    try {
      const res = await fetch(`/api/inquire/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken ? `Bearer ${authToken}` : "",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setInquiries(inquiries.map((i) => (i.id === id ? { ...i, status: newStatus } : i)));
        showToast(`Lead status updated to "${newStatus}"`);
      }
    } catch (err) {
      console.error("Error updating lead status:", err);
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this inquiry?")) return;
    try {
      const res = await fetch(`/api/inquire/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authToken ? `Bearer ${authToken}` : "",
        },
      });
      if (res.ok) {
        setInquiries(inquiries.filter((i) => i.id !== id));
        showToast("Inquiry deleted from database.");
      }
    } catch (err) {
      console.error("Error deleting inquiry:", err);
    }
  };

  const updateBookingStatus = async (id: string, newStatus: DbBooking["status"]) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken ? `Bearer ${authToken}` : "",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setBookings(bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b)));
        showToast(`Booking marked as "${newStatus}"`);
      }
    } catch (err) {
      console.error("Error updating booking status:", err);
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to cancel and delete this booking?")) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authToken ? `Bearer ${authToken}` : "",
        },
      });
      if (res.ok) {
        setBookings(bookings.filter((b) => b.id !== id));
        showToast("Booking cancelled and slot freed.");
      }
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  // Export functions
  const exportInquiriesCSV = () => {
    if (inquiries.length === 0) return alert("No inquiries to export.");
    const headers = ["ID", "Name", "Email", "Company", "Budget", "Timeline", "Status", "Scopes", "Created At"];
    const rows = inquiries.map((i) => [
      i.id,
      `"${i.fullName.replace(/"/g, '""')}"`,
      i.email,
      `"${(i.company || "").replace(/"/g, '""')}"`,
      `"${i.budget}"`,
      `"${i.timeline}"`,
      i.status,
      `"${i.projectTypes.join("; ")}"`,
      i.createdAt,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `inquiries_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Inquiries exported to CSV!");
  };

  const exportBookingsCSV = () => {
    if (bookings.length === 0) return alert("No bookings to export.");
    const headers = ["ID", "Name", "Email", "Type", "Date", "Time", "Platform", "Status", "Notes", "Created At"];
    const rows = bookings.map((b) => [
      b.id,
      `"${b.name.replace(/"/g, '""')}"`,
      b.email,
      `"${b.type}"`,
      b.date,
      b.time,
      b.platform,
      b.status,
      `"${(b.notes || "").replace(/"/g, '""')}"`,
      b.createdAt,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `consultations_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Consultations exported to CSV!");
  };

  // Filtered queries
  const filteredInquiries = inquiries.filter((l) => {
    const matchesSearch =
      l.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.scope.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.company && l.company.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === "All" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = bookingFilter === "All" || b.status === bookingFilter;
    return matchesStatus;
  });

  // Calculate high level stats
  const newInquiriesCount = inquiries.filter((i) => i.status === "New").length;
  const bookedConsultationsCount = bookings.filter((b) => b.status === "Confirmed").length;

  if (!isAuthenticated) {
    return (
      <section className="py-12 relative flex items-center justify-center min-h-[70vh]">
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#0c0c0e] border border-zinc-800 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,255,255,0.08)]">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <Badge variant="silver" className="mb-2">Encrypted Founder Space</Badge>
            <h2 className="text-2xl font-heading font-extrabold text-white">Founder Portal</h2>
            <p className="text-xs text-zinc-400 mt-1">
              Private executive space for Sean Casalme to manage live client leads, inquiries, and consultations.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3.5">
            <div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter Security PIN"
                className="w-full px-4 py-2.5 rounded-xl bg-black border border-zinc-800 text-center text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white font-mono transition-all"
                autoFocus
              />
              {errorMsg && (
                <p className="text-xs text-red-400 mt-1.5 flex items-center justify-center gap-1 font-mono">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errorMsg}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isAuthenticating}
              icon={<Unlock className="w-4 h-4 text-black" />}
              className="w-full text-xs py-2.5 font-bold"
            >
              Verify & Enter
            </Button>
          </form>

          <p className="text-[11px] font-mono text-zinc-500">
            Protected with Rate-Limiting & Server-Side HMAC Token Authentication
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 space-y-6">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-6 right-6 z-50 p-3.5 rounded-2xl bg-zinc-900 border border-zinc-600 text-xs font-mono text-white flex items-center gap-2 shadow-2xl animate-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Top Welcome Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-[#0c0c0e] border border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-bold">
              Sean Lloyd E. Casalme • Founder & CEO Command Center
            </span>
          </div>
          <h2 className="text-2xl font-heading font-extrabold text-white mt-1 flex items-center gap-2">
            <span>Executive Client & Data Hub</span>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-700">
              Encrypted Session Active
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchDatabaseRecords}
            isLoading={isLoading}
            icon={<RefreshCw className="w-3.5 h-3.5" />}
            className="text-xs"
          >
            Sync DB
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleLogout}
            icon={<Lock className="w-3.5 h-3.5" />}
            className="text-xs"
          >
            Lock Portal
          </Button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
          <div className="text-xs text-zinc-500 font-mono flex items-center justify-between">
            <span>Total Inquiries</span>
            <Inbox className="w-3.5 h-3.5 text-zinc-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-heading">{inquiries.length}</div>
          <div className="text-[11px] font-mono text-green-400 flex items-center gap-1">
            <span>{newInquiriesCount} new / unread</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
          <div className="text-xs text-zinc-500 font-mono flex items-center justify-between">
            <span>Consultations</span>
            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-heading">{bookings.length}</div>
          <div className="text-[11px] font-mono text-zinc-300">
            {bookedConsultationsCount} confirmed upcoming
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
          <div className="text-xs text-zinc-500 font-mono flex items-center justify-between">
            <span>DB Storage</span>
            <Database className="w-3.5 h-3.5 text-zinc-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-heading">Active</div>
          <div className="text-[11px] font-mono text-zinc-400">Persistent JSON Engine</div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
          <div className="text-xs text-zinc-500 font-mono flex items-center justify-between">
            <span>Quick Export</span>
            <Download className="w-3.5 h-3.5 text-zinc-400" />
          </div>
          <div className="flex items-center gap-1.5 pt-1">
            <button
              onClick={exportInquiriesCSV}
              className="px-2 py-1 rounded-lg bg-black border border-zinc-700 text-[10px] font-mono text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
            >
              CSV Leads
            </button>
            <button
              onClick={exportBookingsCSV}
              className="px-2 py-1 rounded-lg bg-black border border-zinc-700 text-[10px] font-mono text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
            >
              CSV Bookings
            </button>
          </div>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-zinc-800 pb-3">
        {[
          { id: "leads", label: `Client Inquiries (${inquiries.length})`, icon: Inbox },
          { id: "bookings", label: `Consultations (${bookings.length})`, icon: Calendar },
          { id: "settings", label: "Platform Controls", icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeAdminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? "bg-white text-black font-bold shadow-md"
                  : "bg-zinc-900/60 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. Inquiries & Client Leads Pipeline */}
      {activeAdminTab === "leads" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search leads by name, email, company, scope..."
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-black border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white font-sans"
              />
            </div>

            {/* Status Filter Buttons */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1 mr-1">
                <Filter className="w-3 h-3" /> Status:
              </span>
              {["All", "New", "Contacted", "Proposal Sent", "Booked", "Archived"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                    statusFilter === st
                      ? "bg-white text-black font-bold"
                      : "bg-black border border-zinc-800 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {filteredInquiries.length === 0 ? (
            <div className="py-12 text-center rounded-2xl bg-zinc-900/40 border border-zinc-800 text-zinc-400 text-xs">
              No inquiries match your current filter. New submissions from the public form will appear here live!
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3.5">
              {filteredInquiries.map((lead) => (
                <div
                  key={lead.id}
                  className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all space-y-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white font-heading">{lead.fullName}</h4>
                        {lead.company && (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black text-zinc-400 border border-zinc-800">
                            {lead.company}
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-zinc-500">ID: {lead.id}</span>
                      </div>
                      <div className="text-xs text-zinc-400 font-mono mt-0.5 flex items-center gap-3">
                        <a href={`mailto:${lead.email}`} className="hover:text-white underline underline-offset-2 flex items-center gap-1">
                          <Mail className="w-3 h-3 text-zinc-500" />
                          {lead.email}
                        </a>
                        {lead.handle && <span>• {lead.handle}</span>}
                        <span>•</span>
                        <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-white bg-black px-2.5 py-1 rounded-full border border-zinc-800">
                        {lead.budget}
                      </span>
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                        className="px-2.5 py-1 rounded-full bg-zinc-800 text-white border border-zinc-700 text-xs font-mono focus:outline-none cursor-pointer"
                      >
                        <option value="New">🟢 New</option>
                        <option value="Contacted">💬 Contacted</option>
                        <option value="Proposal Sent">📄 Proposal Sent</option>
                        <option value="Booked">🏆 Booked</option>
                        <option value="Archived">📁 Archived</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/60 border border-zinc-800 text-xs text-zinc-300">
                    <span className="text-zinc-500 font-mono block mb-1">Project Scope / Requirements:</span>
                    <p className="leading-relaxed">{lead.scope}</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                      <span>Target: <strong className="text-zinc-200">{lead.timeline}</strong></span>
                      <span>•</span>
                      <span>Scopes: <strong className="text-zinc-200">{lead.projectTypes.join(", ")}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`mailto:${lead.email}?subject=Project Proposal & Architecture Consultation from Sean Casalme&body=Hi ${lead.fullName},%0D%0A%0D%0AThank you for reaching out regarding your project scope: "${lead.scope}".%0D%0A%0D%0AI have reviewed your requirements and would love to connect for a quick discussion.%0D%0A%0D%0ABest regards,%0D%0ASean Lloyd E. Casalme%0D%0AFounder & CEO, ChampZero Esports | Full-Stack Web Developer`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="primary" size="sm" icon={<Mail className="w-3.5 h-3.5 text-black" />} className="text-xs">
                          Reply via Email
                        </Button>
                      </a>

                      <a
                        href={`https://api.whatsapp.com/send?phone=639947707833&text=Hi%20${encodeURIComponent(lead.fullName)},%20this%20is%20Sean%20Casalme%20from%20ChampZero%20following%20up%20on%20your%20project%20inquiry.`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="secondary" size="sm" icon={<Phone className="w-3.5 h-3.5 text-zinc-300" />} className="text-xs">
                          WhatsApp
                        </Button>
                      </a>

                      <button
                        onClick={() => deleteLead(lead.id)}
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-900 transition-colors ml-1"
                        title="Delete from Database"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. Scheduled Consultations */}
      {activeAdminTab === "bookings" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-white font-heading">Consultation Sessions Pipeline</h3>
              <p className="text-xs text-zinc-400">Manage attendee meetings and sync with Google Meet.</p>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono text-zinc-500 mr-1">Filter:</span>
              {["All", "Confirmed", "Completed", "Rescheduled", "Cancelled"].map((st) => (
                <button
                  key={st}
                  onClick={() => setBookingFilter(st)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                    bookingFilter === st
                      ? "bg-white text-black font-bold"
                      : "bg-black border border-zinc-800 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBookings.map((b) => (
              <div key={b.id} className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black text-zinc-300 border border-zinc-700">
                      {b.type}
                    </span>
                    <h4 className="text-base font-bold text-white mt-1.5 font-heading">{b.name}</h4>
                    <p className="text-xs font-mono text-zinc-400">{b.email}</p>
                  </div>
                  <select
                    value={b.status}
                    onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                    className="px-2.5 py-1 rounded-full bg-zinc-800 text-white border border-zinc-700 text-xs font-mono focus:outline-none cursor-pointer"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Rescheduled">Rescheduled</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="p-3 rounded-xl bg-black border border-zinc-800 text-xs font-mono space-y-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Scheduled:</span>
                    <span className="text-white font-bold">{b.date} @ {b.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Platform:</span>
                    <span className="text-zinc-300">{b.platform}</span>
                  </div>
                </div>

                {b.notes && (
                  <p className="text-xs text-zinc-400 leading-relaxed italic">
                    &ldquo;{b.notes}&rdquo;
                  </p>
                )}

                <div className="pt-2 flex items-center justify-between border-t border-zinc-800">
                  <a
                    href={`mailto:${b.email}?subject=Confirmation & Google Meet link for our strategy session&body=Hi ${b.name}, looking forward to connecting!`}
                    className="text-xs text-zinc-400 hover:text-white underline font-mono"
                  >
                    Email Attendee
                  </a>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={<ExternalLink className="w-3.5 h-3.5 text-black" />}
                      onClick={() => window.open("https://meet.google.com", "_blank")}
                      className="text-xs"
                    >
                      Open Meet
                    </Button>

                    <button
                      onClick={() => deleteBooking(b.id)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-900 transition-colors"
                      title="Cancel Booking"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Platform Controls & Backups */}
      {activeAdminTab === "settings" && (
        <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-6 max-w-2xl">
          <h3 className="text-lg font-bold text-white font-heading">Platform Settings & Backups</h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-zinc-300 font-medium mb-1">Public Availability Status Banner</label>
              <input
                type="text"
                value={availabilityStatus}
                onChange={(e) => setAvailabilityStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-zinc-800 text-white focus:outline-none focus:border-white font-sans"
              />
              <p className="text-[11px] text-zinc-500 mt-1">Live status pill shown to prospective clients on your website.</p>
            </div>

            <div>
              <label className="block text-zinc-300 font-medium mb-1">One-Click Database Export</label>
              <div className="flex items-center gap-3 pt-1">
                <Button variant="outline" size="sm" onClick={exportInquiriesCSV} icon={<Download className="w-3.5 h-3.5" />}>
                  Download Inquiries (CSV)
                </Button>
                <Button variant="outline" size="sm" onClick={exportBookingsCSV} icon={<Download className="w-3.5 h-3.5" />}>
                  Download Consultations (CSV)
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-zinc-300 font-medium mb-1">Owner Contact Routing Summary</label>
              <div className="p-3.5 rounded-xl bg-black border border-zinc-800 space-y-1 font-mono text-zinc-300">
                <p>Email: {PROFILE_DATA.email}</p>
                <p>WhatsApp: {PROFILE_DATA.phone}</p>
                <p>Personal Facebook: {PROFILE_DATA.facebookUrl}</p>
                <p>ChampZero Org: {PROFILE_DATA.champzeroOrgUrl}</p>
                <p>ChampZero Ent Prod FB: {PROFILE_DATA.champzeroEntProdFb}</p>
                <p>ChampZero Ent Prod IG: {PROFILE_DATA.champzeroEntProdIg}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
