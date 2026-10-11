"use client";

import React from "react";
import { Check, X, Shield, Sparkles } from "lucide-react";

export default function IntelligenceComparison() {
  const features = [
    {
      name: "Multimodal Screenshot & Image OCR",
      suraksha: true,
      scamwise: false,
      generic: false,
      detail: "Upload or paste screenshots of WhatsApp chats, APK prompts, or fake police warrants.",
    },
    {
      name: "TRAI DLT 6-Character Header Audit",
      suraksha: true,
      scamwise: false,
      generic: false,
      detail: "Validates against Indian telecom sender standards (e.g. VK-UPPCL vs 10-digit SIM spoofing).",
    },
    {
      name: "Golden Hour 1930 / CFCFRMS Dispatch",
      suraksha: true,
      scamwise: false,
      generic: false,
      detail: "Direct helpline link & formatted legal dossier ready to submit to cybercrime.gov.in.",
    },
    {
      name: "Explainable Forensic Evidence",
      suraksha: true,
      scamwise: true,
      generic: false,
      detail: "Detailed technical, psychological, and legal breakdowns rather than arbitrary percentage scores.",
    },
    {
      name: "100% Stateless & Privacy-First",
      suraksha: true,
      scamwise: true,
      generic: false,
      detail: "No persistent storage of your submitted messages, phone numbers, or uploaded images.",
    },
    {
      name: "Personal Gemini 2.5 AI Key Option",
      suraksha: true,
      scamwise: false,
      generic: false,
      detail: "Connect your own free API key from Google AI Studio for limitless live AI analysis.",
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-accent">
          Comparative Advantage
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
          Why SurakshaShield Sets a Higher Standard
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed">
          While Western tools only check URL reputation databases, SurakshaShield is purpose-built for India&apos;s complex fraud landscape.
        </p>
      </div>

      {/* Desktop / Laptop Table View */}
      <div className="mt-10 hidden md:block overflow-hidden rounded-2xl border border-border bg-surface">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-elevated/40">
              <th className="py-4 px-5 font-semibold text-text-primary">Capability</th>
              <th className="py-4 px-5 font-bold text-accent bg-accent-subtle/50 text-center">
                SurakshaShield
              </th>
              <th className="py-4 px-5 font-medium text-text-muted text-center">Scamwise</th>
              <th className="py-4 px-5 font-medium text-text-muted text-center">Generic Scanners</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {features.map((item, idx) => (
              <tr key={idx} className="hover:bg-surface-elevated/20 transition-colors">
                <td className="py-4 px-5">
                  <div className="font-semibold text-text-primary">{item.name}</div>
                  <div className="text-xs text-text-muted mt-0.5">{item.detail}</div>
                </td>
                <td className="py-4 px-5 text-center bg-accent-subtle/30 font-semibold text-accent">
                  <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent text-white shadow-subtle">
                    <Check className="w-4 h-4" />
                  </div>
                </td>
                <td className="py-4 px-5 text-center text-text-muted">
                  {item.scamwise ? (
                    <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
                      <Check className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-surface-elevated text-text-muted">
                      <X className="w-4 h-4" />
                    </div>
                  )}
                </td>
                <td className="py-4 px-5 text-center text-text-muted">
                  <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-surface-elevated text-text-muted">
                    <X className="w-4 h-4" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Deck View (Zero Horizontal Scroll Jitter) */}
      <div className="mt-8 md:hidden space-y-3">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-surface border border-border shadow-subtle space-y-2.5"
          >
            <div>
              <h4 className="text-sm font-bold text-text-primary">{item.name}</h4>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">{item.detail}</p>
            </div>

            <div className="pt-2 border-t border-border/70 flex items-center justify-between text-xs gap-2">
              {/* SurakshaShield Highlight */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent-subtle border border-accent/30 text-accent font-bold">
                <Check className="w-3.5 h-3.5 text-accent" />
                <span>SurakshaShield ✓</span>
              </div>

              {/* Others */}
              <div className="flex items-center gap-2 text-[11px] text-text-muted">
                <span className={`px-2 py-1 rounded-lg ${item.scamwise ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 font-semibold" : "bg-surface-elevated"}`}>
                  Scamwise: {item.scamwise ? "Yes" : "No"}
                </span>
                <span className="px-2 py-1 rounded-lg bg-surface-elevated">
                  Generic: No
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
