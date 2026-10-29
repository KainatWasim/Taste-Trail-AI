import React, { useState, useEffect } from 'react';
import { X, Bookmark, BookmarkCheck, MapPin, Sparkles, Clock, Lightbulb, CheckCircle2 } from 'lucide-react';
import { CulturalEntity } from '../types/travel';
import { getResolvedImageUrl, getPlaceFallbackImage } from '../utils/imageUtils';

interface EntityDetailModalProps {
  entity: CulturalEntity | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (entity: CulturalEntity) => void;
}

export const EntityDetailModal: React.FC<EntityDetailModalProps> = ({
  entity,
  onClose,
  isSaved,
  onToggleSave,
}) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [hasFallenBack, setHasFallenBack] = useState(false);

  useEffect(() => {
    if (entity) {
      setImgSrc(getResolvedImageUrl(entity));
      setHasFallenBack(false);
    }
  }, [entity]);

  if (!entity) return null;

  const handleImageError = () => {
    if (!hasFallenBack) {
      setHasFallenBack(true);
      setImgSrc(getPlaceFallbackImage(entity.destination, entity.category));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-[#1b2844] bg-[#0b111e] shadow-2xl">
        {/* Header Media */}
        <div className="relative aspect-[16/9] w-full bg-[#121b2f] overflow-hidden">
          <img
            src={imgSrc || getResolvedImageUrl(entity)}
            alt={entity.name}
            onError={handleImageError}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b111e] via-[#0b111e]/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#0b111e]/80 text-[#d9d2c5] hover:text-white backdrop-blur-md transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Overlay info */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 text-xs text-[#00c5b2] mb-1">
              <span className="font-semibold uppercase tracking-wider">{entity.category.replace('_', ' ')}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#f7f3eb] flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-[#00c5b2]" />
                {entity.neighborhood ? `${entity.neighborhood}, ` : ''}{entity.destination}
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#f7f3eb]">
              {entity.name}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
          {/* Transparent Cultural Match Analysis */}
          <div className="rounded-xl border border-[#00c5b2]/40 bg-[#121b2f] p-4 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-[#00c5b2] mb-1.5">
              <Sparkles className="h-4 w-4" />
              <span>Cultural Intelligence Affinity Analysis</span>
            </div>
            <p className="text-sm text-[#f7f3eb] leading-relaxed">
              {entity.affinityReason}
            </p>
            {entity.crossDomainBridge && (
              <div className="mt-3 pt-3 border-t border-[#1b2844] text-xs text-[#e8c582]">
                <strong className="text-[#f7f3eb]">Cross-Domain Taste Bridge:</strong> {entity.crossDomainBridge.correlationSignal}
              </div>
            )}
          </div>

          {/* Full Narrative */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#d9d2c5] mb-2">
              Cultural Narrative & Origins
            </h3>
            <p className="text-sm leading-relaxed text-[#d9d2c5]">
              {entity.fullDescription}
            </p>
          </div>

          {/* Key Highlights */}
          {entity.highlights && entity.highlights.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#d9d2c5] mb-2">
                Experience Highlights
              </h3>
              <ul className="space-y-2">
                {entity.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#f7f3eb]">
                    <CheckCircle2 className="h-4 w-4 text-[#00c5b2] shrink-0 mt-0.5" />
                    <span>{typeof h === 'string' ? h : (h as any)?.name || (h as any)?.title || String(h)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Curator Tip & Best Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {entity.bestTimeToVisit && (
              <div className="rounded-xl border border-[#1b2844] bg-[#070b14] p-3.5">
                <div className="flex items-center gap-2 text-xs font-medium text-[#e8c582] mb-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Ideal Time to Visit</span>
                </div>
                <p className="text-xs text-[#d9d2c5]">{entity.bestTimeToVisit}</p>
              </div>
            )}

            {entity.curatorTip && (
              <div className="rounded-xl border border-[#1b2844] bg-[#070b14] p-3.5">
                <div className="flex items-center gap-2 text-xs font-medium text-[#00c5b2] mb-1">
                  <Lightbulb className="h-3.5 w-3.5" />
                  <span>Curator's Insider Tip</span>
                </div>
                <p className="text-xs text-[#d9d2c5]">{entity.curatorTip}</p>
              </div>
            )}
          </div>

          {/* Data Source Transparency */}
          <div className="border-t border-[#1b2844] pt-4 text-xs text-[#d9d2c5]/60 flex items-center justify-between">
            <span>Entity Source: {entity.dataSource === 'qloo_live' ? 'Live Qloo Hackathon API' : 'Curated Qloo Cultural Graph'}</span>
            {entity.entityUrn && <span className="font-mono text-[10px] text-[#00c5b2]">{entity.entityUrn}</span>}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-[#1b2844] bg-[#070b14] px-6 py-4">
          <button
            onClick={onClose}
            className="text-xs text-[#d9d2c5] hover:text-white transition-colors"
          >
            Close Details
          </button>
          <button
            onClick={() => onToggleSave(entity)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
              isSaved
                ? 'bg-[#00c5b2] text-[#070b14]'
                : 'border border-[#00c5b2] bg-transparent text-[#00c5b2] hover:bg-[#00c5b2]/10'
            }`}
          >
            {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            <span>{isSaved ? 'In My Collection' : 'Save to Collection'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
