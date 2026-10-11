"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export default function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "Does SurakshaShield store my private messages or uploaded screenshots?",
      a: "No. SurakshaShield operates on a strictly stateless architecture. Content is parsed in memory, checked against threat heuristics and multimodal neural models, and discarded immediately after the response is generated. No user phone numbers, messages, or images are written to a database or shared with third parties.",
    },
    {
      q: "Why was an official-looking message from my electricity board or bank flagged as a scam?",
      a: "Scammers copy the exact language of legitimate companies. SurakshaShield looks at the sender address: under Indian telecom regulations (TRAI DLT), all genuine banks and government utilities must send SMS from an approved 6-character alphabetic header (e.g., VK-UPPCL, AX-SBIINB). If the message arrives from a standard 10-digit mobile number or WhatsApp, it is an illegal spoof.",
    },
    {
      q: "What is the 'Golden Hour' and why is dialing 1930 critical?",
      a: "The first 1 to 2 hours following a fraudulent transaction are known as the Golden Hour. Calling the National Cyber Crime Helpline at 1930 connects you with the Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS). This enables law enforcement to freeze the fraudster's beneficiary bank accounts before the money is cashed out at ATMs or converted to crypto.",
    },
    {
      q: "How does screenshot analysis work?",
      a: "When you upload or paste a screenshot (e.g., a WhatsApp chat, an APK download prompt, or a fake police notice), the system processes the image using optical character recognition (OCR) and multimodal vision models to check for counterfeit institutional seals, suspicious layout patterns, and malicious URLs.",
    },
    {
      q: "Can I connect my own Google Gemini API key?",
      a: "Yes. Click the 'AI Key' button in the top navigation bar to insert your free Google Gemini API key. Your key is stored solely in your browser's localStorage and transmitted securely directly to the analysis engine for personalized neural inference.",
    },
    {
      q: "Is SurakshaShield an official government application?",
      a: "SurakshaShield is an independent, open cyber intelligence initiative built to provide citizens with immediate second opinions before they click or pay. It formats reports compliant with official MHA and CFCFRMS standards to help you lodge formal complaints on cybercrime.gov.in.",
    },
  ];

  return (
    <section id="faq" className="w-full max-w-4xl mx-auto py-16 px-4 sm:px-6 scroll-mt-20">
      <div className="text-center space-y-2 mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center justify-center gap-1">
          <HelpCircle className="w-3.5 h-3.5" />
          Common Questions
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary">
          Understand how verification works, data privacy guarantees, and response protocols.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-surface border border-border rounded-xl overflow-hidden shadow-subtle transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-surface-elevated/40 transition-colors"
              >
                <span className="text-sm sm:text-base font-semibold text-text-primary pr-4">
                  {faq.q}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-accent flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-text-muted flex-shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-text-secondary leading-relaxed border-t border-border/40 bg-surface-elevated/20 animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
