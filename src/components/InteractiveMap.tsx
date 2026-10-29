import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { CulturalEntity, EntityCategory } from '../types/travel';
import { CULTURAL_ENTITIES_DATABASE } from '../data/culturalKnowledgeGraph';
import { MapPin, Navigation, Compass, Layers, ExternalLink, Sparkles, X } from 'lucide-react';
import { getResolvedImageUrl } from '../utils/imageUtils';

interface InteractiveMapProps {
  initialDestination?: string;
  onSelectEntity?: (entity: CulturalEntity) => void;
  onSaveEntity?: (entity: CulturalEntity) => void;
  savedEntityIds?: string[];
}

const DESTINATION_CENTERS: Record<string, { lat: number; lng: number; zoom: number; label: string }> = {
  Kyoto: { lat: 35.0116, lng: 135.7681, zoom: 13, label: 'Kyoto, Japan' },
  Lahore: { lat: 31.5204, lng: 74.3587, zoom: 13, label: 'Lahore, Pakistan' },
  Islamabad: { lat: 33.6844, lng: 73.0479, zoom: 13, label: 'Islamabad, Pakistan' },
  'Hunza Valley': { lat: 36.3167, lng: 74.65, zoom: 12, label: 'Hunza Valley, Pakistan' },
  Skardu: { lat: 35.2971, lng: 75.6333, zoom: 12, label: 'Skardu, Pakistan' },
  Karachi: { lat: 24.8607, lng: 67.0011, zoom: 13, label: 'Karachi, Pakistan' },
  London: { lat: 51.5074, lng: -0.1278, zoom: 13, label: 'London, UK' },
  Edinburgh: { lat: 55.9533, lng: -3.1883, zoom: 13, label: 'Edinburgh, UK' },
  'New York City': { lat: 40.7128, lng: -74.006, zoom: 12, label: 'New York City, USA' },
  Paris: { lat: 48.8566, lng: 2.3522, zoom: 13, label: 'Paris, France' },
  Rome: { lat: 41.9028, lng: 12.4964, zoom: 13, label: 'Rome, Italy' },
  Istanbul: { lat: 41.0082, lng: 28.9784, zoom: 13, label: 'Istanbul, Turkey' },
  Cappadocia: { lat: 38.6431, lng: 34.8289, zoom: 12, label: 'Cappadocia, Turkey' },
  Cairo: { lat: 30.0444, lng: 31.2357, zoom: 13, label: 'Cairo, Egypt' },
  Tokyo: { lat: 35.6762, lng: 139.6503, zoom: 13, label: 'Tokyo, Japan' },
  Lisbon: { lat: 38.7223, lng: -9.1393, zoom: 14, label: 'Lisbon, Portugal' },
  Oaxaca: { lat: 17.065, lng: -96.724, zoom: 14, label: 'Oaxaca, Mexico' },
  Palermo: { lat: 38.1157, lng: 13.3615, zoom: 14, label: 'Palermo, Italy' },
  Montreal: { lat: 45.5017, lng: -73.5673, zoom: 13, label: 'Montreal, Canada' },
  Tbilisi: { lat: 41.7151, lng: 44.8271, zoom: 13, label: 'Tbilisi, Georgia' },
};

