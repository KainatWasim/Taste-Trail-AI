/**
 * TasteTrail AI - Cultural Travel Discovery Types
 */

export type TravelInterest =
  | 'food_dining'
  | 'history_heritage'
  | 'nature_landscapes'
  | 'art_design'
  | 'music'
  | 'architecture'
  | 'adventure'
  | 'shopping'
  | 'local_culture'
  | 'entertainment';

export type TravelMood =
  | 'relaxed'
  | 'adventurous'
  | 'cultural'
  | 'creative'
  | 'social'
  | 'scenic';

export type BudgetPreference =
  | 'budget'
  | 'moderate'
  | 'premium'
  | 'unspecified';

export type TravelCompanion =
  | 'solo'
  | 'friends'
  | 'family'
  | 'unspecified';

export interface TravelPreferences {
  startingCity: string;
  destination: string;
  interests: TravelInterest[];
  travelMood: TravelMood;
  budget: BudgetPreference;
  companions: TravelCompanion;
  customNotes?: string;
}

export type EntityCategory =
  | 'culinary'
  | 'architecture'
  | 'art_design'
  | 'heritage'
  | 'music_nightlife'
  | 'hidden_gem'
  | 'nature';

export interface CrossDomainBridge {
  sourceInterest: string;
  destinationTrait: string;
  correlationSignal: string;
}

export interface CulturalEntity {
  id: string;
  name: string;
  category: EntityCategory;
  destination: string;
  neighborhood?: string;
  shortDescription: string;
  fullDescription: string;
  affinityReason: string; // Transparent explanation of why this matches the user's specific tastes
  culturalSignals: string[];
  crossDomainBridge: CrossDomainBridge;
  imageUrl?: string;
  highlights: string[];
  bestTimeToVisit?: string;
  curatorTip?: string;
  dataSource: 'qloo_live' | 'qloo_cultural_graph';
  entityUrn?: string;
  estimatedVibe?: string;
}

export interface RecommendationResponse {
  destination: string;
  summary: string;
  detectedCulturalArchetype: string;
  entities: CulturalEntity[];
  affinityExplanation: string;
  dataSource: 'qloo_live' | 'sample_cultural_graph';
  qlooEndpointUsed?: string;
  generatedByAi?: boolean;
}

export interface SavedExperience {
  entity: CulturalEntity;
  savedAt: string;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  extractedPreferences?: Partial<TravelPreferences>;
  recommendations?: CulturalEntity[];
  suggestedFollowUps?: string[];
  timestamp: string;
}

export interface ApiStatus {
  qlooConfigured: boolean;
  qlooBaseUrl: string;
  geminiConfigured: boolean;
  mode: 'live' | 'sample';
  lastPingStatus?: 'healthy' | 'error' | 'untested';
  message: string;
}

// ==================== FLIGHTS ====================
export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  tripType: 'round_trip' | 'one_way';
  passengers: number;
  cabinClass: 'economy' | 'premium_economy' | 'business' | 'first';
  maxStops?: 'direct' | '1_stop' | 'any';
}

export interface FlightResult {
  id: string;
  airline: string;
  airlineLogo?: string;
  flightNumber: string;
  origin: {
    code: string;
    city: string;
    time: string;
  };
  destination: {
    code: string;
    city: string;
    time: string;
  };
  duration: string;
  stops: number;
  stopoverDetails?: string;
  estimatedPrice: number;
  currency: string;
  cabinClass: string;
  carbonEmission?: string;
  deepLinks: {
    googleFlights: string;
    skyscanner: string;
    kayak: string;
  };
}

// ==================== HOTELS ====================
export interface HotelSearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  propertyType?: 'hotel' | 'boutique' | 'ryokan' | 'heritage_villa' | 'resort';
  priceRange?: 'budget' | 'mid' | 'luxury';
  culturalAesthetic?: string;
}

export interface HotelResult {
  id: string;
  name: string;
  destination: string;
  neighborhood: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  currency: string;
  propertyType: string;
  imageUrl: string;
  culturalVibe: string;
  crossDomainAffinity: string;
  amenities: string[];
  distanceToCenter: string;
  deepLinks: {
    bookingCom: string;
    hotelsCom: string;
    googleTravel: string;
  };
}

