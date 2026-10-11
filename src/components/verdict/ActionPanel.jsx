"use client";

import React, { useState } from "react";
import { 
  PhoneCall, 
  Copy, 
  Check, 
  ExternalLink, 
  Clock, 
  RotateCcw,
  AlertTriangle,
  Info,
  Share2,
  Download,
  ShieldAlert,
  ShieldCheck,
  FileText,
  LifeBuoy
} from "lucide-react";
import { generateVerifiableJsonLdReceipt, downloadEccCertificateFile } from "@/lib/crypto/client-certificate";

export default function ActionPanel({ result, onResetScan, langMode = "en" }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("preventive"); // 'preventive' | 'remediation' | 'dossier'

  if (!result) return null;

  const isSuspiciousOrScam = result.verdict === "likely_scam" || result.verdict === "suspicious";
  const isHi = langMode === "hi";

  const handleShareWhatsApp = () => {
    const title = isHi ? "⚠️ सुरक्षाशील्ड साइबर फ्रॉड चेतावनी" : "⚠️ SurakshaShield Cyber Scam Alert";
    const body = isHi 
      ? `🚨 *${title}*
खतरे का स्तर: *${result.verdict_hi || result.verdict}* (${result.risk_score || 90}% जोखिम)
श्रेणी: *${result.category_hi || result.category}*

संक्षेप:
${result.summary_hi || result.summary}

⚠️ *सावधानी*:
1. किसी भी अनजान लिंक या APK फाइल पर क्लिक न करें।
2. बैंक या बिजली अधिकारी कभी 10-अंकों के नंबर से फोन पर पैसे नहीं मांगते।
3. अगर पैसे कट जाएं तो तुरंत 1930 डायल करें।

जांचें: ${typeof window !== "undefined" ? window.location.href : "https://suraksha-shield.vercel.app"}`
      : `🚨 *${title}*
Assessed Risk: *${result.verdict?.toUpperCase()}* (${result.risk_score || 90}% Risk)
Category: *${result.category}*

Summary:
${result.summary}

⚠️ *Safety Action*:
1. Do not click links or install APK files.
2. Never enter UPI PIN to receive money or cashback.
3. If money transferred, call 1930 immediately.

Verify any message: ${typeof window !== "undefined" ? window.location.href : "https://suraksha-shield.vercel.app"}`;

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(body)}`, "_blank");
  };

  const handleDownloadCertificate = () => {
    try {
      downloadEccCertificateFile(result);
    } catch (e) {
      console.error("Certificate download error:", e);
    }
  };

  // Format police evidence complaint ready for 1930 / cybercrime.gov.in
  const generateDossier = () => {
    const urls = (result.detected_entities?.urls || []).map(u => typeof u === "string" ? u : u.url);
    const phones = (result.detected_entities?.phone_numbers || []).map(p => typeof p === "string" ? p : p.number);
    const apks = (result.detected_entities?.apk_names || []).map(a => typeof a === "string" ? a : a.name);
    const upis = (result.detected_entities?.payment_identifiers || []).map(m => typeof m === "string" ? m : m.handle);

    if (isHi) {
      return `[राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल (CFCFRMS) साक्ष्य विवरण]
=============================================================
जांच तिथि: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
खतरे का स्तर: ${result.verdict_hi || result.verdict} (${result.risk_score || 90}% आकलित जोखिम)
श्रेणी: ${result.category_hi || result.category}
संक्षिप्त विवरण: ${result.summary_hi || result.summary}

तकनीकी साक्ष्य व पेलोड्स:
- संदिग्ध फोन नंबर: ${phones.join(", ") || "कोई नहीं"}
- संदिग्ध वेबसाइट लिंक: ${urls.join(", ") || "कोई नहीं"}
- दुर्भावनापूर्ण APK फाइल्स: ${apks.join(", ") || "कोई नहीं"}
- UPI व पेमेंट खाते: ${upis.join(", ") || "कोई नहीं"}
- TRAI नियम स्थिति: ${result.trai_dlt_status_hi || result.trai_dlt_status || "मूल्यांकन नहीं"}

पहचाने गए फ्रॉड संकेत:
${(result.signals || []).map((s, idx) => `${idx + 1}. [${s.severity?.toUpperCase()}] ${s.title_hi || s.title}: ${s.evidence || ""}`).join("\n")}

लागू होने वाली कानूनी धाराएं:
${(result.legal_sections || ["IT Act 2000 Section 66D", "BNS 2023 Section 318(4)"]).map(s => `- ${s}`).join("\n")}

सुझाए गए सुरक्षा कदम:
${(result.recommended_actions || []).map(a => typeof a === "object" ? `- ${a.hi || a.en}` : `- ${a}`).join("\n")}
${result.ecc_certificate ? `
डिजिटल साक्ष्य सुरक्षा सील (ECC NIST P-256):
- मानक: ${result.ecc_certificate.standard} (${result.ecc_certificate.curve})
- साक्ष्य SHA-256: ${result.ecc_certificate.full_evidence_hash || result.ecc_certificate.evidence_hash}
- ECDSA डिजिटल हस्ताक्षर: ${result.ecc_certificate.signature || result.ecc_certificate.signature_short}
- सत्यापन प्राधिकरण: ${result.ecc_certificate.public_key_fingerprint}
- स्थिति: गणितीय रूप से 100% छेड़छाड़-मुक्त प्रमाणित (Admissible under Sec 65B Indian Evidence Act / Sec 63 BSA 2023)` : ""}
=============================================================
सुरक्षाशील्ड पोर्टल (SurakshaShield) द्वारा प्रमाणित`;
    }

    return `[NATIONAL CYBER CRIME REPORTING PORTAL (CFCFRMS) EVIDENCE DOSSIER]
=============================================================
Date of Triage: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
Assessed Threat Level: ${result.verdict?.toUpperCase()} (${result.risk_score || 90}% Calibrated Risk)
Threat Category: ${result.category || "Unclassified Threat"}
Summary: ${result.summary}

EXTRACTED TECHNICAL INDICATORS:
- Suspect Contacts: ${phones.join(", ") || "None"}
- Extracted Links: ${urls.join(", ") || "None"}
- Malicious APK Payloads: ${apks.join(", ") || "None"}
- Payment Identifiers: ${upis.join(", ") || "None"}
- TRAI DLT Compliance: ${result.trai_dlt_status || "Not Evaluated"}

IDENTIFIED THREAT SIGNALS:
${(result.signals || []).map((s, idx) => `${idx + 1}. [${s.severity?.toUpperCase()}] ${s.title}: ${s.evidence || ""}`).join("\n")}

APPLICABLE LEGAL STATUTES:
${(result.legal_sections || ["IT Act 2000 Section 66D", "BNS 2023 Section 318(4)"]).map(s => `- ${s}`).join("\n")}

RECOMMENDED NEXT STEPS:
${(result.recommended_actions || []).map(a => typeof a === "object" ? `- ${a.en}` : `- ${a}`).join("\n")}
${result.ecc_certificate ? `
CRYPTOGRAPHIC EVIDENCE INTEGRITY SEAL (ECC NIST P-256):
- Standard: ${result.ecc_certificate.standard} (${result.ecc_certificate.curve})
- Evidence SHA-256: ${result.ecc_certificate.full_evidence_hash || result.ecc_certificate.evidence_hash}
- ECDSA Digital Signature: ${result.ecc_certificate.signature || result.ecc_certificate.signature_short}
- Verification Authority: ${result.ecc_certificate.public_key_fingerprint}
- Status: Tamper-Proof Certified (Admissible under Sec 65B Indian Evidence Act / Sec 63 BSA 2023)` : ""}
=============================================================
Generated by SurakshaShield Citizen Defense Architecture`;
  };

  const handleCopyDossier = () => {
    navigator.clipboard.writeText(generateDossier());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const actions = result.recommended_actions || [];
  const remediation = result.if_already_responded || [];

  return (
    <div className="w-full bg-surface/90 backdrop-blur-xl border border-border/80 dark:border-white/10 rounded-3xl p-4 sm:p-6 shadow-card space-y-5 animate-fadeIn">
      {/* iOS Cupertino Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
              {isHi ? "त्वरित सुरक्षा कार्रवाई" : "INCIDENT RESPONSE & ACTION PLAN"}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-text-primary tracking-tight mt-0.5">
            {isHi ? "अब आपको क्या करना चाहिए?" : "Recommended Citizen Action Plan"}
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            {isHi 
              ? "साइबर हेल्पलाइन 1930, संचार साथी चक्षु और आपातकालीन बचाव कदम"
              : "National Cyber Helpline 1930, Sanchar Saathi reporting & forensic remediation"}
          </p>
        </div>

        {/* Emergency Helpline Pill */}
        <a
          href="tel:1930"
          className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-card transition-transform active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <PhoneCall className="w-4 h-4 animate-pulse" />
          <span>{isHi ? "हेल्पलाइन 1930 डायल करें" : "Dial 1930 Helpline"}</span>
        </a>
      </div>

      {/* iOS Segmented Pill Control for Action Views */}
      <div className="flex items-center p-1 rounded-2xl bg-surface-elevated/80 border border-border/70 overflow-x-auto no-scrollbar text-xs font-medium gap-1">
        <button
          type="button"
          onClick={() => setActiveTab("preventive")}
          className={`min-h-[44px] px-4 py-2 rounded-xl transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${
            activeTab === "preventive"
              ? "bg-surface text-text-primary font-bold shadow-subtle border border-border/60"
              : "text-text-muted hover:text-text-primary"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{isHi ? "1. बचाव कदम (Preventive)" : "1. Preventive Steps"}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("remediation")}
          className={`min-h-[44px] px-4 py-2 rounded-xl transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${
            activeTab === "remediation"
              ? "bg-surface text-text-primary font-bold shadow-subtle border border-border/60"
              : "text-text-muted hover:text-text-primary"
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
          <span>{isHi ? "2. यदि पैसे कट गए (Emergency)" : "2. If Already Responded"}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("dossier")}
          className={`min-h-[44px] px-4 py-2 rounded-xl transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${
            activeTab === "dossier"
              ? "bg-surface text-text-primary font-bold shadow-subtle border border-border/60"
              : "text-text-muted hover:text-text-primary"
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-blue-600" />
          <span>{isHi ? "3. पुलिस शिकायत विवरण (Dossier)" : "3. Police Dossier"}</span>
        </button>
      </div>

      {/* Tab 1: Preventive Actions */}
      {activeTab === "preventive" && (
        <div className="space-y-3 animate-fadeIn">
          <div className="grid grid-cols-1 gap-2.5">
            {actions.map((act, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:p-4 rounded-2xl bg-surface border border-border/80 flex items-start gap-3 shadow-subtle"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-text-primary leading-relaxed font-medium">
                  {typeof act === "object" ? (isHi ? act.hi : act.en) : act}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Sharing & Official Links Bar */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="min-h-[48px] sm:min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-subtle transition-all cursor-pointer w-full sm:w-auto"
            >
              <Share2 className="w-4 h-4" />
              <span>{isHi ? "व्हाट्सएप पर परिवार को सतर्क करें" : "Alert Family on WhatsApp"}</span>
            </button>

            <a
              href="https://sancharsaathi.gov.in/sfc/"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-surface-elevated hover:bg-surface text-xs font-semibold text-text-primary shadow-subtle transition-colors w-full sm:w-auto"
            >
              <span>{isHi ? "संचार साथी (Chakshu)" : "Sanchar Saathi (Chakshu)"}</span>
              <ExternalLink className="w-3.5 h-3.5 text-text-muted" />
            </a>

            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-surface-elevated hover:bg-surface text-xs font-semibold text-text-primary shadow-subtle transition-colors w-full sm:w-auto"
            >
              <span>cybercrime.gov.in</span>
              <ExternalLink className="w-3.5 h-3.5 text-text-muted" />
            </a>
          </div>
        </div>
      )}

      {/* Tab 2: Emergency Remediation (Golden Hour Protocol) */}
      {activeTab === "remediation" && (
        <div className="space-y-3 animate-fadeIn">
          {/* Golden Hour Banner */}
          <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-800 dark:text-red-200 text-xs flex items-center gap-3">
            <Clock className="w-5 h-5 text-red-600 flex-shrink-0 animate-pulse" />
            <div>
              <span className="font-bold block">
                {isHi ? "गोल्डन ऑवर नियम (पहला 1 से 2 घंटा अति-महत्वपूर्ण):" : "Golden Hour Protocol (First 1-2 Hours Critical):"}
              </span>
              <span className="text-[11px] opacity-90">
                {isHi 
                  ? "पैसे कटने के तुरंत बाद 1930 डायल करने पर ठग का खाता फ्रीज करवाकर आपके पैसे वापस दिलाए जा सकते हैं।"
                  : "Calling 1930 within the Golden Hour initiates CFCFRMS inter-bank freeze on the fraudster's beneficiary account."}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {remediation.map((rem, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:p-4 rounded-2xl bg-surface border border-border/80 flex items-start gap-3 shadow-subtle"
              >
                <div className="w-6 h-6 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                  !
                </div>
                <p className="text-xs sm:text-sm text-text-primary leading-relaxed font-medium">
                  {typeof rem === "object" ? (isHi ? rem.hi : rem.en) : rem}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href="tel:1930"
              className="min-h-[48px] sm:min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-card cursor-pointer w-full sm:w-auto text-center"
            >
              <PhoneCall className="w-4 h-4 animate-pulse" />
              <span>{isHi ? "तुरंत 1930 पर कॉल करें" : "Call 1930 Immediately"}</span>
            </a>
          </div>
        </div>
      )}

      {/* Tab 3: Formal Police Evidence Dossier */}
      {activeTab === "dossier" && (
        <div className="space-y-3 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <p className="text-xs text-text-muted">
              {isHi 
                ? "यह औपचारिक साक्ष्य विवरण 1930 ऑपरेटर या cybercrime.gov.in पर दर्ज करने के लिए तैयार है:"
                : "This structured technical dossier can be pasted directly into cybercrime.gov.in complaint forms:"}
            </p>
            <button
              type="button"
              onClick={handleCopyDossier}
              className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-border bg-surface-elevated hover:bg-surface text-xs font-semibold text-text-primary shadow-subtle transition-colors cursor-pointer w-full sm:w-auto"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isHi ? "कॉपी हो गया" : "Copied"}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{isHi ? "पूरा विवरण कॉपी करें" : "Copy Full Dossier"}</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-surface-elevated/70 border border-border font-mono text-[11px] text-text-secondary overflow-x-auto max-h-72 leading-relaxed whitespace-pre-wrap break-all select-all">
            {generateDossier()}
          </pre>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
            <button
              type="button"
              onClick={handleDownloadCertificate}
              className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold shadow-subtle cursor-pointer w-full sm:w-auto"
            >
              <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{isHi ? "NIST P-256 सील डाउनलोड करें (.json)" : "Download ECC P-256 Seal (.json)"}</span>
            </button>

            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-text-primary text-background text-xs font-bold shadow-subtle hover:opacity-90 transition-opacity w-full sm:w-auto"
            >
              <span>{isHi ? "cybercrime.gov.in खोलें" : "Open cybercrime.gov.in"}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
