"use client";

import React from "react";
import { ShieldCheck, ExternalLink, Lock, PhoneCall } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-surface text-text-secondary transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand & Mission */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-semibold text-text-primary text-base">
                Suraksha<span className="text-accent">Shield</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-text-muted max-w-sm">
              Calm, intelligent, and explainable scam intelligence. Helping everyday citizens, families, and organizations verify suspicious digital communications before financial loss occurs.
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-xs text-text-secondary">
              <Lock className="w-3.5 h-3.5 text-accent" />
              <span>Stateless &amp; Private: Zero persistent storage of submissions.</span>
            </div>
          </div>

          {/* Product Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary">
              Product Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#scanner" className="hover:text-text-primary transition-colors">
                  Universal Threat Scanner
                </a>
              </li>
              <li>
                <a href="#scanner" className="hover:text-text-primary transition-colors">
                  Screenshot &amp; Chat OCR
                </a>
              </li>
              <li>
                <a href="#scanner" className="hover:text-text-primary transition-colors">
                  Suspicious Link Checker
                </a>
              </li>
              <li>
                <a href="#scanner" className="hover:text-text-primary transition-colors">
                  TRAI DLT Header Audit
                </a>
              </li>
              <li>
                <a href="#scanner" className="hover:text-text-primary transition-colors">
                  1930 Dossier Generator
                </a>
              </li>
            </ul>
          </div>

          {/* Threat Directory */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary">
              Threat Typologies
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#threats" className="hover:text-text-primary transition-colors">
                  Digital Arrest &amp; Police
                </a>
              </li>
              <li>
                <a href="#threats" className="hover:text-text-primary transition-colors">
                  Electricity Disconnection
                </a>
              </li>
              <li>
                <a href="#threats" className="hover:text-text-primary transition-colors">
                  UPI Collect &amp; PIN Traps
                </a>
              </li>
              <li>
                <a href="#threats" className="hover:text-text-primary transition-colors">
                  Bank KYC Phishing
                </a>
              </li>
              <li>
                <a href="#threats" className="hover:text-text-primary transition-colors">
                  Task &amp; Part-Time Fraud
                </a>
              </li>
            </ul>
          </div>

          {/* Official Hotlines & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary">
              Official Indian Hotlines
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="tel:1930"
                  className="flex items-center gap-1 text-red-600 dark:text-red-400 font-semibold hover:underline"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>1930 Cyber Helpline</span>
                </a>
              </li>
              <li>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-text-primary transition-colors"
                >
                  <span>cybercrime.gov.in (MHA)</span>
                  <ExternalLink className="w-3 h-3 text-text-muted" />
                </a>
              </li>
              <li>
                <a
                  href="https://sancharsaathi.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-text-primary transition-colors"
                >
                  <span>Sanchar Saathi (CEIR)</span>
                  <ExternalLink className="w-3 h-3 text-text-muted" />
                </a>
              </li>
              <li>
                <a
                  href="https://rbikehtahai.rbi.org.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-text-primary transition-colors"
                >
                  <span>RBI Kehta Hai</span>
                  <ExternalLink className="w-3 h-3 text-text-muted" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Statutory Notice */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <div className="text-[11px] leading-relaxed max-w-xl">
            SurakshaShield is an independent threat advisory utility. If financial loss has occurred, call <strong>1930</strong> immediately within the Golden Hour. Compliant with Digital Personal Data Protection (DPDP) Act 2023.
          </div>
          <div className="flex items-center gap-4 text-xs flex-shrink-0">
            <a href="#how-it-works" className="hover:text-text-primary transition-colors">
              How It Works
            </a>
            <span>•</span>
            <a href="#family-safety" className="hover:text-text-primary transition-colors">
              Family Guide
            </a>
            <span>•</span>
            <a href="#faq" className="hover:text-text-primary transition-colors">
              FAQ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
