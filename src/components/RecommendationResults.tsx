import React, { useState } from 'react';
import { Sparkles, SlidersHorizontal, RefreshCw, Compass, ArrowLeft, Bookmark } from 'lucide-react';
import { RecommendationResponse, CulturalEntity, EntityCategory } from '../types/travel';
import { RecommendationCard } from './RecommendationCard';
import { EntityDetailModal } from './EntityDetailModal';

interface RecommendationResultsProps {
  results: RecommendationResponse | null;
  onRefinePreferences: () => void;
  onDiscoverMore: () => void;
  savedEntities: CulturalEntity[];
  onToggleSave: (entity: CulturalEntity) => void;
  isLoading: boolean;
}

export const RecommendationResults: React.FC<RecommendationResultsProps> = ({
  results,
  onRefinePreferences,
  onDiscoverMore,
  savedEntities,
  onToggleSave,
  isLoading,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDetailEntity, setActiveDetailEntity] = useState<CulturalEntity | null>(null);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl py-24 text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-3 border-[#00c5b2] border-t-transparent" />
        <h3 className="font-display text-2xl font-bold text-[#f7f3eb]">
          Synthesizing Cultural Intelligence...
        </h3>
        <p className="mt-2 text-sm text-[#d9d2c5]">
          Querying Qloo's taste affinity graph and analyzing cross-domain correlations.
        </p>
      </div>
    );
  }

  if (!results || !results.entities || results.entities.length === 0) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-[#1b2844] bg-[#0b111e] p-12 text-center">
        <Compass className="mx-auto h-12 w-12 text-[#d9d2c5]/40 mb-4" />
        <h3 className="font-display text-xl font-bold text-[#f7f3eb]">
          No Cultural Discoveries Found
        </h3>
        <p className="mt-2 text-sm text-[#d9d2c5]">
          We couldn't locate matching entities for this specific filter set. Try broadening your interests or adjusting your destination.
        </p>
        <button
          onClick={onRefinePreferences}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#00c5b2] px-6 py-2.5 text-xs font-semibold text-[#070b14] hover:bg-[#02e0cb]"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>Refine Travel Preferences</span>
        </button>
      </div>
    );
  }

  // Filter entities by category
  const filteredEntities = selectedCategory === 'all'
    ? results.entities
    : results.entities.filter((e) => e.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Experiences' },
    { id: 'culinary', label: 'Culinary Terroir' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'art_design', label: 'Art & Craft' },
    { id: 'heritage', label: 'Heritage' },
    { id: 'music_nightlife', label: 'Music & Sound' },
    { id: 'hidden_gem', label: 'Hidden Gems' },
  ];

  const isEntitySaved = (id: string) => savedEntities.some((item) => item.id === id);

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      {/* Top Header & Detected Archetype */}
      <div className="rounded-2xl border border-[#1b2844] bg-[#0b111e] p-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1b2844] pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#00c5b2] uppercase tracking-wider mb-1">
              <span>Cultural Discovery Results</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-[#e8c582]">{results.destination}</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-[#f7f3eb]">
              {results.summary}
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onRefinePreferences}
              className="flex items-center gap-2 rounded-lg border border-[#1b2844] bg-[#121b2f] px-4 py-2 text-xs font-medium text-[#d9d2c5] hover:border-[#00c5b2]/40 transition-colors"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Refine Preferences</span>
            </button>
            <button
              onClick={onDiscoverMore}
              className="flex items-center gap-2 rounded-lg bg-[#00c5b2] px-4 py-2 text-xs font-semibold text-[#070b14] hover:bg-[#02e0cb] transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Refresh Discovery</span>
            </button>
          </div>
        </div>

        {/* Cultural Archetype & AI Taste Synthesis Box */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 rounded-xl border border-[#1b2844] bg-[#121b2f] p-4">
            <div className="text-xs text-[#d9d2c5]/70 uppercase tracking-wider">
              Identified Cultural Archetype
            </div>
            <div className="mt-1 font-display text-xl font-bold text-[#00c5b2]">
              {results.detectedCulturalArchetype}
            </div>
            <div className="mt-2 text-xs text-[#d9d2c5]">
              Cross-domain correlations calculated across music, architecture, and culinary traditions.
            </div>
          </div>

          <div className="md:col-span-8 text-sm leading-relaxed text-[#d9d2c5] bg-[#070b14] rounded-xl border border-[#1b2844] p-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#00c5b2] mb-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Cultural Affinity Reasoning {results.generatedByAi ? '(Gemini Synthesized)' : ''}</span>
            </div>
            <p className="text-[#f7f3eb]">{results.affinityExplanation}</p>
          </div>
        </div>

        {/* Data Source Notice (Transparency) */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-[#d9d2c5]/60 pt-4 border-t border-[#1b2844]/60">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#f7f3eb]">Data Pipeline:</span>
            <span>
              {results.dataSource === 'qloo_live'
                ? 'Official Qloo Hackathon Sandbox API (Live Handshake)'
                : 'Qloo Cultural Intelligence Knowledge Graph (Curated Hackathon Schema)'}
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#00c5b2]">
            {filteredEntities.length} experiences matched
          </span>
        </div>
      </div>

      {/* Interactive Category Filter Tabs (Segmented control) */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-1.5 p-1 bg-[#0b111e] rounded-xl border border-[#1b2844] overflow-x-auto max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-[#00c5b2] text-[#070b14] font-semibold shadow-sm'
                  : 'text-[#d9d2c5] hover:text-[#f7f3eb] hover:bg-[#121b2f]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-[#d9d2c5]">
          Showing {filteredEntities.length} of {results.entities.length} recommendations
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredEntities.map((entity) => (
          <RecommendationCard
            key={entity.id}
            entity={entity}
            isSaved={isEntitySaved(entity.id)}
            onToggleSave={onToggleSave}
            onOpenDetails={setActiveDetailEntity}
          />
        ))}
      </div>

      {/* Detail Modal */}
      <EntityDetailModal
        entity={activeDetailEntity}
        onClose={() => setActiveDetailEntity(null)}
        isSaved={activeDetailEntity ? isEntitySaved(activeDetailEntity.id) : false}
        onToggleSave={onToggleSave}
      />
    </div>
  );
};
