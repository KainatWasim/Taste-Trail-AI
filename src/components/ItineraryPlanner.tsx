import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Plus,
  Trash2,
  Printer,
  Bookmark,
  DollarSign,
  Sun,
  Sunset,
  Moon,
  ChevronRight,
  Share2,
  Check,
} from 'lucide-react';
import {
  TripItinerary,
  ItineraryDay,
  ItineraryActivity,
  TravelPreferences,
  DayTimeSlot,
  EntityCategory,
} from '../types/travel';
import { SafeImage } from './SafeImage';
import { getResolvedImageUrl } from '../utils/imageUtils';

interface ItineraryPlannerProps {
  onSaveToMyTrips: (itinerary: TripItinerary) => void;
  initialDestination?: string;
  isSaved?: boolean;
}

export const ItineraryPlanner: React.FC<ItineraryPlannerProps> = ({
  onSaveToMyTrips,
  initialDestination = 'Kyoto',
  isSaved = false,
}) => {
  const [destination, setDestination] = useState(initialDestination);
  const [durationDays, setDurationDays] = useState(3);
  const [travelMood, setTravelMood] = useState<'cultural' | 'relaxed' | 'adventurous' | 'creative'>('cultural');
  const [interests, setInterests] = useState<string[]>(['architecture', 'food_dining', 'local_culture']);
  const [customNotes, setCustomNotes] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState<TripItinerary | null>(null);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Modal for adding a new activity
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newActivity, setNewActivity] = useState<Partial<ItineraryActivity>>({
    title: '',
    timeSlot: 'afternoon',
    timeEstimate: '14:00 - 16:00',
    location: '',
    category: 'heritage',
    description: '',
    culturalWhy: '',
    estimatedCost: 20,
    currency: 'USD',
  });

  const handleGenerateItinerary = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setSaveSuccess(false);

    try {
      const res = await fetch('/api/itinerary/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          durationDays,
          interests,
          travelMood,
          budget: 'moderate',
          companions: 'solo',
          customNotes,
        }),
      });

      if (res.ok) {
        const data: TripItinerary = await res.json();
        setItinerary(data);
        setActiveDayIndex(0);
      }
    } catch (err) {
      console.error('Failed to generate itinerary:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteActivity = (dayIndex: number, actId: string) => {
    if (!itinerary) return;
    const updatedDays = [...itinerary.days];
    updatedDays[dayIndex].activities = updatedDays[dayIndex].activities.filter((a) => a.id !== actId);
    setItinerary({
      ...itinerary,
      days: updatedDays,
    });
  };

  const handleAddActivitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itinerary || !newActivity.title) return;

    const act: ItineraryActivity = {
      id: `custom_${Date.now()}`,
      title: newActivity.title || 'Curated Stop',
      timeSlot: (newActivity.timeSlot as DayTimeSlot) || 'afternoon',
      timeEstimate: newActivity.timeEstimate || '14:00 - 16:00',
      location: newActivity.location || destination,
      category: (newActivity.category as EntityCategory) || 'heritage',
      description: newActivity.description || 'Personal cultural discovery',
      culturalWhy: newActivity.culturalWhy || 'Added by traveler',
      estimatedCost: Number(newActivity.estimatedCost) || 0,
      currency: 'USD',
    };

    const updatedDays = [...itinerary.days];
    updatedDays[activeDayIndex].activities.push(act);
    setItinerary({
      ...itinerary,
      days: updatedDays,
    });

    setIsAddModalOpen(false);
    setNewActivity({
      title: '',
      timeSlot: 'afternoon',
      timeEstimate: '14:00 - 16:00',
      location: '',
      category: 'heritage',
      description: '',
      culturalWhy: '',
      estimatedCost: 20,
      currency: 'USD',
    });
  };

  const handleSave = () => {
    if (!itinerary) return;
    onSaveToMyTrips(itinerary);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const activeDay = itinerary?.days[activeDayIndex];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto print:hidden">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#00c5b2] mb-2 flex items-center justify-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <span>Culturally Intelligent Itinerary Architect</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f7f3eb]">
          Plan Your Daily Cultural Cadence
        </h2>
        <p className="mt-2 text-sm text-[#d9d2c5]">
          Sequenced with optimal morning, afternoon, and twilight cultural pacing based on Qloo taste affinity modeling.
        </p>
      </div>

      {/* Generator Form */}
      <form
        onSubmit={handleGenerateItinerary}
        className="bg-[#121b2f]/80 backdrop-blur-md border border-[#1b2844] rounded-2xl p-6 shadow-xl print:hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1.5">
              Destination
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
              Duration (Days)
            </label>
            <select
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              aria-label="Trip duration in days"
              className="w-full bg-[#0b111e] border border-[#1b2844] rounded-xl px-3 py-2.5 text-sm text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
            >
              <option value={2}>2 Days (Weekend Escape)</option>
              <option value={3}>3 Days (Deep Dive)</option>
              <option value={4}>4 Days (Sensory Immersion)</option>
              <option value={5}>5 Days (Slow Travel Arc)</option>
              <option value={7}>7 Days (Full Grand Tour)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1.5">
              Travel Rhythm & Mood
            </label>
            <select
              value={travelMood}
              onChange={(e) => setTravelMood(e.target.value as any)}
              aria-label="Travel mood"
              className="w-full bg-[#0b111e] border border-[#1b2844] rounded-xl px-3 py-2.5 text-sm text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
            >
              <option value="cultural">Contemplative & Cultural</option>
              <option value="relaxed">Relaxed & Leisurely</option>
              <option value="creative">Creative & Architectural</option>
              <option value="adventurous">Adventurous & Sensory</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1.5">
            Artisanal or Curator Notes (Optional)
          </label>
          <input
            type="text"
            value={customNotes}
            onChange={(e) => setCustomNotes(e.target.value)}
            placeholder="e.g. Focus on post-war vinyl listening bars, natural ceramics, and traditional dashi"
            className="w-full bg-[#0b111e] border border-[#1b2844] rounded-xl px-3.5 py-2 text-xs text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
          />
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-[#00c5b2] hover:bg-[#02e0cb] text-[#070b14] font-semibold rounded-xl text-sm transition-all shadow-lg shadow-[#00c5b2]/20 flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-[#070b14] border-t-transparent rounded-full animate-spin" />
                <span>Synthesizing Cultural Route with Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Culturally Tuned Itinerary</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Itinerary Display */}
      {itinerary && (
        <div className="space-y-6">
          {/* Header Summary Card */}
          <div className="bg-[#121b2f] border border-[#1b2844] rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1b2844]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#00c5b2]">
                  {itinerary.archetype}
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#f7f3eb] mt-1">
                  {itinerary.title}
                </h3>
                <p className="mt-2 text-sm text-[#d9d2c5] max-w-3xl">
                  {itinerary.overview}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 print:hidden">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-[#1b2844] hover:bg-[#27395e] text-[#f7f3eb] text-xs font-semibold flex items-center gap-1.5 transition-colors border border-[#1b2844]"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / PDF</span>
                </button>

                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-xl bg-[#00c5b2] hover:bg-[#02e0cb] text-[#070b14] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md shadow-[#00c5b2]/20"
                >
                  {saveSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Saved to My Trips!</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Save to My Trips</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Cultural Bridge Highlights */}
            {itinerary.culturalBridgeHighlights && itinerary.culturalBridgeHighlights.length > 0 && (
              <div className="mt-4 pt-2">
                <div className="text-xs uppercase tracking-wider text-[#e8c582] font-semibold mb-2">
                  Qloo Cultural Correlation Bridges
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {itinerary.culturalBridgeHighlights.map((hl, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-[#0b111e]/80 border border-[#1b2844] text-xs text-[#d9d2c5]/90 flex items-start gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#00c5b2] flex-shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Day Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 print:hidden">
            {itinerary.days.map((day, idx) => (
              <button
                key={day.dayNumber}
                onClick={() => setActiveDayIndex(idx)}
                className={`px-5 py-2.5 rounded-xl font-display text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeDayIndex === idx
                    ? 'bg-[#00c5b2] text-[#070b14] shadow-md shadow-[#00c5b2]/20'
                    : 'bg-[#121b2f] text-[#d9d2c5] hover:bg-[#1b2844] border border-[#1b2844]'
                }`}
              >
                <span>Day {day.dayNumber}</span>
                <span className="text-xs opacity-80 font-normal">({day.theme.slice(0, 18)}...)</span>
              </button>
            ))}
          </div>

          {/* Active Day Card */}
          {activeDay && (
            <div className="bg-[#121b2f] border border-[#1b2844] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1b2844]">
                <div>
                  <div className="text-xs text-[#00c5b2] font-mono font-semibold">
                    DAY {activeDay.dayNumber}
                  </div>
                  <h4 className="font-display font-bold text-2xl text-[#f7f3eb]">
                    {activeDay.theme}
                  </h4>
                  <p className="text-xs text-[#e8c582] mt-1">
                    Curator Note: {activeDay.curatorNotes}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[11px] text-[#d9d2c5]/60">Estimated Daily Cost</div>
                    <div className="text-lg font-bold font-display text-[#f7f3eb]">
                      ${activeDay.estimatedDailyBudget} USD
                    </div>
                  </div>

                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="p-2 rounded-xl bg-[#1b2844] hover:bg-[#27395e] text-[#00c5b2] border border-[#1b2844] transition-colors print:hidden"
                    title="Add Custom Activity"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Activities Slots */}
              <div className="space-y-4">
                {activeDay.activities.map((act) => (
                  <div
                    key={act.id}
                    className="bg-[#0b111e]/80 border border-[#1b2844] hover:border-[#00c5b2]/30 rounded-2xl p-5 transition-all flex flex-col md:flex-row gap-5"
                  >
                    {/* Media Thumbnail - guaranteed image on every activity card */}
                    <div className="w-full md:w-44 h-36 md:h-auto rounded-xl overflow-hidden bg-[#070b14] flex-shrink-0 border border-[#1b2844] relative">
                      <SafeImage
                        src={act.imageUrl}
                        alt={act.title}
                        fallbackDestination={itinerary.destination || destination}
                        fallbackCategory={act.category}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    {/* Activity Content */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#1b2844] text-[#00c5b2] flex items-center gap-1">
                            {act.timeSlot === 'morning' && <Sun className="w-3 h-3" />}
                            {act.timeSlot === 'afternoon' && <Sunset className="w-3 h-3" />}
                            {act.timeSlot === 'evening' && <Moon className="w-3 h-3" />}
                            <span>{act.timeSlot}</span>
                          </span>
                          <span className="text-xs text-[#d9d2c5]/60 font-mono">
                            {act.timeEstimate}
                          </span>
                        </div>

                        <button
                          onClick={() => handleDeleteActivity(activeDayIndex, act.id)}
                          className="text-[#d9d2c5]/50 hover:text-red-400 p-1 transition-colors print:hidden"
                          title="Remove Activity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h5 className="font-display font-bold text-lg text-[#f7f3eb]">
                        {act.title}
                      </h5>

                      <div className="flex items-center gap-1.5 text-xs text-[#d9d2c5]/70">
                        <MapPin className="w-3.5 h-3.5 text-[#00c5b2]" />
                        <span>{act.location}</span>
                      </div>

                      <p className="text-xs text-[#d9d2c5]/90">
                        {act.description}
                      </p>

                      <div className="pt-2 text-xs text-[#e8c582]">
                        <span className="font-semibold text-[#f7f3eb]">Cultural Affinity: </span>
                        {act.culturalWhy}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add Custom Activity Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0b111e] border border-[#1b2844] rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h4 className="font-display font-bold text-lg text-[#f7f3eb]">
              Add Activity to Day {activeDay?.dayNumber}
            </h4>

            <form onSubmit={handleAddActivitySubmit} className="space-y-3">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1">
                  Activity Title
                </label>
                <input
                  type="text"
                  value={newActivity.title}
                  onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                  placeholder="e.g. Traditional Pottery Workshop"
                  className="w-full bg-[#121b2f] border border-[#1b2844] rounded-lg px-3 py-2 text-sm text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1">
                    Time Slot
                  </label>
                  <select
                    value={newActivity.timeSlot}
                    onChange={(e) => setNewActivity({ ...newActivity, timeSlot: e.target.value as any })}
                    aria-label="Time slot"
                    className="w-full bg-[#121b2f] border border-[#1b2844] rounded-lg px-3 py-2 text-sm text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
                  >
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1">
                    Hours Estimate
                  </label>
                  <input
                    type="text"
                    value={newActivity.timeEstimate}
                    onChange={(e) => setNewActivity({ ...newActivity, timeEstimate: e.target.value })}
                    placeholder="14:00 - 16:30"
                    className="w-full bg-[#121b2f] border border-[#1b2844] rounded-lg px-3 py-2 text-sm text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1">
                  Location / Neighborhood
                </label>
                <input
                  type="text"
                  value={newActivity.location}
                  onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                  placeholder="e.g. Higashiyama Pottery Alley"
                  className="w-full bg-[#121b2f] border border-[#1b2844] rounded-lg px-3 py-2 text-sm text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/70 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newActivity.description}
                  onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                  placeholder="What will you experience?"
                  className="w-full bg-[#121b2f] border border-[#1b2844] rounded-lg px-3 py-2 text-xs text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#1b2844] text-[#d9d2c5] text-xs font-semibold hover:bg-[#27395e]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#00c5b2] text-[#070b14] text-xs font-bold hover:bg-[#02e0cb]"
                >
                  Add Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
