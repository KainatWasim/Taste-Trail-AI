# TasteTrail AI — Your Taste. Your Journey. Your World.

**TasteTrail AI** is an AI-powered cultural travel discovery agent developed for the **Qloo Agentic Hackathon**. It helps travelers discover destinations, food terroir, architectural landmarks, and cultural experiences grounded in their genuine individual tastes and affinities—rather than aggregate commercial popularity.

---

## 🌟 The Cultural Intelligence Difference

Traditional travel search engines and generic AI chatbots suffer from **popularity bias**: they recommend the same 10 overcrowded tourist hubs to everyone.

TasteTrail AI leverages **Qloo’s Cultural Intelligence** to map affinities across domains:
- If you love **analog jazz vinyl and Brutalist architecture**, Qloo identifies natural correlations with Kyoto’s hidden kissatens and Lisbon’s Gulbenkian concrete pavilions.
- If you appreciate **ancestral fermentation and living craft traditions**, Qloo connects you to Zapotec natural-dye weavers in Oaxaca and 8,000-year-old subterranean qvevri wine cellars in Tbilisi.
- Every recommendation includes an **explicit, transparent Cultural Affinity explanation**, never an opaque black-box score.

---

## 🏗️ Architecture & Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Google Fonts (`Outfit` + `Plus Jakarta Sans`).
- **Backend**: Node.js, Express server with full-stack Vite development middleware.
- **Cultural Intelligence**: Server-side proxy for the official Qloo Hackathon Sandbox API (`https://hackathon.api.qloo.com`) with header `X-Api-Key`.
- **Agentic AI**: Google GenAI SDK (`@google/genai` with `gemini-3.8-flash`) for natural language preference extraction, cultural synthesis, and conversational travel concierge.
- **Persistence**: Client-side localStorage for anonymous saved collections, stable across page reloads with zero unnecessary database overhead.
- **Security**: Strict server-side secret isolation; API keys are never leaked to client bundles or browser JavaScript.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 20+ installed
- npm or pnpm

### 2. Installation
```bash
npm install
```

### 3. Environment Variables Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Define your keys:
```env
# Optional Qloo Hackathon API Key (if provided by organizers)
QLOO_API_KEY="YOUR_QLOO_HACKATHON_API_KEY"

# Optional Gemini API Key for dynamic cultural synthesis (injected automatically in AI Studio)
GEMINI_API_KEY="MY_GEMINI_API_KEY"

# Application URL
APP_URL="http://localhost:3000"
```

### 4. Running the Application

#### In Development Mode:
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

#### Building for Production:
```bash
npm run build
npm start
```

---

## 🔬 Sample Mode vs. Live Qloo Mode

In full accordance with hackathon evaluation rules, TasteTrail AI maintains complete transparency:

1. **Sample & Evaluation Mode (Default)**:
   - Operates when `QLOO_API_KEY` is not present in `.env`.
   - Utilizes a curated Cultural Knowledge Graph structured around Qloo's official entity schemas and cross-domain taste bridges.
   - Clearly labeled with `Data Source: Qloo Cultural Graph (Demo)` on all recommendation cards.

2. **Live Qloo API Mode**:
   - Automatically activates when a valid `QLOO_API_KEY` is provided.
   - Backend queries `https://hackathon.api.qloo.com/v2/search` and insights routes with the `X-Api-Key` header.
   - Labeled with `Data Source: Live Qloo API`.
   - Judges can click the **Qloo Status** button in the header to run an interactive handshake test with latency metrics.

---

## 📋 Features Overview

1. **Landing Page**: Immersive travel hero composition, cultural intelligence value proposition, and comparative analysis against generic AI.
2. **Personalized Discovery Engine**: Interactive interest cards, travel moods, budget, companions, and natural language taste notes.
3. **Recommendation Results**: Filterable by category (Culinary, Architecture, Art & Craft, Music, Heritage, Hidden Gems) with transparent affinity explanations.
4. **Conversational AI Concierge**: Natural language chat interface with agentic preference extraction and embedded recommendation cards.
5. **My Collection**: Persistent favorites archive with one-click itinerary export to clipboard.
6. **Diagnostic System Inspector**: Real-time handshake and latency testing tool for judges.

---

## 📄 License

Apache License 2.0. See [LICENSE](./LICENSE) for details.
