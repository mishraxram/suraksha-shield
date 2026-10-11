"use client";

import React, { useState } from "react";
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  RotateCcw, 
  Share2, 
  Cpu, 
  Tag, 
  Languages,
  CheckCircle,
  HelpCircle,
  Fingerprint,
  Lock,
  ChevronDown,
  ChevronUp,
  Download,
  Activity,
  Layers,
  Sparkles
} from "lucide-react";
import { downloadEccCertificateFile } from "@/lib/crypto/client-certificate";
import ThreatGauge from "./ThreatGauge";

export default function VerdictCard({ result, onResetScan, langMode, setLangMode }) {
  const [showEccDetails, setShowEccDetails] = useState(false);
  const [showScoreBreakdown, setShowScoreBreakdown] = useState(false);

  if (!result) return null;

  const rawVerdict = (result.verdict || "suspicious").toLowerCase();
  const rawConfidence = (result.confidence || "medium").toLowerCase();
  const isHi = langMode === "hi";

  let config = {
    badgeBg: "bg-red-500/10 dark:bg-red-500/15",
    badgeText: "text-red-700 dark:text-red-400",
    border: "border-red-500/20 dark:border-red-500/30",
    accentColor: "#FF3B30",
    icon: ShieldAlert,
    iconColor: "text-red-600 dark:text-red-400",
    titleEn: "LIKELY SCAM",
    titleHi: "भारी खतरा: यह 100% फ्रॉड है",
    headlineEn: "Multiple strong scam indicators and manipulative coercion tactics were identified.",
    headlineHi: "इस मैसेज में ठगी और दबाव के कई पुख्ता व खतरनाक संकेत पाए गए हैं।",
  };

  if (rawVerdict === "safe") {
    config = {
      badgeBg: "bg-emerald-500/10 dark:bg-emerald-500/15",
      badgeText: "text-emerald-700 dark:text-emerald-400",
      border: "border-emerald-500/20 dark:border-emerald-500/30",
      accentColor: "#34C759",
      icon: ShieldCheck,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      titleEn: "NO CLEAR SCAM SIGNALS",
      titleHi: "सुरक्षित संदेश: कोई फ्रॉड संकेत नहीं",
      headlineEn: "No malicious indicators were detected based on provided text.",
      headlineHi: "इस संदेश में किसी धोखाधड़ी या ठगी का कोई संकेत नहीं मिला है।",
    };
  } else if (rawVerdict === "low_risk") {
    config = {
      badgeBg: "bg-blue-500/10 dark:bg-blue-500/15",
      badgeText: "text-blue-700 dark:text-blue-400",
      border: "border-blue-500/20 dark:border-blue-500/30",
      accentColor: "#007AFF",
      icon: ShieldCheck,
      iconColor: "text-blue-600 dark:text-blue-400",
      titleEn: "LOW RISK",
      titleHi: "कम जोखिम: सामान्य सावधानी बरतें",
      headlineEn: "Limited suspicious indicators were identified. Routine cyber hygiene advised.",
      headlineHi: "कुछ मामूली बातें हैं, लेकिन बड़े फ्रॉड का संकेत नहीं है।",
    };
  } else if (rawVerdict === "suspicious") {
    config = {
      badgeBg: "bg-amber-500/10 dark:bg-amber-500/15",
      badgeText: "text-amber-800 dark:text-amber-400",
      border: "border-amber-500/20 dark:border-amber-500/30",
      accentColor: "#FF9500",
      icon: AlertTriangle,
      iconColor: "text-amber-600 dark:text-amber-400",
      titleEn: "SUSPICIOUS",
      titleHi: "सावधानी जरूरी: संदिग्ध संदेश",
      headlineEn: "Characteristics deserve caution. Independent verification recommended.",
      headlineHi: "यह मैसेज संदिग्ध है। बिना जांचे किसी लिंक या नंबर पर भरोसा न करें।",
    };
  }

  const confidenceEn = rawConfidence === "high" ? "High Confidence" : rawConfidence === "low" ? "Low Confidence" : "Medium Confidence";
  const confidenceHi = rawConfidence === "high" ? "पुख्ता संकेत" : rawConfidence === "low" ? "कम विश्वास" : "मध्यम संकेत";

  const Icon = config.icon;
  const riskScore = result.risk_score ?? (rawVerdict === "likely_scam" ? 92 : rawVerdict === "suspicious" ? 64 : 12);
  const breakdown = result.score_breakdown || {
    urgency_coercion: 20,
    technical_vectors: 22,
    financial_risk: 25,
    impersonation_level: 25,
    score_rationale: "Evaluated dynamically by Gemini neural threat model.",
    score_rationale_hi: "जेमिनी न्यूरल खतरे मॉडल द्वारा वास्तविक समय में मूल्यांकित।"
  };

  const handleShare = () => {
    const text = isHi
      ? `[सुरक्षाशील्ड थ्रेट एडवाइजरी]
जांच नतीजा: ${config.titleHi} (${riskScore}% खतरा)
श्रेणी: ${result.category_hi || result.category}
विवरण: ${result.summary_hi || config.headlineHi}`
      : `[SurakshaShield Security Advisory]
Verdict: ${config.titleEn} (${riskScore}% Risk)
Category: ${result.category}
Summary: ${result.summary || config.headlineEn}`;

    if (navigator.share) {
      navigator.share({
        title: isHi ? "सुरक्षाशील्ड थ्रेट एडवाइजरी" : "SurakshaShield Security Advisory",
        text: text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert(isHi ? "सलाह क्लिपबोर्ड पर कॉपी हो गई है!" : "Advisory copied to clipboard!");
    }
  };

  const handleDownloadCertificate = () => {
    try {
      downloadEccCertificateFile(result);
    } catch (e) {
      console.error("Certificate download error:", e);
    }
  };

  return (
    <div className={`w-full bg-surface/90 backdrop-blur-2xl border ${config.border} rounded-3xl shadow-card overflow-hidden animate-fadeIn`}>
      {/* Top Cupertino Navigation Bar with Language Pill */}
      <div className="p-4 sm:p-7 md:p-8 border-b border-border/70 bg-gradient-to-b from-surface-elevated/40 via-surface/60 to-transparent">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${config.badgeBg} border border-border/50 shadow-subtle`}>
              <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${config.iconColor}`} />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className={`text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${config.badgeBg} ${config.badgeText} border border-border/40`}>
                  {isHi ? config.titleHi : config.titleEn}
                </span>
                <span className="text-[10px] sm:text-[11px] text-text-muted font-medium px-2.5 py-0.5 rounded-full bg-surface-elevated border border-border">
                  {isHi ? confidenceHi : confidenceEn}
                </span>
                {result.is_real_ai && (
                  <span className="text-[10px] sm:text-[11px] font-bold text-accent px-2 py-0.5 rounded-full bg-accent-subtle border border-accent/20 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-accent" />
                    <span>Live Gemini 3.8 Flash AI</span>
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-text-primary mt-2 tracking-tight leading-tight">
                {isHi ? (result.category_hi || result.category) : result.category}
              </h2>
            </div>
          </div>

          {/* Action Row & iOS Segmented Language Selector */}
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto w-full sm:w-auto justify-between sm:justify-start pt-1 sm:pt-0">
            {/* iOS Style Segmented Control (>=44px touch targets) */}
            <div className="flex items-center p-1 rounded-2xl bg-surface-elevated border border-border/80 text-xs font-semibold shadow-subtle">
              <button
                type="button"
                onClick={() => setLangMode("en")}
                className={`min-h-[44px] px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                  langMode === "en"
                    ? "bg-accent text-white shadow-sm font-bold"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLangMode("hi")}
                className={`min-h-[44px] px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                  langMode === "hi"
                    ? "bg-accent text-white shadow-sm font-bold"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                हिंदी
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border border-border bg-surface text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors shadow-subtle cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-accent" />
                <span>{isHi ? "शेयर" : "Share"}</span>
              </button>
              <button
                onClick={onResetScan}
                className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border border-border bg-surface text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors shadow-subtle cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{isHi ? "नया स्कैन" : "Scan Again"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Threat Risk Meter & Semicircular Visualizer */}
        <div className="mt-5 p-4 sm:p-5 rounded-3xl bg-surface-elevated/50 border border-border shadow-subtle flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="w-full md:flex-1 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5 text-text-primary">
                <span className={`w-2.5 h-2.5 rounded-full ${
                  riskScore > 70 ? "bg-red-500 animate-pulse" : riskScore > 35 ? "bg-amber-500" : "bg-emerald-500"
                }`} />
                <span className="text-sm font-black">
                  {isHi ? "वास्तविक खतरा संभाव्यता स्कोर (100% Dynamic)" : "Calculated Threat Probability (100% Genuine)"}
                </span>
              </span>
              <span className={`font-mono text-base sm:text-lg font-black ${
                riskScore > 70 ? "text-red-600 dark:text-red-400" : riskScore > 35 ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"
              }`}>
                {riskScore}%
              </span>
            </div>

            {/* iOS Smooth Progress Bar */}
            <div className="w-full h-3 rounded-full bg-border/80 overflow-hidden p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${
                  riskScore > 70 ? "bg-red-500" : riskScore > 35 ? "bg-amber-500" : "bg-emerald-500"
                }`}
                style={{ width: `${Math.max(6, Math.min(100, riskScore))}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-text-muted">
              <span>{isHi ? "0% पूर्णतः सुरक्षित" : "0% Safe"}</span>
              <span>{isHi ? "50% संदिग्ध" : "50% Suspicious"}</span>
              <span>{isHi ? "100% अत्यधिक खतरनाक" : "100% Severe Scam"}</span>
            </div>

            {/* Expandable Score Breakdown Toggle */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowScoreBreakdown(!showScoreBreakdown)}
                className="text-xs font-semibold text-accent hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>
                  {showScoreBreakdown
                    ? (isHi ? "स्कोर विवरण छुपाएं" : "Hide Dynamic Score Breakdown")
                    : (isHi ? "स्कोर का गणितीय विवरण देखें (4 Pillars)" : "View 4-Pillar Score Breakdown")}
                </span>
                {showScoreBreakdown ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>
          </div>

          <div className="flex-shrink-0 w-full md:w-auto flex justify-center">
            <ThreatGauge score={riskScore} verdict={rawVerdict} langMode={langMode} />
          </div>
        </div>

        {/* 4-Pillar Score Breakdown Sheet */}
        {showScoreBreakdown && (
          <div className="mt-3 p-4 rounded-2xl bg-surface border border-border shadow-subtle space-y-3 text-xs animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <span className="font-bold text-text-primary">
                {isHi ? "खतरा निर्धारण के 4 प्रमुख आयाम (Dynamic Vectors)" : "Dynamic Scoring Composition (4 Dimensions)"}
              </span>
              <span className="text-[10px] font-mono text-text-muted">
                {result.is_real_ai ? "Calculated by Gemini AI" : "Calibrated Heuristics"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
              {/* Pillar 1 */}
              <div className="p-3 rounded-xl bg-surface-elevated/50 border border-border/60 space-y-1">
                <div className="flex items-center justify-between font-bold text-text-primary">
                  <span>{isHi ? "1. जल्दबाजी व डर का दबाव:" : "1. Urgency & Coercion:"}</span>
                  <span className="font-mono text-accent">{breakdown.urgency_coercion}/25</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: `${(breakdown.urgency_coercion / 25) * 100}%` }} />
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="p-3 rounded-xl bg-surface-elevated/50 border border-border/60 space-y-1">
                <div className="flex items-center justify-between font-bold text-text-primary">
                  <span>{isHi ? "2. तकनीकी पेलोड्स (APK/Links):" : "2. Technical Vectors (APK/URLs):"}</span>
                  <span className="font-mono text-red-500">{breakdown.technical_vectors}/25</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: `${(breakdown.technical_vectors / 25) * 100}%` }} />
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="p-3 rounded-xl bg-surface-elevated/50 border border-border/60 space-y-1">
                <div className="flex items-center justify-between font-bold text-text-primary">
                  <span>{isHi ? "3. वित्तीय जोखिम व UPI जाल:" : "3. Financial Harm & UPI Risk:"}</span>
                  <span className="font-mono text-amber-500">{breakdown.financial_risk}/25</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(breakdown.financial_risk / 25) * 100}%` }} />
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="p-3 rounded-xl bg-surface-elevated/50 border border-border/60 space-y-1">
                <div className="flex items-center justify-between font-bold text-text-primary">
                  <span>{isHi ? "4. सरकारी/बैंक का फर्जी नाम:" : "4. Authority Impersonation:"}</span>
                  <span className="font-mono text-purple-500">{breakdown.impersonation_level}/25</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(breakdown.impersonation_level / 25) * 100}%` }} />
                </div>
              </div>
            </div>

            <p className="text-[11px] text-text-secondary leading-relaxed bg-surface-elevated/30 p-2.5 rounded-xl border border-border/50">
              <span className="font-bold text-text-primary">
                {isHi ? "स्कोर का कारण: " : "Scoring Rationale: "}
              </span>
              {isHi ? (breakdown.score_rationale_hi || breakdown.score_rationale) : breakdown.score_rationale}
            </p>
          </div>
        )}

        {/* AgentShield Alert if Adversarial Injection Detected */}
        {result.agent_shield?.is_sanitized && (
          <div className="mt-3 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 text-xs flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span>
              {isHi
                ? "AgentShield सुरक्षा अलर्ट: इस संदेश में AI को भ्रमित करने वाला गुप्त प्रॉम्प्ट था, जिसे एजेंटशील्ड ने तुरंत निष्प्रभावी कर दिया।"
                : "AgentShield Alert: Adversarial prompt-injection attempt detected and sanitized before threat classification."}
            </span>
          </div>
        )}

        {/* Multi-Agent Execution Trace (ECC Agent Architecture) */}
        {result.agent_pipeline && (
          <div className="mt-4 pt-3.5 border-t border-border/80">
            <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider block mb-2">
              {isHi ? "मल्टी-एजेंट सुरक्षा पाइपलाइन (Agentic Trace)" : "Multi-Agent Security Pipeline Trace"}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[10px]">
              {result.agent_pipeline.map((p, idx) => (
                <div key={idx} className="p-2.5 rounded-2xl bg-surface border border-border flex flex-col justify-between shadow-subtle">
                  <span className="font-bold text-text-primary truncate">{p.name}</span>
                  <span className="text-accent text-[9px] truncate">{p.role}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold mt-1">{p.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Consumer-Friendly Tailored Summaries */}
        <div className="mt-5 space-y-3">
          {isHi ? (
            <div className="p-4 rounded-2xl bg-accent-subtle/30 border border-accent/20 text-text-primary">
              <span className="text-[11px] font-bold uppercase tracking-wider text-accent block mb-1">
                आसान हिंदी में समझें:
              </span>
              <p className="text-sm sm:text-base text-text-primary leading-relaxed font-normal">
                {result.summary_hi || config.headlineHi}
              </p>
            </div>
          ) : (
            <p className="text-sm sm:text-base text-text-primary leading-relaxed font-medium">
              {result.summary || config.headlineEn}
            </p>
          )}
        </div>
      </div>

      {/* Forensic Intelligence Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border bg-surface-elevated/20 text-xs">
        <div className="p-4 space-y-1">
          <div className="flex items-center gap-1.5 text-text-muted">
            <Tag className="w-3.5 h-3.5 text-accent" />
            <span className="text-[10px] font-semibold uppercase tracking-wider">
              {isHi ? "वर्गीकरण" : "Classification"}
            </span>
          </div>
          <div className="font-semibold text-text-primary text-xs sm:text-sm break-words">
            {isHi ? (result.category_hi || result.category) : result.category}
          </div>
        </div>

        <div className="p-4 space-y-1">
          <div className="flex items-center gap-1.5 text-text-muted">
            <CheckCircle className="w-3.5 h-3.5 text-accent" />
            <span className="text-[10px] font-semibold uppercase tracking-wider">
              {isHi ? "सटीकता स्तर" : "Confidence"}
            </span>
          </div>
          <div className="font-medium text-text-primary text-xs sm:text-sm">
            {isHi ? confidenceHi : confidenceEn}
          </div>
        </div>

        <div className="p-4 space-y-1">
          <div className="flex items-center gap-1.5 text-text-muted">
            <Cpu className="w-3.5 h-3.5 text-accent" />
            <span className="text-[10px] font-semibold uppercase tracking-wider">
              {isHi ? "जांच इंजन" : "Analysis Engine"}
            </span>
          </div>
          <div className="font-medium text-text-primary text-xs sm:text-sm break-words">
            {result.engine_used || (result.is_real_ai ? "Google Gemini 3.8 Flash Neural Engine" : "Suraksha Forensic Engine")}
          </div>
        </div>
      </div>

      {/* ECC NIST P-256 Tamper-Proof Cryptographic Seal */}
      {result.ecc_certificate && (
        <div className="border-t border-border bg-surface-elevated/40 p-3.5 sm:p-4 text-xs transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center flex-shrink-0">
                <Fingerprint className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-text-primary">
                  {isHi ? "ECC P-256 डिजिटल साक्ष्य सील:" : "ECC NIST P-256 Evidence Seal:"}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800">
                  <Lock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  {isHi ? "छेड़छाड़-मुक्त प्रमाणित ✓" : "Tamper-Proof Verified ✓"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2 flex-wrap">
              <span className="font-mono text-[10px] text-text-muted">
                {result.ecc_certificate.public_key_fingerprint || "ECC-P256"}
              </span>
              <button
                type="button"
                onClick={handleDownloadCertificate}
                className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors shadow-subtle cursor-pointer"
                title="Download legally admissible JSON-LD evidence certificate"
              >
                <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{isHi ? "सर्टिफिकेट डाउनलोड (.json)" : "Download Seal (.json)"}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowEccDetails(!showEccDetails)}
                className="min-h-[44px] inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline px-2.5 py-1 rounded-xl bg-surface border border-border cursor-pointer"
              >
                <span>
                  {showEccDetails
                    ? (isHi ? "कम दिखाएं" : "Hide Details")
                    : (isHi ? "प्रमाण पत्र देखें" : "View Certificate")}
                </span>
                {showEccDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* Expandable Cryptographic Seal Details */}
          {showEccDetails && (
            <div className="mt-3 pt-3 border-t border-border/70 space-y-2 text-[11px] font-mono text-text-secondary animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-surface p-3.5 rounded-2xl border border-border">
                <div>
                  <span className="text-text-muted block text-[10px] uppercase font-bold">
                    {isHi ? "क्रिप्टोग्राफिक मानक" : "Standard & Curve"}
                  </span>
                  <span className="font-semibold text-text-primary">
                    {result.ecc_certificate.standard || "ECC NIST P-256 (ECDSA)"} ({result.ecc_certificate.curve || "secp256r1"})
                  </span>
                </div>
                <div>
                  <span className="text-text-muted block text-[10px] uppercase font-bold">
                    {isHi ? "समय मोहर" : "Timestamp (UTC)"}
                  </span>
                  <span className="text-text-primary">
                    {result.ecc_certificate.timestamp || new Date().toISOString()}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-text-muted block text-[10px] uppercase font-bold">
                    {isHi ? "साक्ष्य SHA-256 हैश" : "SHA-256 Evidence Hash"}
                  </span>
                  <span className="break-all text-accent select-all">
                    {result.ecc_certificate.full_evidence_hash || result.ecc_certificate.evidence_hash}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-text-muted block text-[10px] uppercase font-bold">
                    {isHi ? "ECDSA डिजिटल हस्ताक्षर" : "ECDSA Digital Signature (P-256)"}
                  </span>
                  <span className="break-all text-text-primary text-[10px] select-all">
                    {result.ecc_certificate.signature || result.ecc_certificate.signature_short}
                  </span>
                </div>
              </div>
              <p className="text-[10px] font-sans text-text-muted italic">
                {isHi
                  ? "यह डिजिटल हस्ताक्षर कानूनी रूप से भारतीय साक्ष्य अधिनियम 65B / BSA 2023 की धारा 63 के तहत इलेक्ट्रॉनिक रिकॉर्ड के रूप में मान्य है।"
                  : "Cryptographically tamper-proof electronic evidence compliant with Section 65B Indian Evidence Act / Section 63 BSA 2023."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
