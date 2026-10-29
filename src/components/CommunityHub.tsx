import React, { useState, useEffect } from 'react';
import {
  Users,
  Heart,
  Bookmark,
  Share2,
  Sparkles,
  ExternalLink,
  MapPin,
  Calendar,
  Check,
  Compass,
} from 'lucide-react';
import { CommunityItinerary, TripItinerary } from '../types/travel';
import { INITIAL_COMMUNITY_TRIPS } from '../data/communityTrips';
import { SafeImage } from './SafeImage';
import { getResolvedImageUrl } from '../utils/imageUtils';

interface CommunityHubProps {
  onCopyItineraryToMyTrips: (itinerary: TripItinerary) => void;
  onViewItinerary: (itinerary: TripItinerary) => void;
}

export const CommunityHub: React.FC<CommunityHubProps> = ({
  onCopyItineraryToMyTrips,
  onViewItinerary,
}) => {
  const [trips, setTrips] = useState<CommunityItinerary[]>(INITIAL_COMMUNITY_TRIPS);
  const [activeArchetype, setActiveArchetype] = useState<string>('all');
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/community/trips')
      .then((res) => res.json())
      .then((data) => {
        if (data.trips && Array.isArray(data.trips)) {
          setTrips(data.trips);
        }
      })
      .catch((err) => console.warn('Could not load community trips:', err));
  }, []);

  const handleLike = async (tripId: string) => {
    if (likedIds.includes(tripId)) return;
    setLikedIds((prev) => [...prev, tripId]);
    setTrips((prev) =>
      prev.map((t) => (t.id === tripId ? { ...t, likes: t.likes + 1 } : t))
    );

    try {
      await fetch('/api/community/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tripId }),
      });
    } catch (e) {
      console.warn('Like request failed', e);
    }
  };

  const handleSaveToTrips = (trip: CommunityItinerary) => {
    onCopyItineraryToMyTrips(trip.itinerary);
    setSavedIds((prev) => [...prev, trip.id]);
    setCopiedId(trip.id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  const archetypes = [
    { key: 'all', label: 'All Archetypes' },
    { key: 'Contemplative', label: 'Contemplative Aesthetician' },
    { key: 'Bohemian', label: 'Bohemian Flâneur' },
    { key: 'Culinary', label: 'Culinary Anthropologist' },
  ];

  const filteredTrips = trips.filter((t) => {
    if (activeArchetype === 'all') return true;
    return (
      t.archetypeTag.toLowerCase().includes(activeArchetype.toLowerCase()) ||
      t.author.archetype.toLowerCase().includes(activeArchetype.toLowerCase())
    );
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#00c5b2] mb-2 flex items-center justify-center gap-1.5">
          <Users className="w-3.5 h-3.5" />
          <span>Global Cultural Community</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f7f3eb]">
          Traveler-Curated Cultural Trails
        </h2>
        <p className="mt-2 text-sm text-[#d9d2c5]">
          Explore and clone high-affinity itineraries designed by fellow cultural travelers, architects, and culinary historians.
        </p>

        {/* Archetype Filter Tabs */}
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {archetypes.map((arch) => (
            <button
              key={arch.key}
              onClick={() => setActiveArchetype(arch.key)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeArchetype === arch.key
                  ? 'bg-[#00c5b2] text-[#070b14] shadow-md shadow-[#00c5b2]/20'
                  : 'bg-[#121b2f] text-[#d9d2c5] hover:bg-[#1b2844] border border-[#1b2844]'
              }`}
            >
              {arch.label}
            </button>
          ))}
        </div>
      </div>

      {/* Community Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredTrips.map((trip) => {
          const isLiked = likedIds.includes(trip.id);
          const isSaved = savedIds.includes(trip.id);

          return (
            <div
              key={trip.id}
              className="bg-[#121b2f] border border-[#1b2844] hover:border-[#00c5b2]/40 rounded-2xl overflow-hidden shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                {/* Media Header */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#070b14]">
                  <SafeImage
                    src={trip.coverImage}
                    alt={trip.title}
                    fallbackDestination={trip.destination}
                    fallbackCategory="heritage"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b111e] via-transparent to-black/30 pointer-events-none" />

                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#070b14]/80 backdrop-blur-md text-[#00c5b2] border border-[#1b2844]">
                      {trip.archetypeTag}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#d9d2c5]">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#00c5b2]" />
                      <span className="font-medium text-[#f7f3eb]">{trip.destination}</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#d9d2c5]/80">
                      {trip.durationDays} Days
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <img
                      src={trip.author.avatar}
                      alt={trip.author.name}
                      className="w-9 h-9 rounded-full object-cover border border-[#00c5b2]/40"
                    />
                    <div>
                      <div className="text-xs font-semibold text-[#f7f3eb]">
                        {trip.author.name}
                      </div>
                      <div className="text-[10px] text-[#00c5b2]">
                        {trip.author.handle} · {trip.author.archetype}
                      </div>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-lg text-[#f7f3eb] leading-snug">
                    {trip.title}
                  </h3>

                  <p className="text-xs text-[#d9d2c5]/80 line-clamp-2">
                    {trip.summary}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[11px] uppercase tracking-wider text-[#e8c582] font-semibold">
                      Curated Highlights:
                    </span>
                    <ul className="text-xs text-[#d9d2c5]/90 space-y-1">
                      {trip.highlights.slice(0, 3).map((hl, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00c5b2]" />
                          <span className="truncate">{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-5 pt-0 border-t border-[#1b2844] mt-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 text-xs text-[#d9d2c5]">
                  <button
                    onClick={() => handleLike(trip.id)}
                    className={`flex items-center gap-1 transition-colors ${
                      isLiked ? 'text-rose-400 font-bold' : 'hover:text-rose-400'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-400' : ''}`} />
                    <span>{trip.likes}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSaveToTrips(trip)}
                    className="text-xs px-3 py-1.5 rounded-xl border border-[#1b2844] bg-[#0b111e] hover:bg-[#1b2844] text-[#f7f3eb] transition-colors flex items-center gap-1"
                    title="Clone to My Trips"
                  >
                    {copiedId === trip.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#00c5b2]" />
                        <span className="text-[#00c5b2]">Cloned</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-3.5 h-3.5 text-[#e8c582]" />
                        <span>Clone Trip</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onViewItinerary(trip.itinerary)}
                    className="text-xs px-3 py-1.5 rounded-xl bg-[#00c5b2] hover:bg-[#02e0cb] text-[#070b14] font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>View</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
