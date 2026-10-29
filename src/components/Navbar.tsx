import React, { useState } from 'react';
import {
  Compass,
  Bookmark,
  MessageSquareCode,
  Info,
  Activity,
  Menu,
  X,
  Sparkles,
  Plane,
  Bed,
  Utensils,
  MapPin,
  Calendar,
  Briefcase,
  Users,
  ShieldCheck,
  Wallet,
  CheckSquare,
  User,
  ChevronDown,
} from 'lucide-react';
import { UserProfile } from '../types/travel';

export type ActiveNavTab =
  | 'home'
  | 'dashboard'
  | 'discover'
  | 'results'
  | 'plan'
  | 'flights'
  | 'hotels'
  | 'restaurants'
  | 'map'
  | 'assistant'
  | 'saved'
  | 'trips'
  | 'community'
  | 'requirements'
  | 'budget'
  | 'packing'
  | 'about';

interface NavbarProps {
  activeTab: ActiveNavTab;
  setActiveTab: (tab: ActiveNavTab) => void;
  savedCount: number;
  tripsCount: number;
  onOpenStatusModal: () => void;
  onOpenAuthModal: () => void;
  currentUser: UserProfile | null;
  isLiveMode: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  tripsCount,
  onOpenStatusModal,
  onOpenAuthModal,
  currentUser,
  isLiveMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const handleNavClick = (tab: ActiveNavTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1b2844] bg-[#0b111e]/95 backdrop-blur-md">
      {/* Main Nav Bar */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left transition-opacity hover:opacity-90"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#00c5b2] to-[#121b2f] text-white shadow-md shadow-[#00c5b2]/10 border border-[#00c5b2]/30">
              <Compass className="h-5 w-5 text-[#f7f3eb]" />
            </span>
            <div>
              <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#f7f3eb] whitespace-nowrap block leading-none">
                TasteTrail <span className="text-[#00c5b2]">AI</span>
              </span>
              <span className="text-[10px] text-[#d9d2c5]/60 font-mono tracking-wider hidden sm:block mt-0.5">
                Cultural Travel Discovery
              </span>
            </div>
          </button>
        </div>

        {/* Primary Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-5 text-xs font-semibold text-[#d9d2c5]">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'home' ? 'text-[#00c5b2]' : 'hover:text-[#f7f3eb]'
            }`}
          >
            Home
          </button>
          {currentUser && (
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'dashboard' ? 'text-[#00c5b2] font-bold' : 'hover:text-[#f7f3eb]'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-[#00c5b2]" />
              <span>Dashboard</span>
            </button>
          )}
          <button
            onClick={() => handleNavClick('discover')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'discover' || activeTab === 'results' ? 'text-[#00c5b2]' : 'hover:text-[#f7f3eb]'
            }`}
          >
            Discover
          </button>
          <button
            onClick={() => handleNavClick('plan')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'plan' ? 'text-[#00c5b2]' : 'hover:text-[#f7f3eb]'
            }`}
          >
            <Calendar className="h-3.5 w-3.5 text-[#00c5b2]" />
            <span>Plan Trip</span>
          </button>
          <button
            onClick={() => handleNavClick('flights')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'flights' ? 'text-[#00c5b2]' : 'hover:text-[#f7f3eb]'
            }`}
          >
            <Plane className="h-3.5 w-3.5" />
            <span>Flights</span>
          </button>
          <button
            onClick={() => handleNavClick('hotels')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'hotels' ? 'text-[#00c5b2]' : 'hover:text-[#f7f3eb]'
            }`}
          >
            <Bed className="h-3.5 w-3.5" />
            <span>Hotels</span>
          </button>
          <button
            onClick={() => handleNavClick('restaurants')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'restaurants' ? 'text-[#00c5b2]' : 'hover:text-[#f7f3eb]'
            }`}
          >
            <Utensils className="h-3.5 w-3.5" />
            <span>Dining</span>
          </button>

          <button
            onClick={() => handleNavClick('assistant')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'assistant' ? 'text-[#00c5b2]' : 'hover:text-[#f7f3eb]'
            }`}
          >
            <MessageSquareCode className="h-3.5 w-3.5 text-[#00c5b2]" />
            <span>Assistant</span>
          </button>
          <button
            onClick={() => handleNavClick('trips')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'trips' ? 'text-[#00c5b2]' : 'hover:text-[#f7f3eb]'
            }`}
          >
            <Briefcase className="h-3.5 w-3.5" />
            <span>My Trips</span>
            {tripsCount > 0 && (
              <span className="rounded-full bg-[#00c5b2]/20 px-1.5 py-0.2 text-[10px] font-mono font-bold text-[#00c5b2]">
                {tripsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => handleNavClick('community')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'community' ? 'text-[#00c5b2]' : 'hover:text-[#f7f3eb]'
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            <span>Community</span>
          </button>

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className="flex items-center gap-1 transition-colors hover:text-[#f7f3eb]"
            >
              <span>More</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {moreDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-[#0b111e] border border-[#1b2844] rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in space-y-1">
                <button
                  onClick={() => handleNavClick('saved')}
                  className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-[#121b2f] text-[#d9d2c5] hover:text-[#f7f3eb] flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>My Collection</span>
                  </span>
                  {savedCount > 0 && (
                    <span className="rounded-full bg-[#00c5b2]/20 px-1.5 py-0.2 text-[10px] text-[#00c5b2]">
                      {savedCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => handleNavClick('budget')}
                  className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-[#121b2f] text-[#d9d2c5] hover:text-[#f7f3eb] flex items-center gap-2"
                >
                  <Wallet className="w-3.5 h-3.5" />
                  <span>Budget Planner</span>
                </button>
                <button
                  onClick={() => handleNavClick('requirements')}
                  className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-[#121b2f] text-[#d9d2c5] hover:text-[#f7f3eb] flex items-center gap-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Travel Requirements</span>
                </button>
                <button
                  onClick={() => handleNavClick('packing')}
                  className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-[#121b2f] text-[#d9d2c5] hover:text-[#f7f3eb] flex items-center gap-2"
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>Packing Checklist</span>
                </button>
                <div className="border-t border-[#1b2844] my-1" />
                <button
                  onClick={() => handleNavClick('about')}
                  className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-[#121b2f] text-[#d9d2c5] hover:text-[#f7f3eb] flex items-center gap-2"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>About & Hackathon</span>
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Status Indicator */}
          <button
            onClick={onOpenStatusModal}
            title="Inspect Qloo API & Server Status"
            className="flex items-center gap-1.5 rounded-xl border border-[#1b2844] bg-[#121b2f] px-2.5 py-1.5 text-xs text-[#d9d2c5] hover:border-[#00c5b2]/40 transition-colors"
          >
            <Activity className={`h-3.5 w-3.5 ${isLiveMode ? 'text-[#00c5b2]' : 'text-[#e8c582]'}`} />
            <span className="hidden lg:inline font-mono text-[11px]">
              {isLiveMode ? 'Qloo Live' : 'Qloo Sandbox'}
            </span>
          </button>

          {/* User Profile / Dashboard / Sign In */}
          {currentUser ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleNavClick('dashboard')}
                className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  activeTab === 'dashboard'
                    ? 'border-[#00c5b2] bg-[#00c5b2]/10 text-[#00c5b2]'
                    : 'border-[#1b2844] bg-[#121b2f] text-[#f7f3eb] hover:bg-[#1b2844]'
                }`}
                title="Go to Personal Dashboard"
              >
                <User className="h-3.5 w-3.5 text-[#00c5b2]" />
                <span className="hidden sm:inline">
                  {currentUser.name.split(' ')[0]}
                </span>
              </button>
              <button
                onClick={onOpenAuthModal}
                className="p-1.5 text-[#d9d2c5]/60 hover:text-white rounded-lg hover:bg-[#121b2f] transition-colors"
                title="Profile Settings"
              >
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 rounded-xl border border-[#1b2844] bg-[#121b2f] px-3 py-1.5 text-xs font-semibold text-[#f7f3eb] hover:bg-[#1b2844] transition-colors"
            >
              <User className="h-3.5 w-3.5 text-[#00c5b2]" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-[#d9d2c5] hover:text-white rounded-lg bg-[#121b2f] border border-[#1b2844]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-[#1b2844] bg-[#0b111e] px-4 py-4 xl:hidden max-h-[80vh] overflow-y-auto space-y-2">
          {currentUser && (
            <div className="pb-2 border-b border-[#1b2844] mb-2 flex items-center justify-between">
              <button
                onClick={() => handleNavClick('dashboard')}
                className="flex items-center gap-2 text-xs font-bold text-[#00c5b2]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Go to Dashboard ({currentUser.name})</span>
              </button>
              <button
                onClick={() => {
                  onOpenAuthModal();
                  setMobileMenuOpen(false);
                }}
                className="text-[11px] text-[#d9d2c5]/60 hover:text-white underline"
              >
                Profile Settings
              </button>
            </div>
          )}
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left p-2.5 rounded-xl bg-[#121b2f] text-[#d9d2c5] hover:text-[#00c5b2]"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('discover')}
              className="text-left p-2.5 rounded-xl bg-[#121b2f] text-[#d9d2c5] hover:text-[#00c5b2]"
            >
              Discover
            </button>
            <button
              onClick={() => handleNavClick('plan')}
              className="text-left p-2.5 rounded-xl bg-[#121b2f] text-[#00c5b2] font-bold"
            >
              Plan Trip (AI)
            </button>
            <button
              onClick={() => handleNavClick('flights')}
              className="text-left p-2.5 rounded-xl bg-[#121b2f] text-[#d9d2c5] hover:text-[#00c5b2]"
            >
              Flights
            </button>
            <button
              onClick={() => handleNavClick('hotels')}
              className="text-left p-2.5 rounded-xl bg-[#121b2f] text-[#d9d2c5] hover:text-[#00c5b2]"
            >
              Hotels
            </button>
            <button
              onClick={() => handleNavClick('restaurants')}
              className="text-left p-2.5 rounded-xl bg-[#121b2f] text-[#d9d2c5] hover:text-[#00c5b2]"
            >
              Dining
            </button>

            <button
              onClick={() => handleNavClick('assistant')}
              className="text-left p-2.5 rounded-xl bg-[#121b2f] text-[#d9d2c5] hover:text-[#00c5b2]"
            >
              Travel Assistant
            </button>
            <button
              onClick={() => handleNavClick('trips')}
              className="text-left p-2.5 rounded-xl bg-[#121b2f] text-[#d9d2c5] hover:text-[#00c5b2]"
            >
              My Trips ({tripsCount})
            </button>
            <button
              onClick={() => handleNavClick('community')}
              className="text-left p-2.5 rounded-xl bg-[#121b2f] text-[#d9d2c5] hover:text-[#00c5b2]"
            >
              Community Trails
            </button>
            <button
              onClick={() => handleNavClick('saved')}
              className="text-left p-2.5 rounded-xl bg-[#121b2f] text-[#d9d2c5] hover:text-[#00c5b2]"
            >
              Saved Collection ({savedCount})
            </button>
            <button
              onClick={() => handleNavClick('budget')}
              className="text-left p-2.5 rounded-xl bg-[#121b2f] text-[#d9d2c5] hover:text-[#00c5b2]"
            >
              Budget Planner
            </button>
            <button
              onClick={() => handleNavClick('requirements')}
              className="text-left p-2.5 rounded-xl bg-[#121b2f] text-[#d9d2c5] hover:text-[#00c5b2]"
            >
              Requirements
            </button>
            <button
              onClick={() => handleNavClick('packing')}
              className="text-left p-2.5 rounded-xl bg-[#121b2f] text-[#d9d2c5] hover:text-[#00c5b2]"
            >
              Checklist
            </button>
          </div>

          <div className="pt-2 border-t border-[#1b2844] flex items-center justify-between">
            <button
              onClick={() => handleNavClick('about')}
              className="text-xs text-[#d9d2c5]/70 hover:text-white"
            >
              About & Hackathon Info
            </button>
            <button
              onClick={() => {
                onOpenStatusModal();
                setMobileMenuOpen(false);
              }}
              className="text-xs text-[#00c5b2] font-mono"
            >
              API Status
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
