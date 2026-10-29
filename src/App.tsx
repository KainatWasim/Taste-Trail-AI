import React, { useState, useEffect } from 'react';
import { Navbar, ActiveNavTab } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HowItWorks } from './components/HowItWorks';
import { DiscoveryForm } from './components/DiscoveryForm';
import { RecommendationResults } from './components/RecommendationResults';
import { ConversationalAssistant } from './components/ConversationalAssistant';
import { SavedCollection } from './components/SavedCollection';
import { AboutSection } from './components/AboutSection';
import { ApiStatusModal } from './components/ApiStatusModal';
import { Footer } from './components/Footer';

// Newly added components
import { FlightSearch } from './components/FlightSearch';
import { HotelSearch } from './components/HotelSearch';
import { RestaurantSearch } from './components/RestaurantSearch';
import { InteractiveMap } from './components/InteractiveMap';
import { ItineraryPlanner } from './components/ItineraryPlanner';
import { BudgetPlanner } from './components/BudgetPlanner';
import { TravelRequirements } from './components/TravelRequirements';
import { PackingChecklist } from './components/PackingChecklist';
import { MyTripsDashboard } from './components/MyTripsDashboard';
import { CommunityHub } from './components/CommunityHub';
import { AuthModal } from './components/AuthModal';
import { Dashboard } from './components/Dashboard';

import {
  TravelPreferences,
  RecommendationResponse,
  CulturalEntity,
  TripItinerary,
  SavedTrip,
  UserProfile,
  HotelResult,
  RestaurantResult,
} from './types/travel';
import { INITIAL_COMMUNITY_TRIPS } from './data/communityTrips';

