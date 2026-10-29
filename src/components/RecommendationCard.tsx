import React, { useState, useEffect } from 'react';
import { Bookmark, BookmarkCheck, Sparkles, MapPin, ExternalLink } from 'lucide-react';
import { CulturalEntity } from '../types/travel';
import { getResolvedImageUrl, getPlaceFallbackImage } from '../utils/imageUtils';

interface RecommendationCardProps {
  entity: CulturalEntity;
  isSaved: boolean;
  onToggleSave: (entity: CulturalEntity) => void;
  onOpenDetails: (entity: CulturalEntity) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  entity,
  isSaved,
  onToggleSave,
  onOpenDetails,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(() => getResolvedImageUrl(entity));
  const [hasFallenBack, setHasFallenBack] = useState(false);

  // Sync if entity prop changes
  useEffect(() => {
    setImgSrc(getResolvedImageUrl(entity));
    setHasFallenBack(false);
  }, [entity.id, entity.imageUrl]);

  const handleImageError = () => {
    if (!hasFallenBack) {
      setHasFallenBack(true);
      setImgSrc(getPlaceFallbackImage(entity.destination, entity.category));
    }
  };

  // Friendly category label
  const formatCategory = (cat: string) => {
    switch (cat) {
      case 'culinary': return 'Culinary Terroir';
      case 'architecture': return 'Architecture & Heritage';
      case 'art_design': return 'Art & Living Craft';
      case 'heritage': return 'Historic Traditions';
      case 'music_nightlife': return 'Acoustic & Music Culture';
      case 'nature': return 'Landscape & Flora';
      case 'hidden_gem': return 'Neighborhood Gem';
      default: return cat;
    }
  };

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#1b2844] bg-[#0b111e] transition-all duration-300 hover:border-[#00c5b2]/40 hover:shadow-xl hover:shadow-[#00c5b2]/5">
      {/* Top Media Container: consistent size, rounded corners, object-fit: cover */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#121b2f] rounded-t-2xl">
        <img
          src={imgSrc}
          alt={entity.name}
          onError={handleImageError}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient scrim for image legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b111e] via-transparent to-black/20" />

        {/* Save to Collection action (Functional affordance) */}
        <button
          type="button"
          onClick={() => onToggleSave(entity)}
          title={isSaved ? 'Remove from My Collection' : 'Save to My Collection'}
          className={`absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-lg backdrop-blur-md transition-all ${
            isSaved
              ? 'bg-[#00c5b2] text-[#070b14]'
              : 'bg-[#0b111e]/70 text-[#f7f3eb] hover:bg-[#00c5b2] hover:text-[#070b14]'
          }`}
        >
          {isSaved ? <BookmarkCheck className="h-4.5 w-4.5" /> : <Bookmark className="h-4.5 w-4.5" />}
        </button>

        {/* Location & Neighborhood overlay */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center gap-1.5 text-xs text-[#f7f3eb]/90">
          <MapPin className="h-3.5 w-3.5 text-[#00c5b2] shrink-0" />
          <span className="font-medium truncate drop-shadow-sm">
            {entity.neighborhood ? `${entity.neighborhood}, ` : ''}{entity.destination}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex flex-1 flex-col p-6">
        {/* Unboxed Metadata (Zero-Pill discipline: unboxed text with typographic separators) */}
        <div className="flex items-center gap-2 text-xs text-[#d9d2c5]/70 mb-2">
          <span className="text-[#00c5b2] font-medium">{formatCategory(entity.category)}</span>
          <span aria-hidden="true">·</span>
          <span>{entity.dataSource === 'qloo_live' ? 'Live Qloo API' : 'Cultural Graph'}</span>
          {entity.estimatedVibe && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-[#e8c582]">{entity.estimatedVibe}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-bold text-[#f7f3eb] leading-snug">
          {entity.name}
        </h3>

        {/* Short Description */}
        <p className="mt-2.5 text-sm leading-relaxed text-[#d9d2c5]">
          {entity.shortDescription}
        </p>

        {/* Transparent Cultural Affinity Bridge Box */}
        <div className="mt-4 rounded-xl border border-[#1b2844] bg-[#121b2f]/70 p-3.5 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-[#00c5b2] mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Why this matches your taste:</span>
          </div>
          <p className="text-[#d9d2c5] leading-relaxed">
            {entity.affinityReason}
          </p>
          {entity.crossDomainBridge && (
            <div className="mt-2 pt-2 border-t border-[#1b2844]/60 text-[11px] text-[#e8c582]/90">
              {entity.crossDomainBridge.correlationSignal}
            </div>
          )}
        </div>

        {/* Cultural Signals (Unboxed metadata with typographic dots) */}
        {entity.culturalSignals && entity.culturalSignals.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#d9d2c5]/70">
            <span className="font-medium text-[#f7f3eb]">Signals:</span>
            {entity.culturalSignals.map((signal, sIdx) => {
              const signalText = typeof signal === 'string' ? signal : (signal as any)?.name || (signal as any)?.id || 'Signal';
              return (
                <React.Fragment key={signalText + sIdx}>
                  <span>{signalText}</span>
                  {sIdx < entity.culturalSignals.length - 1 && (
                    <span aria-hidden="true" className="text-[#1b2844]">·</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

        {/* Card Footer Actions */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#1b2844]">
          <button
            type="button"
            onClick={() => onOpenDetails(entity)}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#00c5b2] hover:text-[#02e0cb] transition-colors"
          >
            <span>View Cultural Context</span>
            <ExternalLink className="h-3 w-3" />
          </button>

          <button
            type="button"
            onClick={() => onToggleSave(entity)}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              isSaved
                ? 'border border-[#00c5b2] bg-[#00c5b2]/10 text-[#00c5b2]'
                : 'border border-[#1b2844] bg-[#121b2f] text-[#d9d2c5] hover:border-[#00c5b2]/40'
            }`}
          >
            <Bookmark className="h-3.5 w-3.5" />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
