# SurakshaShield

Privacy-first Indian digital threat triage engine with forensic entity extraction and NIST P-256 evidence seals.

[![CI](https://github.com/mishraxram/suraksha-shield/actions/workflows/ci.yml/badge.svg)](https://github.com/mishraxram/suraksha-shield/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Live-Demo-orange.svg)](https://themes-gotten-fundamentals-club.trycloudflare.com)

**Live Demo**: [https://themes-gotten-fundamentals-club.trycloudflare.com](https://themes-gotten-fundamentals-club.trycloudflare.com)

<!-- TODO: Add 1440px hero screenshot to docs/screenshot.png -->

## Features

- **Multimodal Threat Triage**: Analyzes text messages, links, phone numbers, and uploaded screenshot images via server-side OCR.
- **Dynamic 4-Pillar Scoring**: Calculates risk (0–100) dynamically across Urgency & Coercion (25), Technical Vectors (25), Financial Risk (25), and Impersonation (25).
- **Forensic Entity Inspector**: Extracts and audits unverified 10-digit sender numbers against TRAI DLT regulations, flags high-risk TLDs and URL shorteners, identifies Android APK trojan payloads, and detects reverse-UPI collect request traps.
- **Cryptographic Evidence Sealing**: Generates a tamper-proof NIST P-256 (secp256r1) ECDSA digital signature and SHA-256 evidence hash for legal admissibility under Section 65B of the Indian Evidence Act / Section 63 BSA 2023.
- **Incident Response & 1930 Dispatch**: Provides direct routing to the National Cyber Crime Helpline (1930) for Golden Hour financial freezes, links to Sanchar Saathi (Chakshu), and generates a copyable police complaint dossier.
- **Bilingual Interface**: Native, zero-reload switching between English and Hindi across all triage verdicts and guidance.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Frontend**: React 19, Tailwind CSS, Lucide Icons
- **AI Engine**: Google GenAI SDK (`@google/genai`) with local heuristic fallback
- **Cryptography**: Node.js `crypto` (NIST P-256 ECDSA, SHA-256)
- **Runtime**: Node.js 24 LTS

## Quick Start

### Prerequisites

- Node.js 24 LTS or later
- npm (lockfile v3)

### Installation

```bash
# Clone repository
git clone https://github.com/mishraxram/suraksha-shield.git
cd suraksha-shield

# Install dependencies with frozen lockfile
npm ci

# Configure environment variables
cp .env.example .env.local
# Add your GEMINI_API_KEY in .env.local (optional; falls back to local heuristic engine if omitted)

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
suraksha-shield/
├── .github/
│   ├── ISSUE_TEMPLATE/       # Structured bug report & feature request templates
│   ├── workflows/            # Pinned GitHub Actions CI workflow
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── dependabot.yml        # Weekly automated dependency tracking
├── public/                   # Static assets, PWA manifest, and app icons
├── scripts/                  # Automated verification and test suites
├── src/
│   ├── app/
│   │   ├── api/analyze/      # Server-side threat analysis and ECC signing endpoint
│   │   ├── globals.css       # Tailwind CSS base and theme tokens
│   │   ├── layout.js         # Root layout and PWA metadata
│   │   └── page.js           # Main triage interface
│   ├── components/
│   │   ├── content/          # Threat directory, FAQ, and educational safety guides
│   │   ├── layout/           # Responsive Navbar, Banner, and Footer
│   │   ├── scanner/          # Universal input scanner, presets, and OCR preview
│   │   └── verdict/          # Threat gauge, forensic inspector, evidence, and action panel
│   └── lib/crypto/           # NIST P-256 evidence sealing and client verification
├── LICENSE                   # MIT License
└── package.json
```

## Deployment

Because SurakshaShield utilizes server-side API routes for multimodal OCR, Google GenAI triage, and NIST P-256 cryptographic signing, it requires a Node.js runtime environment:

- **Vercel**: Connect the repository and configure `GEMINI_API_KEY` under Environment Variables.
- **Docker / Self-Hosted Node.js**: Build using `npm run build` and execute `npm start` on port 3000.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
