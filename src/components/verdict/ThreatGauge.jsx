"use client";

import React from "react";

export default function ThreatGauge({ score = 0, verdict = "suspicious", langMode = "en" }) {
  const clampedScore = Math.max(0, Math.min(100, Math.round(score)));
  
  // Calculate needle rotation angle (-90deg at score 0, +90deg at score 100)
  const angle = -90 + (clampedScore / 100) * 180;
  const radians = (angle * Math.PI) / 180;
  
  // Needle coordinates on 200x120 canvas, center at (100, 105), radius 68
  const needleLength = 58;
  const needleX = 100 + needleLength * Math.sin(radians);
  const needleY = 105 - needleLength * Math.cos(radians);

  const getScoreColor = () => {
    if (clampedScore <= 25) return "#16A34A"; // Safe (Emerald)
    if (clampedScore <= 50) return "#2563EB"; // Low Risk (Blue)
    if (clampedScore <= 75) return "#D97706"; // Suspicious (Amber)
    return "#DC2626"; // Likely Scam (Crimson)
  };

  const getScoreLabel = () => {
    if (langMode === "hi") {
      if (clampedScore <= 25) return "सुरक्षित (Safe)";
      if (clampedScore <= 50) return "कम जोखिम (Low Risk)";
      if (clampedScore <= 75) return "संदिग्ध (Suspicious)";
      return "भारी खतरा (Critical)";
    }
    if (clampedScore <= 25) return "Minimal Risk";
    if (clampedScore <= 50) return "Low Risk";
    if (clampedScore <= 75) return "Suspicious";
    return "Critical Threat";
  };

  return (
    <div 
      className="flex flex-col items-center justify-center p-3 sm:p-4 bg-surface-elevated/40 border border-border rounded-2xl w-full max-w-[240px] mx-auto select-none"
      role="meter"
      aria-label={langMode === "hi" ? "साइबर खतरा मीटर" : "Cyber Threat Score Meter"}
      aria-valuenow={clampedScore}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="relative w-full aspect-[200/120] max-w-[200px]">
        <svg viewBox="0 0 200 120" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="gaugeArcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#16A34A" />
              <stop offset="30%" stopColor="#2563EB" />
              <stop offset="65%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
          </defs>

          {/* Background Track Arc */}
          <path
            d="M 25 105 A 75 75 0 0 1 175 105"
            fill="none"
            stroke="currentColor"
            strokeWidth="14"
            strokeLinecap="round"
            className="text-border/60"
          />

          {/* Color Gradient Spectrum Arc */}
          <path
            d="M 25 105 A 75 75 0 0 1 175 105"
            fill="none"
            stroke="url(#gaugeArcGradient)"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Calibrated Needle */}
          <line
            x1="100"
            y1="105"
            x2={needleX}
            y2={needleY}
            stroke="#1C1A17"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="dark:stroke-white transition-all duration-700 ease-out"
          />

          {/* Center Pivot Point */}
          <circle cx="100" cy="105" r="7" fill={getScoreColor()} />
          <circle cx="100" cy="105" r="3" fill="#FFFFFF" />
        </svg>

        {/* Score Value Display */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center text-center">
          <span 
            className="font-mono text-2xl sm:text-3xl font-black tracking-tight leading-none"
            style={{ color: getScoreColor() }}
          >
            {clampedScore}
            <span className="text-xs text-text-muted font-normal ml-0.5">/100</span>
          </span>
        </div>
      </div>

      <div className="mt-2 text-center space-y-0.5">
        <span 
          className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block"
          style={{ backgroundColor: `${getScoreColor()}15`, color: getScoreColor() }}
        >
          {getScoreLabel()}
        </span>
        <p className="text-[11px] text-text-muted">
          {langMode === "hi" ? "जोखिम स्कोर" : "Calculated Threat Score"}
        </p>
      </div>
    </div>
  );
}
