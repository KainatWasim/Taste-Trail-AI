import React, { useState } from 'react';
import { Plane, Calendar, Users, ArrowRight, ExternalLink, ShieldCheck, Clock, Leaf, Filter } from 'lucide-react';
import { FlightResult, FlightSearchParams } from '../types/travel';

interface FlightSearchProps {
  initialDestination?: string;
  initialOrigin?: string;
}

export const FlightSearch: React.FC<FlightSearchProps> = ({
  initialDestination = 'Kyoto (KIX)',
  initialOrigin = 'New York (JFK)',
}) => {
  const [origin, setOrigin] = useState(initialOrigin);
  const [destination, setDestination] = useState(initialDestination);
  const [departureDate, setDepartureDate] = useState('2026-05-15');
  const [returnDate, setReturnDate] = useState('2026-05-22');
  const [tripType, setTripType] = useState<'round_trip' | 'one_way'>('round_trip');
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState<'economy' | 'premium_economy' | 'business'>('economy');
  const [stopsFilter, setStopsFilter] = useState<'all' | 'direct' | '1_stop'>('all');

  const [isLoading, setIsLoading] = useState(false);
  const [flights, setFlights] = useState<FlightResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (origin.trim().toLowerCase() === destination.trim().toLowerCase()) {
      setValidationError('Origin and destination airport cannot be identical. Please select different departure and arrival locations.');
      return;
    }
    setValidationError(null);
    setIsLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch('/api/flights/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin,
          destination,
          departureDate,
          returnDate,
          tripType,
          passengers,
          cabinClass,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setFlights(data.flights || []);
      }
    } catch (err) {
      console.error('Flight search failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredFlights = flights.filter((flight) => {
    if (stopsFilter === 'direct') return flight.stops === 0;
    if (stopsFilter === '1_stop') return flight.stops === 1;
    return true;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#00c5b2] mb-2 flex items-center justify-center gap-1.5">
          <Plane className="w-3.5 h-3.5" />
          <span>Cultural Routing & Flight Discovery</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f7f3eb]">
          Fly to Your Cultural Sanctuary
        </h2>
        <p className="mt-2 text-sm text-[#d9d2c5]">
          Compare optimal routes, carbon efficiency, and transparent live booking fares with verified global carriers.
        </p>
      </div>

      {/* Route Quick Presets */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs text-[#d9d2c5]/60 shrink-0 font-mono">Popular Routes:</span>
        {[
          { from: 'New York (JFK)', to: 'Kyoto (KIX)' },
          { from: 'London (LHR)', to: 'Lahore (LHE)' },
          { from: 'London (LHR)', to: 'Lisbon (LIS)' },
          { from: 'San Francisco (SFO)', to: 'Paris (CDG)' },
          { from: 'Dubai (DXB)', to: 'Islamabad (ISB)' },
          { from: 'New York (JFK)', to: 'Istanbul (IST)' },
        ].map((preset, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setOrigin(preset.from);
              setDestination(preset.to);
              setValidationError(null);
            }}
            className="text-xs px-2.5 py-1 rounded-lg bg-[#121b2f] border border-[#1b2844] text-[#d9d2c5] hover:text-[#00c5b2] hover:border-[#00c5b2]/40 whitespace-nowrap transition-colors"
          >
            {preset.from.split('(')[1]?.replace(')', '') || preset.from} ✈ {preset.to.split('(')[1]?.replace(')', '') || preset.to}
          </button>
        ))}
      </div>

      {/* Search Form Card */}
      <form
        onSubmit={handleSearch}
        className="bg-[#121b2f]/80 backdrop-blur-md border border-[#1b2844] rounded-2xl p-6 shadow-xl space-y-4"
      >
        {validationError && (
          <div className="p-3 rounded-xl bg-red-950/50 border border-red-800/60 text-xs text-red-200">
            {validationError}
          </div>
        )}

        {/* Trip Type & Cabin Class Selectors */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#1b2844]">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 text-xs text-[#f7f3eb] cursor-pointer">
              <input
                type="radio"
                name="tripType"
                checked={tripType === 'round_trip'}
                onChange={() => setTripType('round_trip')}
                className="text-[#00c5b2] focus:ring-0"
              />
              <span>Round Trip</span>
            </label>
            <label className="flex items-center gap-1.5 text-xs text-[#f7f3eb] cursor-pointer">
              <input
                type="radio"
                name="tripType"
                checked={tripType === 'one_way'}
                onChange={() => setTripType('one_way')}
                className="text-[#00c5b2] focus:ring-0"
              />
              <span>One Way</span>
            </label>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#00c5b2]" />
              <select
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                aria-label="Number of passengers"
                className="bg-[#0b111e] border border-[#1b2844] text-[#f7f3eb] text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#00c5b2]"
              >
                <option value={1}>1 Traveler</option>
                <option value={2}>2 Travelers</option>
                <option value={3}>3 Travelers</option>
                <option value={4}>4+ Travelers</option>
              </select>
            </div>

            <select
              value={cabinClass}
              onChange={(e) => setCabinClass(e.target.value as any)}
              aria-label="Cabin class"
              className="bg-[#0b111e] border border-[#1b2844] text-[#f7f3eb] text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#00c5b2]"
            >
              <option value="economy">Economy</option>
              <option value="premium_economy">Premium Economy</option>
              <option value="business">Business Class</option>
            </select>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1.5">
              Origin City / Airport
            </label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="e.g. New York (JFK), London (LHR)"
              className="w-full bg-[#0b111e] border border-[#1b2844] rounded-xl px-3.5 py-2.5 text-sm text-[#f7f3eb] placeholder-[#d9d2c5]/40 focus:outline-none focus:border-[#00c5b2]"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1.5">
              Destination
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Kyoto (KIX), Lisbon (LIS)"
              className="w-full bg-[#0b111e] border border-[#1b2844] rounded-xl px-3.5 py-2.5 text-sm text-[#f7f3eb] placeholder-[#d9d2c5]/40 focus:outline-none focus:border-[#00c5b2]"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1.5">
              Departure Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full bg-[#0b111e] border border-[#1b2844] rounded-xl px-3.5 py-2.5 text-sm text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1.5">
              {tripType === 'round_trip' ? 'Return Date' : 'Trip Option'}
            </label>
            {tripType === 'round_trip' ? (
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full bg-[#0b111e] border border-[#1b2844] rounded-xl px-3.5 py-2.5 text-sm text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
                required
              />
            ) : (
              <div className="w-full bg-[#0b111e]/40 border border-[#1b2844]/60 rounded-xl px-3.5 py-2.5 text-xs text-[#d9d2c5]/60 flex items-center">
                One-way journey
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#d9d2c5]/70">
            <ShieldCheck className="w-4 h-4 text-[#00c5b2]" />
            <span>Direct deep-links to verified airlines and price comparison engines.</span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-8 py-3 bg-[#00c5b2] hover:bg-[#02e0cb] text-[#070b14] font-semibold rounded-xl text-sm transition-all shadow-lg shadow-[#00c5b2]/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-[#070b14] border-t-transparent rounded-full animate-spin" />
                <span>Searching Optimal Routes...</span>
              </>
            ) : (
              <>
                <span>Search Flights</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Results Section */}
      {hasSearched && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#1b2844]">
            <div>
              <h3 className="font-display font-bold text-xl text-[#f7f3eb]">
                Flight Options for {destination}
              </h3>
              <p className="text-xs text-[#d9d2c5]/70">
                Sorted by cultural comfort, route efficiency, and price integrity
              </p>
            </div>

            {/* Stops Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-[#00c5b2]" />
              <span className="text-xs text-[#d9d2c5]/80">Stops:</span>
              <button
                onClick={() => setStopsFilter('all')}
                className={`text-xs px-2.5 py-1 rounded-md ${
                  stopsFilter === 'all'
                    ? 'bg-[#00c5b2] text-[#070b14] font-semibold'
                    : 'bg-[#121b2f] text-[#d9d2c5]'
                }`}
              >
                All ({flights.length})
              </button>
              <button
                onClick={() => setStopsFilter('direct')}
                className={`text-xs px-2.5 py-1 rounded-md ${
                  stopsFilter === 'direct'
                    ? 'bg-[#00c5b2] text-[#070b14] font-semibold'
                    : 'bg-[#121b2f] text-[#d9d2c5]'
                }`}
              >
                Direct
              </button>
              <button
                onClick={() => setStopsFilter('1_stop')}
                className={`text-xs px-2.5 py-1 rounded-md ${
                  stopsFilter === '1_stop'
                    ? 'bg-[#00c5b2] text-[#070b14] font-semibold'
                    : 'bg-[#121b2f] text-[#d9d2c5]'
                }`}
              >
                1 Stop
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredFlights.map((flight) => (
              <div
                key={flight.id}
                className="bg-[#121b2f] border border-[#1b2844] hover:border-[#00c5b2]/40 rounded-2xl p-5 transition-all shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Airline & Schedule Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#00c5b2]">
                      {flight.airline}
                    </span>
                    <span className="text-xs text-[#d9d2c5]/60 font-mono">
                      {flight.flightNumber}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-[#1b2844] text-[#d9d2c5]">
                      {flight.cabinClass}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-8">
                    <div>
                      <div className="text-xl font-bold font-display text-[#f7f3eb]">
                        {flight.origin.time}
                      </div>
                      <div className="text-xs text-[#d9d2c5]/70 font-mono">
                        {flight.origin.code} · {flight.origin.city}
                      </div>
                    </div>

                    <div className="flex-1 max-w-[200px] flex flex-col items-center">
                      <div className="text-[11px] text-[#d9d2c5]/70 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{flight.duration}</span>
                      </div>
                      <div className="w-full relative my-1.5 flex items-center">
                        <div className="w-2 h-2 rounded-full border border-[#00c5b2] bg-[#0b111e]" />
                        <div className="flex-1 h-0.5 bg-[#1b2844]" />
                        <div className="w-2 h-2 rounded-full border border-[#00c5b2] bg-[#00c5b2]" />
                      </div>
                      <div className="text-[11px] font-medium text-[#e8c582]">
                        {flight.stops === 0 ? 'Nonstop' : flight.stopoverDetails || '1 Stop'}
                      </div>
                    </div>

                    <div>
                      <div className="text-xl font-bold font-display text-[#f7f3eb]">
                        {flight.destination.time}
                      </div>
                      <div className="text-xs text-[#d9d2c5]/70 font-mono">
                        {flight.destination.code} · {flight.destination.city}
                      </div>
                    </div>
                  </div>

                  {flight.carbonEmission && (
                    <div className="flex items-center gap-1.5 text-xs text-[#059669]">
                      <Leaf className="w-3.5 h-3.5" />
                      <span>{flight.carbonEmission}</span>
                    </div>
                  )}
                </div>

                {/* Pricing & Deep Links */}
                <div className="lg:border-l lg:border-[#1b2844] lg:pl-6 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3">
                  <div>
                    <div className="text-xs text-[#d9d2c5]/60 text-left lg:text-right">
                      Estimated Roundtrip
                    </div>
                    <div className="text-2xl font-bold font-display text-[#f7f3eb]">
                      ${flight.estimatedPrice.toLocaleString()}{' '}
                      <span className="text-xs font-normal text-[#d9d2c5]/60">USD</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 w-full lg:w-auto">
                    <a
                      href={flight.deepLinks.googleFlights}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 sm:flex-none text-xs px-5 py-2.5 rounded-xl bg-[#00c5b2] hover:bg-[#02e0cb] text-[#070b14] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-[#00c5b2]/20"
                    >
                      <span>Book Flight</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={flight.deepLinks.skyscanner}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 sm:flex-none text-xs px-3.5 py-2.5 rounded-xl bg-[#1b2844] hover:bg-[#27395e] text-[#d9d2c5] font-medium flex items-center justify-center gap-1.5 transition-colors border border-[#1b2844]"
                    >
                      <span>Skyscanner</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[#070b14]/70 border border-[#1b2844] text-xs text-[#d9d2c5]/60 text-center">
            TasteTrail AI does not process flight payments directly. We link you directly to verified airline checkout flows with pre-populated itinerary parameters.
          </div>
        </div>
      )}
    </div>
  );
};