// ==================== RESTAURANTS ====================
export interface RestaurantSearchParams {
  destination: string;
  cuisine?: string;
  priceTier?: '$' | '$$' | '$$$' | '$$$$';
  atmosphere?: string;
  dietary?: string[];
  michelinOrAward?: boolean;
}

export interface RestaurantResult {
  id: string;
  name: string;
  destination: string;
  neighborhood: string;
  cuisine: string;
  priceTier: '$' | '$$' | '$$$' | '$$$$';
  rating: number;
  reviewCount: number;
  tasteMatchScore: number;
  tasteExplanation: string;
  signatureDish: string;
  imageUrl: string;
  dietaryOptions: string[];
  reservationLinks: {
    openTable?: string;
    resy?: string;
    googleMaps: string;
  };
}

// ==================== ITINERARY PLANNER ====================
export type DayTimeSlot = 'morning' | 'afternoon' | 'evening';

export interface ItineraryActivity {
  id: string;
  title: string;
  timeSlot: DayTimeSlot;
  timeEstimate: string;
  location: string;
  neighborhood?: string;
  category: EntityCategory;
  description: string;
  culturalWhy: string;
  estimatedCost: number;
  currency: string;
  bookingUrl?: string;
  imageUrl?: string;
  placeCoordinates?: { lat: number; lng: number };
}

export interface ItineraryDay {
  dayNumber: number;
  theme: string;
  date?: string;
  activities: ItineraryActivity[];
  curatorNotes: string;
  estimatedDailyBudget: number;
}

export interface TripItinerary {
  id: string;
  title: string;
  destination: string;
  durationDays: number;
  archetype: string;
  overview: string;
  days: ItineraryDay[];
  totalEstimatedCost: number;
  currency: string;
  culturalBridgeHighlights: string[];
  createdAt: string;
}

// ==================== BUDGET PLANNER ====================
export interface BudgetCategoryItem {
  id: string;
  category: 'flights' | 'lodging' | 'dining' | 'activities' | 'transit' | 'misc';
  label: string;
  plannedAmount: number;
  actualAmount: number;
  notes?: string;
}

export interface BudgetSummary {
  totalBudget: number;
  currency: string;
  items: BudgetCategoryItem[];
}

// ==================== CHECKLIST & TRAVEL REQS ====================
export interface PackingChecklistItem {
  id: string;
  item: string;
  category: 'documents' | 'clothing' | 'electronics' | 'toiletries' | 'cultural_etiquette';
  isPacked: boolean;
  isEssential: boolean;
  tip?: string;
}

export interface TravelRequirement {
  destination: string;
  visaStatus: string;
  passportValidityRequired: string;
  currencyUsed: string;
  emergencyNumber: string;
  plugType: string;
  culturalEtiquetteRules: string[];
  tippingGuideline: string;
}

// ==================== USER PROFILE & TRIPS ====================
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  isMember: boolean;
  tier: 'explorer' | 'connoisseur';
  homeAirport: string;
  passportCountry: string;
  preferredMoods: TravelMood[];
  favoriteInterests: TravelInterest[];
}

export interface SavedTrip {
  id: string;
  title: string;
  destination: string;
  dates: string;
  durationDays: number;
  coverImage: string;
  status: 'planned' | 'in_progress' | 'completed';
  itinerary?: TripItinerary;
  savedPlaces: CulturalEntity[];
  notes: string;
  budget?: BudgetSummary;
  packingList?: PackingChecklistItem[];
  isPublic?: boolean;
  createdAt: string;
  updatedAt: string;
}

// ==================== COMMUNITY & SOCIAL ====================
export interface CommunityItinerary {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string;
    handle: string;
    archetype: string;
  };
  destination: string;
  durationDays: number;
  coverImage: string;
  archetypeTag: string;
  summary: string;
  likes: number;
  saves: number;
  hasLiked?: boolean;
  hasSaved?: boolean;
  highlights: string[];
  itinerary: TripItinerary;
}

// ==================== INTERACTIVE MAP ====================
export interface MapPlace {
  id: string;
  name: string;
  destination: string;
  category: EntityCategory;
  lat: number;
  lng: number;
  description: string;
  affinityReason: string;
  imageUrl?: string;
  neighborhood?: string;
}

