"use client";

import React, { useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import TopBanner from "@/components/layout/TopBanner";
import Footer from "@/components/layout/Footer";
import ScamScanner from "@/components/scanner/ScamScanner";
import ScanProgress from "@/components/scanner/ScanProgress";
import VerdictCard from "@/components/verdict/VerdictCard";
import ForensicInspector from "@/components/verdict/ForensicInspector";
import EvidenceList from "@/components/verdict/EvidenceList";
import ActionPanel from "@/components/verdict/ActionPanel";
import HowItWorks from "@/components/content/HowItWorks";
import ThreatCategories from "@/components/content/ThreatCategories";
import ScamDirectory from "@/components/content/ScamDirectory";
import TrustSection from "@/components/content/TrustSection";
import FamilySafety from "@/components/content/FamilySafety";
import IntelligenceComparison from "@/components/content/IntelligenceComparison";
import FaqAccordion from "@/components/content/FaqAccordion";
import FinalCTA from "@/components/content/FinalCTA";
import { 
  Lock, 
  Radio, 
  PhoneCall, 
  CheckCircle2, 
  Sparkles 
} from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [lastScanInput, setLastScanInput] = useState({ hasImage: false });
  const [langMode, setLangMode] = useState("en"); // 'en' | 'hi'

  const resultsRef = useRef(null);
  const scannerRef = useRef(null);

  const handleAnalyze = async ({ content, imageBase64, mimeType, inputType }) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setLastScanInput({ hasImage: Boolean(imageBase64) });

    // Instantly scroll down on mobile so user sees live scan progress
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          imageBase64,
          mimeType,
          inputType,
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Rate limit exceeded. Please wait a few moments before trying again.");
        }
        throw new Error(`Analysis service responded with status ${response.status}`);
      }

      const data = await response.json();
      setResult(data);

      // Smooth scroll down to final verdict results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    } catch (err) {
      console.error("Scan Error:", err);
      setError(err?.message || "An error occurred during threat analysis. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetScan = () => {
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectExampleFromDirectory = (sampleText) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    handleAnalyze({
      content: sampleText,
      imageBase64: null,
      mimeType: "image/jpeg",
      inputType: "auto",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary selection:bg-accent/20 selection:text-accent font-sans">
      {/* Top Announcement Bar (Phase 5) */}
      <TopBanner />

      {/* Sticky Header (Phase 4) */}
      <Navbar langMode={langMode} setLangMode={setLangMode} />

      {/* Main Experience */}
      <main className="flex-1 w-full">
        {/* HERO & CENTRAL SCANNER (Phases 6 & 7) */}
        <section className="relative px-3 sm:px-6 pt-6 pb-12 sm:pt-14 sm:pb-16 max-w-6xl mx-auto text-center space-y-5 sm:space-y-6">
          {/* Subtle warm ambient backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

          {/* Central Universal Scanner (Immediately above the fold) */}
          <div ref={scannerRef}>
            <ScamScanner
              onAnalyze={handleAnalyze}
              isLoading={loading}
              error={error}
            />
          </div>

          {/* Trust Signal Badges under Scanner (Clean 2x2 Grid on Mobile, Flex on Laptop) */}
          <div className="pt-2 sm:pt-4 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 sm:gap-6 text-[10px] sm:text-xs text-text-muted max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-surface-elevated/40 sm:bg-transparent border border-border/50 sm:border-none">
              <Lock className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              <span>Stateless &amp; Private</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-surface-elevated/40 sm:bg-transparent border border-border/50 sm:border-none">
              <Radio className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              <span className="truncate">TRAI DLT Verified</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-surface-elevated/40 sm:bg-transparent border border-border/50 sm:border-none">
              <PhoneCall className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              <span className="truncate">1930 Helpline Match</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-surface-elevated/40 sm:bg-transparent border border-border/50 sm:border-none">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              <span>No Signup Required</span>
            </div>
          </div>
        </section>

        {/* RESULTS OR LOADING SECTION (Expansive on Laptop, Fluid on Mobile) */}
        {(loading || result) && (
          <section
            ref={resultsRef}
            className="w-full max-w-5xl mx-auto px-3 sm:px-6 pb-16 sm:pb-24 scroll-mt-24 space-y-6 sm:space-y-8"
          >
            {loading && (
              <ScanProgress hasImage={lastScanInput.hasImage} />
            )}

            {result && !loading && (
              <>
                <VerdictCard
                  result={result}
                  onResetScan={handleResetScan}
                  langMode={langMode}
                  setLangMode={setLangMode}
                />

                <ForensicInspector
                  result={result}
                  langMode={langMode}
                />

                <EvidenceList 
                  result={result} 
                  langMode={langMode} 
                />

                <ActionPanel
                  result={result}
                  onResetScan={handleResetScan}
                  langMode={langMode}
                />
              </>
            )}
          </section>
        )}

        {/* HOW IT WORKS (Phase 29) */}
        <HowItWorks />

        {/* THREAT CATEGORIES (Phase 26) */}
        <ThreatCategories onSelectCategory={() => {}} />

        {/* THREATS PEOPLE ARE CHECKING / SCAM DIRECTORY (Phase 27 & 28) */}
        <ScamDirectory onSelectExample={handleSelectExampleFromDirectory} />

        {/* TRUST SECTION: BUILT FOR EVERYDAY CITIZENS (Phase 30) */}
        <TrustSection />

        {/* FAMILY & SENIOR CITIZEN SAFETY (Phase 31) */}
        <FamilySafety />

        {/* COMPARATIVE INTELLIGENCE MATRIX */}
        <IntelligenceComparison />

        {/* FAQ (Phase 32) */}
        <FaqAccordion />

        {/* FINAL CTA (Phase 33) */}
        <FinalCTA />
      </main>

      {/* FOOTER (Phase 34) */}
      <Footer />
    </div>
  );
}
