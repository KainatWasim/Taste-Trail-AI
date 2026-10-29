import React, { useState } from 'react';
import { Bookmark, Trash2, ExternalLink, Share2, Copy, Check, Compass, MapPin } from 'lucide-react';
import { CulturalEntity } from '../types/travel';
import { RecommendationCard } from './RecommendationCard';
import { EntityDetailModal } from './EntityDetailModal';

interface SavedCollectionProps {
  savedEntities: CulturalEntity[];
  onToggleSave: (entity: CulturalEntity) => void;
  onClearCollection: () => void;
  onStartDiscovering: () => void;
}

export const SavedCollection: React.FC<SavedCollectionProps> = ({
  savedEntities,
  onToggleSave,
  onClearCollection,
  onStartDiscovering,
}) => {
  const [activeDetailEntity, setActiveDetailEntity] = useState<CulturalEntity | null>(null);
  const [filterDestination, setFilterDestination] = useState<string>('all');
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // Extract unique destinations
  const uniqueDestinations = Array.from(new Set(savedEntities.map((e) => e.destination)));

  const filtered = filterDestination === 'all'
    ? savedEntities
    : savedEntities.filter((e) => e.destination === filterDestination);

  const handleCopyItinerary = () => {
    if (savedEntities.length === 0) return;

    const itineraryLines = savedEntities.map((e, idx) => {
      return `${idx + 1}. ${e.name} (${e.destination} · ${e.category})\n   - Why: ${e.affinityReason}\n   - Curator Tip: ${e.curatorTip || 'Explore unhurriedly.'}`;
    });

    const fullText = `TASTETRAIL AI — MY CURATED CULTURAL JOURNEY\n\n${itineraryLines.join('\n\n')}\n\nGenerated with Qloo Cultural Intelligence via TasteTrail AI.`;

    navigator.clipboard.writeText(fullText);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <div className="rounded-2xl border border-[#1b2844] bg-[#0b111e] p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1b2844] pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#00c5b2] uppercase tracking-wider mb-1">
              <Bookmark className="h-4 w-4" />
              <span>Personal Itinerary & Taste Archive</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-[#f7f3eb]">
              My Saved Cultural Collection
            </h2>
            <p className="mt-1 text-xs text-[#d9d2c5]/70">
              Locally stored in your browser session. Stable across page refreshes.
            </p>
          </div>

          {savedEntities.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyItinerary}
                className="flex items-center gap-2 rounded-lg border border-[#1b2844] bg-[#121b2f] px-4 py-2 text-xs font-medium text-[#d9d2c5] hover:border-[#00c5b2]/40 transition-colors"
              >
                {copiedSuccess ? <Check className="h-4 w-4 text-[#00c5b2]" /> : <Copy className="h-4 w-4" />}
                <span>{copiedSuccess ? 'Copied Itinerary!' : 'Copy Itinerary'}</span>
              </button>

              <button
                onClick={onClearCollection}
                className="flex items-center gap-1.5 rounded-lg border border-rose-900/40 bg-rose-950/20 px-3 py-2 text-xs text-rose-300 hover:bg-rose-900/40 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>

        {/* Filter by destination if multiple exist */}
        {uniqueDestinations.length > 1 && (
          <div className="mt-6 flex items-center gap-2 overflow-x-auto">
            <span className="text-xs text-[#d9d2c5] mr-2">Filter Destination:</span>
            <button
              onClick={() => setFilterDestination('all')}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                filterDestination === 'all'
                  ? 'bg-[#00c5b2] text-[#070b14]'
                  : 'bg-[#121b2f] text-[#d9d2c5] hover:text-white'
              }`}
            >
              All Destinations ({savedEntities.length})
            </button>
            {uniqueDestinations.map((dest) => (
              <button
                key={dest}
                onClick={() => setFilterDestination(dest)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  filterDestination === dest
                    ? 'bg-[#00c5b2] text-[#070b14]'
                    : 'bg-[#121b2f] text-[#d9d2c5] hover:text-white'
                }`}
              >
                {dest}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Empty State */}
      {savedEntities.length === 0 ? (
        <div className="rounded-2xl border border-[#1b2844] bg-[#0b111e] p-16 text-center">
          <Compass className="mx-auto h-12 w-12 text-[#d9d2c5]/30 mb-4" />
          <h3 className="font-display text-xl font-bold text-[#f7f3eb]">
            Your Collection is Currently Empty
          </h3>
          <p className="mt-2 max-w-md mx-auto text-sm text-[#d9d2c5]">
            As you explore recommendations in the Discover engine or chat with the Assistant,
            click the bookmark icon on any card to save it to your personal travel archive.
          </p>
          <button
            onClick={onStartDiscovering}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#00c5b2] px-6 py-2.5 text-xs font-semibold text-[#070b14] hover:bg-[#02e0cb]"
          >
            <span>Start Discovering Experiences</span>
          </button>
        </div>
      ) : (
        /* Cards Grid */
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((entity) => (
            <RecommendationCard
              key={entity.id}
              entity={entity}
              isSaved={true}
              onToggleSave={onToggleSave}
              onOpenDetails={setActiveDetailEntity}
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <EntityDetailModal
        entity={activeDetailEntity}
        onClose={() => setActiveDetailEntity(null)}
        isSaved={activeDetailEntity ? true : false}
        onToggleSave={onToggleSave}
      />
    </div>
  );
};
