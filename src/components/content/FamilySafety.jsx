"use client";

import React from "react";
import { Users, HeartHandshake, ShieldAlert, CheckCircle, Share2, Copy } from "lucide-react";

export default function FamilySafety() {
  const rules = [
    {
      num: "Rule 1",
      title: "UPI PIN is ONLY for paying money",
      summary: "You NEVER need to enter your 4-digit or 6-digit UPI PIN to receive money or get a refund. If someone asks you to enter your PIN to accept funds, it is 100% fraud.",
      safeAction: "Cancel the transaction immediately.",
    },
    {
      num: "Rule 2",
      title: "Real police never arrest via video calls",
      summary: "Under Indian law, no CBI, Police, ED, or Customs officer can arrest you or put you under 'digital detention' over Skype, WhatsApp, or video calls.",
      safeAction: "Hang up immediately. Block the number.",
    },
    {
      num: "Rule 3",
      title: "Electricity boards never text from personal numbers",
      summary: "Government electricity departments (UPPCL, BESCOM, Tata Power, etc.) only send messages with verified 6-character shortcodes, never 10-digit mobile numbers.",
      safeAction: "Never call phone numbers in disconnection SMS.",
    },
    {
      num: "Rule 4",
      title: "Never install APK files sent on WhatsApp",
      summary: "Scammers send files ending in .apk pretending to be update patches, traffic challans, or customer service apps. These steal your banking SMS and OTPs.",
      safeAction: "Only install apps from Google Play Store or Apple App Store.",
    },
  ];

  const handleShareRules = () => {
    const text = `🛡️ [FAMILY CYBER SAFETY RULES FOR PARENTS & ELDERS]
1. UPI PIN is ONLY for PAYING money. You never enter a PIN to receive refunds!
2. Police or CBI NEVER interrogate or arrest anyone on WhatsApp or Skype video calls.
3. Electricity boards NEVER send disconnection notices from personal 10-digit numbers.
4. NEVER install .apk files sent via WhatsApp or SMS.
Emergency: Call 1930 immediately if money was deducted.
Verified by SurakshaShield.`;

    if (navigator.share) {
      navigator.share({
        title: "Family Cyber Safety Rules",
        text: text,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert("Family safety rules copied! You can paste them in your family WhatsApp group.");
    }
  };

  return (
    <section id="family-safety" className="w-full max-w-6xl mx-auto py-16 px-4 sm:px-6 scroll-mt-20">
      <div className="bg-surface border border-accent/20 rounded-3xl p-6 sm:p-10 shadow-card overflow-hidden relative">
        {/* Decorative subtle ambient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-subtle text-accent text-xs font-semibold">
            <HeartHandshake className="w-4 h-4" />
            <span>Family &amp; Elder Protection</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
            Simple Cyber Rules for Parents &amp; Non-Tech Users
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            Senior citizens and non-technical family members are targeted with urgency and fear. Share these 4 non-negotiable rules with your family.
          </p>
        </div>

        {/* 4 Golden Rules Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {rules.map((rule) => (
            <div
              key={rule.num}
              className="bg-surface-elevated/40 border border-border rounded-2xl p-5 space-y-2 relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-accent font-mono">
                  {rule.num}
                </span>
                <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  {rule.safeAction}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-text-primary">
                {rule.title}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {rule.summary}
              </p>
            </div>
          ))}
        </div>

        {/* Share with Family WhatsApp Button */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-text-muted">
            Share this guide with your family WhatsApp group to protect parents from losing savings.
          </div>
          <button
            onClick={handleShareRules}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white text-xs sm:text-sm font-semibold hover:bg-accent-hover transition-colors shadow-subtle flex-shrink-0"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Rules to WhatsApp Group</span>
          </button>
        </div>
      </div>
    </section>
  );
}
