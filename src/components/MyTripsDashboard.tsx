import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Calendar,
  MapPin,
  Clock,
  Plus,
  Trash2,
  ExternalLink,
  Share2,
  Check,
  Bookmark,
  DollarSign,
  Globe,
  Lock,
} from 'lucide-react';
import { SavedTrip, TripItinerary, CulturalEntity } from '../types/travel';
import { INITIAL_COMMUNITY_TRIPS } from '../data/communityTrips';
import { SafeImage } from './SafeImage';
import { getResolvedImageUrl } from '../utils/imageUtils';

const STORAGE_KEY = 'tastetrail_saved_trips';

interface MyTripsDashboardProps {
  onOpenItinerary: (itinerary: TripItinerary) => void;
  onExploreMap: (dest: string) => void;
  savedPlaces: CulturalEntity[];
}

export const MyTripsDashboard: React.FC<MyTripsDashboardProps> = ({
  onOpenItinerary,
  onExploreMap,
  savedPlaces,
}) => {
  const [trips, setTrips] = useState<SavedTrip[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse saved trips', e);
    }

    // Default seeded trip if empty
    return [
      {
        id: 'trip_kyoto_default',
        title: 'Kyoto of Poets & Teahouses',
        destination: 'Kyoto, Japan',
        dates: 'May 15 – May 19, 2026',
        durationDays: 4,
        coverImage: '/assets/images/experience_kyoto_teahouse_1793125807384.jpg',
        status: 'planned',
        itinerary: INITIAL_COMMUNITY_TRIPS[0].itinerary,
        savedPlaces: savedPlaces.slice(0, 4),
        notes: 'Visit Shisen-do early morning for acoustic solitude. Reserve obanzai dining near Kamogawa.',
        isPublic: true,
        createdAt: '2026-04-10',
        updatedAt: '2026-04-10',
      },
    ];
  });

  const [statusFilter, setStatusFilter] = useState<'all' | 'planned' | 'in_progress' | 'completed'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Trip Modal
  const [isNewTripModalOpen, setIsNewTripModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDestination, setNewDestination] = useState('Lisbon, Portugal');
  const [newDates, setNewDates] = useState('June 10 – June 14, 2026');
  const [newDuration, setNewDuration] = useState(4);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
    } catch (e) {
      console.warn('Failed to save trips to localStorage', e);
    }
  }, [trips]);

  const handleDeleteTrip = (id: string) => {
    if (window.confirm('Are you sure you want to delete this trip from your collection?')) {
      setTrips((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleTogglePublic = (id: string) => {
    setTrips((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isPublic: !t.isPublic } : t))
    );
  };

  const handleShareLink = (trip: SavedTrip) => {
    navigator.clipboard.writeText(`${window.location.origin}/#trip-${trip.id}`);
    setCopiedId(trip.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCreateTrip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    let coverImage = '/assets/images/hero_cultural_travel_1793125935503.jpg';
    if (newDestination.toLowerCase().includes('kyoto')) {
      coverImage = '/assets/images/experience_kyoto_teahouse_1793125807384.jpg';
    } else if (newDestination.toLowerCase().includes('lisbon')) {
      coverImage = '/assets/images/experience_lisbon_miradouro_1793125807847.jpg';
    } else if (newDestination.toLowerCase().includes('oaxaca')) {
      coverImage = '/assets/images/experience_oaxaca_artisan_1793125807275.jpg';
    }

    const newTrip: SavedTrip = {
      id: `trip_${Date.now()}`,
      title: newTitle.trim(),
      destination: newDestination.trim(),
      dates: newDates,
      durationDays: Number(newDuration) || 3,
      coverImage,
      status: 'planned',
      savedPlaces: [],
      notes: 'Custom cultural trip created in TasteTrail AI',
      isPublic: false,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    setTrips((prev) => [newTrip, ...prev]);
    setIsNewTripModalOpen(false);
    setNewTitle('');
  };

  const filteredTrips = trips.filter((t) => {
    if (statusFilter === 'all') return true;
    return t.status === statusFilter;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#00c5b2] mb-1 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Traveler Portfolio & Archive</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f7f3eb]">
            My Curated Journeys
          </h2>
          <p className="mt-1 text-sm text-[#d9d2c5]">
            Manage your planned itineraries, saved experiences, and travel notes in one place.
          </p>
        </div>

        <button
          onClick={() => setIsNewTripModalOpen(true)}
          className="px-5 py-2.5 bg-[#00c5b2] hover:bg-[#02e0cb] text-[#070b14] font-semibold text-xs rounded-xl transition-all shadow-md shadow-[#00c5b2]/20 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Journey</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1b2844] pb-3">
        <button
          onClick={() => setStatusFilter('all')}
          className={`text-xs px-3.5 py-1.5 rounded-lg transition-colors ${
            statusFilter === 'all'
              ? 'bg-[#00c5b2] text-[#070b14] font-bold'
              : 'text-[#d9d2c5] hover:text-[#f7f3eb] hover:bg-[#121b2f]'
          }`}
        >
          All Journeys ({trips.length})
        </button>
        <button
          onClick={() => setStatusFilter('planned')}
          className={`text-xs px-3.5 py-1.5 rounded-lg transition-colors ${
            statusFilter === 'planned'
              ? 'bg-[#00c5b2] text-[#070b14] font-bold'
              : 'text-[#d9d2c5] hover:text-[#f7f3eb] hover:bg-[#121b2f]'
          }`}
        >
          Upcoming / Planned
        </button>
        <button
          onClick={() => setStatusFilter('completed')}
          className={`text-xs px-3.5 py-1.5 rounded-lg transition-colors ${
            statusFilter === 'completed'
              ? 'bg-[#00c5b2] text-[#070b14] font-bold'
              : 'text-[#d9d2c5] hover:text-[#f7f3eb] hover:bg-[#121b2f]'
          }`}
        >
          Past Travel Memories
        </button>
      </div>

      {/* Trips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrips.map((trip) => (
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b111e] via-transparent to-black/30" />

                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#070b14]/80 backdrop-blur-md text-[#00c5b2] border border-[#1b2844]">
                    {trip.durationDays} Days
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-md ${
                      trip.status === 'completed'
                        ? 'bg-[#1b2844]/90 text-[#d9d2c5]'
                        : 'bg-[#00c5b2]/20 border border-[#00c5b2]/40 text-[#00c5b2]'
                    }`}
                  >
                    {trip.status}
                  </span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1">
                  <button
                    onClick={() => handleTogglePublic(trip.id)}
                    className="p-1.5 rounded-lg bg-[#070b14]/80 backdrop-blur-md border border-[#1b2844] text-[#d9d2c5] hover:text-[#00c5b2] transition-colors"
                    title={trip.isPublic ? 'Publicly visible in Community' : 'Private journey'}
                  >
                    {trip.isPublic ? (
                      <Globe className="w-3.5 h-3.5 text-[#00c5b2]" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-[#d9d2c5]/60" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDeleteTrip(trip.id)}
                    className="p-1.5 rounded-lg bg-[#070b14]/80 backdrop-blur-md border border-[#1b2844] text-[#d9d2c5] hover:text-red-400 transition-colors"
                    title="Delete journey"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#d9d2c5]">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#00c5b2]" />
                    <span className="font-medium text-[#f7f3eb]">{trip.destination}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#d9d2c5]/80">
                    <Calendar className="w-3 h-3" />
                    <span>{trip.dates}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <h3 className="font-display font-bold text-lg text-[#f7f3eb] line-clamp-1">
                  {trip.title}
                </h3>

                <p className="text-xs text-[#d9d2c5]/80 line-clamp-2">
                  {trip.notes}
                </p>

                {/* Places tally */}
                <div className="flex items-center gap-4 text-xs text-[#d9d2c5]/70 pt-2 border-t border-[#1b2844]">
                  <div>
                    <span className="font-semibold text-[#f7f3eb]">
                      {trip.itinerary?.days?.length || trip.durationDays}
                    </span>{' '}
                    Days Planned
                  </div>
                  <div>
                    <span className="font-semibold text-[#00c5b2]">
                      ${trip.itinerary?.totalEstimatedCost || trip.durationDays * 110}
                    </span>{' '}
                    Est. Budget
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-5 pt-0 flex items-center justify-between gap-2">
              <button
                onClick={() => handleShareLink(trip)}
                className="text-xs px-3 py-2 rounded-xl bg-[#0b111e] border border-[#1b2844] text-[#d9d2c5] hover:text-white transition-colors flex items-center gap-1.5"
                title="Copy share link"
              >
                {copiedId === trip.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#00c5b2]" />
                    <span className="text-[#00c5b2]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">

                {trip.itinerary && (
                  <button
                    onClick={() => onOpenItinerary(trip.itinerary!)}
                    className="text-xs px-3.5 py-2 rounded-xl bg-[#00c5b2] hover:bg-[#02e0cb] text-[#070b14] font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>View Itinerary</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Trip Modal */}
      {isNewTripModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0b111e] border border-[#1b2844] rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h4 className="font-display font-bold text-xl text-[#f7f3eb]">
              Create New Journey
            </h4>

            <form onSubmit={handleCreateTrip} className="space-y-3">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1">
                  Trip Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Lisbon Azulejos & Twilight Fado"
                  className="w-full bg-[#121b2f] border border-[#1b2844] rounded-lg px-3 py-2 text-sm text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1">
                  Destination City
                </label>
                <input
                  type="text"
                  value={newDestination}
                  onChange={(e) => setNewDestination(e.target.value)}
                  placeholder="e.g. Lisbon, Portugal"
                  className="w-full bg-[#121b2f] border border-[#1b2844] rounded-lg px-3 py-2 text-sm text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1">
                    Dates
                  </label>
                  <input
                    type="text"
                    value={newDates}
                    onChange={(e) => setNewDates(e.target.value)}
                    placeholder="June 10 – June 14, 2026"
                    className="w-full bg-[#121b2f] border border-[#1b2844] rounded-lg px-3 py-2 text-xs text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1">
                    Duration (Days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="14"
                    value={newDuration}
                    onChange={(e) => setNewDuration(Number(e.target.value))}
                    className="w-full bg-[#121b2f] border border-[#1b2844] rounded-lg px-3 py-2 text-xs text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsNewTripModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#1b2844] text-[#d9d2c5] text-xs font-semibold hover:bg-[#27395e]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#00c5b2] text-[#070b14] text-xs font-bold hover:bg-[#02e0cb]"
                >
                  Create Journey
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
