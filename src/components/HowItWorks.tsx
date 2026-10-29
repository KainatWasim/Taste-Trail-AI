import React from 'react';
import { Compass, Sparkles, Network, Eye, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onStartDiscover: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartDiscover }) => {
  return (
    <section id="how-it-works" className="border-b border-[#1b2844] bg-[#070b14] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold tracking-wider text-[#00c5b2] uppercase">
            The Cultural Intelligence Advantage
          </div>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#f7f3eb]">
            Why Generic Travel AI Fails — And How Cultural Taste Solves It
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#d9d2c5]">
            Most travel apps optimize for mass popularity, recommending identical crowded attractions.
            TasteTrail AI leverages Qloo's Cultural Intelligence to understand the latent connections
            between the music you listen to, the food you savor, and the destinations that truly inspire you.
          </p>
        </div>

        {/* Comparison Grid: Generic Travel vs TasteTrail AI */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Card 1: The Generic Way */}
          <div className="rounded-2xl border border-[#1b2844] bg-[#0b111e] p-6 lg:p-8">
            <div className="text-sm font-semibold text-rose-400">
              Generic Travel Algorithms & Chatbots
            </div>
            <h3 className="mt-2 font-display text-xl font-bold text-[#f7f3eb]">
              Popularity-Biased Recommendations
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[#d9d2c5]">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold shrink-0">✕</span>
                <span>Pushes top-10 tourist hubs regardless of your individual taste profile.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold shrink-0">✕</span>
                <span>Opaque "ratings" that reflect commercial foot traffic rather than cultural resonance.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold shrink-0">✕</span>
                <span>Treats travel in isolation, ignoring your tastes in music, aesthetics, and gastronomy.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: TasteTrail AI + Qloo */}
          <div className="rounded-2xl border border-[#00c5b2]/40 bg-[#121b2f] p-6 lg:p-8 shadow-xl relative overflow-hidden">
            <div className="text-sm font-semibold text-[#00c5b2]">
              TasteTrail AI with Qloo Intelligence
            </div>
            <h3 className="mt-2 font-display text-xl font-bold text-[#f7f3eb]">
              Cross-Domain Cultural Affinity
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[#d9d2c5]">
              <li className="flex items-start gap-2">
                <span className="text-[#00c5b2] font-bold shrink-0">✓</span>
                <span>Bridges external passions: your taste in jazz or Brutalism directly informs destination choices.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00c5b2] font-bold shrink-0">✓</span>
                <span>Explains exactly why each experience matches your declared and latent interests.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00c5b2] font-bold shrink-0">✓</span>
                <span>Grounded in Qloo’s entity taxonomy and verified cultural correlation signals.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 3-Step Editorial Workflow */}
        <div className="mt-16">
          <div className="text-xs font-semibold tracking-wider text-[#e8c582] uppercase mb-4">
            How The Discovery Journey Works
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-[#1b2844] bg-[#0b111e] p-6">
              <div className="font-display text-3xl font-bold tabular-nums text-[#00c5b2]">
                01.
              </div>
              <h4 className="mt-3 font-display text-lg font-semibold text-[#f7f3eb]">
                Declare Taste & Mood
              </h4>
              <p className="mt-2 text-sm text-[#d9d2c5]">
                Select your core interests (architecture, heritage, culinary terroir, sound culture)
                and travel mood—or converse freely with the assistant in natural prose.
              </p>
            </div>

            <div className="rounded-xl border border-[#1b2844] bg-[#0b111e] p-6">
              <div className="font-display text-3xl font-bold tabular-nums text-[#00c5b2]">
                02.
              </div>
              <h4 className="mt-3 font-display text-lg font-semibold text-[#f7f3eb]">
                Qloo Cultural Intelligence Query
              </h4>
              <p className="mt-2 text-sm text-[#d9d2c5]">
                Our server queries Qloo's cultural taste graph to identify cross-domain correlations
                between your interests and specific cultural entities in target destinations.
              </p>
            </div>

            <div className="rounded-xl border border-[#1b2844] bg-[#0b111e] p-6">
              <div className="font-display text-3xl font-bold tabular-nums text-[#00c5b2]">
                03.
              </div>
              <h4 className="mt-3 font-display text-lg font-semibold text-[#f7f3eb]">
                Transparent Discovery & Collection
              </h4>
              <p className="mt-2 text-sm text-[#d9d2c5]">
                Inspect transparent affinity bridges explaining why each place matches you.
                Save favorites to your private collection, export itineraries, and refine anytime.
              </p>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button
              onClick={onStartDiscover}
              className="flex items-center gap-2 rounded-lg bg-[#00c5b2] px-6 py-3 text-sm font-semibold text-[#070b14] transition-all hover:bg-[#02e0cb]"
            >
              <span>Start Personal Discovery</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
