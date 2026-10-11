"use client";

import React, { useState, useEffect } from "react";
import { Loader2, CheckCircle2, Clock } from "lucide-react";

export default function ScanProgress({ hasImage }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: "Reading Content & Parsing Entities", detail: hasImage ? "Decoding visual screenshot payload & text" : "Extracting URLs, phone numbers & sender headers" },
    { label: "Identifying Suspicious Patterns", detail: "Analyzing urgency language, payment coercion & APK vectors" },
    { label: "Evaluating Risk Indicators", detail: "Correlating against known fraud indicators & TRAI DLT regulations" },
    { label: "Preparing Evidence & Recommendations", detail: "Synthesizing explainable verdict and Golden Hour action steps" },
  ];

  useEffect(() => {
    const timers = [
      setTimeout(() => setCurrentStep(1), 350),
      setTimeout(() => setCurrentStep(2), 850),
      setTimeout(() => setCurrentStep(3), 1400),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full bg-surface border border-accent/20 rounded-2xl p-6 sm:p-8 shadow-card animate-fadeIn">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary text-base">
              Analyzing Your Submission
            </h3>
            <p className="text-xs text-text-muted">
              Running calibrated security evaluation &amp; statutory correlation
            </p>
          </div>
        </div>
        <span className="text-xs font-mono text-accent bg-accent-subtle px-2 py-1 rounded-md font-semibold">
          STAGE {Math.min(currentStep + 1, 4)}/4
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {steps.map((s, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;
          return (
            <div
              key={s.label}
              className={`flex items-start gap-3 transition-opacity duration-200 ${
                isDone || isCurrent ? "opacity-100" : "opacity-40"
              }`}
            >
              <div className="mt-0.5 flex-shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : isCurrent ? (
                  <div className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-border bg-surface-elevated" />
                )}
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-xs sm:text-sm font-medium ${
                    isCurrent ? "text-accent font-semibold" : isDone ? "text-text-primary" : "text-text-muted"
                  }`}
                >
                  {s.label}
                </span>
                <span className="text-[11px] text-text-muted mt-0.5">
                  {s.detail}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-[11px] text-text-muted">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-accent" />
          <span>Stateless processing • Zero storage of submitted data</span>
        </div>
        <span>Immediate response</span>
      </div>
    </div>
  );
}
