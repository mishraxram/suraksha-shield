# SurakshaShield Architecture: gstack & ECC Hybrid Engine

SurakshaShield is a stateless cyber defense, threat triage, and cryptographic evidence sealing platform designed for Indian citizens, enterprise workers, and law enforcement.

It synthesizes design paradigms from two state-of-the-art frameworks:
1. **gstack** (Garry Tan's Anti-Slop, Industrial Engineering, & Virality Factory):
   - Zero-latency 1-click interactive demo scenarios (Electricity Cutoff, CBI Digital Arrest, Fake Cashback, Bank KYC, Safe Amazon OTP).
   - Utilitarian visual hierarchy with responsive Threat Probability Meter & Semicircular SVG Gauge (`ThreatGauge.jsx`).
   - High-contrast, accessibility-first design with >= 44px mobile touch targets and 16px font to prevent auto-zoom on iOS/Android.
   - Single-tap viral WhatsApp community alerting for elder and family protection.

2. **ECC** (Everything Claude Code / Agent Operating System by Affaan Mustafa):
   - **Multi-Agent Pipeline Harness**: 5 specialized agents working in sequential triage.
   - **AgentShield v2.4**: Hardened prompt injection and delimiter breakout defense.
   - **Cryptographic Authority**: NIST P-256 (ECDSA secp256r1 / SHA-256) evidence sealing with JSON-LD certificate export compliant with Section 65B Indian Evidence Act 1872 & Section 63 Bharatiya Sakshya Adhiniyam (BSA) 2023.

---

## 1. Multi-Agent Pipeline Trace

```
[Raw User Input (Text / OCR Screenshot)]
               │
               ▼
┌───────────────────────────────────────────────┐
│ 1. AgentShield Guard                          │
│    - Unicode normalization (NFKC)             │
│    - Zero-width & directional override strip  │
│    - Adversarial jailbreak & prompt filter    │
└──────────────────────┬────────────────────────┘
                       │ Sanitized Payload
                       ▼
┌───────────────────────────────────────────────┐
│ 2. DLT Telecom Auditor                        │
│    - TRAI 6-character sender header inspection│
│    - 10-digit SIM disconnection fraud check   │
│    - Official utility & bank header registry  │
└──────────────────────┬────────────────────────┘
                       │ Evaluated Entities
                       ▼
┌───────────────────────────────────────────────┐
│ 3. Neural Threat Classifier                   │
│    - Google Gemini 2.5 Flash Vision AI        │
│    - Calibrated local heuristic backup matrix │
│    - Categorization & threat signal ranking   │
└──────────────────────┬────────────────────────┘
                       │ Verdict & Signals
                       ▼
┌───────────────────────────────────────────────┐
│ 4. Legal Compliance Officer                   │
│    - Indian IT Act 2000 (Section 66C/66D/43A) │
│    - Bharatiya Nyaya Sanhita 2023 (Sec 318/316)│
│    - Actionable CFCFRMS / 1930 recovery plan  │
└──────────────────────┬────────────────────────┘
                       │ Legal Citations
                       ▼
┌───────────────────────────────────────────────┐
│ 5. ECC Cryptographic Authority                │
│    - NIST P-256 (secp256r1 / prime256v1)      │
│    - Canonical SHA-256 payload digest         │
│    - Tamper-proof ECDSA signature & JSON-LD   │
└───────────────────────────────────────────────┘
```

---

## 2. Cryptographic Evidence Specification (NIST P-256 / Sec 65B)

Each scan generates a deterministic cryptographic receipt containing:
- **Algorithm**: `ECDSA-SHA256` over NIST P-256 curve (`secp256r1`).
- **Standard**: FIPS 186-4 / RFC 6979.
- **Evidence Digest**: `SHA-256(canonical(content + verdict + category + timestamp))`.
- **JSON-LD Export**: Downloadable `.json` verifiable credential bundle for submission to Indian Police Cyber Crime Cells, CFCFRMS portal, or bank dispute desks.
- **Statutory Admissibility**: Section 65B Indian Evidence Act 1872 and Section 63 Bharatiya Sakshya Adhiniyam 2023.

---

## 3. UI/UX Specifications

- **Responsive Viewport Handling**: Supports all screen dimensions from 320px mobile displays to 4K ultra-wide monitors.
- **Strict Isolated Language Switch**: Pure English or pure Hindi output (no mixed Hinglish jargon in the triage results).
- **Stateless Privacy**: Zero persistent database storage. Compliant with Digital Personal Data Protection Act (DPDPA) 2023.