// Realistic coordinates for entities based on their destination and neighborhood
function getEntityCoordinates(entity: CulturalEntity): [number, number] {
  const dest = entity.destination;
  const base = DESTINATION_CENTERS[dest] || DESTINATION_CENTERS.Kyoto;
  
  // Specific known places
  if (entity.name.includes('Shisen-do')) return [35.0447, 135.7953];
  if (entity.name.includes('Jazz Kissa') || entity.name.includes('Blue Trane')) return [35.0062, 135.7712];
  if (entity.name.includes('Obanzai') || entity.name.includes('Kamogawa')) return [35.0089, 135.7701];
  if (entity.name.includes('Daitoku-ji')) return [35.0436, 135.7441];
  if (entity.name.includes('Azulejo')) return [38.7247, -9.1139];
  if (entity.name.includes('Santa Catarina')) return [38.7099, -9.1477];
  if (entity.name.includes('Chico') || entity.name.includes('Fado')) return [38.7121, -9.144];
  if (entity.name.includes('Pasillo de Humo') || entity.name.includes('Noviembre')) return [17.0592, -96.7262];
  if (entity.name.includes('Etnobotánico') || entity.name.includes('Santo Domingo')) return [17.0664, -96.7231];
  if (entity.name.includes('Mezcal')) return [17.0645, -96.7251];

  // Worldwide destinations
  if (entity.name.includes('Badshahi')) return [31.5881, 74.3096];
  if (entity.name.includes('Food Street') && entity.destination.includes('Lahore')) return [31.5898, 74.3126];
  if (entity.name.includes('Faisal Mosque')) return [33.7297, 73.0372];
  if (entity.name.includes('Baltit Fort')) return [36.3258, 74.6698];
  if (entity.name.includes('Katpana') || entity.name.includes('Shangrila')) return [35.3392, 75.5264];
  if (entity.name.includes('Mohatta')) return [24.8142, 67.0326];
  if (entity.name.includes('Soane')) return [51.5170, -0.1174];
  if (entity.name.includes('Royal Mile') || entity.name.includes('Thistle')) return [55.9495, -3.1909];
  if (entity.name.includes('Cloisters')) return [40.8649, -73.9317];
  if (entity.name.includes('Sainte-Chapelle')) return [48.8554, 2.3450];
  if (entity.name.includes('San Clemente')) return [41.8894, 12.4975];
  if (entity.name.includes('Hagia Sophia')) return [41.0086, 28.9802];
  if (entity.name.includes('Göreme') || entity.name.includes('Cave Monasteries')) return [38.6405, 34.8292];
  if (entity.name.includes('Yanaka') || entity.name.includes('Asakura')) return [35.7269, 139.7686];
  if (entity.name.includes('Khan el-Khalili') || entity.name.includes('Fishawy')) return [30.0478, 31.2622];

  // Hash seed for consistent offsets around the base center
  let hash = 0;
  for (let i = 0; i < entity.name.length; i++) {
    hash = (hash << 5) - hash + entity.name.charCodeAt(i);
  }
  const latOffset = ((Math.abs(hash) % 1000) / 1000 - 0.5) * 0.025;
  const lngOffset = (((Math.abs(hash >> 3)) % 1000) / 1000 - 0.5) * 0.025;
  return [base.lat + latOffset, base.lng + lngOffset];
}

