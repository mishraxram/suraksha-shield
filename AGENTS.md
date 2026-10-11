<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# SurakshaShield Multi-Agent Operating System (ECC & gstack Harness)

This repository operates an automated multi-agent security pipeline:

1. **AgentShield Guard**: Sanitizes all input strings, normalizes unicode lookalikes, strips zero-width non-printing characters, and neutralizes prompt-injection exploits before data touches any inference engine.
2. **DLT Telecom Auditor**: Cross-references sender IDs against TRAI Distributed Ledger Technology registries (e.g., verifying 6-character bank and government headers vs personal 10-digit SIM numbers).
3. **Neural Threat Classifier**: Triages user content using Google Gemini 2.5 Flash with fallback to the high-accuracy local threat heuristic matrix.
4. **Legal Compliance Officer**: Maps attack indicators to statutory criminal offenses under the Bharatiya Nyaya Sanhita (BNS) 2023 and Information Technology Act 2000.
5. **ECC Cryptographic Authority**: Generates NIST P-256 ECDSA tamper-proof digital seals and downloadable JSON-LD electronic evidence dossiers admissible under Section 65B of the Indian Evidence Act and Section 63 of BSA 2023.
