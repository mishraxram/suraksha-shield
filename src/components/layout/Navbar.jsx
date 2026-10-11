"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, PhoneCall, Sun, Moon, Menu, X, ArrowRight, Languages, Share2, Check } from "lucide-react";

export default function Navbar({ langMode = "en", setLangMode }) {
  const [theme, setTheme] = useState("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shared, setShared] = useState(false);

  const handleShareApp = () => {
    const url = typeof window !== "undefined" ? window.location.href : "https://suraksha-shield.vercel.app";
    const title = langMode === "hi"
      ? "सुरक्षाशील्ड — साइबर फ्रॉड और संदिग्ध मैसेज चेकर"
      : "SurakshaShield — Check Suspicious Messages, Links & Digital Threats";
    const text = langMode === "hi"
      ? "🚨 किसी भी अनजान लिंक, बिजली बिल, या डिजिटल अरेस्ट धमकी से बचने के लिए इसे चेक करें:"
      : "🚨 Free instant scam triage and cyber defense for Indian citizens. Verify any suspicious message, link or call:";

    if (navigator.share) {
      navigator.share({ title, text, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text} ${url}`);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("suraksha_theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("suraksha_theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("suraksha_theme", "light");
    }
  };

  const navLinks = [
    { label: "Scan", href: "#scanner" },
    { label: "Threats", href: "#threats" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Family Guide", href: "#family-safety" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-accent text-white flex items-center justify-center shadow-subtle group-hover:bg-accent-hover transition-colors">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm sm:text-lg tracking-tight text-text-primary">
                Suraksha<span className="text-accent">Shield</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.2 rounded bg-accent-subtle text-accent border border-accent/20">
                AI
              </span>
            </div>
            <span className="text-[10px] text-text-muted hidden md:inline -mt-0.5">
              Consumer Scam &amp; Threat Intelligence
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-medium text-text-secondary">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-text-primary transition-colors hover:underline underline-offset-8 decoration-accent/50"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Emergency 1930 Helpline (Desktop / Tablet) */}
          <a
            href="tel:1930"
            title="National Cyber Crime Helpline"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 text-xs font-semibold hover:bg-red-100 dark:hover:bg-red-950/70 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-red-600 animate-pulse" />
            <span className="hidden lg:inline">1930 Helpline</span>
            <span className="lg:hidden">1930</span>
          </a>

          {/* Language Switcher Button (Compact on Mobile, Full on PC) */}
          {setLangMode && (
            <div className="flex items-center p-0.5 rounded-xl bg-surface border border-border text-[11px] sm:text-xs font-semibold shadow-subtle">
              <button
                type="button"
                onClick={() => setLangMode("en")}
                className={`px-2 sm:px-2.5 py-1 rounded-lg transition-all ${
                  langMode === "en"
                    ? "bg-accent text-white shadow-sm font-bold"
                    : "text-text-muted hover:text-text-primary"
                }`}
                title="English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLangMode("hi")}
                className={`px-2 sm:px-2.5 py-1 rounded-lg transition-all ${
                  langMode === "hi"
                    ? "bg-accent text-white shadow-sm font-bold"
                    : "text-text-muted hover:text-text-primary"
                }`}
                title="हिंदी"
              >
                हिं
              </button>
            </div>
          )}

          {/* Share App with Friends & Family */}
          <button
            type="button"
            onClick={handleShareApp}
            className="inline-flex items-center justify-center gap-1.5 w-8 h-8 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 rounded-xl border border-border bg-surface text-xs font-semibold text-text-primary hover:bg-surface-elevated transition-all shadow-subtle cursor-pointer active:scale-95"
            title="Share SurakshaShield"
          >
            {shared ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline text-emerald-600 font-bold">{langMode === "hi" ? "कॉपी हुआ!" : "Copied!"}</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-accent" />
                <span className="hidden sm:inline">{langMode === "hi" ? "शेयर" : "Share"}</span>
              </>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-border bg-surface flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-text-muted transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-secondary" />
            )}
          </button>

          {/* Primary CTA (Desktop only) */}
          <a
            href="#scanner"
            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-accent text-white text-xs font-medium hover:bg-accent-hover transition-colors shadow-subtle"
          >
            <span>{langMode === "hi" ? "स्कैन करें" : "Check Something"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden w-8 h-8 rounded-xl border border-border bg-surface flex items-center justify-center text-text-secondary hover:text-text-primary"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-surface px-4 py-4 space-y-3 animate-fadeIn">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-text-secondary">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-surface-elevated hover:text-text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-border flex items-center justify-between flex-wrap gap-2">
            {setLangMode && (
              <div className="flex items-center p-0.5 rounded-xl bg-surface-elevated border border-border text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setLangMode("en")}
                  className={`px-3 py-1 rounded-lg ${langMode === "en" ? "bg-accent text-white font-bold" : "text-text-muted"}`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLangMode("hi")}
                  className={`px-3 py-1 rounded-lg ${langMode === "hi" ? "bg-accent text-white font-bold" : "text-text-muted"}`}
                >
                  हिंदी
                </button>
              </div>
            )}
            <a
              href="tel:1930"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 text-xs font-semibold"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-600" />
              <span>1930 Helpline</span>
            </a>
            <a
              href="#scanner"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-1.5 rounded-lg bg-accent text-white text-xs font-medium"
            >
              Start Scan
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
