import React from 'react';
import { ArrowRight, Compass, Sparkles, MapPin, Layers, ShieldCheck, Bed } from 'lucide-react';

interface HeroSectionProps {
  onStartDiscover: () => void;
  onExploreHowItWorks: () => void;
  onBookingNow: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartDiscover,
  onExploreHowItWorks,
  onBookingNow,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-[#1b2844] bg-[#0b111e] pt-12 pb-16 lg:pt-16 lg:pb-24">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-[#00c5b2]/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-20 h-80 w-80 rounded-full bg-[#e8c582]/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 2-Column Split: Editorial Value Proposition + Atmospheric Hero Photography */}
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Proposition */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <div className="mb-4 text-xs font-semibold tracking-wider text-[#00c5b2] uppercase">
              Cultural Travel Discovery Agent · Qloo Hackathon
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#f7f3eb] leading-[1.1] text-balance">
              Your Taste. Your Journey. Your World.
            </h1>

            <p className="mt-4 font-display text-xl sm:text-2xl font-medium text-[#00c5b2] text-balance">
              Discover travel experiences that feel like you.
            </p>

            <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-[#d9d2c5]">
              TasteTrail AI combines your personal interests with cultural intelligence to help you
              discover destinations, food, attractions, and experiences that match your unique taste.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                onClick={onStartDiscover}
                className="flex items-center gap-2.5 rounded-lg bg-[#00c5b2] px-6 py-3.5 text-sm font-semibold text-[#070b14] shadow-lg shadow-[#00c5b2]/15 transition-all hover:bg-[#02e0cb] hover:translate-y-[-1px] active:translate-y-[0px] whitespace-nowrap shrink-0"
              >
                <span>Discover My Journey</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onBookingNow}
                className="flex items-center gap-2 rounded-lg bg-[#00c5b2] hover:bg-[#02e0cb] px-6 py-3.5 text-sm font-bold text-[#070b14] shadow-lg shadow-[#00c5b2]/15 transition-all hover:translate-y-[-1px] active:translate-y-[0px] whitespace-nowrap shrink-0"
              >
                <Bed className="h-4 w-4" />
                <span>Booking Now</span>
              </button>

              <button
                onClick={onExploreHowItWorks}
                className="flex items-center gap-2 rounded-lg border border-[#1b2844] bg-[#121b2f] px-5 py-3.5 text-sm font-medium text-[#f7f3eb] transition-colors hover:border-[#00c5b2]/40 hover:bg-[#1b2844] whitespace-nowrap shrink-0"
              >
                <span>Explore How It Works</span>
              </button>
            </div>

            {/* Quick taste seed tags (clean unboxed text with typographic separators per zero-pill discipline) */}
            <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-[#d9d2c5]/80">
              <span className="font-semibold text-[#f7f3eb]">Popular Taste Signals:</span>
              <span>Mid-Century Architecture</span>
              <span aria-hidden="true" className="text-[#1b2844]">·</span>
              <span>Jazz Vinyl Listening Bars</span>
              <span aria-hidden="true" className="text-[#1b2844]">·</span>
              <span>Ancestral Fermentation</span>
              <span aria-hidden="true" className="text-[#1b2844]">·</span>
              <span>Artisan Ceramics</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset with Measured Contrast Scrim */}
          <div className="lg:col-span-5 flex items-stretch">
            <div className="relative w-full overflow-hidden rounded-2xl border border-[#1b2844] bg-[#121b2f] shadow-2xl min-h-[380px] lg:h-full">
              <img
                src="/assets/images/hero_cultural_travel_1793125935503.jpg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1600&auto=format&fit=crop';
                }}
                alt="Enlightened traveler discovering historic and contemporary cultural architecture at twilight"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b111e]/95 via-[#0b111e]/30 to-transparent" />

              {/* Floating authentic insight overlay */}
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-[#1b2844]/80 bg-[#0b111e]/85 p-4 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs text-[#00c5b2] mb-1">
                  <span className="font-semibold uppercase tracking-wider">Qloo Taste Correlation</span>
                  <span className="font-mono text-[#e8c582]">Affinity 8.9 / 10</span>
                </div>
                <p className="text-sm font-medium text-[#f7f3eb]">
                  "Travelers drawn to Brutalist architecture and analog audio index 9.2x higher for quiet scholar gardens and historic machiya kissatens."
                </p>
                <div className="mt-2 flex items-center gap-2 text-xs text-[#d9d2c5]/70">
                  <span>Kyoto & Lisbon Taste Cohort</span>
                  <span aria-hidden="true">·</span>
                  <span>Cultural Intelligence Signal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Proof Row below the Hero Split per Guidelines */}
        <div className="mt-14 grid grid-cols-2 gap-4 border-t border-[#1b2844] pt-8 md:grid-cols-4 lg:gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#00c5b2] uppercase tracking-wider">
              <Layers className="h-4 w-4" />
              <span>Cross-Domain</span>
            </div>
            <div className="mt-1 font-display text-2xl font-bold tabular-nums text-[#f7f3eb]">
              Taste Affinity
            </div>
            <p className="mt-1 text-xs text-[#d9d2c5]">
              Connecting music, dining, and design to travel destinations.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#00c5b2] uppercase tracking-wider">
              <Compass className="h-4 w-4" />
              <span>Entity Graph</span>
            </div>
            <div className="mt-1 font-display text-2xl font-bold tabular-nums text-[#f7f3eb]">
              Qloo Engine
            </div>
            <p className="mt-1 text-xs text-[#d9d2c5]">
              Powered by cultural taste graph and real affinity correlations.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#00c5b2] uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" />
              <span>Transparency</span>
            </div>
            <div className="mt-1 font-display text-2xl font-bold tabular-nums text-[#f7f3eb]">
              Zero Slop
            </div>
            <p className="mt-1 text-xs text-[#d9d2c5]">
              Clear reasoning for every recommendation, never generic top-10s.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#00c5b2] uppercase tracking-wider">
              <Sparkles className="h-4 w-4" />
              <span>Conversational</span>
            </div>
            <div className="mt-1 font-display text-2xl font-bold tabular-nums text-[#f7f3eb]">
              Agentic Flow
            </div>
            <p className="mt-1 text-xs text-[#d9d2c5]">
              Natural language concierge that extracts deep cultural intent.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
