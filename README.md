# 🛡️ T&Shield — AI Legal Jargon Killer

> **Stop blindly clicking "I Agree". Understand what you're really signing in seconds.**

Built solo for **HackDevengers 2.0** — 24-Hour Open Innovation Hackathon.

---

## 🚨 The Problem

Over **91% of consumers** accept Terms & Conditions without reading them. Hidden inside pages of dense legalese are clauses that:

- 📊 Sell your personal browsing data to third-party advertisers
- 💳 Silently auto-renew expensive subscriptions without warning
- ⚖️ Strip away your legal right to take companies to court (binding arbitration waivers)

## 💡 The Solution

**T&Shield** is an AI-powered web app that scans any legal document in seconds. It:

1. Calculates an instant **Risk Score (0–100)** with color-coded severity
2. **Highlights dangerous clauses** in red with direct quotes
3. **Translates legalese into plain English** anyone can understand
4. Provides **key takeaways** so you know exactly what you're agreeing to

---

## ✨ Features

- ⚡ **Instant AI Analysis** — Powered by OpenAI GPT-4o-mini
- 🎯 **Visual Risk Gauge** — Animated 0–100 circular score
- 🚩 **Flagged Clauses** — Color-coded Critical / Warning / Info badges
- 📋 **Plain English Translations** — No law degree required
- 📱 **1-Click Sample Presets** — Instagram, Spotify, Rental Agreements
- 📄 **PDF Export** — Download or print your analysis report
- 📋 **Copy Summary** — One-click clipboard copy of key findings
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, TypeScript, Tailwind CSS |
| Icons | Lucide React |
| Backend | Supabase Edge Functions (Deno) |
| AI | OpenAI GPT-4o-mini |
| UI Builder | Lovable (Sponsor) |
| Deployment | Vercel |

---

## 🚀 Live Demo

🔗 **[https://t-shield.vercel.app](https://t-shield.vercel.app)**

---

## 🏗️ How to Run Locally

```bash
git clone https://github.com/YOUR_USERNAME/t-shield.git
cd t-shield
npm install
npm run dev
