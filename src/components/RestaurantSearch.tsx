import React, { useState, useEffect } from 'react';
import { Utensils, Star, ExternalLink, Sparkles, MapPin, Bookmark, Heart, Calendar, Clock, Users, X, Check } from 'lucide-react';
import { RestaurantResult } from '../types/travel';
import { SafeImage } from './SafeImage';
import { getResolvedImageUrl } from '../utils/imageUtils';

interface RestaurantSearchProps {
  initialDestination?: string;
  onSaveRestaurant?: (restaurant: RestaurantResult) => void;
  savedRestaurantIds?: string[];
}

export const RestaurantSearch: React.FC<RestaurantSearchProps> = ({
  initialDestination = 'Kyoto',
  onSaveRestaurant,
  savedRestaurantIds = [],
}) => {
  const [destination, setDestination] = useState(initialDestination);
  const [priceTier, setPriceTier] = useState<string>('all');
  const [dietary, setDietary] = useState<string>('all');

  const [isLoading, setIsLoading] = useState(false);
  const [restaurants, setRestaurants] = useState<RestaurantResult[]>([]);
  const [reservationModalRestaurant, setReservationModalRestaurant] = useState<RestaurantResult | null>(null);
  const [reservationDate, setReservationDate] = useState('2026-05-18');
  const [reservationTime, setReservationTime] = useState('19:30');
  const [reservationGuests, setReservationGuests] = useState(2);
  const [reservationNotes, setReservationNotes] = useState('');
  const [reservationConfirmed, setReservationConfirmed] = useState(false);

  const fetchRestaurants = async (targetDest = destination) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/restaurants/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination: targetDest }),
      });
      if (res.ok) {
        const data = await res.json();
        setRestaurants(data.restaurants || []);
      }
    } catch (err) {
      console.error('Restaurant fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants(initialDestination);
  }, [initialDestination]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRestaurants(destination);
  };

  const filteredRestaurants = restaurants.filter((r) => {
    if (priceTier !== 'all' && r.priceTier !== priceTier) return false;
    return true;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#00c5b2] mb-2 flex items-center justify-center gap-1.5">
          <Utensils className="w-3.5 h-3.5" />
          <span>Cultural Gastronomy & Terroir</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f7f3eb]">
          Culinary Experiences Tuned to Your Palate
        </h2>
        <p className="mt-2 text-sm text-[#d9d2c5]">
          Heirloom obanzai, natural wine tascas, and ancestral fermenters correlated with your personal taste affinities.
        </p>
      </div>

      {/* Filter Form */}
      <form
        onSubmit={handleSearchSubmit}
        className="bg-[#121b2f]/80 backdrop-blur-md border border-[#1b2844] rounded-2xl p-6 shadow-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1.5">
              Destination City
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Kyoto, Lisbon, Oaxaca, Palermo"
              className="w-full bg-[#0b111e] border border-[#1b2844] rounded-xl px-3.5 py-2.5 text-sm text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1.5">
              Price Range
            </label>
            <select
              value={priceTier}
              onChange={(e) => setPriceTier(e.target.value)}
              aria-label="Price range"
              className="w-full bg-[#0b111e] border border-[#1b2844] rounded-xl px-3 py-2.5 text-sm text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
            >
              <option value="all">All Tiers ($ to $$$$)</option>
              <option value="$">$ (Intimate & Casual)</option>
              <option value="$$">$$ (Neighborhood Bistro / Tasca)</option>
              <option value="$$$">$$$ (Fine Heritage Dining)</option>
              <option value="$$$$">$$$$ (Kaiseki / Tasting Menu)</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-[#00c5b2] hover:bg-[#02e0cb] text-[#070b14] font-semibold rounded-xl text-sm transition-all h-[42px] disabled:opacity-50 shadow-md shadow-[#00c5b2]/20"
            >
              {isLoading ? 'Searching...' : 'Discover Dining'}
            </button>
          </div>
        </div>
      </form>

      {/* Restaurant Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRestaurants.map((restaurant) => {
          const isSaved = savedRestaurantIds.includes(restaurant.id);

          return (
            <div
              key={restaurant.id}
              className="bg-[#121b2f] border border-[#1b2844] hover:border-[#00c5b2]/40 rounded-2xl overflow-hidden transition-all shadow-xl flex flex-col"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#070b14]">
                <SafeImage
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  fallbackDestination={restaurant.destination || destination}
                  fallbackCategory="culinary"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b111e] via-transparent to-black/30 pointer-events-none" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#070b14]/80 backdrop-blur-md text-[#00c5b2] border border-[#1b2844]">
                    {restaurant.cuisine}
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-1 rounded-md bg-[#070b14]/80 backdrop-blur-md text-[#e8c582] border border-[#1b2844]">
                    {restaurant.priceTier}
                  </span>
                </div>

                {/* Taste Match Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#00c5b2] text-[#070b14] px-2.5 py-1 rounded-lg text-xs font-bold shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{restaurant.tasteMatchScore}% Taste Match</span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#d9d2c5]">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#00c5b2]" />
                    <span>{restaurant.neighborhood}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#e8c582] font-semibold">
                    <Star className="w-3.5 h-3.5 fill-[#e8c582]" />
                    <span>{restaurant.rating.toFixed(1)}</span>
                    <span className="text-[#d9d2c5]/60 font-normal">({restaurant.reviewCount})</span>
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-display font-bold text-xl text-[#f7f3eb]">
                    {restaurant.name}
                  </h3>

                  {/* Signature Dish */}
                  <div className="mt-2 text-xs text-[#e8c582] flex items-start gap-1.5">
                    <span className="font-semibold text-[#f7f3eb]">Signature:</span>
                    <span>{restaurant.signatureDish}</span>
                  </div>

                  {/* Qloo Cultural Explanation */}
                  <div className="mt-3 p-3 rounded-xl bg-[#0b111e]/80 border border-[#1b2844] text-xs text-[#d9d2c5]/90">
                    <span className="text-[#00c5b2] font-semibold">Qloo Affinity: </span>
                    {restaurant.tasteExplanation}
                  </div>

                  {/* Dietary Options */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {restaurant.dietaryOptions.map((opt, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-[#1b2844]/60 text-[#d9d2c5] border border-[#1b2844]"
                      >
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Reservation Links */}
                <div className="pt-4 border-t border-[#1b2844] flex items-center justify-between gap-3">
                  <div className="text-xs text-[#d9d2c5]/70">
                    Direct Table Concierge
                  </div>

                  <div className="flex items-center gap-2">
                    {onSaveRestaurant && (
                      <button
                        onClick={() => onSaveRestaurant(restaurant)}
                        aria-label="Save restaurant"
                        className={`text-xs px-3 py-2 rounded-xl border transition-colors flex items-center gap-1.5 ${
                          isSaved
                            ? 'bg-[#00c5b2]/10 border-[#00c5b2] text-[#00c5b2]'
                            : 'bg-[#1b2844] border-[#1b2844] text-[#f7f3eb] hover:bg-[#27395e]'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>{isSaved ? 'Saved' : 'Save'}</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setReservationModalRestaurant(restaurant);
                        setReservationConfirmed(false);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#00c5b2] hover:bg-[#02e0cb] text-[#070b14] font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#00c5b2]/20 flex items-center gap-1.5 shrink-0"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Reserve Table</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table Reservation Modal */}
      {reservationModalRestaurant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0b111e] border border-[#1b2844] rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 relative">
            <button
              onClick={() => setReservationModalRestaurant(null)}
              className="absolute top-4 right-4 p-2 text-[#d9d2c5]/60 hover:text-white rounded-full bg-[#121b2f] border border-[#1b2844]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-mono text-[#00c5b2] uppercase tracking-wider font-semibold">
                Table Booking Concierge
              </span>
              <h3 className="font-display text-xl font-bold text-[#f7f3eb]">
                {reservationModalRestaurant.name}
              </h3>
              <p className="text-xs text-[#d9d2c5]">
                {reservationModalRestaurant.neighborhood} · {reservationModalRestaurant.cuisine}
              </p>
            </div>

            {reservationConfirmed ? (
              <div className="p-6 rounded-2xl bg-[#00c5b2]/10 border border-[#00c5b2]/40 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#00c5b2] text-[#070b14] mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="font-display text-lg font-bold text-[#f7f3eb]">
                  Reservation Request Logged
                </h4>
                <p className="text-xs text-[#d9d2c5] max-w-sm mx-auto">
                  Reserved for {reservationGuests} guests on {reservationDate} at {reservationTime}. Stored in your travel profile.
                </p>
                <div className="pt-2 flex items-center justify-center gap-3">
                  <a
                    href={reservationModalRestaurant.reservationLinks.googleMaps}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00c5b2] text-[#070b14] font-bold text-xs"
                  >
                    <span>Open in Maps & Dining App</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setReservationModalRestaurant(null)}
                    className="px-4 py-2 rounded-xl bg-[#121b2f] border border-[#1b2844] text-xs text-[#d9d2c5] hover:text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setReservationConfirmed(true);
                }}
                className="space-y-3 pt-2"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={reservationDate}
                      onChange={(e) => setReservationDate(e.target.value)}
                      className="w-full bg-[#121b2f] border border-[#1b2844] rounded-xl px-3 py-2 text-xs text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1">
                      Seating Time
                    </label>
                    <select
                      value={reservationTime}
                      onChange={(e) => setReservationTime(e.target.value)}
                      className="w-full bg-[#121b2f] border border-[#1b2844] rounded-xl px-3 py-2 text-xs text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
                    >
                      <option value="18:00">18:00 (Early Dinner)</option>
                      <option value="18:30">18:30</option>
                      <option value="19:00">19:00</option>
                      <option value="19:30">19:30 (Prime Seating)</option>
                      <option value="20:00">20:00</option>
                      <option value="20:30">20:30</option>
                      <option value="21:00">21:00 (Late Supper)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1">
                      Guests
                    </label>
                    <select
                      value={reservationGuests}
                      onChange={(e) => setReservationGuests(Number(e.target.value))}
                      className="w-full bg-[#121b2f] border border-[#1b2844] rounded-xl px-3 py-2 text-xs text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
                    >
                      <option value={1}>1 Solo Connoisseur</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                      <option value={5}>5 Guests</option>
                      <option value={6}>6+ Large Party</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1">
                      Seating Preference
                    </label>
                    <select
                      className="w-full bg-[#121b2f] border border-[#1b2844] rounded-xl px-3 py-2 text-xs text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
                    >
                      <option value="counter">Chef’s Counter</option>
                      <option value="terrace">Quiet Garden / Terrace</option>
                      <option value="standard">Standard Dining Room</option>
                      <option value="private">Private Tatami / Booth</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1">
                    Special Dietary or Occasion Notes
                  </label>
                  <input
                    type="text"
                    value={reservationNotes}
                    onChange={(e) => setReservationNotes(e.target.value)}
                    placeholder="e.g. Vegetarian preference, anniversary dinner, quiet table"
                    className="w-full bg-[#121b2f] border border-[#1b2844] rounded-xl px-3 py-2 text-xs text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setReservationModalRestaurant(null)}
                    className="px-4 py-2.5 rounded-xl border border-[#1b2844] text-xs text-[#d9d2c5] hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#00c5b2] hover:bg-[#02e0cb] text-[#070b14] text-xs font-bold transition-all shadow-lg shadow-[#00c5b2]/20"
                  >
                    Confirm Table Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
