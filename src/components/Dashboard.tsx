import React from 'react';
import {
  Compass,
  Calendar,
  Briefcase,
  Bookmark,
  Plane,
  Bed,
  Utensils,
  MapPin,
  MessageSquareCode,
  ShieldCheck,
  Wallet,
  CheckSquare,
  Sparkles,
  ArrowRight,
  Plus,
  Clock,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  User,
  Heart,
} from 'lucide-react';
import {
  UserProfile,
  SavedTrip,
  CulturalEntity,
  HotelResult,
  RestaurantResult,
  TripItinerary,
} from '../types/travel';
import { ActiveNavTab } from './Navbar';
import { SafeImage } from './SafeImage';
import { getResolvedImageUrl } from '../utils/imageUtils';

interface DashboardProps {
  currentUser: UserProfile | null;
  onOpenAuthModal: () => void;
  trips: SavedTrip[];
  savedEntities: CulturalEntity[];
  savedHotels: HotelResult[];
  savedRestaurants: RestaurantResult[];
  onNavigate: (tab: ActiveNavTab) => void;
  onOpenItinerary: (itinerary: TripItinerary) => void;
  onToggleSaveEntity: (entity: CulturalEntity) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  currentUser,
  onOpenAuthModal,
  trips,
  savedEntities,
  savedHotels,
  savedRestaurants,
  onNavigate,
  onOpenItinerary,
  onToggleSaveEntity,
}) => {
  const userName = currentUser ? currentUser.name : 'Cultural Explorer';
  const userInitials = currentUser ? currentUser.name.slice(0, 2).toUpperCase() : 'TT';
  const memberTier = currentUser?.tier === 'connoisseur' ? 'Connoisseur Tier' : 'Explorer Member';

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-[#1b2844] bg-gradient-to-r from-[#0d1627] via-[#121e35] to-[#0a1220] p-6 sm:p-8 lg:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00c5b2]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00c5b2] to-[#121b2f] text-white font-display text-2xl sm:text-3xl font-bold shadow-xl border border-[#00c5b2]/40">
              {userInitials}
              <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-[#00c5b2] border-2 border-[#0b111e] flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-[#0b111e]" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-semibold text-[#00c5b2] uppercase tracking-wider">
                  Personal Travel Studio
                </span>
                <span className="text-xs text-[#d9d2c5]/40">·</span>
                <span className="text-xs text-[#e8c582] font-semibold">
                  {memberTier}
                </span>
                {currentUser?.homeAirport && (
                  <>
                    <span className="text-xs text-[#d9d2c5]/40">·</span>
                    <span className="text-xs text-[#d9d2c5]/70 flex items-center gap-1 font-mono">
                      <Plane className="w-3 h-3 text-[#00c5b2]" />
                      {currentUser.homeAirport}
                    </span>
                  </>
                )}
              </div>
              <h1 className="font-display text-2xl sm:text-4xl font-bold text-[#f7f3eb]">
                Welcome back, {userName}
              </h1>
              <p className="text-sm text-[#d9d2c5] max-w-xl">
                Your cultural taste profile bridges architecture, culinary arts, and contemplative acoustic sanctuaries across worldwide destinations.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('plan')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00c5b2] text-[#0b111e] font-bold text-xs hover:bg-[#00c5b2]/90 transition-all shadow-lg shadow-[#00c5b2]/20"
            >
              <Plus className="w-4 h-4" />
              <span>Plan New Itinerary</span>
            </button>
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-[#1b2844] bg-[#121b2f] text-xs font-semibold text-[#f7f3eb] hover:bg-[#1b2844] transition-colors"
            >
              <User className="w-3.5 h-3.5 text-[#00c5b2]" />
              <span>{currentUser ? 'Edit Profile' : 'Sign In / Register'}</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-[#1b2844]/60">
          <div className="p-3.5 rounded-2xl bg-[#0b111e]/70 border border-[#1b2844]">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#d9d2c5]/70">
              Active Journeys
            </div>
            <div className="text-2xl font-bold font-display text-[#f7f3eb] mt-0.5">
              {trips.length}
            </div>
            <div className="text-[11px] text-[#00c5b2] mt-0.5 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>Curated in studio</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0b111e]/70 border border-[#1b2844]">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#d9d2c5]/70">
              Saved Experiences
            </div>
            <div className="text-2xl font-bold font-display text-[#f7f3eb] mt-0.5">
              {savedEntities.length}
            </div>
            <div className="text-[11px] text-[#00c5b2] mt-0.5 flex items-center gap-1">
              <Bookmark className="w-3 h-3" />
              <span>Cultural sanctuaries</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0b111e]/70 border border-[#1b2844]">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#d9d2c5]/70">
              Saved Lodgings & Dining
            </div>
            <div className="text-2xl font-bold font-display text-[#f7f3eb] mt-0.5">
              {savedHotels.length + savedRestaurants.length}
            </div>
            <div className="text-[11px] text-[#00c5b2] mt-0.5 flex items-center gap-1">
              <Bed className="w-3 h-3" />
              <span>Boutique selections</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0b111e]/70 border border-[#1b2844]">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#d9d2c5]/70">
              Qloo Match Index
            </div>
            <div className="text-2xl font-bold font-display text-[#e8c582] mt-0.5">
              96.4%
            </div>
            <div className="text-[11px] text-[#e8c582]/80 mt-0.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>High correlation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Launchers */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-[#f7f3eb]">
            Discovery Tools & Travel Services
          </h2>
          <span className="text-xs text-[#d9d2c5]/60 font-mono">
            Powered by Qloo & Gemini
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            onClick={() => onNavigate('plan')}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#0f182c] border border-[#1b2844] hover:border-[#00c5b2]/60 hover:bg-[#132039] transition-all group text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-[#00c5b2]/10 border border-[#00c5b2]/30 text-[#00c5b2] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#f7f3eb]">Plan Trip</span>
            <span className="text-[10px] text-[#d9d2c5]/60 mt-0.5">AI Day-by-Day</span>
          </button>

          <button
            onClick={() => onNavigate('discover')}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#0f182c] border border-[#1b2844] hover:border-[#00c5b2]/60 hover:bg-[#132039] transition-all group text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-[#00c5b2]/10 border border-[#00c5b2]/30 text-[#00c5b2] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#f7f3eb]">Discover</span>
            <span className="text-[10px] text-[#d9d2c5]/60 mt-0.5">Taste Affinity</span>
          </button>

          <button
            onClick={() => onNavigate('flights')}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#0f182c] border border-[#1b2844] hover:border-[#00c5b2]/60 hover:bg-[#132039] transition-all group text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-[#00c5b2]/10 border border-[#00c5b2]/30 text-[#00c5b2] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <Plane className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#f7f3eb]">Flights</span>
            <span className="text-[10px] text-[#d9d2c5]/60 mt-0.5">Routes & Carbon</span>
          </button>

          <button
            onClick={() => onNavigate('hotels')}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#0f182c] border border-[#1b2844] hover:border-[#00c5b2]/60 hover:bg-[#132039] transition-all group text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-[#00c5b2]/10 border border-[#00c5b2]/30 text-[#00c5b2] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <Bed className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#f7f3eb]">Hotels</span>
            <span className="text-[10px] text-[#d9d2c5]/60 mt-0.5">Boutique & Heritage</span>
          </button>

          <button
            onClick={() => onNavigate('restaurants')}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#0f182c] border border-[#1b2844] hover:border-[#00c5b2]/60 hover:bg-[#132039] transition-all group text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-[#00c5b2]/10 border border-[#00c5b2]/30 text-[#00c5b2] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <Utensils className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#f7f3eb]">Dining</span>
            <span className="text-[10px] text-[#d9d2c5]/60 mt-0.5">Terroir & Cuisine</span>
          </button>

          <button
            onClick={() => onNavigate('saved')}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#0f182c] border border-[#1b2844] hover:border-[#00c5b2]/60 hover:bg-[#132039] transition-all group text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-[#00c5b2]/10 border border-[#00c5b2]/30 text-[#00c5b2] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <Bookmark className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#f7f3eb]">Saved Places</span>
            <span className="text-[10px] text-[#d9d2c5]/60 mt-0.5">Personal Archive</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Section: My Trips & Saved Experiences */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): My Recent Trips */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-bold text-[#f7f3eb]">
                Your Cultural Itineraries
              </h2>
              <p className="text-xs text-[#d9d2c5]/70">
                Custom travel blueprints curated with day-by-day activities and cost estimates.
              </p>
            </div>
            <button
              onClick={() => onNavigate('trips')}
              className="text-xs font-bold text-[#00c5b2] hover:underline flex items-center gap-1"
            >
              <span>View All Trips</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {trips.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#1b2844] bg-[#0d1627]/50 p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#00c5b2]/10 text-[#00c5b2] mx-auto flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#f7f3eb]">
                No Planned Trips Yet
              </h3>
              <p className="text-xs text-[#d9d2c5] max-w-md mx-auto">
                Generate your first tailored cultural journey with AI-assisted morning, afternoon, and evening activities.
              </p>
              <button
                onClick={() => onNavigate('plan')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00c5b2] text-[#0b111e] font-bold text-xs hover:bg-[#00c5b2]/90"
              >
                <Plus className="w-4 h-4" />
                <span>Create First Itinerary</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {trips.slice(0, 3).map((trip) => (
                <div
                  key={trip.id}
                  className="group rounded-2xl border border-[#1b2844] bg-[#0f182c] hover:border-[#00c5b2]/50 p-4 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <SafeImage
                      src={trip.coverImage || '/assets/images/experience_kyoto_teahouse_1793125807384.jpg'}
                      alt={trip.title}
                      fallbackDestination={trip.destination}
                      fallbackCategory="heritage"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-[#1b2844] shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-[#00c5b2] font-semibold">
                          {trip.destination}
                        </span>
                        <span className="text-xs text-[#d9d2c5]/40">·</span>
                        <span className="text-[11px] text-[#d9d2c5]/70">
                          {trip.durationDays} Days
                        </span>
                      </div>
                      <h3 className="font-display text-base font-bold text-[#f7f3eb] group-hover:text-[#00c5b2] transition-colors">
                        {trip.title}
                      </h3>
                      <p className="text-xs text-[#d9d2c5]/70 line-clamp-1 max-w-md">
                        {trip.notes || 'Contemplative cultural route.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
                    {trip.itinerary && (
                      <button
                        onClick={() => onOpenItinerary(trip.itinerary!)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00c5b2]/10 border border-[#00c5b2]/30 text-xs font-semibold text-[#00c5b2] hover:bg-[#00c5b2]/20"
                      >
                        <span>Open Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column (1 Col): Saved Places & Quick Shortcuts */}
        <div className="space-y-6">
          {/* Saved Places */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-[#f7f3eb]">
                Saved Sanctuaries
              </h2>
              <button
                onClick={() => onNavigate('saved')}
                className="text-xs font-bold text-[#00c5b2] hover:underline"
              >
                View ({savedEntities.length})
              </button>
            </div>

            {savedEntities.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#1b2844] bg-[#0d1627]/40 p-5 text-center space-y-2">
                <Bookmark className="w-6 h-6 text-[#d9d2c5]/40 mx-auto" />
                <p className="text-xs text-[#d9d2c5]/80">
                  You haven't bookmarked any cultural places yet.
                </p>
                <button
                  onClick={() => onNavigate('discover')}
                  className="text-xs font-bold text-[#00c5b2] hover:underline"
                >
                  Discover places now →
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {savedEntities.slice(0, 4).map((entity) => (
                  <div
                    key={entity.id}
                    className="p-3 rounded-xl bg-[#0f182c] border border-[#1b2844] flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <SafeImage
                        src={getResolvedImageUrl(entity)}
                        alt={entity.name}
                        fallbackDestination={entity.destination}
                        fallbackCategory={entity.category}
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#f7f3eb] truncate">
                          {entity.name}
                        </div>
                        <div className="text-[11px] text-[#00c5b2] font-mono truncate">
                          {entity.destination} · {entity.category}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onToggleSaveEntity(entity)}
                      className="p-1.5 text-rose-400 hover:text-rose-300 rounded-lg shrink-0"
                      title="Remove from saved"
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Utility Links */}
          <div className="p-4 rounded-2xl bg-[#0d1627] border border-[#1b2844] space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-[#d9d2c5]/70 font-semibold">
              Travel Operations
            </div>
            <div className="space-y-1.5">
              <button
                onClick={() => onNavigate('budget')}
                className="w-full text-left p-2.5 rounded-xl hover:bg-[#121b2f] text-xs text-[#d9d2c5] hover:text-[#f7f3eb] flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Wallet className="w-3.5 h-3.5 text-[#00c5b2]" />
                  <span>Budget & Expense Planner</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-[#d9d2c5]/40" />
              </button>

              <button
                onClick={() => onNavigate('requirements')}
                className="w-full text-left p-2.5 rounded-xl hover:bg-[#121b2f] text-xs text-[#d9d2c5] hover:text-[#f7f3eb] flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00c5b2]" />
                  <span>Visas, Plugs & Live Weather</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-[#d9d2c5]/40" />
              </button>

              <button
                onClick={() => onNavigate('packing')}
                className="w-full text-left p-2.5 rounded-xl hover:bg-[#121b2f] text-xs text-[#d9d2c5] hover:text-[#f7f3eb] flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  <CheckSquare className="w-3.5 h-3.5 text-[#00c5b2]" />
                  <span>Packing & Etiquette Checklist</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-[#d9d2c5]/40" />
              </button>

              <button
                onClick={() => onNavigate('assistant')}
                className="w-full text-left p-2.5 rounded-xl hover:bg-[#121b2f] text-xs text-[#d9d2c5] hover:text-[#f7f3eb] flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  <MessageSquareCode className="w-3.5 h-3.5 text-[#00c5b2]" />
                  <span>Cultural Travel Concierge</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-[#d9d2c5]/40" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
