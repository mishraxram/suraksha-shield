"use client";

import React from "react";
import { ArrowRight, ShieldCheck, Lock } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="w-full max-w-4xl mx-auto py-16 px-4 sm:px-6 text-center">
      <div className="bg-gradient-to-b from-surface to-surface-elevated/40 border border-border rounded-3xl p-8 sm:p-14 shadow-card space-y-6 relative overflow-hidden">
        <div className="w-12 h-12 rounded-2xl bg-accent text-white flex items-center justify-center mx-auto shadow-subtle">
          <ShieldCheck className="w-6 h-6" />
        </div>

        <div className="space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-text-primary">
            Something doesn&apos;t feel right?
          </h2>
          <p className="text-base sm:text-xl text-accent font-semibold">
            Check it before you act.
          </p>
          <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto leading-relaxed pt-1">
            Takes 3 seconds. Completely free. No login or personal information required.
          </p>
        </div>

        <div>
          <a
            href="#scanner"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-all shadow-subtle w-full sm:w-auto min-h-[48px]"
          >
            <span>Analyze Something Suspicious</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="flex items-center justify-center gap-4 text-xs text-text-muted pt-2">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-accent" />
            Stateless &amp; Private
          </span>
          <span>•</span>
          <span>Aligned with 1930 Cyber Helpline</span>
        </div>
      </div>
    </section>
  );
}