const CATEGORY_COLORS: Record<EntityCategory, { bg: string; border: string; text: string }> = {
  culinary: { bg: '#d97706', border: '#f59e0b', text: '#fef3c7' },
  architecture: { bg: '#4f46e5', border: '#6366f1', text: '#e0e7ff' },
  art_design: { bg: '#9333ea', border: '#a855f7', text: '#f3e8ff' },
  heritage: { bg: '#00c5b2', border: '#2dd4bf', text: '#ccfbf1' },
  music_nightlife: { bg: '#0284c7', border: '#38bdf8', text: '#e0f2fe' },
  nature: { bg: '#059669', border: '#10b981', text: '#d1fae5' },
  hidden_gem: { bg: '#e11d48', border: '#f43f5e', text: '#ffe4e6' },
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  initialDestination = 'Kyoto',
  onSelectEntity,
  onSaveEntity,
  savedEntityIds = [],
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  const [currentCity, setCurrentCity] = useState(initialDestination);
  const [selectedCategory, setSelectedCategory] = useState<EntityCategory | 'all'>('all');
  const [activeEntity, setActiveEntity] = useState<CulturalEntity | null>(null);

  // Available places for this destination
  const filteredEntities = CULTURAL_ENTITIES_DATABASE.filter((e) => {
    const matchesCity = e.destination.toLowerCase().includes(currentCity.toLowerCase()) ||
      currentCity.toLowerCase().includes(e.destination.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || e.category === selectedCategory;
    return matchesCity && matchesCategory;
  });

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const base = DESTINATION_CENTERS[currentCity] || DESTINATION_CENTERS.Kyoto;
      const map = L.map(mapContainerRef.current, {
        center: [base.lat, base.lng],
        zoom: base.zoom,
        zoomControl: false,
      });

      // Add zoom control in top right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Dark editorial tile layer (CartoDB Dark Matter)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      // Map cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map center when currentCity changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const base = DESTINATION_CENTERS[currentCity] || DESTINATION_CENTERS.Kyoto;
    mapInstanceRef.current.flyTo([base.lat, base.lng], base.zoom, {
      duration: 1.2,
      easeLinearity: 0.25,
    });
  }, [currentCity]);

  // Update markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    filteredEntities.forEach((entity) => {
      const coords = getEntityCoordinates(entity);
      const style = CATEGORY_COLORS[entity.category] || CATEGORY_COLORS.heritage;

      const isSelected = activeEntity?.id === entity.id;

      // Custom HTML Marker using DivIcon
      const iconHtml = `
        <div style="
          background-color: ${style.bg};
          border: 2px solid ${isSelected ? '#ffffff' : style.border};
          color: #ffffff;
          width: 32px;
          height: 32px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(0,0,0,0.5), 0 0 12px ${style.bg}88;
          transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
          transition: transform 0.2s ease;
          cursor: pointer;
        ">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-map-pin',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      const marker = L.marker(coords, { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setActiveEntity(entity);
        map.flyTo(coords, Math.max(map.getZoom(), 15), { duration: 0.8 });
      });

      markersRef.current[entity.id] = marker;
    });
  }, [filteredEntities, activeEntity]);

  const handleFlyToEntity = (entity: CulturalEntity) => {
    setActiveEntity(entity);
    if (mapInstanceRef.current) {
      const coords = getEntityCoordinates(entity);
      mapInstanceRef.current.flyTo(coords, 15, { duration: 1 });
    }
  };

  return (
    <div className="relative w-full h-[750px] bg-[#070b14] rounded-2xl overflow-hidden border border-[#1b2844] shadow-2xl flex flex-col md:flex-row">
      {/* Sidebar Controls & Places Directory */}
      <div className="w-full md:w-80 lg:w-96 bg-[#0b111e]/95 backdrop-blur-md border-r border-[#1b2844] flex flex-col z-10 h-72 md:h-full">
        {/* Header */}
        <div className="p-4 border-b border-[#1b2844]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#00c5b2]" />
              <h3 className="font-display font-semibold text-[#f7f3eb] text-base">
                Interactive Cultural Atlas
              </h3>
            </div>
            <span className="text-xs text-[#00c5b2] font-mono font-medium">
              {filteredEntities.length} Spots
            </span>
          </div>

          {/* Destination Selector */}
          <label className="block text-xs uppercase tracking-wider text-[#d9d2c5]/60 mb-1">
            Destination
          </label>
          <select
            value={currentCity}
            onChange={(e) => {
              setCurrentCity(e.target.value);
              setActiveEntity(null);
            }}
            aria-label="Select destination"
            className="w-full bg-[#121b2f] border border-[#1b2844] text-[#f7f3eb] text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#00c5b2]"
          >
            {Object.keys(DESTINATION_CENTERS).map((dest) => (
              <option key={dest} value={dest}>
                {DESTINATION_CENTERS[dest].label}
              </option>
            ))}
          </select>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-2 scrollbar-none mt-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`text-xs px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-[#00c5b2] text-[#070b14] font-semibold'
                  : 'bg-[#121b2f] text-[#d9d2c5] hover:bg-[#1b2844]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCategory('culinary')}
              className={`text-xs px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                selectedCategory === 'culinary'
                  ? 'bg-[#d97706] text-white font-semibold'
                  : 'bg-[#121b2f] text-[#d9d2c5] hover:bg-[#1b2844]'
              }`}
            >
              Culinary
            </button>
            <button
              onClick={() => setSelectedCategory('architecture')}
              className={`text-xs px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                selectedCategory === 'architecture'
                  ? 'bg-[#4f46e5] text-white font-semibold'
                  : 'bg-[#121b2f] text-[#d9d2c5] hover:bg-[#1b2844]'
              }`}
            >
              Architecture
            </button>
            <button
              onClick={() => setSelectedCategory('heritage')}
              className={`text-xs px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                selectedCategory === 'heritage'
                  ? 'bg-[#00c5b2] text-[#070b14] font-semibold'
                  : 'bg-[#121b2f] text-[#d9d2c5] hover:bg-[#1b2844]'
              }`}
            >
              Heritage
            </button>
            <button
              onClick={() => setSelectedCategory('music_nightlife')}
              className={`text-xs px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                selectedCategory === 'music_nightlife'
                  ? 'bg-[#0284c7] text-white font-semibold'
                  : 'bg-[#121b2f] text-[#d9d2c5] hover:bg-[#1b2844]'
              }`}
            >
              Music & Night
            </button>
          </div>
        </div>

        {/* Place Items List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#1b2844]/60 p-2 space-y-1">
          {filteredEntities.map((entity) => {
            const isSelected = activeEntity?.id === entity.id;
            const isSaved = savedEntityIds.includes(entity.id);

            return (
              <div
                key={entity.id}
                onClick={() => handleFlyToEntity(entity)}
                className={`p-3 rounded-xl transition-all cursor-pointer flex gap-3 ${
                  isSelected
                    ? 'bg-[#1b2844] border border-[#00c5b2]/40'
                    : 'bg-[#121b2f]/60 hover:bg-[#121b2f]'
                }`}
              >
                <img
                  src={getResolvedImageUrl(entity.imageUrl, entity.category)}
                  alt={entity.name}
                  className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs uppercase tracking-wide text-[#00c5b2] font-semibold">
                      {entity.category.replace('_', ' ')}
                    </span>
                    {isSaved && (
                      <span className="text-[10px] text-[#e8c582] font-medium">Saved</span>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-[#f7f3eb] truncate">{entity.name}</h4>
                  <p className="text-xs text-[#d9d2c5]/70 line-clamp-1 mt-0.5">
                    {entity.neighborhood || entity.destination}
                  </p>
                </div>
              </div>
            );
          })}

          {filteredEntities.length === 0 && (
            <div className="p-6 text-center text-sm text-[#d9d2c5]/60">
              No places found in this category for {currentCity}.
            </div>
          )}
        </div>
      </div>

      {/* Leaflet Map Canvas */}
      <div className="flex-1 relative h-full w-full">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Active Place Overlay Card */}
        {activeEntity && (
          <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-96 bg-[#0b111e]/95 backdrop-blur-lg border border-[#00c5b2]/30 rounded-2xl p-4 shadow-2xl z-[1000] animate-in fade-in slide-in-from-bottom-4 duration-200">
            <button
              onClick={() => setActiveEntity(null)}
              className="absolute top-3 right-3 text-[#d9d2c5]/70 hover:text-white p-1"
              aria-label="Close card"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex gap-3.5">
              <img
                src={getResolvedImageUrl(activeEntity.imageUrl, activeEntity.category)}
                alt={activeEntity.name}
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0 border border-[#1b2844]"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#00c5b2]">
                  {activeEntity.category.replace('_', ' ')}
                </span>
                <h4 className="font-display font-bold text-base text-[#f7f3eb] leading-tight mt-0.5 truncate">
                  {activeEntity.name}
                </h4>
                <p className="text-xs text-[#d9d2c5]/80 mt-1 line-clamp-2">
                  {activeEntity.shortDescription}
                </p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[#1b2844] flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs text-[#e8c582]">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="truncate">{activeEntity.estimatedVibe || 'Authentic Cultural Match'}</span>
              </div>

              <div className="flex items-center gap-2">
                {onSaveEntity && (
                  <button
                    onClick={() => onSaveEntity(activeEntity)}
                    className="text-xs px-2.5 py-1 rounded-lg border border-[#1b2844] bg-[#121b2f] hover:bg-[#1b2844] text-[#f7f3eb] font-medium"
                  >
                    {savedEntityIds.includes(activeEntity.id) ? 'Saved' : 'Save'}
                  </button>
                )}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${activeEntity.name} ${activeEntity.destination}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs px-2.5 py-1 rounded-lg bg-[#00c5b2] hover:bg-[#02e0cb] text-[#070b14] font-semibold flex items-center gap-1"
                >
                  <span>Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
