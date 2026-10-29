import React, { useState, useEffect } from 'react';
import { Bed, Calendar, Users, Star, ExternalLink, Sparkles, MapPin, Check, Bookmark, ArrowRight, X, ShieldCheck } from 'lucide-react';
import { HotelResult } from '../types/travel';
import { SafeImage } from './SafeImage';

interface HotelSearchProps {
  initialDestination?: string;
  onSaveHotel?: (hotel: HotelResult) => void;
  savedHotelIds?: string[];
}

export const HotelSearch: React.FC<HotelSearchProps> = ({
  initialDestination = 'Kyoto',
  onSaveHotel,
  savedHotelIds = [],
}) => {
  const [destination, setDestination] = useState(initialDestination);
  const [checkIn, setCheckIn] = useState('2026-05-15');
  const [checkOut, setCheckOut] = useState('2026-05-20');
  const [guests, setGuests] = useState(2);
  const [propertyType, setPropertyType] = useState('all');

  const [isLoading, setIsLoading] = useState(false);
  const [hotels, setHotels] = useState<HotelResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [bookingModalHotel, setBookingModalHotel] = useState<HotelResult | null>(null);

  const fetchHotels = async (targetDest = destination) => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const res = await fetch('/api/hotels/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: targetDest,
          checkIn,
          checkOut,
          guests,
          propertyType,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setHotels(data.hotels || []);
      }
    } catch (err) {
      console.error('Hotel search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels(initialDestination);
  }, [initialDestination]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchHotels(destination);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#00c5b2] mb-2 flex items-center justify-center gap-1.5">
          <Bed className="w-3.5 h-3.5" />
          <span>Cultural Accommodations & Sanctuaries</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f7f3eb]">
          Stays That Echo Your Aesthetic
        </h2>
        <p className="mt-2 text-sm text-[#d9d2c5]">
          Curated heritage ryokans, restored palaces, and tactile design hotels chosen through cultural affinity.
        </p>
      </div>

      {/* Search Filter Form */}
      <form
        onSubmit={handleSearchSubmit}
        className="bg-[#121b2f]/80 backdrop-blur-md border border-[#1b2844] rounded-2xl p-6 shadow-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1.5">
              Destination City
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Kyoto, Lisbon, Oaxaca"
              className="w-full bg-[#0b111e] border border-[#1b2844] rounded-xl px-3.5 py-2.5 text-sm text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1.5">
              Check-In Date
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-[#0b111e] border border-[#1b2844] rounded-xl px-3.5 py-2.5 text-sm text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1.5">
              Check-Out Date
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-[#0b111e] border border-[#1b2844] rounded-xl px-3.5 py-2.5 text-sm text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
              required
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1.5">
                Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                aria-label="Number of hotel guests"
                className="w-full bg-[#0b111e] border border-[#1b2844] rounded-xl px-3 py-2.5 text-sm text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4+ Guests</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 bg-[#00c5b2] hover:bg-[#02e0cb] text-[#070b14] font-semibold rounded-xl text-sm transition-all h-[42px] disabled:opacity-50 whitespace-nowrap shadow-md shadow-[#00c5b2]/20"
              >
                {isLoading ? 'Searching...' : 'Find Stays'}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Hotel Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {hotels.map((hotel) => {
          const isSaved = savedHotelIds.includes(hotel.id);

          return (
            <div
              key={hotel.id}
              className="bg-[#121b2f] border border-[#1b2844] hover:border-[#00c5b2]/40 rounded-2xl overflow-hidden transition-all shadow-xl flex flex-col justify-between h-full"
            >
              <div>
                {/* Media Header */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#070b14]">
                  <SafeImage
                    src={hotel.imageUrl}
                    alt={hotel.name}
                    fallbackDestination={hotel.destination || destination}
                    fallbackCategory="heritage"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b111e] via-transparent to-black/30 pointer-events-none" />

                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#070b14]/80 backdrop-blur-md text-[#00c5b2] border border-[#1b2844]">
                      {hotel.propertyType}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#070b14]/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#1b2844] text-[#e8c582] text-xs font-semibold">
                    <Star className="w-3.5 h-3.5 fill-[#e8c582]" />
                    <span>{hotel.rating.toFixed(1)}</span>
                    <span className="text-[#d9d2c5]/60 font-normal">({hotel.reviewCount})</span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-[#d9d2c5]">
                      <MapPin className="w-3.5 h-3.5 text-[#00c5b2]" />
                      <span>{hotel.neighborhood} · {hotel.distanceToCenter}</span>
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-display font-bold text-xl text-[#f7f3eb]">
                      {hotel.name}
                    </h3>

                    <div className="mt-2 text-xs text-[#e8c582] flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                      <span>{hotel.culturalVibe}</span>
                    </div>

                    {/* Qloo Cross-Domain Affinity Rationale */}
                    <div className="mt-3 p-3 rounded-xl bg-[#0b111e]/80 border border-[#1b2844] text-xs text-[#d9d2c5]/90">
                      <span className="text-[#00c5b2] font-semibold">Cultural Match: </span>
                      {hotel.crossDomainAffinity}
                    </div>

                    {/* Amenities */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {hotel.amenities.map((amenity, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2.5 py-1 rounded-md bg-[#1b2844]/60 text-[#d9d2c5] border border-[#1b2844]"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Pricing & Prominent Booking Button */}
              <div className="p-6 pt-0 mt-auto">
                <div className="pt-4 border-t border-[#1b2844] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-[#d9d2c5]/60">Nightly rate from</div>
                    <div className="text-2xl font-bold font-display text-[#f7f3eb]">
                      ${hotel.pricePerNight}{' '}
                      <span className="text-xs font-normal text-[#d9d2c5]/60">/ night</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {onSaveHotel && (
                      <button
                        onClick={() => onSaveHotel(hotel)}
                        aria-label="Save hotel"
                        className={`text-xs px-3 py-2.5 rounded-xl border transition-colors flex items-center gap-1.5 ${
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
                      onClick={() => setBookingModalHotel(hotel)}
                      className="px-5 py-2.5 rounded-xl bg-[#00c5b2] hover:bg-[#02e0cb] text-[#070b14] font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#00c5b2]/20 hover:translate-y-[-1px] active:translate-y-[0px] flex items-center gap-1.5 shrink-0"
                    >
                      <span>Booking Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking Confirmation / Partner Handoff Modal */}
      {bookingModalHotel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#121b2f] border border-[#1b2844] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-scaleUp">
            {/* Modal Header */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#070b14]">
              <SafeImage
                src={bookingModalHotel.imageUrl}
                alt={bookingModalHotel.name}
                fallbackDestination={bookingModalHotel.destination || destination}
                fallbackCategory="heritage"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121b2f] via-transparent to-black/40 pointer-events-none" />
              <button
                onClick={() => setBookingModalHotel(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-[#070b14]/70 border border-[#1b2844] text-[#d9d2c5] hover:text-white hover:bg-black/80 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#00c5b2]/20 text-[#00c5b2] border border-[#00c5b2]/30">
                  {bookingModalHotel.propertyType}
                </span>
                <h3 className="font-display font-bold text-xl text-[#f7f3eb] mt-1">
                  {bookingModalHotel.name}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs text-[#d9d2c5]">
                <MapPin className="w-3.5 h-3.5 text-[#00c5b2]" />
                <span>{bookingModalHotel.neighborhood} · {bookingModalHotel.distanceToCenter}</span>
              </div>

              <div className="bg-[#0b111e] border border-[#1b2844] rounded-xl p-4 text-xs space-y-2">
                <div className="flex justify-between text-[#d9d2c5]/70">
                  <span>Selected Dates:</span>
                  <span className="text-[#f7f3eb] font-medium">{checkIn} to {checkOut}</span>
                </div>
                <div className="flex justify-between text-[#d9d2c5]/70">
                  <span>Guests:</span>
                  <span className="text-[#f7f3eb] font-medium">{guests} Adults</span>
                </div>
                <div className="flex justify-between text-[#d9d2c5]/70">
                  <span>Nightly Rate:</span>
                  <span className="text-[#00c5b2] font-bold text-sm">${bookingModalHotel.pricePerNight} / night</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#00c5b2]/10 border border-[#00c5b2]/30 text-xs text-[#d9d2c5]">
                <ShieldCheck className="w-4 h-4 text-[#00c5b2] shrink-0 mt-0.5" />
                <span>
                  You will continue to our verified partner to review room availability and finalize your booking with no extra fees.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={bookingModalHotel.deepLinks.bookingCom}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-xl bg-[#00c5b2] hover:bg-[#02e0cb] text-[#070b14] font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-colors shadow-lg shadow-[#00c5b2]/20"
                >
                  <span>Continue on Booking.com</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={bookingModalHotel.deepLinks.googleTravel}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-xl bg-[#1b2844] hover:bg-[#27395e] text-[#f7f3eb] font-semibold text-xs tracking-wider text-center flex items-center justify-center gap-1.5 transition-colors border border-[#1b2844]"
                >
                  <span>Compare on Google Travel</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
