"use client";

import React from "react";
import { Sparkles, PhoneCall } from "lucide-react";

export default function TopBanner() {
  return (
    <div className="bg-surface-elevated border-b border-border py-1.5 px-4 text-center text-xs text-text-secondary flex items-center justify-center gap-2 transition-colors duration-200">
      <Sparkles className="w-3.5 h-3.5 text-accent flex-shrink-0" />
      <span className="truncate">
        AI scam verification for messages, links &amp; screenshots • Emergency Cyber Fraud Helpline:{" "}
        <a href="tel:1930" className="font-semibold text-red-600 dark:text-red-400 hover:underline">
          Dial 1930
        </a>
      </span>
    </div>
  );
}
