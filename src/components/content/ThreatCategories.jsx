"use client";

import React from "react";
import { 
  CreditCard, 
  FileCheck, 
  Link as LinkIcon, 
  Briefcase, 
  TrendingUp, 
  Package, 
  Headphones, 
  Lock, 
  ShoppingBag, 
  ShieldAlert 
} from "lucide-react";

export default function ThreatCategories({ onSelectCategory }) {
  const categories = [
    {
      id: "upi",
      title: "UPI & Collect Request Fraud",
      desc: "Reverse PIN traps, unauthorized collect requests, and fake refund screenshots.",
      icon: CreditCard,
      tag: "Financial Loss"
    },
    {
      id: "kyc",
      title: "Bank KYC & Account Block",
      desc: "SMS claiming immediate suspension of NetBanking or debit cards unless PAN is updated.",
      icon: FileCheck,
      tag: "Credential Theft"
    },
    {
      id: "phishing",
      title: "Phishing & APK Trojans",
      desc: "Links prompting third-party Android APK downloads that intercept banking SMS and OTPs.",
      icon: LinkIcon,
      tag: "Malware"
    },
    {
      id: "jobs",
      title: "Fake Job & Task Fraud",
      desc: "Promises of ₹2,000–₹5,000 daily for liking YouTube videos or hotel ratings on Telegram.",
      icon: Briefcase,
      tag: "Ponzi Scheme"
    },
    {
      id: "investments",
      title: "Investment & Trading Traps",
      desc: "Unrealistic crypto or institutional trading returns managed in fake WhatsApp VIP groups.",
      icon: TrendingUp,
      tag: "Advance Fee"
    },
    {
      id: "courier",
      title: "Fake Courier & Parcel Redirection",
      desc: "Claims a FedEx/India Post parcel has an incomplete address, demanding small payment fees.",
      icon: Package,
      tag: "Card Harvesting"
    },
    {
      id: "support",
      title: "Fake Customer Support",
      desc: "Fraudulent Google Maps helpline numbers posing as airline, bank, or food delivery support.",
      icon: Headphones,
      tag: "Social Engineering"
    },
    {
      id: "account",
      title: "Account Takeover & SIM Swap",
      desc: "Threats of SIM deactivation within hours urging emergency eSIM profile installation.",
      icon: Lock,
      tag: "Identity Theft"
    },
    {
      id: "marketplace",
      title: "Marketplace & OLX Scams",
      desc: "Buyers pretending to be defense officers sending QR codes to 'pay' for listed items.",
      icon: ShoppingBag,
      tag: "Quishing"
    },
    {
      id: "digital-arrest",
      title: "Digital Arrest & Police Extortion",
      desc: "Impersonating CBI, Customs, or police over Skype/WhatsApp video with fake arrest warrants.",
      icon: ShieldAlert,
      tag: "High Severity"
    }
  ];

  return (
    <section id="threats" className="w-full max-w-6xl mx-auto py-16 px-4 sm:px-6 scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-accent">
          Threat Intelligence
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
          Common Scam Categories &amp; Typologies
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed">
          Indian cybercriminals deploy specialized psychological triggers and deceptive technical vectors. Learn to spot their patterns.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              className="bg-surface border border-border rounded-2xl p-5 shadow-subtle hover:shadow-card hover:border-accent/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-surface-elevated text-text-muted border border-border">
                    {cat.tag}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-text-primary mt-1">
                  {cat.title}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/60">
                <a
                  href="#scanner"
                  className="text-xs font-medium text-accent hover:underline flex items-center gap-1"
                >
                  <span>Check this category</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