const SAVED_ENTITIES_KEY = 'tastetrail_saved_collection';
const SAVED_TRIPS_KEY = 'tastetrail_saved_trips';
const USER_PROFILE_KEY = 'tastetrail_user_profile';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('home');
  const [preferences, setPreferences] = useState<TravelPreferences>({
    startingCity: 'New York (JFK)',
    destination: 'Kyoto',
    interests: ['architecture', 'food_dining', 'local_culture'],
    travelMood: 'cultural',
    budget: 'moderate',
    companions: 'solo',
    customNotes: '',
  });

  const [recommendations, setRecommendations] = useState<RecommendationResponse | null>(null);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [savedEntities, setSavedEntities] = useState<CulturalEntity[]>([]);
  const [savedHotels, setSavedHotels] = useState<HotelResult[]>([]);
  const [savedRestaurants, setSavedRestaurants] = useState<RestaurantResult[]>([]);

  const [trips, setTrips] = useState<SavedTrip[]>([]);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loadedItinerary, setLoadedItinerary] = useState<TripItinerary | null>(null);

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);

  // Hydrate state from localStorage
  useEffect(() => {
    try {
      const storedEntities = localStorage.getItem(SAVED_ENTITIES_KEY);
      if (storedEntities) {
        const parsed = JSON.parse(storedEntities);
        if (Array.isArray(parsed)) setSavedEntities(parsed);
      }

      const storedTrips = localStorage.getItem(SAVED_TRIPS_KEY);
      if (storedTrips) {
        const parsedTrips = JSON.parse(storedTrips);
        if (Array.isArray(parsedTrips)) setTrips(parsedTrips);
      } else {
        // Initial sample trip
        setTrips([
          {
            id: 'trip_kyoto_default',
            title: 'Kyoto of Poets & Teahouses',
            destination: 'Kyoto, Japan',
            dates: 'May 15 – May 19, 2026',
            durationDays: 4,
            coverImage: '/assets/images/experience_kyoto_teahouse_1793125807384.jpg',
            status: 'planned',
            itinerary: INITIAL_COMMUNITY_TRIPS[0].itinerary,
            savedPlaces: [],
            notes: 'Contemplative morning walks along Kamogawa, quiet temple gardens, and vinyl kissaten.',
            isPublic: true,
            createdAt: '2026-04-10',
            updatedAt: '2026-04-10',
          },
        ]);
      }

      const storedUser = localStorage.getItem(USER_PROFILE_KEY);
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.warn('Could not read state from localStorage', e);
    }

    // Check Qloo API live status
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => {
        setIsLiveMode(data.mode === 'live');
      })
      .catch(() => {
        setIsLiveMode(false);
      });
  }, []);

  // Persist user changes
  const handleUpdateUser = (user: UserProfile | null) => {
    setCurrentUser(user);
    try {
      if (user) {
        localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_PROFILE_KEY);
      }
    } catch (e) {
      console.warn('Failed to persist user profile', e);
    }
  };

  // Persist saved collection changes
  const handleToggleSave = (entity: CulturalEntity) => {
    setSavedEntities((prev) => {
      let updated: CulturalEntity[];
      const exists = prev.some((item) => item.id === entity.id);
      if (exists) {
        updated = prev.filter((item) => item.id !== entity.id);
      } else {
        updated = [entity, ...prev];
      }
      try {
        localStorage.setItem(SAVED_ENTITIES_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Could not save to localStorage', e);
      }
      return updated;
    });
  };

  const handleClearCollection = () => {
    setSavedEntities([]);
    try {
      localStorage.removeItem(SAVED_ENTITIES_KEY);
    } catch (e) {
      console.warn('Could not clear localStorage', e);
    }
  };

  const handleSaveHotel = (hotel: HotelResult) => {
    setSavedHotels((prev) => {
      if (prev.some((h) => h.id === hotel.id)) {
        return prev.filter((h) => h.id !== hotel.id);
      }
      return [hotel, ...prev];
    });
  };

  const handleSaveRestaurant = (rest: RestaurantResult) => {
    setSavedRestaurants((prev) => {
      if (prev.some((r) => r.id === rest.id)) {
        return prev.filter((r) => r.id !== rest.id);
      }
      return [rest, ...prev];
    });
  };

  const handleSaveItineraryToMyTrips = (itin: TripItinerary) => {
    const newTrip: SavedTrip = {
      id: `trip_${Date.now()}`,
      title: itin.title,
      destination: itin.destination,
      dates: 'Flexible Cultural Dates',
      durationDays: itin.durationDays,
      coverImage: itin.days?.[0]?.activities?.[0]?.imageUrl || '/assets/images/hero_cultural_travel_1793125935503.jpg',
      status: 'planned',
      itinerary: itin,
      savedPlaces: savedEntities.filter((e) => e.destination.toLowerCase().includes(itin.destination.toLowerCase())),
      notes: itin.overview,
      isPublic: false,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    setTrips((prev) => {
      const updated = [newTrip, ...prev];
      try {
        localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save trip to localStorage', e);
      }
      return updated;
    });
  };

  const handleOpenItinerary = (itin: TripItinerary) => {
    setLoadedItinerary(itin);
    setPreferences((prev) => ({ ...prev, destination: itin.destination }));
    setActiveTab('plan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreMap = (dest: string) => {
    setPreferences((prev) => ({ ...prev, destination: dest }));
    setActiveTab('map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDiscoverySubmit = async (newPrefs: TravelPreferences) => {
    setPreferences(newPrefs);
    setIsLoadingRecommendations(true);
    setActiveTab('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPrefs),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data: RecommendationResponse = await response.json();
      setRecommendations(data);
    } catch (err: any) {
      console.error('Failed to fetch recommendations:', err);
      setRecommendations({
        destination: newPrefs.destination,
        summary: `Cultural recommendations for ${newPrefs.destination}`,
        detectedCulturalArchetype: 'The Contemplative Aesthetician',
        entities: [],
        affinityExplanation: 'We were unable to reach the recommendation service. Please verify your network connection or try a different destination.',
        dataSource: 'sample_cultural_graph',
      });
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  const handleApplyPreferencesFromAssistant = (extracted: Partial<TravelPreferences>) => {
    setPreferences((prev) => ({
      ...prev,
      ...extracted,
      destination: extracted.destination || prev.destination,
      interests: extracted.interests && extracted.interests.length > 0 ? (extracted.interests as any) : prev.interests,
      travelMood: extracted.travelMood || prev.travelMood,
    }));
    setActiveTab('discover');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b111e] text-[#f7f3eb]">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedEntities.length}
        tripsCount={trips.length}
        onOpenStatusModal={() => setIsStatusModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        currentUser={currentUser}
        isLiveMode={isLiveMode}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* Tab 1: HOME */}
        {activeTab === 'home' && (
          <div>
            <HeroSection
              onStartDiscover={() => {
                setActiveTab('discover');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBookingNow={() => {
                setActiveTab('hotels');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreHowItWorks={() => {
                const el = document.getElementById('how-it-works');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <HowItWorks
              onStartDiscover={() => {
                setActiveTab('discover');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* Tab 1b: PERSONAL TRAVEL DASHBOARD */}
        {activeTab === 'dashboard' && (
          <Dashboard
            currentUser={currentUser}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            trips={trips}
            savedEntities={savedEntities}
            savedHotels={savedHotels}
            savedRestaurants={savedRestaurants}
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenItinerary={handleOpenItinerary}
            onToggleSaveEntity={handleToggleSave}
          />
        )}

        {/* Tab 2: DISCOVER */}
        {activeTab === 'discover' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center mb-10">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#00c5b2] mb-2">
                Personalized Cultural Profiler
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f7f3eb]">
                Discover Your Cultural Journey
              </h2>
              <p className="mt-3 text-base text-[#d9d2c5]">
                Configure your taste preferences below. Qloo's Cultural Intelligence API correlates your
                stated interests with authentic local destinations and experiences.
              </p>
            </div>
            <DiscoveryForm
              initialPreferences={preferences}
              onSubmit={handleDiscoverySubmit}
              isLoading={isLoadingRecommendations}
            />
          </div>
        )}

        {/* Tab 3: RECOMMENDATION RESULTS */}
        {activeTab === 'results' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8">
            <RecommendationResults
              results={recommendations}
              onRefinePreferences={() => {
                setActiveTab('discover');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onDiscoverMore={() => handleDiscoverySubmit(preferences)}
              savedEntities={savedEntities}
              onToggleSave={handleToggleSave}
              isLoading={isLoadingRecommendations}
            />
          </div>
        )}

        {/* Tab 4: PLAN MY TRIP (AI ITINERARY ARCHITECT) */}
        {activeTab === 'plan' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8">
            <ItineraryPlanner
              initialDestination={preferences.destination}
              onSaveToMyTrips={handleSaveItineraryToMyTrips}
            />
          </div>
        )}

        {/* Tab 5: FLIGHTS */}
        {activeTab === 'flights' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8">
            <FlightSearch
              initialDestination={`${preferences.destination}`}
              initialOrigin={preferences.startingCity || 'New York (JFK)'}
            />
          </div>
        )}

        {/* Tab 6: HOTELS */}
        {activeTab === 'hotels' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8">
            <HotelSearch
              initialDestination={preferences.destination}
              onSaveHotel={handleSaveHotel}
              savedHotelIds={savedHotels.map((h) => h.id)}
            />
          </div>
        )}

        {/* Tab 7: RESTAURANTS */}
        {activeTab === 'restaurants' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8">
            <RestaurantSearch
              initialDestination={preferences.destination}
              onSaveRestaurant={handleSaveRestaurant}
              savedRestaurantIds={savedRestaurants.map((r) => r.id)}
            />
          </div>
        )}

        {/* Tab 8: INTERACTIVE MAP */}
        {activeTab === 'map' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#00c5b2] mb-1">
                Spatial Cultural Cartography
              </div>
              <h2 className="font-display text-3xl font-bold text-[#f7f3eb]">
                Explore Cultural Sanctuaries by Map
              </h2>
              <p className="mt-1 text-sm text-[#d9d2c5]">
                Navigate heritage gardens, listening kissaten, and artisanal workshops with coordinates and neighborhood contexts.
              </p>
            </div>
            <InteractiveMap
              initialDestination={preferences.destination}
              onSaveEntity={handleToggleSave}
              savedEntityIds={savedEntities.map((e) => e.id)}
            />
          </div>
        )}

        {/* Tab 9: CONVERSATIONAL TRAVEL ASSISTANT */}
        {activeTab === 'assistant' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8">
            <ConversationalAssistant
              savedEntities={savedEntities}
              onToggleSave={handleToggleSave}
              onApplyPreferencesToDiscover={handleApplyPreferencesFromAssistant}
            />
          </div>
        )}

        {/* Tab 10: MY TRIPS DASHBOARD */}
        {activeTab === 'trips' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8">
            <MyTripsDashboard
              onOpenItinerary={handleOpenItinerary}
              onExploreMap={handleExploreMap}
              savedPlaces={savedEntities}
            />
          </div>
        )}

        {/* Tab 11: COMMUNITY TRAILS */}
        {activeTab === 'community' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8">
            <CommunityHub
              onCopyItineraryToMyTrips={handleSaveItineraryToMyTrips}
              onViewItinerary={handleOpenItinerary}
            />
          </div>
        )}

        {/* Tab 12: SAVED EXPERIENCES COLLECTION */}
        {activeTab === 'saved' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8">
            <SavedCollection
              savedEntities={savedEntities}
              onToggleSave={handleToggleSave}
              onClearCollection={handleClearCollection}
              onStartDiscovering={() => {
                setActiveTab('discover');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* Tab 13: BUDGET PLANNER */}
        {activeTab === 'budget' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8">
            <BudgetPlanner />
          </div>
        )}

        {/* Tab 14: TRAVEL REQUIREMENTS & CLIMATE */}
        {activeTab === 'requirements' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8">
            <TravelRequirements />
          </div>
        )}

        {/* Tab 15: PACKING CHECKLIST */}
        {activeTab === 'packing' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8">
            <PackingChecklist />
          </div>
        )}

        {/* Tab 16: ABOUT & HACKATHON INFO */}
        {activeTab === 'about' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8">
            <AboutSection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavClick={(tab) => {
          setActiveTab(tab as any);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenStatusModal={() => setIsStatusModalOpen(true)}
      />

      {/* API Diagnostic Inspector Modal */}
      <ApiStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
      />

      {/* User Auth & Profile Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onUpdateUser={handleUpdateUser}
        onNavigateToDashboard={() => {
          setActiveTab('dashboard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
