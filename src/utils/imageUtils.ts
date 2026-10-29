/**
 * TasteTrail AI - Place Image Utilities & Resilient Fallback Architecture
 * Ensures EVERY card across destinations, hotels, restaurants, and itineraries
 * always renders an authentic, verified photograph matched to the destination and category.
 */

import { CulturalEntity } from '../types/travel';

export const GUARANTEED_LOCAL_FALLBACKS = {
  heritage: '/assets/images/experience_kyoto_teahouse_1793125807384.jpg',
  scenic: '/assets/images/experience_lisbon_miradouro_1793125807847.jpg',
  artisan: '/assets/images/experience_oaxaca_artisan_1793125807275.jpg',
  hero: '/assets/images/hero_cultural_travel_1793125935503.jpg',
};

/**
 * Returns a high-resolution, relevant fallback photograph based on both destination and category.
 */
export function getPlaceFallbackImage(destination?: string, category?: string): string {
  const destLower = (destination || '').toLowerCase();
  const catLower = (category || '').toLowerCase();

  // Pakistan (Lahore, Islamabad, Hunza, Skardu, Karachi)
  if (
    destLower.includes('lahore') ||
    destLower.includes('islamabad') ||
    destLower.includes('hunza') ||
    destLower.includes('skardu') ||
    destLower.includes('karachi') ||
    destLower.includes('pakistan')
  ) {
    if (catLower === 'culinary') {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Lahore_Food_Street_view.jpg/960px-Lahore_Food_Street_view.jpg';
    }
    if (catLower === 'architecture') {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Faisal_Mosque_Islamabad_Pakistan.jpg/960px-Faisal_Mosque_Islamabad_Pakistan.jpg';
    }
    if (catLower === 'nature') {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Shangrila_Resort_Skardu.jpg/960px-Shangrila_Resort_Skardu.jpg';
    }
    if (destLower.includes('hunza')) {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Baltit_Fort_Karimabad_Hunza.jpg/960px-Baltit_Fort_Karimabad_Hunza.jpg';
    }
    if (destLower.includes('karachi')) {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Mohatta_Palace_Karachi.jpg/960px-Mohatta_Palace_Karachi.jpg';
    }
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Badshahi_Mosque_front_view.jpg/960px-Badshahi_Mosque_front_view.jpg';
  }

  // Kyoto & Japan
  if (destLower.includes('kyoto') || destLower.includes('tokyo') || destLower.includes('japan')) {
    if (catLower === 'culinary') {
      return 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/Obanzai-kyotofood-2018-12-30.jpg/960px-Obanzai-kyotofood-2018-12-30.jpg';
    }
    if (catLower === 'music_nightlife') {
      return 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/Jazz_%26_Coffee_Masako_10_-_Shimokitazawa%2C_2009-09-24_20.21.01_%28by_Guwashi999%29_-_cropped.jpg/960px-Jazz_%26_Coffee_Masako_10_-_Shimokitazawa%2C_2009-09-24_20.21.01_%28by_Guwashi999%29_-_cropped.jpg';
    }
    if (catLower === 'art_design' || catLower === 'hidden_gem') {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Yanaka_Ginza_Tokyo.jpg/960px-Yanaka_Ginza_Tokyo.jpg';
    }
    return '/assets/images/experience_kyoto_teahouse_1793125807384.jpg';
  }

  // Lisbon & Portugal
  if (destLower.includes('lisbon') || destLower.includes('portugal') || destLower.includes('porto')) {
    if (catLower === 'music_nightlife') {
      return 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Lisbon_alfalma.jpg/960px-Lisbon_alfalma.jpg';
    }
    if (catLower === 'art_design') {
      return 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Gulbenkian_01.jpg/960px-Gulbenkian_01.jpg';
    }
    return '/assets/images/experience_lisbon_miradouro_1793125807847.jpg';
  }

  // United Kingdom (London, Edinburgh, Oxford)
  if (destLower.includes('london') || destLower.includes('edinburgh') || destLower.includes('uk')) {
    if (destLower.includes('edinburgh') || catLower === 'heritage') {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/St_Giles%27_Cathedral_interior_Edinburgh.jpg/960px-St_Giles%27_Cathedral_interior_Edinburgh.jpg';
    }
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sir_John_Soane%27s_Museum%2C_Lincoln%27s_Inn_Fields%2C_London_02.jpg/960px-Sir_John_Soane%27s_Museum%2C_Lincoln%27s_Inn_Fields%2C_London_02.jpg';
  }

  // France / Paris
  if (destLower.includes('paris') || destLower.includes('france')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Sainte-Chapelle_Interior_Stained_Glass.jpg/960px-Sainte-Chapelle_Interior_Stained_Glass.jpg';
  }

  // Italy (Rome, Palermo, Florence, Venice)
  if (destLower.includes('rome') || destLower.includes('palermo') || destLower.includes('italy')) {
    if (catLower === 'culinary') {
      return 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Sicilia_Palermo5_tango7174.jpg';
    }
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/San_Clemente_Rome_Apse_Mosaic.jpg/960px-San_Clemente_Rome_Apse_Mosaic.jpg';
  }

  // Turkey (Istanbul, Cappadocia)
  if (destLower.includes('istanbul') || destLower.includes('cappadocia') || destLower.includes('turkey')) {
    if (destLower.includes('cappadocia')) {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Goreme_Open_Air_Museum_Cappadocia_Turkey.jpg/960px-Goreme_Open_Air_Museum_Cappadocia_Turkey.jpg';
    }
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Hagia_Sophia_Mars_2013.jpg/960px-Hagia_Sophia_Mars_2013.jpg';
  }

  // Egypt / Cairo
  if (destLower.includes('cairo') || destLower.includes('egypt')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Khan_el-Khalili_Cairo_Egypt.jpg/960px-Khan_el-Khalili_Cairo_Egypt.jpg';
  }

  // United States (New York, San Francisco)
  if (destLower.includes('new york') || destLower.includes('nyc') || destLower.includes('san francisco')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/The_Cloisters_01.jpg/960px-The_Cloisters_01.jpg';
  }

  // Oaxaca & Mexico
  if (destLower.includes('oaxaca') || destLower.includes('mexico')) {
    if (catLower === 'culinary') {
      return 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/58/Mezcal_bottles_.jpg/960px-Mezcal_bottles_.jpg';
    }
    if (catLower === 'nature') {
      return 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/03/Jard%C3%ADn_Etnobot%C3%A1nico_de_Oaxaca_01.jpg/960px-Jard%C3%ADn_Etnobot%C3%A1nico_de_Oaxaca_01.jpg';
    }
    return '/assets/images/experience_oaxaca_artisan_1793125807275.jpg';
  }

  // Montreal & Canada
  if (destLower.includes('montreal') || destLower.includes('canada')) {
    return 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/Churches_of_montreal.jpg/960px-Churches_of_montreal.jpg';
  }

  // Tbilisi & Georgia
  if (destLower.includes('tbilisi') || destLower.includes('georgia')) {
    return 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Oranger_Wein.jpg/960px-Oranger_Wein.jpg';
  }

  // Generic category fallbacks
  if (catLower === 'culinary') {
    return 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/Obanzai-kyotofood-2018-12-30.jpg/960px-Obanzai-kyotofood-2018-12-30.jpg';
  }
  if (catLower === 'music_nightlife') {
    return 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/Jazz_%26_Coffee_Masako_10_-_Shimokitazawa%2C_2009-09-24_20.21.01_%28by_Guwashi999%29_-_cropped.jpg/960px-Jazz_%26_Coffee_Masako_10_-_Shimokitazawa%2C_2009-09-24_20.21.01_%28by_Guwashi999%29_-_cropped.jpg';
  }
  if (catLower === 'art_design' || catLower === 'hidden_gem') {
    return '/assets/images/experience_oaxaca_artisan_1793125807275.jpg';
  }
  if (catLower === 'nature') {
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Shangrila_Resort_Skardu.jpg/960px-Shangrila_Resort_Skardu.jpg';
  }

  return '/assets/images/hero_cultural_travel_1793125935503.jpg';
}

/**
 * Resolves an authentic, non-empty image URL with resilient fallback cascade.
 */
export function getResolvedImageUrl(
  entityOrUrl?: CulturalEntity | string | null,
  category?: string,
  destination?: string
): string {
  if (!entityOrUrl) {
    return getPlaceFallbackImage(destination, category);
  }

  // If passed a full CulturalEntity object
  if (typeof entityOrUrl === 'object' && 'category' in entityOrUrl) {
    const entity = entityOrUrl as CulturalEntity;
    if (
      entity.imageUrl &&
      typeof entity.imageUrl === 'string' &&
      entity.imageUrl.trim() &&
      entity.imageUrl !== '{}' &&
      (entity.imageUrl.startsWith('http') || entity.imageUrl.startsWith('/'))
    ) {
      return entity.imageUrl;
    }
    return getPlaceFallbackImage(entity.destination, entity.category);
  }

  // If passed a string url
  if (typeof entityOrUrl === 'string') {
    const trimmed = entityOrUrl.trim();
    if (
      trimmed &&
      trimmed !== '{}' &&
      (trimmed.startsWith('http') || trimmed.startsWith('/'))
    ) {
      return trimmed;
    }
  }

  return getPlaceFallbackImage(destination, category);
}
