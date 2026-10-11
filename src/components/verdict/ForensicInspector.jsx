"use client";

import React, { useState } from "react";
import { 
  Phone, 
  Globe, 
  Package, 
  CreditCard, 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Radio, 
  Smartphone,
  Ban,
  ArrowUpRight,
  Info
} from "lucide-react";

export default function ForensicInspector({ result, langMode = "en" }) {
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'phones' | 'links' | 'apks' | 'upi'
  const [copiedItem, setCopiedItem] = useState(null);

  if (!result || !result.detected_entities) return null;

  const entities = result.detected_entities;
  const isHi = langMode === "hi";

  // Normalize entities
  const phones = (entities.phone_numbers || []).map((p) => 
    typeof p === "string" ? { number: p, type: "personal_mobile", risk_flag: "Unverified personal mobile claiming institutional entity (TRAI DLT Violation)", risk_flag_hi: "निजी मोबाइल नंबर (TRAI सरकारी नियम का उल्लंघन)" } : p
  );

  const urls = (entities.urls || []).map((u) => 
    typeof u === "string" ? { 
      url: u, 
      domain: u.replace(/^https?:\/\//, "").split("/")[0], 
      is_shortener: u.includes("bit.ly") || u.includes("tinyurl") || u.includes("wa.me"),
      tld_risk: /\.(xyz|top|click|site|live|app|icu)$/i.test(u) ? "high" : "medium",
      risk_flag: "External link requiring manual verification",
      risk_flag_hi: "अपुष्ट बाहरी वेब पोर्टल"
    } : u
  );

  const apks = (entities.apk_names || []).map((a) => 
    typeof a === "string" ? {
      name: a,
      package_risk: "critical",
      trojan_type: "Banking Remote Access Trojan / SMS Harvester",
      dangerous_permissions: ["READ_SMS", "RECEIVE_SMS", "ACCESSIBILITY_SERVICE", "BIND_DEVICE_ADMIN"],
      remediation: "Enable Airplane Mode, remove from Device Admin Apps, and perform factory reset.",
      remediation_hi: "तुरंत एयरप्लेन मोड ऑन करें, डिवाइस एडमिन अधिकार हटाएं और फोन रीसेट करें।"
    } : a
  );

  const upis = (entities.payment_identifiers || []).map((pm) => 
    typeof pm === "string" ? {
      handle: pm,
      provider: pm.split("@")[1] || "UPI VPA",
      deception_type: "P2P Payment Request Solicitation",
      risk_flag: "Personal UPI ID soliciting funds under institutional pretext. Entering PIN deducts money!",
      risk_flag_hi: "व्यक्तिगत UPI खाता। पैसे प्राप्त करने के लिए कभी भी UPI पिन नहीं डाला जाता!"
    } : pm
  );

  const totalIndicators = phones.length + urls.length + apks.length + upis.length;
  if (totalIndicators === 0) return null;

  const handleCopy = (text, id) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <div className="w-full bg-surface/90 backdrop-blur-xl border border-border/80 dark:border-white/10 rounded-3xl p-4 sm:p-6 shadow-card space-y-5 animate-fadeIn">
      {/* iOS Cupertino Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-accent font-bold">
              {isHi ? "फोरेंसिक जांच उपकरण" : "FORENSIC ENTITY INSPECTOR"}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-text-primary tracking-tight mt-0.5">
            {isHi ? "निकाले गए तकनीकी सबूत व खतरे" : "Extracted Threat Indicators & Vectors"}
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            {isHi 
              ? "फोन नंबर, वेबसाइट लिंक, खतरनाक APK ऐप्स और UPI खातों की गहराई से जांच" 
              : "Granular audit of suspect phone numbers, phishing URLs, malicious APK trojans & UPI VPAs"}
          </p>
        </div>

        {/* Total Badge */}
        <div className="self-start sm:self-auto px-3 py-1 rounded-full bg-surface-elevated border border-border text-xs font-semibold text-text-primary flex items-center gap-1.5 shadow-subtle">
          <span>{isHi ? "कुल पहचाने गए पेलोड्स:" : "Detected Entities:"}</span>
          <span className="w-5 h-5 rounded-full bg-accent text-white text-[11px] font-mono font-bold flex items-center justify-center">
            {totalIndicators}
          </span>
        </div>
      </div>

      {/* iOS Segmented Pill Control for Tabs */}
      <div className="flex items-center p-1 rounded-2xl bg-surface-elevated/80 border border-border/70 overflow-x-auto no-scrollbar text-xs font-medium gap-1">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`min-h-[44px] px-3 sm:px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
            activeTab === "all"
              ? "bg-surface text-text-primary font-bold shadow-subtle border border-border/60"
              : "text-text-muted hover:text-text-primary"
          }`}
        >
          <span>{isHi ? "सभी सबूत" : "All Indicators"}</span>
          <span className="px-1.5 py-0.2 rounded-md bg-accent-subtle text-accent text-[10px] font-mono font-bold">
            {totalIndicators}
          </span>
        </button>

        {phones.length > 0 && (
          <button
            type="button"
            onClick={() => setActiveTab("phones")}
            className={`min-h-[44px] px-3 sm:px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
              activeTab === "phones"
                ? "bg-surface text-text-primary font-bold shadow-subtle border border-border/60"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-blue-500" />
            <span>{isHi ? "फोन नंबर" : "Phones"}</span>
            <span className="px-1.5 py-0.2 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300 text-[10px] font-mono font-bold">
              {phones.length}
            </span>
          </button>
        )}

        {urls.length > 0 && (
          <button
            type="button"
            onClick={() => setActiveTab("links")}
            className={`min-h-[44px] px-3 sm:px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
              activeTab === "links"
                ? "bg-surface text-text-primary font-bold shadow-subtle border border-border/60"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-purple-500" />
            <span>{isHi ? "वेबसाइट लिंक" : "Links & URLs"}</span>
            <span className="px-1.5 py-0.2 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300 text-[10px] font-mono font-bold">
              {urls.length}
            </span>
          </button>
        )}

        {apks.length > 0 && (
          <button
            type="button"
            onClick={() => setActiveTab("apks")}
            className={`min-h-[44px] px-3 sm:px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
              activeTab === "apks"
                ? "bg-surface text-text-primary font-bold shadow-subtle border border-border/60"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <Package className="w-3.5 h-3.5 text-red-500" />
            <span>{isHi ? "APK ऐप्स" : "APK Payloads"}</span>
            <span className="px-1.5 py-0.2 rounded-md bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-300 text-[10px] font-mono font-bold animate-pulse">
              {apks.length}
            </span>
          </button>
        )}

        {upis.length > 0 && (
          <button
            type="button"
            onClick={() => setActiveTab("upi")}
            className={`min-h-[44px] px-3 sm:px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
              activeTab === "upi"
                ? "bg-surface text-text-primary font-bold shadow-subtle border border-border/60"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-amber-500" />
            <span>{isHi ? "UPI खाते" : "UPI Handles"}</span>
            <span className="px-1.5 py-0.2 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-[10px] font-mono font-bold">
              {upis.length}
            </span>
          </button>
        )}
      </div>

      {/* Grouped Inset Content List */}
      <div className="space-y-4">
        {/* 1. Phone Numbers Section */}
        {(activeTab === "all" || activeTab === "phones") && phones.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-text-primary">
              <Phone className="w-4 h-4 text-blue-500" />
              <span>{isHi ? "संदिग्ध फोन नंबर व दूरसंचार ऑडिट" : "Phone Numbers & Telecom Header Audit"}</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {phones.map((p, idx) => (
                <div
                  key={`phone-${idx}`}
                  className="p-3.5 sm:p-4 rounded-2xl bg-surface border border-border/80 shadow-subtle space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-black text-text-primary tracking-wide">
                        {p.number}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/60">
                        {isHi ? "TRAI उल्लंघन: 10-अंकों का नंबर" : "TRAI DLT Violation"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopy(p.number, `phone-${idx}`)}
                        className="min-h-[44px] px-3 py-1.5 rounded-xl border border-border bg-surface-elevated hover:bg-surface text-xs font-semibold text-text-secondary hover:text-text-primary flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Copy phone number"
                      >
                        {copiedItem === `phone-${idx}` ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{isHi ? "कॉपी हुआ" : "Copied"}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>{isHi ? "नंबर कॉपी" : "Copy"}</span>
                          </>
                        )}
                      </button>

                      <a
                        href="https://sancharsaathi.gov.in/sfc/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-subtle transition-all cursor-pointer"
                      >
                        <span>{isHi ? "चक्षु पोर्टल पर रिपोर्ट करें" : "Report to Chakshu"}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed bg-surface-elevated/40 p-2.5 rounded-xl border border-border/60">
                    <span className="font-bold text-text-primary">
                      {isHi ? "खतरा विश्लेषण: " : "Risk Assessment: "}
                    </span>
                    {isHi ? (p.risk_flag_hi || p.risk_flag) : p.risk_flag}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Links & URLs Section */}
        {(activeTab === "all" || activeTab === "links") && urls.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-text-primary">
              <Globe className="w-4 h-4 text-purple-500" />
              <span>{isHi ? "संदिग्ध वेबसाइट लिंक्स व डोमेन विश्लेषण" : "Extracted Web Links & Domain Safety"}</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {urls.map((u, idx) => (
                <div
                  key={`url-${idx}`}
                  className="p-3.5 sm:p-4 rounded-2xl bg-surface border border-border/80 shadow-subtle space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs sm:text-sm font-bold text-red-600 dark:text-red-400 break-all">
                          {u.url}
                        </span>
                        {u.is_shortener && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                            {isHi ? "शॉर्ट लिंक (छिपाया गया)" : "Shortened Link"}
                          </span>
                        )}
                        {u.tld_risk === "high" && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300">
                            {isHi ? "अति-संवेदनशील TLD" : "High-Risk TLD"}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-text-muted mt-0.5 block">
                        Domain: {u.domain}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => handleCopy(u.url, `url-${idx}`)}
                        className="min-h-[44px] px-3 py-1.5 rounded-xl border border-border bg-surface-elevated hover:bg-surface text-xs font-semibold text-text-secondary hover:text-text-primary flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Copy link for cybercrime complaint"
                      >
                        {copiedItem === `url-${idx}` ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{isHi ? "कॉपी हुआ" : "Copied"}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>{isHi ? "लिंक कॉपी" : "Copy Link"}</span>
                          </>
                        )}
                      </button>

                      <div className="min-h-[44px] px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-300 text-xs font-bold flex items-center gap-1">
                        <Ban className="w-3.5 h-3.5" />
                        <span>{isHi ? "न खोलें" : "Do Not Open"}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed bg-surface-elevated/40 p-2.5 rounded-xl border border-border/60">
                    <span className="font-bold text-text-primary">
                      {isHi ? "सुरक्षा चेतावनी: " : "Security Advisory: "}
                    </span>
                    {isHi ? (u.risk_flag_hi || u.risk_flag) : u.risk_flag}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. APK Trojans Section */}
        {(activeTab === "all" || activeTab === "apks") && apks.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-red-600 dark:text-red-400">
              <Package className="w-4 h-4" />
              <span>{isHi ? "एंड्रॉइड APK ट्रोजन मैलवेयर चेतावनी" : "Android APK Malware & Trojan Vector"}</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {apks.map((a, idx) => (
                <div
                  key={`apk-${idx}`}
                  className="p-4 rounded-2xl bg-red-50/50 dark:bg-red-950/30 border-2 border-red-300 dark:border-red-900/70 shadow-subtle space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm sm:text-base font-black text-red-700 dark:text-red-300 tracking-wide">
                          {a.name}
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-red-600 text-white animate-pulse">
                          CRITICAL MALWARE
                        </span>
                      </div>
                      <span className="text-xs font-bold text-text-primary mt-1 block">
                        {a.trojan_type}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(a.name, `apk-${idx}`)}
                      className="min-h-[44px] px-3.5 py-1.5 rounded-xl border border-red-300 dark:border-red-800 bg-surface text-xs font-semibold text-text-primary hover:bg-surface-elevated flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
                    >
                      {copiedItem === `apk-${idx}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{isHi ? "कॉपी हुआ" : "Copied"}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{isHi ? "APK नाम कॉपी" : "Copy Name"}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Abuse Permissions */}
                  {a.dangerous_permissions && a.dangerous_permissions.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted block">
                        {isHi ? "यह ऐप आपके फोन से क्या चुरा सकता है:" : "Dangerous Android Permissions Abused:"}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {a.dangerous_permissions.map((perm, pIdx) => (
                          <span
                            key={pIdx}
                            className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-surface border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-300"
                          >
                            ⚠️ {perm}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Emergency Disinfection Protocol */}
                  <div className="p-3 rounded-xl bg-surface border border-red-200 dark:border-red-900 text-xs space-y-1">
                    <span className="font-bold text-red-600 dark:text-red-400 block text-[11px] uppercase tracking-wider">
                      {isHi ? "🚨 आपातकालीन बचाव निर्देश:" : "🚨 Emergency Removal Protocol:"}
                    </span>
                    <p className="text-text-secondary leading-relaxed">
                      {isHi ? (a.remediation_hi || a.remediation) : a.remediation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. UPI Handles Section */}
        {(activeTab === "all" || activeTab === "upi") && upis.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
              <CreditCard className="w-4 h-4" />
              <span>{isHi ? "UPI व पेमेंट खाते (रिवर्स पेमेंट जाल)" : "UPI Payment Handles & Collect PIN Traps"}</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {upis.map((pm, idx) => (
                <div
                  key={`upi-${idx}`}
                  className="p-3.5 sm:p-4 rounded-2xl bg-surface border border-border/80 shadow-subtle space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base font-bold text-red-600 dark:text-red-400">
                          {pm.handle}
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                          {isHi ? "रिवर्स UPI ट्रैप" : "Collect PIN Trap"}
                        </span>
                      </div>
                      <span className="text-[11px] text-text-muted mt-0.5 block">
                        Provider: {pm.provider}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopy(pm.handle, `upi-${idx}`)}
                        className="min-h-[44px] px-3 py-1.5 rounded-xl border border-border bg-surface-elevated hover:bg-surface text-xs font-semibold text-text-secondary hover:text-text-primary flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {copiedItem === `upi-${idx}` ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{isHi ? "कॉपी हुआ" : "Copied"}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>{isHi ? "VPA कॉपी" : "Copy VPA"}</span>
                          </>
                        )}
                      </button>

                      <a
                        href="https://www.npci.org.in/what-we-do/upi/dispute-redressal-mechanism"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1 shadow-subtle transition-all cursor-pointer"
                      >
                        <span>{isHi ? "NPCI विवाद दर्ज करें" : "Dispute on NPCI"}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed bg-surface-elevated/40 p-2.5 rounded-xl border border-border/60">
                    <span className="font-bold text-text-primary">
                      {isHi ? "सावधानी: " : "Critical Rule: "}
                    </span>
                    {isHi ? (pm.risk_flag_hi || pm.risk_flag) : pm.risk_flag}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
