"use client";

import React, { useState } from "react";
import { 
  ChevronDown, 
  ChevronUp, 
  AlertCircle, 
  Radio, 
  Scale, 
  CheckCircle2,
  ShieldCheck,
  ShieldAlert
} from "lucide-react";

export default function EvidenceList({ result, langMode = "en" }) {
  const [expandedCards, setExpandedCards] = useState({
    signals: true,
    dlt: true,
    legal: false,
  });

  if (!result) return null;

  const toggle = (key) => {
    setExpandedCards((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const signals = result.signals || [];
  const isHi = langMode === "hi";

  const getSeverityBadge = (severity) => {
    switch (severity?.toLowerCase()) {
      case "critical":
        return { 
          bg: "bg-red-500/10 dark:bg-red-500/20 text-red-700 dark:text-red-300 border border-red-500/30", 
          label: isHi ? "भारी खतरा" : "Critical Risk" 
        };
      case "high":
        return { 
          bg: "bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30", 
          label: isHi ? "बड़ा खतरा" : "High Risk" 
        };
      case "warning":
        return { 
          bg: "bg-orange-500/10 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300 border border-orange-500/30", 
          label: isHi ? "सावधानी" : "Caution" 
        };
      default:
        return { 
          bg: "bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30", 
          label: isHi ? "सामान्य सूचना" : "Info" 
        };
    }
  };

  return (
    <div className="w-full space-y-4 animate-fadeIn">
      {/* iOS Cupertino Header */}
      <div className="flex items-center justify-between pb-2 border-b border-border/70">
        <div>
          <h3 className="font-black text-text-primary text-base sm:text-lg tracking-tight">
            {isHi ? "यह फ्रॉड क्यों है? (संकेत व कानूनी विश्लेषण)" : "Why This Was Flagged (Threat Signals & Evidence)"}
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            {isHi 
              ? "पहचाने गए खतरे, झूठे दावे और सरकारी नियम उल्लंघन की स्थिति"
              : "Clear breakdown of identified manipulation tactics and regulatory violations"}
          </p>
        </div>
        <span className="text-xs font-mono text-accent bg-accent-subtle px-3 py-1 rounded-full font-bold border border-accent/20">
          {signals.length} {isHi ? "संकेत" : (signals.length === 1 ? "Signal" : "Signals")}
        </span>
      </div>

      {/* 1. Signals & Evidence Cards (Cupertino Grouped Inset) */}
      {signals.length > 0 && (
        <div className="bg-surface/90 backdrop-blur-xl border border-border/80 dark:border-white/10 rounded-3xl overflow-hidden shadow-card">
          <button
            type="button"
            onClick={() => toggle("signals")}
            className="w-full min-h-[52px] p-4 sm:p-5 flex items-center justify-between text-left hover:bg-surface-elevated/40 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 border border-accent/20">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-primary">
                  {isHi ? "पहचाने गए फ्रॉड संकेत व सबूत" : "Identified Threat Signals & Evidence"}
                </h4>
                <p className="text-[11px] text-text-muted">
                  {isHi 
                    ? "संदेश में पाए गए झूठे दावे और ठगी के तरीके"
                    : "Specific manipulative tactics, urgent coercion, or deceptive structures"}
                </p>
              </div>
            </div>
            {expandedCards.signals ? (
              <ChevronUp className="w-4 h-4 text-text-muted" />
            ) : (
              <ChevronDown className="w-4 h-4 text-text-muted" />
            )}
          </button>

          {expandedCards.signals && (
            <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 border-t border-border/60 bg-surface-elevated/20 space-y-3">
              {signals.map((sig, idx) => {
                const sBadge = getSeverityBadge(sig.severity);
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-surface border border-border/80 space-y-2.5 text-xs shadow-subtle"
                  >
                    {/* Signal Header */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-accent/10 text-accent font-mono font-bold text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-text-primary text-sm">
                          {isHi ? (sig.title_hi || sig.title) : sig.title}
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${sBadge.bg}`}>
                        {sBadge.label}
                      </span>
                    </div>

                    {/* Evidence Quote */}
                    {sig.evidence && (
                      <div className="p-3 rounded-xl bg-surface-elevated/70 border border-border/70 text-text-secondary">
                        <span className="font-semibold text-text-muted block text-[10px] uppercase tracking-wider mb-0.5">
                          {isHi ? "संदेश में मिला सबूत:" : "Evidence Quote from Input:"}
                        </span>
                        <p className="font-mono text-[11px] text-text-primary leading-relaxed break-all font-medium">
                          &ldquo;{sig.evidence}&rdquo;
                        </p>
                      </div>
                    )}

                    {/* Explanation */}
                    <div className="p-3 rounded-xl bg-accent-subtle/30 border border-accent/20 text-text-primary space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent block">
                        {isHi ? "आसान भाषा में समझें:" : "Consumer Impact & Risk:"}
                      </span>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {isHi ? (sig.explanation_hi || sig.explanation) : sig.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 2. TRAI DLT 6-Character Header Compliance (India Context) */}
      {result.trai_dlt_status && (
        <div className="bg-surface/90 backdrop-blur-xl border border-border/80 dark:border-white/10 rounded-3xl overflow-hidden shadow-card">
          <button
            type="button"
            onClick={() => toggle("dlt")}
            className="w-full min-h-[52px] p-4 sm:p-5 flex items-center justify-between text-left hover:bg-surface-elevated/40 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                <Radio className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-primary">
                  {isHi ? "सरकारी नियम जांच (TRAI DLT 6-अक्षर कोड)" : "TRAI DLT Telecom Header Verification"}
                </h4>
                <p className="text-[11px] text-text-muted">
                  {isHi ? "क्या यह संदेश असली सरकारी कोड से भेजा गया है?" : "Telecom Regulatory Authority of India mandate audit"}
                </p>
              </div>
            </div>
            {expandedCards.dlt ? (
              <ChevronUp className="w-4 h-4 text-text-muted" />
            ) : (
              <ChevronDown className="w-4 h-4 text-text-muted" />
            )}
          </button>

          {expandedCards.dlt && (
            <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 border-t border-border/60 bg-surface-elevated/20 text-xs space-y-3">
              <p className="text-text-primary leading-relaxed mt-2 font-medium">
                {isHi ? (result.trai_dlt_status_hi || result.trai_dlt_status) : result.trai_dlt_status}
              </p>
              <div className="p-3.5 rounded-2xl bg-surface border border-border flex items-start gap-2.5 text-[11px] text-text-muted">
                <span className="font-bold text-accent">{isHi ? "TRAI नियम:" : "TRAI Mandate:"}</span>
                <span className="leading-relaxed">
                  {isHi 
                    ? "भारत में सभी बैंक, सरकारी विभाग और बिजली कंपनियां सिर्फ 6-अक्षरों के सरकारी कोड (जैसे VK-UPPCL, AX-SBIINB) से मैसेज भेजती हैं। किसी आम 10-अंकों वाले मोबाइल नंबर से कभी नहीं।"
                    : "All legitimate institutional SMS in India (banks, utilities, government) must originate from a verified 6-character alphabetic header (e.g. VK-UPPCL, AX-SBIINB). Genuine organizations NEVER use personal 10-digit mobile SIMs."}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. Applicable Legal Statutes */}
      {result.legal_sections && result.legal_sections.length > 0 && (
        <div className="bg-surface/90 backdrop-blur-xl border border-border/80 dark:border-white/10 rounded-3xl overflow-hidden shadow-card">
          <button
            type="button"
            onClick={() => toggle("legal")}
            className="w-full min-h-[52px] p-4 sm:p-5 flex items-center justify-between text-left hover:bg-surface-elevated/40 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-primary">
                  {isHi ? "भारतीय कानूनी धाराएं (IT Act & BNS)" : "Applicable Indian Cyber Legal Statutes"}
                </h4>
                <p className="text-[11px] text-text-muted">
                  {isHi ? "सूचना प्रौद्योगिकी अधिनियम 2000 और भारतीय न्याय संहिता (BNS) 2023" : "Information Technology Act 2000 & Bharatiya Nyaya Sanhita (BNS) 2023"}
                </p>
              </div>
            </div>
            {expandedCards.legal ? (
              <ChevronUp className="w-4 h-4 text-text-muted" />
            ) : (
              <ChevronDown className="w-4 h-4 text-text-muted" />
            )}
          </button>

          {expandedCards.legal && (
            <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 border-t border-border/60 bg-surface-elevated/20 text-xs">
              <div className="space-y-2 mt-2">
                {result.legal_sections.map((sec, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-text-secondary bg-surface p-2.5 rounded-xl border border-border">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    <span className="font-mono text-xs font-semibold">{sec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
