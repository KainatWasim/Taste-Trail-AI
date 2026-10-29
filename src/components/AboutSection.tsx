import React from 'react';
import { Compass, ShieldCheck, Cpu, Code2, Globe, Sparkles, BookOpen, Layers } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="mx-auto max-w-5xl space-y-12 py-6">
      {/* Hero Header */}
      <div className="rounded-2xl border border-[#1b2844] bg-[#0b111e] p-8 lg:p-10">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#00c5b2] mb-2">
          Product Architecture · Qloo Agentic Hackathon
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f7f3eb]">
          About TasteTrail AI
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#d9d2c5] leading-relaxed max-w-3xl">
          TasteTrail AI is an intelligent cultural travel discovery agent built specifically
          to demonstrate the profound advantage of cultural intelligence over conventional travel search engines.
        </p>
      </div>

      {/* The Core Problem & Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-[#1b2844] bg-[#0b111e] p-6 lg:p-8">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-2">
            The Industry Problem
          </div>
          <h3 className="font-display text-xl font-bold text-[#f7f3eb]">
            The Tourist Trap Echo Chamber
          </h3>
          <p className="mt-3 text-sm text-[#d9d2c5] leading-relaxed">
            Existing travel discovery platforms optimize for aggregate review volume and advertiser bidding.
            As a result, millions of culturally curious travelers are funneled into the same 10 overcrowded attractions,
            regardless of whether they care about mid-century architecture, analog sound culture, or ancient fermentation methods.
          </p>
        </div>

        <div className="rounded-2xl border border-[#00c5b2]/40 bg-[#121b2f] p-6 lg:p-8">
          <div className="flex items-center gap-2 text-[#00c5b2] text-xs font-semibold uppercase tracking-wider mb-2">
            The Cultural Solution
          </div>
          <h3 className="font-display text-xl font-bold text-[#f7f3eb]">
            Qloo Cultural Intelligence Graph
          </h3>
          <p className="mt-3 text-sm text-[#d9d2c5] leading-relaxed">
            By querying Qloo’s multi-dimensional cultural graph, TasteTrail AI identifies mathematical affinities
            between diverse domains. If someone listens to modal jazz and values Brutalist architecture, Qloo’s correlation
            engine links them to quiet kissatens and modernist pavilions in Kyoto or Lisbon that generic tools completely miss.
          </p>
        </div>
      </div>

      {/* Technical Architecture Overview */}
      <div className="rounded-2xl border border-[#1b2844] bg-[#070b14] p-8">
        <h3 className="font-display text-2xl font-bold text-[#f7f3eb] mb-6">
          Full-Stack Technical Architecture
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-[#1b2844] bg-[#0b111e] p-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#00c5b2] mb-2">
              <ShieldCheck className="h-4 w-4" />
              <span>1. Secure Server Proxy</span>
            </div>
            <p className="text-xs text-[#d9d2c5] leading-relaxed">
              Express server-side proxy ensures all <code className="text-[#00c5b2]">QLOO_API_KEY</code> and <code className="text-[#00c5b2]">GEMINI_API_KEY</code> credentials remain strictly on the backend. No secret leakage to browser bundles.
            </p>
          </div>

          <div className="rounded-xl border border-[#1b2844] bg-[#0b111e] p-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#00c5b2] mb-2">
              <Globe className="h-4 w-4" />
              <span>2. Qloo Hackathon API</span>
            </div>
            <p className="text-xs text-[#d9d2c5] leading-relaxed">
              Direct integration with <code className="text-[#00c5b2]">https://hackathon.api.qloo.com</code> using documented <code className="text-[#00c5b2]">X-Api-Key</code> headers and fallback to curated entity schemas.
            </p>
          </div>

          <div className="rounded-xl border border-[#1b2844] bg-[#0b111e] p-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#00c5b2] mb-2">
              <Cpu className="h-4 w-4" />
              <span>3. Agentic Synthesis</span>
            </div>
            <p className="text-xs text-[#d9d2c5] leading-relaxed">
              Google GenAI SDK (<code className="text-[#00c5b2]">gemini-3.8-flash</code>) parses conversational travel inquiries into structured preferences and explains the exact cultural relevance of recommendations.
            </p>
          </div>
        </div>
      </div>

      {/* Honest Hackathon Readiness Disclosure */}
      <div className="rounded-2xl border border-[#1b2844] bg-[#0b111e] p-6 lg:p-8">
        <h3 className="font-display text-lg font-semibold text-[#f7f3eb] mb-2">
          Honest Integration & Transparency Disclosure
        </h3>
        <p className="text-sm text-[#d9d2c5] leading-relaxed">
          In compliance with the hackathon rules, TasteTrail AI never misrepresents demonstration sample data
          as live API results. The application explicitly labels each recommendation with its source
          (<span className="text-[#00c5b2] font-mono">Live Qloo API</span> vs <span className="text-[#e8c582] font-mono">Sample Cultural Graph</span>)
          and includes a built-in diagnostic inspector for judges to verify connection health.
        </p>
      </div>
    </div>
  );
};
