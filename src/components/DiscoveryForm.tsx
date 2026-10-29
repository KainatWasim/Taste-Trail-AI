import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Landmark,
  Trees,
  Palette,
  Music,
  Building2,
  Compass,
  ShoppingBag,
  Users,
  Sparkles,
  Ticket,
  MapPin,
  Check,
  AlertCircle,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import {
  TravelInterest,
  TravelMood,
  BudgetPreference,
  TravelCompanion,
  TravelPreferences
} from '../types/travel';

interface DiscoveryFormProps {
  initialPreferences?: Partial<TravelPreferences>;
  onSubmit: (preferences: TravelPreferences) => void;
  isLoading: boolean;
}

const INTERESTS_CONFIG: {
  id: TravelInterest;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}[] = [
  { id: 'food_dining', label: 'Food & Dining', icon: UtensilsCrossed, description: 'Terroir, heirloom varieties & culinary craft' },
  { id: 'architecture', label: 'Architecture', icon: Building2, description: 'Brutalist, vernacular, modernist & ancient forms' },
  { id: 'history_heritage', label: 'History & Heritage', icon: Landmark, description: 'Living traditions, antiquities & archives' },
  { id: 'art_design', label: 'Art & Design', icon: Palette, description: 'Ateliers, ceramics, textiles & modern collections' },
  { id: 'music', label: 'Music & Sound', icon: Music, description: 'Vinyl kissatens, jazz rooms & acoustic fado' },
  { id: 'local_culture', label: 'Local Culture', icon: Users, description: 'Community souks, guilds & neighborhood taverns' },
  { id: 'nature_landscapes', label: 'Nature & Landscapes', icon: Trees, description: 'Sculptural botanical gardens & sacred forests' },
  { id: 'adventure', label: 'Adventure', icon: Compass, description: 'Off-grid explorations & scenic pathways' },
  { id: 'shopping', label: 'Artisan Shopping', icon: ShoppingBag, description: 'Independent craft studios, printmakers & ceramics' },
  { id: 'entertainment', label: 'Entertainment', icon: Ticket, description: 'Performing arts, cinema & evening salons' },
];

const MOODS_CONFIG: { id: TravelMood; label: string; description: string }[] = [
  { id: 'cultural', label: 'Cultural', description: 'Deep immersion into history, arts & traditions' },
  { id: 'relaxed', label: 'Relaxed', description: 'Unhurried contemplation, gardens & slow cafes' },
  { id: 'creative', label: 'Creative', description: 'Inspiration, studios, typography & modern design' },
  { id: 'scenic', label: 'Scenic', description: 'Panoramic viewpoints, coastal ridges & light' },
  { id: 'adventurous', label: 'Adventurous', description: 'Hidden alleys, unfamiliar routes & discoveries' },
  { id: 'social', label: 'Social', description: 'Vibrant markets, wine counters & shared tables' },
];

const BUDGETS_CONFIG: { id: BudgetPreference; label: string }[] = [
  { id: 'budget', label: 'Budget-friendly' },
  { id: 'moderate', label: 'Moderate' },
  { id: 'premium', label: 'Premium' },
  { id: 'unspecified', label: 'Not specified' },
];

const COMPANIONS_CONFIG: { id: TravelCompanion; label: string }[] = [
  { id: 'solo', label: 'Solo Traveler' },
  { id: 'friends', label: 'With Friends' },
  { id: 'family', label: 'Family' },
  { id: 'unspecified', label: 'Not specified' },
];

const POPULAR_DESTINATIONS = [
  'Kyoto, Japan',
  'Lisbon, Portugal',
  'Oaxaca, Mexico',
  'Palermo, Sicily',
  'Montreal, Canada',
  'Tbilisi, Georgia',
];

