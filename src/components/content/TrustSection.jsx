"use client";

import React from "react";
import { Lock, Eye, FileText, CheckCircle2 } from "lucide-react";

export default function TrustSection() {
  const pillars = [
    {
      title: "Stateless & Privacy-Conscious",
      description: "Submitted text and screenshots are analyzed strictly in volatile memory. No personal phone numbers, conversations, or images are written to a permanent database.",
      icon: Lock,
    },
    {
      title: "Transparent & Explainable",
      description: "We don't just output a generic score. Every evaluation details the exact evidence quote, identified urgency tactics, and why the pattern indicates potential risk.",
      icon: Eye,
    },
    {
      title: "Multiple Verification Formats",
      description: "Support for raw message text, unverified URLs, phone numbers, and image screenshots of WhatsApp chats, fake warrants, or payment prompts.",
      icon: FileText,
    },
    {
      title: "Zero Mandatory Signups",
      description: "Immediate second opinion when you need it most. No accounts, credit cards, or personal emails required to verify suspicious communications.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4 sm:px-6">
      <div className="bg-surface border border-border rounded-3xl p-8 sm:p-12 shadow-card">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-accent">
            Ethical Cyber Defense
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
            Built for Everyday Citizens &amp; Families
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            Our goal is calm, reliable protection without fear-mongering or fabricated security statistics.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-text-primary">
                  {p.title}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
