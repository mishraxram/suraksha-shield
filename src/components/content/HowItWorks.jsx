"use client";

import React from "react";
import { UploadCloud, Cpu, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Submit Suspicious Vector",
      description:
        "Paste any questionable SMS, WhatsApp alert, shortened link, or drag-and-drop a screenshot from your device. Everything is parsed statelessly without storage.",
      icon: UploadCloud,
      signals: ["SMS & Chat Text", "Screenshots (OCR)", "Hyperlinks & APKs", "Phone Numbers"],
    },
    {
      num: "02",
      title: "Forensic & Regulatory Verification",
      description:
        "The engine audits the input against Indian cyber forensic indicators: TRAI DLT 6-character header compliance, malicious APK hooks, and psychological coercion triggers.",
      icon: Cpu,
      signals: ["TRAI DLT Registry", "Domain Reputation", "Urgency Traps", "Optical Seal Check"],
    },
    {
      num: "03",
      title: "Explainable Verdict & Golden Hour Action",
      description:
        "Receive an immediate calibrated threat score, clear explanation of why it was flagged, 1-click 1930 Cyber Fraud Helpline routing, and an e-FIR reporting dossier.",
      icon: ShieldCheck,
      signals: ["0–100 Threat Index", "Clear Evidence Cards", "1930 Dispatcher", "Copyable Dossier"],
    },
  ];

  return (
    <section id="how-it-works" className="w-full max-w-6xl mx-auto py-16 sm:py-20 px-4 sm:px-6 scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-accent">
          Clear &amp; Transparent
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
          How SurakshaShield Verifies Digital Threats
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed">
          Unlike black-box scanners, SurakshaShield shows you the exact technical, regulatory, and psychological reasons behind every security verdict.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="bg-surface border border-border rounded-2xl p-6 sm:p-7 shadow-subtle hover:shadow-card hover:border-accent/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-border/80">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-2xl font-bold text-accent/40">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-text-primary mt-4">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/60">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                  Inspected Signals:
                </span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {step.signals.map((sig) => (
                    <span
                      key={sig}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-surface-elevated text-text-secondary border border-border flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-2.5 h-2.5 text-accent" />
                      {sig}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