export const DiscoveryForm: React.FC<DiscoveryFormProps> = ({
  initialPreferences,
  onSubmit,
  isLoading,
}) => {
  const [destination, setDestination] = useState(initialPreferences?.destination || 'Kyoto');
  const [startingCity, setStartingCity] = useState(initialPreferences?.startingCity || '');
  const [interests, setInterests] = useState<TravelInterest[]>(
    initialPreferences?.interests && initialPreferences.interests.length > 0
      ? initialPreferences.interests
      : ['architecture', 'food_dining', 'local_culture']
  );
  const [travelMood, setTravelMood] = useState<TravelMood>(initialPreferences?.travelMood || 'cultural');
  const [budget, setBudget] = useState<BudgetPreference>(initialPreferences?.budget || 'moderate');
  const [companions, setCompanions] = useState<TravelCompanion>(initialPreferences?.companions || 'solo');
  const [customNotes, setCustomNotes] = useState(initialPreferences?.customNotes || '');
  const [validationError, setValidationError] = useState<string | null>(null);

  const toggleInterest = (id: TravelInterest) => {
    setValidationError(null);
    if (interests.includes(id)) {
      if (interests.length === 1) {
        setValidationError('Please select at least one interest to ground your cultural recommendations.');
        return;
      }
      setInterests(interests.filter((i) => i !== id));
    } else {
      setInterests([...interests, id]);
    }
  };

  const handleReset = () => {
    setDestination('Kyoto');
    setStartingCity('');
    setInterests(['architecture', 'food_dining', 'local_culture']);
    setTravelMood('cultural');
    setBudget('moderate');
    setCompanions('solo');
    setCustomNotes('');
    setValidationError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) {
      setValidationError('Please specify a target destination or select one of our curated cultural hubs.');
      return;
    }
    if (interests.length === 0) {
      setValidationError('Please select at least one interest so Qloo can calculate affinity signals.');
      return;
    }
    setValidationError(null);
    onSubmit({
      startingCity,
      destination,
      interests,
      travelMood,
      budget,
      companions,
      customNotes,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-10">
      {/* Validation Banner if error */}
      {validationError && (
        <div className="flex items-center gap-3 rounded-xl border border-rose-500/40 bg-rose-950/30 p-4 text-sm text-rose-200">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-400" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Field A: Destination & Starting City */}
      <div className="rounded-2xl border border-[#1b2844] bg-[#0b111e] p-6 lg:p-8">
        <div className="flex items-center justify-between border-b border-[#1b2844] pb-4 mb-6">
          <div>
            <h3 className="font-display text-lg font-semibold text-[#f7f3eb]">
              Destination & Departure
            </h3>
            <p className="text-xs text-[#d9d2c5]">
              Where would you like to travel, or explore our cultural intelligence test hubs.
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-[#d9d2c5] hover:text-[#00c5b2] transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Form</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-[#d9d2c5] uppercase tracking-wider mb-2">
              Target Destination *
            </label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-[#00c5b2]" />
              <input
                type="text"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setValidationError(null);
                }}
                placeholder="e.g. Kyoto, Lisbon, Oaxaca, Palermo..."
                className="w-full rounded-lg border border-[#1b2844] bg-[#121b2f] py-3 pl-10 pr-4 text-sm text-[#f7f3eb] placeholder-[#d9d2c5]/40 focus:border-[#00c5b2] focus:outline-none focus:ring-1 focus:ring-[#00c5b2]"
              />
            </div>

            {/* Quick destination selectors */}
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-[11px] text-[#d9d2c5]/60 self-center">Quick hubs:</span>
              {POPULAR_DESTINATIONS.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    setDestination(city.split(',')[0]);
                    setValidationError(null);
                  }}
                  className={`rounded-md px-2.5 py-1 text-xs transition-colors ${
                    destination.toLowerCase().includes(city.split(',')[0].toLowerCase())
                      ? 'bg-[#00c5b2]/20 border border-[#00c5b2] text-[#00c5b2]'
                      : 'bg-[#121b2f] border border-[#1b2844] text-[#d9d2c5] hover:border-[#00c5b2]/40'
                  }`}
                >
                  {city.split(',')[0]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#d9d2c5] uppercase tracking-wider mb-2">
              Starting City (Optional)
            </label>
            <input
              type="text"
              value={startingCity}
              onChange={(e) => setStartingCity(e.target.value)}
              placeholder="e.g. New York, London, Tokyo, San Francisco..."
              className="w-full rounded-lg border border-[#1b2844] bg-[#121b2f] py-3 px-4 text-sm text-[#f7f3eb] placeholder-[#d9d2c5]/40 focus:border-[#00c5b2] focus:outline-none focus:ring-1 focus:ring-[#00c5b2]"
            />
            <p className="mt-2 text-xs text-[#d9d2c5]/60">
              Helps establish geographic departure context for travel planning.
            </p>
          </div>
        </div>
      </div>

      {/* Field B: Cultural Interests (Interactive Cards) */}
      <div className="rounded-2xl border border-[#1b2844] bg-[#0b111e] p-6 lg:p-8">
        <div className="border-b border-[#1b2844] pb-4 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-[#f7f3eb]">
              Personal Interests & Cultural Affinities *
            </h3>
            <span className="text-xs font-mono text-[#00c5b2]">
              {interests.length} selected
            </span>
          </div>
          <p className="text-xs text-[#d9d2c5] mt-1">
            Select the cultural dimensions that define your taste. Qloo connects these signals to authentic local experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {INTERESTS_CONFIG.map(({ id, label, icon: Icon, description }) => {
            const isSelected = interests.includes(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggleInterest(id)}
                className={`flex flex-col items-start p-4 text-left rounded-xl border transition-all ${
                  isSelected
                    ? 'border-[#00c5b2] bg-[#121b2f] shadow-md shadow-[#00c5b2]/10'
                    : 'border-[#1b2844] bg-[#070b14] hover:border-[#1b2844] hover:bg-[#121b2f]/60'
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                        isSelected ? 'bg-[#00c5b2] text-[#070b14]' : 'bg-[#121b2f] text-[#d9d2c5]'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="font-medium text-sm text-[#f7f3eb]">{label}</span>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-[#00c5b2]" />}
                </div>
                <p className="mt-2 text-xs text-[#d9d2c5]/70 line-clamp-2">{description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Field C: Desired Travel Mood */}
      <div className="rounded-2xl border border-[#1b2844] bg-[#0b111e] p-6 lg:p-8">
        <div className="border-b border-[#1b2844] pb-4 mb-6">
          <h3 className="font-display text-lg font-semibold text-[#f7f3eb]">
            Desired Travel Mood
          </h3>
          <p className="text-xs text-[#d9d2c5] mt-1">
            Choose the pace and emotional resonance you want for this journey.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {MOODS_CONFIG.map(({ id, label, description }) => {
            const isSelected = travelMood === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setTravelMood(id)}
                className={`p-3.5 text-left rounded-xl border transition-all ${
                  isSelected
                    ? 'border-[#00c5b2] bg-[#121b2f]'
                    : 'border-[#1b2844] bg-[#070b14] hover:border-[#00c5b2]/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-[#f7f3eb]">{label}</span>
                  {isSelected && <div className="h-2 w-2 rounded-full bg-[#00c5b2]" />}
                </div>
                <p className="mt-1 text-xs text-[#d9d2c5]/60">{description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fields D & E: Budget & Companions */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Budget */}
        <div className="rounded-2xl border border-[#1b2844] bg-[#0b111e] p-6">
          <h4 className="text-xs font-semibold text-[#d9d2c5] uppercase tracking-wider mb-3">
            Budget Preference
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {BUDGETS_CONFIG.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setBudget(id)}
                className={`p-2.5 text-center text-xs font-medium rounded-lg border transition-colors ${
                  budget === id
                    ? 'border-[#00c5b2] bg-[#00c5b2]/10 text-[#00c5b2]'
                    : 'border-[#1b2844] bg-[#121b2f] text-[#d9d2c5] hover:border-[#1b2844]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Companions */}
        <div className="rounded-2xl border border-[#1b2844] bg-[#0b111e] p-6">
          <h4 className="text-xs font-semibold text-[#d9d2c5] uppercase tracking-wider mb-3">
            Travel Companions
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {COMPANIONS_CONFIG.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setCompanions(id)}
                className={`p-2.5 text-center text-xs font-medium rounded-lg border transition-colors ${
                  companions === id
                    ? 'border-[#00c5b2] bg-[#00c5b2]/10 text-[#00c5b2]'
                    : 'border-[#1b2844] bg-[#121b2f] text-[#d9d2c5] hover:border-[#1b2844]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Field F: Optional Natural Language Input */}
      <div className="rounded-2xl border border-[#1b2844] bg-[#0b111e] p-6 lg:p-8">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-[#d9d2c5] uppercase tracking-wider">
            Natural Language Taste Notes (Optional)
          </label>
          <span className="text-xs text-[#d9d2c5]/60">AI Taste Extractor</span>
        </div>
        <p className="text-xs text-[#d9d2c5]/80 mb-3">
          Describe the feeling or specific things you love in your own words.
        </p>

        <textarea
          rows={3}
          value={customNotes}
          onChange={(e) => setCustomNotes(e.target.value)}
          placeholder='e.g., "I love historical architecture, local food, quiet places, and cultural experiences."'
          className="w-full rounded-lg border border-[#1b2844] bg-[#121b2f] p-4 text-sm text-[#f7f3eb] placeholder-[#d9d2c5]/40 focus:border-[#00c5b2] focus:outline-none focus:ring-1 focus:ring-[#00c5b2]"
        />

        {/* Quick prompt ideas */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[#d9d2c5]/60">Try adding:</span>
          <button
            type="button"
            onClick={() =>
              setCustomNotes(
                'I love historical architecture, local food, quiet places, and cultural experiences.'
              )
            }
            className="rounded border border-[#1b2844] bg-[#121b2f] px-2 py-1 text-[#00c5b2] hover:border-[#00c5b2]/40"
          >
            "Historic architecture, local food & quiet places"
          </button>
          <button
            type="button"
            onClick={() =>
              setCustomNotes(
                'Seeking intimate vinyl listening bars, natural wine cellars, and mid-century ceramics.'
              )
            }
            className="rounded border border-[#1b2844] bg-[#121b2f] px-2 py-1 text-[#00c5b2] hover:border-[#00c5b2]/40"
          >
            "Vinyl listening bars & natural wine"
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#1b2844]">
        <div className="text-xs text-[#d9d2c5]">
          Ready to query Qloo cultural intelligence for <strong className="text-[#00c5b2]">{destination}</strong>.
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-lg bg-[#00c5b2] px-8 py-3.5 text-sm font-semibold text-[#070b14] shadow-lg shadow-[#00c5b2]/20 transition-all hover:bg-[#02e0cb] disabled:opacity-60 whitespace-nowrap"
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#070b14] border-t-transparent" />
              <span>Querying Cultural Intelligence...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>Generate Cultural Recommendations</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
