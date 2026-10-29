import { CommunityItinerary } from '../types/travel';

export const INITIAL_COMMUNITY_TRIPS: CommunityItinerary[] = [
  {
    id: 'trip_kyoto_contemplative',
    title: 'Kyoto of Poets & Teahouses: 4-Day Mindful Journey',
    author: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      handle: '@elenatravels',
      archetype: 'The Contemplative Aesthetician'
    },
    destination: 'Kyoto, Japan',
    durationDays: 4,
    coverImage: '/assets/images/experience_kyoto_teahouse_1793125807384.jpg',
    archetypeTag: 'Contemplative & Heritage',
    summary: 'A curated route through quiet moss temples, post-war jazz kissaten, and Kamogawa morning walks away from crowded tourist circuits.',
    likes: 342,
    saves: 189,
    highlights: ['Shisen-do Bamboo Listening Garden', 'Blue Trane Vintage Vinyl Salon', 'Gion Heirloom Obanzai Supper', 'Arashiyama Bamboo Grove at Dawn'],
    itinerary: {
      id: 'itinerary_kyoto_4day',
      title: 'Kyoto of Poets & Teahouses',
      destination: 'Kyoto',
      durationDays: 4,
      archetype: 'The Contemplative Aesthetician',
      overview: 'Experience Kyoto’s layered acoustic and architectural heritage across 4 quiet, sensory days.',
      totalEstimatedCost: 680,
      currency: 'USD',
      culturalBridgeHighlights: [
        'Minimalist architecture lovers cross-correlate 8.4x with Edo-period scholar gardens',
        'Analog jazz listeners index heavily with private Kyoto listening kissaten'
      ],
      createdAt: '2026-04-12',
      days: [
        {
          dayNumber: 1,
          theme: 'Arrival & The Sound of Water',
          curatorNotes: 'Take the Keihan line to Demachiyanagi to avoid station congestion and start along the river.',
          estimatedDailyBudget: 150,
          activities: [
            {
              id: 'act_1_1',
              title: 'Morning Walk Along Kamogawa River Delta',
              timeSlot: 'morning',
              timeEstimate: '08:30 - 10:30',
              location: 'Kamogawa Delta, Demachiyanagi',
              neighborhood: 'Sakyo Ward',
              category: 'nature',
              description: 'Watch local herons and stepping stones where locals gather for morning tea.',
              culturalWhy: 'Celebrates the traditional relationship between Kyotoites and their sacred river.',
              estimatedCost: 0,
              currency: 'USD',
              imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/Obanzai-kyotofood-2018-12-30.jpg/960px-Obanzai-kyotofood-2018-12-30.jpg',
              placeCoordinates: { lat: 35.0305, lng: 135.7725 }
            },
            {
              id: 'act_1_2',
              title: 'Shisen-do Hermitage & Moss Garden',
              timeSlot: 'afternoon',
              timeEstimate: '13:00 - 15:30',
              location: 'Ichijoji',
              neighborhood: 'Northern Higashiyama',
              category: 'architecture',
              description: 'Edo poet-scholar retreat with bamboo deer-scarer acoustic water features.',
              culturalWhy: 'Qloo match for admirers of contemplative space and Japanese wooden craft.',
              estimatedCost: 15,
              currency: 'USD',
              imageUrl: '/assets/images/experience_kyoto_teahouse_1793125807384.jpg',
              placeCoordinates: { lat: 35.0447, lng: 135.7953 }
            },
            {
              id: 'act_1_3',
              title: 'Jazz Kissa Blue Trane Listening Session',
              timeSlot: 'evening',
              timeEstimate: '19:30 - 22:00',
              location: 'Pontocho Alleys',
              neighborhood: 'Chukyo Ward',
              category: 'music_nightlife',
              description: 'Vintage tube amplifiers playing 1960s hard bop over hand-poured coffee.',
              culturalWhy: 'Direct cultural affinity bridge with mid-century audio and vinyl collectors.',
              estimatedCost: 25,
              currency: 'USD',
              imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/Jazz_%26_Coffee_Masako_10_-_Shimokitazawa%2C_2009-09-24_20.21.01_%28by_Guwashi999%29_-_cropped.jpg/960px-Jazz_%26_Coffee_Masako_10_-_Shimokitazawa%2C_2009-09-24_20.21.01_%28by_Guwashi999%29_-_cropped.jpg',
              placeCoordinates: { lat: 35.0062, lng: 135.7712 }
            }
          ]
        },
        {
          dayNumber: 2,
          theme: 'Artisanal Fermentation & Traditional Obanzai',
          curatorNotes: 'Wear slip-on shoes for temple verandas and tea houses.',
          estimatedDailyBudget: 175,
          activities: [
            {
              id: 'act_2_1',
              title: 'Daitoku-ji Zen Subtemple Stroll',
              timeSlot: 'morning',
              timeEstimate: '09:00 - 11:30',
              location: 'Kita Ward',
              category: 'heritage',
              description: 'Explore the cradle of Japanese tea master Sen no Rikyu.',
              culturalWhy: 'The epicentre of tea philosophy and rock gardens.',
              estimatedCost: 18,
              currency: 'USD',
              imageUrl: '/assets/images/hero_cultural_travel_1793125935503.jpg',
              placeCoordinates: { lat: 35.0436, lng: 135.7441 }
            },
            {
              id: 'act_2_2',
              title: 'Kamogawa Heirloom Obanzai Lunch',
              timeSlot: 'afternoon',
              timeEstimate: '12:30 - 14:30',
              location: 'Sanjo Dori',
              category: 'culinary',
              description: 'Seasonal Kyoto vegetables prepared with dashi aged in cedar barrels.',
              culturalWhy: 'High correlation with slow-food enthusiasts and seasonal cooking practitioners.',
              estimatedCost: 45,
              currency: 'USD',
              imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/Obanzai-kyotofood-2018-12-30.jpg/960px-Obanzai-kyotofood-2018-12-30.jpg',
              placeCoordinates: { lat: 35.0089, lng: 135.7701 }
            },
            {
              id: 'act_2_3',
              title: 'Evening Lantern Walk in Gion Shirakawa',
              timeSlot: 'evening',
              timeEstimate: '18:00 - 20:30',
              location: 'Gion Shirakawa Canal',
              category: 'hidden_gem',
              description: 'Willow trees and stone bridges glowing under paper lanterns.',
              culturalWhy: 'Timeless visual poetry preserved by local conservation bylaws.',
              estimatedCost: 0,
              currency: 'USD',
              imageUrl: '/assets/images/hero_cultural_travel_1793125935503.jpg',
              placeCoordinates: { lat: 35.0055, lng: 135.7745 }
            }
          ]
        }
      ]
    }
  },
  {
    id: 'trip_lisbon_fado_azulejos',
    title: 'Lisbon Acoustic & Ceramic Horizons: 3 Days',
    author: {
      name: 'Mateo Silva',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      handle: '@mateolisboa',
      archetype: 'The Bohemian Flâneur'
    },
    destination: 'Lisbon, Portugal',
    durationDays: 3,
    coverImage: '/assets/images/experience_lisbon_miradouro_1793125807847.jpg',
    archetypeTag: 'Acoustic & Artistic',
    summary: 'From intimate Mouraria tascas to seaside tile museums and twilight miradouro vistas.',
    likes: 278,
    saves: 145,
    highlights: ['Museu Nacional do Azulejo', 'Tasca do Chico Fado Vadio', 'Miradouro de Santa Catarina', 'Bica funicular historic route'],
    itinerary: {
      id: 'itinerary_lisbon_3day',
      title: 'Lisbon Acoustic & Ceramic Horizons',
      destination: 'Lisbon',
      durationDays: 3,
      archetype: 'The Bohemian Flâneur',
      overview: 'Discover Lisbon through melancholic 12-string guitars, baroque azulejos, and petiscos.',
      totalEstimatedCost: 490,
      currency: 'USD',
      culturalBridgeHighlights: [
        'Lovers of acoustic strings cross-index with traditional Alfama fado vadio',
        'Ceramic craft admirers strongly correlate with Manueline convent tiles'
      ],
      createdAt: '2026-03-20',
      days: [
        {
          dayNumber: 1,
          theme: 'Ceramics & The Tagus Breeze',
          curatorNotes: 'Take tram 28 early before 09:00 to avoid queues.',
          estimatedDailyBudget: 120,
          activities: [
            {
              id: 'act_lis_1',
              title: 'Museu Nacional do Azulejo',
              timeSlot: 'morning',
              timeEstimate: '10:00 - 12:30',
              location: 'Madre de Deus Convent',
              neighborhood: 'Xabregas',
              category: 'art_design',
              description: '500 years of hand-painted glazed tiles in a 16th-century gilded cloister.',
              culturalWhy: 'Essential context for understanding Portuguese visual identity.',
              estimatedCost: 12,
              currency: 'USD',
              imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Gulbenkian_01.jpg/960px-Gulbenkian_01.jpg',
              placeCoordinates: { lat: 38.7247, lng: -9.1139 }
            },
            {
              id: 'act_lis_2',
              title: 'Pastéis & Petiscos in Alfama Alleys',
              timeSlot: 'afternoon',
              timeEstimate: '13:00 - 15:30',
              location: 'Alfama Old Quarter',
              category: 'culinary',
              description: 'Grilled sardines, aged sheep cheeses, and crisp vinho verde in family-owned tascas.',
              culturalWhy: 'Centuries-old communal dining ritual unchanged by modern trends.',
              estimatedCost: 35,
              currency: 'USD',
              imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Lisbon_alfalma.jpg/960px-Lisbon_alfalma.jpg',
              placeCoordinates: { lat: 38.7121, lng: -9.1302 }
            },
            {
              id: 'act_lis_3',
              title: 'Sunset Wine at Miradouro de Santa Catarina',
              timeSlot: 'evening',
              timeEstimate: '18:30 - 21:00',
              location: 'Santa Catarina',
              neighborhood: 'Bica',
              category: 'music_nightlife',
              description: 'Open-air acoustic jam sessions overlooking the 25 de Abril suspension bridge.',
              culturalWhy: 'Where local poets and musicians gather for golden hour conversations.',
              estimatedCost: 15,
              currency: 'USD',
              imageUrl: '/assets/images/experience_lisbon_miradouro_1793125807847.jpg',
              placeCoordinates: { lat: 38.7099, lng: -9.1477 }
            }
          ]
        }
      ]
    }
  },
  {
    id: 'trip_oaxaca_mezcal_clay',
    title: 'Oaxaca: Ancestral Kitchens & Black Clay Artisans',
    author: {
      name: 'Sofia Morales',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      handle: '@sofiamexico',
      archetype: 'The Culinary Anthropologist'
    },
    destination: 'Oaxaca, Mexico',
    durationDays: 4,
    coverImage: '/assets/images/experience_oaxaca_artisan_1793125807275.jpg',
    archetypeTag: 'Ancestral & Gastronomic',
    summary: 'A deep-dive into Zapotec weaving villages, wild agave mezcal palenques, and smoke-hall markets.',
    likes: 412,
    saves: 260,
    highlights: ['20 de Noviembre Pasillo de Humo', 'Teotitlán del Valle Natural Dyes', 'Wild Tobalá Mezcal Tasting', 'Ethnobotanical Garden Walk'],
    itinerary: {
      id: 'itinerary_oaxaca_4day',
      title: 'Oaxaca Ancestral Kitchens & Artisans',
      destination: 'Oaxaca',
      durationDays: 4,
      archetype: 'The Culinary Anthropologist',
      overview: 'Immerse yourself in centuries of culinary tradition and living indigenous textile craft.',
      totalEstimatedCost: 420,
      currency: 'USD',
      culturalBridgeHighlights: [
        'Aficionados of natural fermentation index 11.2x with artisanal mezcal palenques',
        'Textile designers demonstrate strong affinity for Zapotec cochineal dyeing workshops'
      ],
      createdAt: '2026-04-05',
      days: [
        {
          dayNumber: 1,
          theme: 'Smoke, Chocolate & Markets',
          curatorNotes: 'Visit Central de Abastos with a certified local guide for the best tlayudas.',
          estimatedDailyBudget: 95,
          activities: [
            {
              id: 'act_oax_1',
              title: 'Pasillo de Humo (Hall of Smoke)',
              timeSlot: 'morning',
              timeEstimate: '09:00 - 11:30',
              location: 'Mercado 20 de Noviembre',
              neighborhood: 'Centro Histórico',
              category: 'culinary',
              description: 'Select your tasajo and cecina to be grilled over charcoal braziers with handmade tortillas.',
              culturalWhy: 'The authentic beating heart of Oaxacan culinary tradition.',
              estimatedCost: 15,
              currency: 'USD',
              imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/58/Mezcal_bottles_.jpg/960px-Mezcal_bottles_.jpg',
              placeCoordinates: { lat: 17.0592, lng: -96.7262 }
            },
            {
              id: 'act_oax_2',
              title: 'Jardín Etnobotánico de Oaxaca',
              timeSlot: 'afternoon',
              timeEstimate: '13:00 - 15:00',
              location: 'Santo Domingo Cultural Center',
              category: 'nature',
              description: 'Striking desert flora and historic stone monastic water canals.',
              culturalWhy: 'Exemplifies the harmony of indigenous botanical wisdom and Spanish monastic architecture.',
              estimatedCost: 10,
              currency: 'USD',
              imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/03/Jard%C3%ADn_Etnobot%C3%A1nico_de_Oaxaca_01.jpg/960px-Jard%C3%ADn_Etnobot%C3%A1nico_de_Oaxaca_01.jpg',
              placeCoordinates: { lat: 17.0664, lng: -96.7231 }
            },
            {
              id: 'act_oax_3',
              title: 'Artisanal Mezcal Tasting Salon',
              timeSlot: 'evening',
              timeEstimate: '18:30 - 21:00',
              location: 'Calle de Manuel García Vigil',
              category: 'culinary',
              description: 'Taste micro-batch Espadín, Tobalá, and Tepeztate mezcals guided by a master mezcalier.',
              culturalWhy: 'Appreciates terroir and centuries-old distillation methods.',
              estimatedCost: 30,
              currency: 'USD',
              imageUrl: '/assets/images/experience_oaxaca_artisan_1793125807275.jpg',
              placeCoordinates: { lat: 17.0645, lng: -96.7251 }
            }
          ]
        }
      ]
    }
  }
];
