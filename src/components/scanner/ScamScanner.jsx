"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Search, 
  Upload, 
  Send, 
  RotateCcw, 
  Sparkles, 
  Lock, 
  X, 
  FileCheck, 
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Image as ImageIcon
} from "lucide-react";

export default function ScamScanner({ onAnalyze, isLoading, error }) {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null); // { base64, mimeType, name, size }
  const [detectedType, setDetectedType] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  // Smart input detection
  useEffect(() => {
    const trimmed = content.trim();
    if (!trimmed) {
      setDetectedType(null);
      return;
    }

    if (/^https?:\/\/[^\s]+$/i.test(trimmed) || /^[a-zA-Z0-9-]+\.(com|in|org|net|xyz|top|site|app|live|click)(\/[^\s]*)?$/i.test(trimmed)) {
      setDetectedType("Link / URL Detected");
    } else if (/^(\+91[\-\s]?)?[6-9]\d{9}$/.test(trimmed.replace(/\s+/g, ""))) {
      setDetectedType("Phone Number Detected");
    } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setDetectedType("Email Detected");
    } else if (trimmed.length > 80) {
      setDetectedType("Message / Situation Detected");
    } else {
      setDetectedType(null);
    }
  }, [content]);

  // File reading logic
  const processFile = (file) => {
    if (!file) return;

    const validMimes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!validMimes.includes(file.type.toLowerCase())) {
      alert("Unsupported format. Please upload PNG, JPG, or WEBP.");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      alert("Image exceeds 8MB. Please select a smaller screenshot.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      const formattedSize = file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
        : `${(file.size / 1024).toFixed(1)} KB`;

      setImageFile({
        base64,
        mimeType: file.type || "image/jpeg",
        name: file.name || "screenshot.png",
        size: formattedSize,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Clipboard paste listener (<kbd>Ctrl+V</kbd>)
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            processFile(file);
            break;
          }
        }
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!content.trim() && !imageFile) return;

    onAnalyze({
      content: content.trim(),
      imageBase64: imageFile?.base64 || null,
      mimeType: imageFile?.mimeType || "image/jpeg",
      inputType: imageFile ? "screenshot" : detectedType || "auto",
    });
  };

  const handleClear = () => {
    setContent("");
    setImageFile(null);
    setDetectedType(null);
  };

  // Sample scenarios for 1-click test (ECC & gstack test cases)
  const sampleScenarios = [
    {
      title: "⚡ Electricity Cutoff",
      tag: "Urgent Extortion",
      color: "border-red-300 dark:border-red-900/60 text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/40",
      text: "Dear Consumer, your electricity power will be disconnected tonight at 9:30 PM from UPPCL power station because previous bill was not updated. Immediately call power officer at 9876543210 or install UPPCL_QuickPay.apk from bit.ly/uppcl-pay",
    },
    {
      title: "👮 CBI Digital Arrest",
      tag: "Police Extortion",
      color: "border-red-300 dark:border-red-900/60 text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/40",
      text: "URGENT NOTICE: CBI and Customs have seized an illegal parcel containing narcotics registered under your Aadhaar. Join Skype video interrogation immediately or non-bailable warrant will be executed.",
    },
    {
      title: "🎁 GooglePay ₹5000 Cashback",
      tag: "Prize Phishing",
      color: "border-amber-300 dark:border-amber-900/60 text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40",
      text: "Congratulations! You won free Rs 5000 cashback reward from GooglePay. Claim your instant UPI prize money now at http://gpay-rewards-claim.xyz/bonus",
    },
    {
      title: "💳 PhonePe ₹2999 Refund PIN Trap",
      tag: "UPI Collect Scam",
      color: "border-amber-300 dark:border-amber-900/60 text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40",
      text: "Dear Customer, you received a pending refund of Rs 2,999 from PhonePe. To receive money into your bank, accept collect request from refund.desk@okaxis and enter your UPI PIN. For support call +91 9123456780 or visit http://phonepe-refund-claim.site",
    },
    {
      title: "🏦 SBI NetBanking KYC Freeze",
      tag: "Banking Phishing",
      color: "border-red-300 dark:border-red-900/60 text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/40",
      text: "SBI Alert: Your NetBanking account will be blocked within 24 hours due to pending PAN card verification. Click here to verify your Aadhaar immediately: https://sbi-kyc-verify-portal.in",
    },
    {
      title: "📦 Amazon Package Delivery",
      tag: "Safe Notice",
      color: "border-emerald-300 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40",
      text: "Your Amazon.in package with tracking ID 403-1294821-39210 will be delivered today by our courier partner. Track your parcel at https://amazon.in/orders.",
    },
  ];

  const handleSelectPreset = (sample) => {
    setImageFile(null);
    setContent(sample.text);
    onAnalyze({
      content: sample.text,
      imageBase64: null,
      mimeType: "image/jpeg",
      inputType: "auto",
    });
  };

  return (
    <div id="scanner" className="w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto space-y-4 sm:space-y-6 scroll-mt-24 px-1 sm:px-4">
      {/* ECC AgentShield & CSO Architecture Indicator */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 py-1 px-3 sm:px-4 rounded-full bg-surface-elevated/70 border border-border w-fit mx-auto text-[10px] sm:text-[11px] text-text-muted shadow-subtle flex-wrap">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
        <span className="font-semibold text-text-primary">AgentShield v2.4</span>
        <span>•</span>
        <span className="hidden xs:inline">Prompt Guard</span>
        <span className="hidden xs:inline">•</span>
        <span className="font-mono text-[10px] text-accent">NIST P-256 ECC</span>
      </div>

      {/* Scamwise Floating Scanner Icon (Magnifying Glass with Glow Halo) */}
      <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto rounded-2xl sm:rounded-3xl bg-gradient-to-br from-accent/15 via-accent/5 to-surface-elevated border border-accent/20 flex items-center justify-center shadow-elevated relative group transition-transform hover:scale-105 duration-300">
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-accent/10 blur-xl pointer-events-none group-hover:bg-accent/20 transition-all" />
        <Search className="w-7 h-7 sm:w-10 sm:h-10 text-accent relative z-10" strokeWidth={2.2} />
      </div>

      {/* Main Headline Hierarchy (Proportioned for Mobile & Laptop) */}
      <div className="space-y-1 sm:space-y-2 text-center max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-text-primary leading-[1.15]">
          <span>Is this a scam?</span> <br />
          <span className="text-accent">Run a quick check.</span>
        </h1>
        <p className="text-xs sm:text-base font-bold text-text-secondary pt-0.5">
          Free • No sign up required • 100% Private
        </p>
        <p className="text-[11px] sm:text-sm text-text-muted leading-relaxed max-w-lg mx-auto px-2">
          Paste text, upload an image or screenshot, describe the situation, or check unverified links &amp; phone numbers.
        </p>
      </div>

      {/* Central Capsule Form (Expansive on Laptop, Fluid on Mobile) */}
      <form onSubmit={handleSubmit} className="w-full space-y-3 pt-1 max-w-2xl lg:max-w-3xl mx-auto">
        {/* Hidden file input with sr-only for universal mobile compatibility */}
        <input
          id="scanner-file-input"
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/jpg"
          className="sr-only"
          onChange={handleFileChange}
        />

        {/* 1. Large Upload Button (Native Label Trigger - 100% iOS/Android Safari/Chrome Compatible) */}
        {!imageFile ? (
          <label
            htmlFor="scanner-file-input"
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files?.[0]; if (f) processFile(f); }}
            className={`flex h-12 sm:h-14 w-full cursor-pointer items-center justify-center gap-2 sm:gap-2.5 rounded-2xl sm:rounded-full font-bold text-xs sm:text-base text-white shadow-card transition-all active:scale-[0.99] select-none ${
              isDragging
                ? "bg-accent-hover ring-4 ring-accent/30"
                : "bg-accent hover:bg-accent-hover"
            }`}
          >
            <Upload className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span>Upload image or screenshot</span>
          </label>
        ) : (
          /* Uploaded Preview Pill */
          <div className="p-3 bg-surface border border-accent/40 rounded-2xl flex items-center justify-between shadow-subtle animate-fadeIn">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-border bg-surface-elevated flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageFile.base64}
                  alt="Screenshot preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="truncate text-left">
                <p className="text-xs font-bold text-text-primary truncate">
                  {imageFile.name}
                </p>
                <p className="text-[11px] text-accent font-semibold flex items-center gap-1">
                  <FileCheck className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                  <span className="truncate">Ready for OCR &amp; Inspection ({imageFile.size})</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <label
                htmlFor="scanner-file-input"
                className="p-1.5 rounded-lg text-text-muted hover:text-text-primary text-xs flex items-center gap-1 cursor-pointer"
                title="Replace image"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Change</span>
              </label>
              <button
                type="button"
                onClick={() => setImageFile(null)}
                className="p-1.5 rounded-lg text-text-muted hover:text-red-600 transition-colors"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 2. Textarea Capsule (Scamwise Pill Input Container) */}
        <div className="relative flex flex-col rounded-2xl sm:rounded-3xl border-2 border-border bg-surface focus-within:border-accent shadow-subtle transition-all duration-200 overflow-hidden">
          <textarea
            ref={textareaRef}
            rows={content.length > 50 || content.includes("\n") ? 3 : 2}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isLoading}
            placeholder="Paste text/link/phone or tell us the situation"
            className="w-full resize-none bg-transparent px-4 sm:px-5 py-3 sm:py-4 text-[16px] sm:text-base text-text-primary placeholder:text-text-muted outline-none transition-all text-left font-sans min-h-[64px] sm:min-h-[80px]"
          />

          {/* Auto-detect badge */}
          {detectedType && (
            <div className="px-4 pb-2.5 flex items-center justify-between text-[11px] text-accent font-medium border-t border-border/40 pt-1.5 bg-surface-elevated/20">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-accent flex-shrink-0" />
                <span>{detectedType}</span>
              </span>
              <span className="text-text-muted text-[10px]">
                {content.length} characters
              </span>
            </div>
          )}
        </div>

        {/* 3. Submit Button (Always accessible, clear state indication) */}
        <div className="flex items-center gap-2 pt-1 animate-fadeIn">
          <button
            type="submit"
            disabled={isLoading || (!content.trim() && !imageFile)}
            className={`flex h-12 sm:h-14 w-full items-center justify-center gap-2 rounded-2xl sm:rounded-full font-bold text-sm sm:text-base transition-all shadow-card cursor-pointer ${
              content.trim() || imageFile
                ? "bg-text-primary text-background hover:opacity-90 active:scale-[0.99]"
                : "bg-surface-elevated text-text-muted border border-border cursor-not-allowed opacity-75"
            }`}
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-accent" />
                <span>Checking for scam signals...</span>
              </>
            ) : content.trim() || imageFile ? (
              <>
                <span>Submit for Second Opinion</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Enter details above or tap a preset below</span>
              </>
            )}
          </button>

          {(content.trim() || imageFile) && (
            <button
              type="button"
              onClick={handleClear}
              disabled={isLoading}
              title="Clear input"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl sm:rounded-full border border-border bg-surface text-text-muted hover:text-text-primary flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Error notification */}
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs text-left">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Helper sub-pills */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-text-muted pt-1 flex-wrap">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent" />
            <span>Stateless DPDP Privacy</span>
          </span>
          <span>•</span>
          <a href="#how-it-works" className="hover:text-text-primary hover:underline">
            How it works
          </a>
          <span>•</span>
          <a href="tel:1930" className="text-red-600 dark:text-red-400 font-semibold hover:underline">
            1930 Helpline
          </a>
        </div>
      </form>

      {/* 4. Realistic 1-Click Test Scenarios (Dual Layout: Responsive Grid on Laptop, Swipeable Thumb Carousel on Mobile) */}
      <div className="pt-2 sm:pt-4">
        <div className="flex flex-col items-center gap-2.5 max-w-4xl mx-auto">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Interactive 1-Click Triage Presets:</span>
          </div>

          {/* Desktop / Laptop Layout: 3-column Grid */}
          <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-2.5 w-full">
            {sampleScenarios.map((s) => (
              <button
                key={s.title}
                type="button"
                onClick={() => handleSelectPreset(s)}
                className={`min-h-[46px] text-xs px-3.5 py-2.5 rounded-2xl border transition-all shadow-subtle active:scale-95 flex items-center justify-between gap-2 font-semibold ${s.color} hover:brightness-105 cursor-pointer text-left`}
              >
                <span className="truncate">{s.title}</span>
                <span className="text-[10px] opacity-80 font-normal flex-shrink-0">({s.tag})</span>
              </button>
            ))}
          </div>

          {/* Mobile Phone Layout: Thumb-Friendly Horizontal Swipeable Row */}
          <div className="sm:hidden w-full flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-1 snap-x snap-mandatory">
            {sampleScenarios.map((s) => (
              <button
                key={s.title}
                type="button"
                onClick={() => handleSelectPreset(s)}
                className={`min-h-[44px] text-xs px-3.5 py-2 rounded-2xl border transition-all shadow-subtle active:scale-95 flex items-center gap-1.5 font-semibold ${s.color} flex-shrink-0 snap-center`}
              >
                <span>{s.title}</span>
                <span className="text-[10px] opacity-75 font-normal">({s.tag})</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
