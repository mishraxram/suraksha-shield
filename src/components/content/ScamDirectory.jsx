"use client";

import React, { useState } from "react";
import { 
  Zap, 
  ShieldAlert, 
  CreditCard, 
  Truck, 
  Briefcase, 
  Smartphone, 
  Car, 
  AlertCircle,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function ScamDirectory({ onSelectExample }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const scams = [
    {
      id: "digital-arrest",
      category: "police",
      title: "Digital Arrest & Fake Police Skype Extortion",
      badge: "High Severity",
      icon: ShieldAlert,
      motto: "Fake CBI, Customs, or ED officers threatening arrest via video call.",
      giveaway: "Under Indian law, no police, court, or enforcement agency ever conducts trials, interrogations, or arrests via Skype, WhatsApp, or video calls.",
      officialFix: "Disconnect immediately. Do not transfer 'verification funds'. Real police issue physical summons under Section 41A CrPC / 35 BNSS.",
      sampleText: "URGENT NOTICE: CBI and Narcotics Control Bureau have seized a parcel containing drugs and fake passports sent under your Aadhaar. Connect to our Skype investigation officer immediately to avoid immediate arrest and asset freeze.",
    },
    {
      id: "electricity-bill",
      category: "utility",
      title: "Electricity Disconnection Phishing",
      badge: "Widespread",
      icon: Zap,
      motto: "Threatens immediate power cutoff tonight from state electricity boards (UPPCL, BESCOM, BSES, etc.).",
      giveaway: "Sent from regular 10-digit mobile numbers or WhatsApp, rather than registered telecom headers (e.g. VK-UPPCL). Asks to call a personal mobile number or download an APK.",
      officialFix: "Never call phone numbers in disconnection SMS. Verify pending bills directly on your state power board portal or dial 1912.",
      sampleText: "Dear Consumer, your electricity power will be disconnected tonight at 9:30 PM from the power station because your previous bill was not updated. Immediately call electricity officer at 9876543210 or install UPPCL_QuickPay.apk from bit.ly/uppcl-bill",
    },
    {
      id: "upi-refund",
      category: "banking",
      title: "UPI 'Receive' PIN & Collect Request Trap",
      badge: "Financial Loss",
      icon: CreditCard,
      motto: "Scammer claims to have transferred money by mistake or buying your OLX item.",
      giveaway: "They send a UPI 'Collect Request' or tell you to enter your UPI PIN to 'receive the money'. You NEVER need to enter a UPI PIN to receive money.",
      officialFix: "Decline all collect requests. Report the UPI ID on BHIM / NPCI / Cyber Helpline 1930.",
      sampleText: "Sir I have accidentally transferred ₹25,000 to your Google Pay. Please open your UPI app and enter your 4-digit PIN on the screen to accept the refund transaction back.",
    },
    {
      id: "fake-echallan",
      category: "phishing",
      title: "Fake Traffic E-Challan APK Malware",
      badge: "Malware Trojan",
      icon: Car,
      motto: "SMS claiming pending traffic violation fine with a link to pay or view photo evidence.",
      giveaway: "Link downloads a `.apk` file instead of redirecting to the official government portal (echallan.parivahan.gov.in).",
      officialFix: "Check official challan status ONLY on echallan.parivahan.gov.in. Never install APK files sent via SMS.",
      sampleText: "Delhi Traffic Police: Challan No. DL-98219 has been issued for speed violation. Download parivahan_challan_v3.apk from http://traffic-echallan-fine.top to inspect photo proof and settle with 50% discount.",
    },
    {
      id: "bank-kyc",
      category: "banking",
      title: "Bank KYC & Account Block Extortion",
      badge: "Credential Phishing",
      icon: CreditCard,
      motto: "Claims your SBI, HDFC, or ICICI account/cards are blocked due to missing PAN/Aadhaar.",
      giveaway: "Contains lookalike phishing links (e.g. sbi-yono-update.xyz) asking for internet banking username, password, and OTP.",
      officialFix: "Banks never ask for KYC updates through SMS links. Visit your home branch or log in securely via your bank's verified mobile app.",
      sampleText: "Dear SBI Customer, your NetBanking account has been suspended today due to pending PAN card verification. Please click https://sbi-kyc-update.online/login to verify your account within 24 hours to prevent permanent freeze.",
    },
    {
      id: "task-job",
      category: "ponzi",
      title: "Part-Time Task & YouTube Likes Ponzi",
      badge: "Ponzi Scam",
      icon: Briefcase,
      motto: "Promises ₹2,000–₹5,000 per day for liking YouTube videos or writing Google Maps reviews.",
      giveaway: "They pay small amounts (₹150-₹500) initially to build trust, then demand 'prepaid deposits' or crypto transfers to unlock larger earnings.",
      officialFix: "Block the recruiter. Legitimate companies never charge candidates money to perform freelance work.",
      sampleText: "Earn ₹3,000 to ₹8,000 daily working from home! Simply like 3 YouTube videos per day and review hotels on Google. Join our official Telegram VIP group @easy_daily_income_in to claim your joining bonus.",
    },
  ];

  const categories = [
    { id: "all", label: "All Threat Typologies" },
    { id: "police", label: "Digital Arrest & Police" },
    { id: "utility", label: "Electricity & Utilities" },
    { id: "banking", label: "UPI & Bank KYC" },
    { id: "phishing", label: "Traffic Challan & APKs" },
    { id: "ponzi", label: "Job & Task Fraud" },
  ];

  const filteredScams = activeCategory === "all"
    ? scams
    : scams.filter((s) => s.category === activeCategory);

  return (
    <section id="threats" className="w-full max-w-6xl mx-auto py-16 px-4 sm:px-6 scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-accent">
          India Threat Intelligence
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
          Most Prevalent Scams &amp; How They Operate
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed">
          Indian cybercriminals rely on specific psychological triggers and technical vectors. Learn their exact patterns to protect yourself and your family.
        </p>
      </div>

      {/* Category Filter Pills (Smooth Thumb Scroll on Mobile, Centered on Laptop) */}
      <div className="mt-8 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 px-1 no-scrollbar">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === c.id
                ? "bg-accent text-white shadow-subtle"
                : "bg-surface border border-border text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Threat Cards Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScams.map((scam) => {
          const Icon = scam.icon;
          return (
            <div
              key={scam.id}
              className="bg-surface border border-border rounded-2xl p-6 shadow-subtle hover:shadow-card hover:border-accent/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-accent-subtle text-accent border border-accent/20">
                    {scam.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-text-primary">
                  {scam.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {scam.motto}
                </p>

                {/* Dead Giveaway Box */}
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs space-y-1">
                  <span className="font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Immediate Dead Giveaway:
                  </span>
                  <p className="text-amber-900 dark:text-amber-300/90 leading-relaxed text-[11px]">
                    {scam.giveaway}
                  </p>
                </div>

                {/* Safe Protocol */}
                <div className="p-3 rounded-xl bg-surface-elevated border border-border text-xs space-y-1">
                  <span className="font-bold text-text-primary flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Safe Protocol:
                  </span>
                  <p className="text-text-muted leading-relaxed text-[11px]">
                    {scam.officialFix}
                  </p>
                </div>
              </div>

              {/* Test Button */}
              <div className="mt-5 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => onSelectExample(scam.sampleText)}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-border bg-surface text-xs font-medium text-text-secondary hover:text-text-primary hover:border-accent hover:bg-accent-subtle/20 transition-colors"
                >
                  <span>Test this scenario in scanner</span>
                  <ArrowRight className="w-3.5 h-3.5 text-accent" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
