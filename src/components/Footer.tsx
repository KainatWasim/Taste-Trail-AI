import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: any) => void;
  onOpenStatusModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenStatusModal }) => {
  return (
    <footer className="border-t border-[#1b2844] bg-[#070b14] py-12 text-sm text-[#d9d2c5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#00c5b2] text-[#070b14]">
              <Compass className="h-4 w-4" />
            </span>
            <span className="font-display font-bold text-[#f7f3eb]">
              TasteTrail <span className="text-[#00c5b2]">AI</span>
            </span>
            <span className="text-xs text-[#d9d2c5]/60 ml-2">
              Cultural Travel Discovery Agent
            </span>
          </div>

          {/* Nav links mirror */}
          <div className="flex flex-wrap items-center gap-5 text-xs text-[#d9d2c5]">
            <button onClick={() => onNavClick('home')} className="hover:text-[#00c5b2] transition-colors">
              Home
            </button>
            <button onClick={() => onNavClick('discover')} className="hover:text-[#00c5b2] transition-colors">
              Discover
            </button>
            <button onClick={() => onNavClick('plan')} className="hover:text-[#00c5b2] transition-colors">
              Plan Trip
            </button>
            <button onClick={() => onNavClick('flights')} className="hover:text-[#00c5b2] transition-colors">
              Flights
            </button>
            <button onClick={() => onNavClick('hotels')} className="hover:text-[#00c5b2] transition-colors">
              Hotels
            </button>
            <button onClick={() => onNavClick('restaurants')} className="hover:text-[#00c5b2] transition-colors">
              Dining
            </button>
            <button onClick={() => onNavClick('assistant')} className="hover:text-[#00c5b2] transition-colors">
              Assistant
            </button>
            <button onClick={() => onNavClick('trips')} className="hover:text-[#00c5b2] transition-colors">
              My Trips
            </button>
            <button onClick={() => onNavClick('community')} className="hover:text-[#00c5b2] transition-colors">
              Community
            </button>
            <button onClick={() => onNavClick('about')} className="hover:text-[#00c5b2] transition-colors">
              About
            </button>
            <button onClick={onOpenStatusModal} className="text-[#e8c582] hover:underline transition-colors">
              System Status
            </button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#1b2844]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#d9d2c5]/60">
          <p>
            Developed for the Qloo Agentic Hackathon · Integrating Qloo Cultural Intelligence API with secure server-side agentic workflows.
          </p>
          <p>
            TasteTrail AI © 2026. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
