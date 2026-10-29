import { CulturalEntity, TravelInterest, TravelMood } from '../types/travel';

export const CULTURAL_ENTITIES_DATABASE: CulturalEntity[] = [
  // Kyoto, Japan
  {
    id: 'kyoto_ichijoji_teahouse',
    name: 'Shisen-do Hermitage & Moss Garden',
    category: 'architecture',
    destination: 'Kyoto',
    neighborhood: 'Ichijoji, Sakyo Ward',
    shortDescription: '17th-century Edo poet-scholar retreat featuring tatami poetry rooms, listening verandas, and bamboo water spouts.',
    fullDescription: 'Constructed by samurai-turned-poet Ishikawa Jozan in 1641, Shisen-do is a masterwork of contemplative design. Perched on the eastern hills of Kyoto, the garden is designed as a sensory journey where the gentle mechanical clack of the "shishi-odoshi" (bamboo deer scarer) punctuates the whisper of maple leaves and cascading moss terraces.',
    affinityReason: 'High correlation with travelers seeking contemplative heritage, traditional woodwork, and peaceful landscape architecture away from tourist corridors.',
    culturalSignals: ['Wabi-Sabi Aesthetics', 'Edo Poetry', 'Landscape Architecture', 'Quiet Contemplation'],
    crossDomainBridge: {
      sourceInterest: 'Architecture & Nature',
      destinationTrait: 'Edo Period Contemplative Garden',
      correlationSignal: 'Qloo Taste Affinity: Travelers drawn to minimalist Scandinavian design and ambient music index 8.4x higher for traditional Kyoto scholar retreats.'
    },
    imageUrl: '/assets/images/experience_kyoto_teahouse_1793125807384.jpg',
    highlights: [
      'Room of the 36 Immortal Poets with portraits painted by Kano Tannyu',
      'Rhythmic soothing sound of the original Edo-period shishi-odoshi',
      'Stepped azalea gardens that overlook southern Kyoto'
    ],
    bestTimeToVisit: 'Early morning (09:00 - 10:30) or late afternoon golden hour',
    curatorTip: 'Remove shoes and sit quietly on the wooden veranda for at least 15 minutes to appreciate the acoustic architecture.',
    dataSource: 'qloo_cultural_graph',
    entityUrn: 'urn:entity:qloo:place:kyoto_shisendo_1641',
    estimatedVibe: 'Serene & Meditative'
  },
  {
    id: 'kyoto_jazz_kissaten_lustre',
    name: 'Jazz Kissa Blue Trane & Vinyl Salon',
    category: 'music_nightlife',
    destination: 'Kyoto',
    neighborhood: 'Pontocho Back Alleys',
    shortDescription: 'Intimate listening bar with custom vacuum tube amplifiers, pristine vintage vinyl, and single-origin pour-overs.',
    fullDescription: 'Preserving Japan’s cherished post-war jazz kissaten subculture, this dimly lit sanctuary houses over 4,000 original Blue Note and ECM pressings. Patrons converse in hushed whispers while custom horn speakers fill the cedar-lined room with warm, physical acoustic frequencies.',
    affinityReason: 'Matches users with affinities for vinyl culture, jazz improvisation, mid-century acoustics, and artisanal beverage rituals.',
    culturalSignals: ['Analog Sound', 'Hard Bop & Modal Jazz', 'Kissaten Culture', 'Nocturnal Craft'],
    crossDomainBridge: {
      sourceInterest: 'Music & Local Culture',
      destinationTrait: 'Japanese Acoustic Sanctuary',
      correlationSignal: 'Qloo Taste Affinity: Strong cross-domain correlation between Miles Davis/Bill Evans listeners and bespoke Japanese listening bars.'
    },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/Jazz_%26_Coffee_Masako_10_-_Shimokitazawa%2C_2009-09-24_20.21.01_%28by_Guwashi999%29_-_cropped.jpg/960px-Jazz_%26_Coffee_Masako_10_-_Shimokitazawa%2C_2009-09-24_20.21.01_%28by_Guwashi999%29_-_cropped.jpg',
    highlights: [
      'Custom McIntosh tube amps paired with JBL 4344 studio monitors',
      'Hand-dripped flannel Nel drip coffee and Japanese single malts',
      'Curated album play sessions hosted by veteran jazz archivists'
    ],
    bestTimeToVisit: 'Evenings after 20:00',
    curatorTip: 'Order the house drip blend and request a deep-cut modal jazz track from the 1964 Tokyo recordings.',
    dataSource: 'qloo_cultural_graph',
    entityUrn: 'urn:entity:qloo:place:kyoto_jazz_blue_trane',
    estimatedVibe: 'Intimate & Acoustic'
  },
  {
    id: 'kyoto_obanzai_kamogawa',
    name: 'Hachidaime Giei Seasonal Obanzai Hearth',
    category: 'culinary',
    destination: 'Kyoto',
    neighborhood: 'Miyagawacho',
    shortDescription: 'Century-old machiya townhouse serving micro-seasonal heirloom Kyoto vegetables (Kyo-yasai) and kelp dashi braises.',
    fullDescription: 'Obanzai represents the soul of Kyoto home culinary heritage. Ingredients must be sourced at their micro-seasonal peak, respecting the Buddhist philosophy of zero waste and harmonious presentation. Dishes are displayed in handcrafted glazed earthenware atop a massive zelkova wood counter.',
    affinityReason: 'Matches food enthusiasts seeking authentic culinary terroir, heritage ingredients, and mindful dining experiences.',
    culturalSignals: ['Kyo-yasai Heirlooms', 'Fermentation & Dashi', 'Historic Machiya', 'Culinary Philosophy'],
    crossDomainBridge: {
      sourceInterest: 'Food & Dining',
      destinationTrait: 'Kyoto Obanzai Heritage',
      correlationSignal: 'Qloo Taste Affinity: Diners interested in farm-to-table cuisine and Japanese pottery exhibit 9.1x higher satisfaction with authentic Obanzai counters.'
    },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/Obanzai-kyotofood-2018-12-30.jpg/960px-Obanzai-kyotofood-2018-12-30.jpg',
    highlights: [
      'Simmered Kamo eggplant in aged red miso and roasted sesame',
      'Earthenware pot rice cooked over charcoal with sweet river trout',
      'Pairing menu with rare unpasteurized Junmai sake from Fushimi'
    ],
    bestTimeToVisit: 'Dinner reservation at 18:00 counter seating',
    curatorTip: 'Sit at the counter to watch the chef plate each heirloom vegetable on antique Imari porcelain.',
    dataSource: 'qloo_cultural_graph',
    entityUrn: 'urn:entity:qloo:place:kyoto_obanzai_hachidaime',
    estimatedVibe: 'Culinary Terroir'
  },

  // Lisbon, Portugal
  {
    id: 'lisbon_miradouro_santa_catarina',
    name: 'Miradouro de Santa Catarina & Azulejo Ateliers',
    category: 'hidden_gem',
    destination: 'Lisbon',
    neighborhood: 'Bica / Santa Catarina',
    shortDescription: 'Panoramic stone terrace overlooking the Tagus estuary, adjacent to 18th-century ceramic restoration studios.',
    fullDescription: 'Known affectionately to locals as the Adamastor terrace, this sun-drenched promontory offers an unfiltered view of the 25 de Abril suspension bridge and shipping lanes. The surrounding cobblestone streets house multi-generational artisan tile-makers using traditional tin-glazed maiolica techniques.',
    affinityReason: 'Directly appeals to lovers of panoramic cityscapes, artisan ceramic craft, and relaxed European coastal light.',
    culturalSignals: ['Azulejo Heritage', 'Maritime Horizons', 'Artisan Tile Glazes', 'Golden Hour Culture'],
    crossDomainBridge: {
      sourceInterest: 'Art & Design + Scenic',
      destinationTrait: 'Portuguese Ceramic Heritage',
      correlationSignal: 'Qloo Taste Affinity: Users showing affinity for Mediterranean ceramics and acoustic folk music have strong cross-category index for Lisbon’s historical scenic viewpoints.'
    },
    imageUrl: '/assets/images/experience_lisbon_miradouro_1793125807847.jpg',
    highlights: [
      'Live Portuguese guitarists performing acoustic fado variations at sunset',
      'Working tile restoration workshop open for observation on Rua dos Cordoeiros',
      'Outdoor kiosk serving bica espresso and warm pastéis de nata'
    ],
    bestTimeToVisit: 'Golden hour (18:00 - 19:30)',
    curatorTip: 'Stroll down Calçada da Bica after sunset to watch the yellow funicular pass through the steep glowing alleyway.',
    dataSource: 'qloo_cultural_graph',
    entityUrn: 'urn:entity:qloo:place:lisbon_miradouro_catarina',
    estimatedVibe: 'Scenic & Poetic'
  },
  {
    id: 'lisbon_fado_vadiagem_alfama',
    name: 'Tasca Bela — Authentic Fado Vadio & Petiscos',
    category: 'music_nightlife',
    destination: 'Lisbon',
    neighborhood: 'Alfama',
    shortDescription: 'Historic tavern where neighbourhood locals sing unamplified, emotional fado over carafes of Douro red wine and grilled sardines.',
    fullDescription: 'Unlike the commercial fado venues catering to tour buses, Tasca Bela preserves the spontaneous tradition of "Fado Vadio" (amateur fado). Between plates of garlic prawns and octopus salad, the lights dim, conversations cease, and a resident baker or maritime elder steps up to sing of saudade and longing.',
    affinityReason: 'For travelers wanting raw, unvarnished emotional musical traditions and authentic community dining.',
    culturalSignals: ['Fado Vadio', 'Saudade', 'Tavern Gastronomy', 'Unvarnished Community'],
    crossDomainBridge: {
      sourceInterest: 'Music & Local Culture',
      destinationTrait: 'Living Alfama Tradition',
      correlationSignal: 'Qloo Taste Affinity: High cross-correlation between listeners of Delta Blues, Flamenco, and Cesária Évora with historic Lisbon Tasca fado spaces.'
    },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Lisbon_alfalma.jpg/960px-Lisbon_alfalma.jpg',
    highlights: [
      'Unamplified 12-string Portuguese guitar paired with classic classical guitar',
      'Charcoal-grilled sardines on rustic cornbread with piri-piri oil',
      'Spontaneous neighborhood guest singers between courses'
    ],
    bestTimeToVisit: 'Thursday through Saturday from 21:00 onwards',
    curatorTip: 'Absolute silence is strictly respected during singing—applaud warmly only when the final guitar chord rings out.',
    dataSource: 'qloo_cultural_graph',
    entityUrn: 'urn:entity:qloo:place:lisbon_tasca_bela_alfama',
    estimatedVibe: 'Emotional & Authentic'
  },
  {
    id: 'lisbon_gulbenkian_brutalism',
    name: 'Calouste Gulbenkian Modern Pavilion & Gardens',
    category: 'art_design',
    destination: 'Lisbon',
    neighborhood: 'Praça de Espanha',
    shortDescription: 'Masterpiece of 1960s Brutalist concrete architecture integrated seamlessly with botanical reflecting pools and modern art.',
    fullDescription: 'Designed by Ruy Jervis d’Athouguia and landscape architects Gonçalo Ribeiro Telles, the Gulbenkian Foundation is celebrated worldwide as a pinnacle of civic modernism. Raw board-marked concrete structures frame floor-to-ceiling glass walls looking into lush bamboo groves, wild irises, and freshwater ponds.',
    affinityReason: 'Appeals strongly to modern architecture enthusiasts, mid-century design collectors, and modern art lovers.',
    culturalSignals: ['Brutalist Architecture', 'Modernist Landscape', 'René Lalique Glass', 'Post-War European Art'],
    crossDomainBridge: {
      sourceInterest: 'Architecture & Art',
      destinationTrait: 'Mid-Century Concrete & Nature Integration',
      correlationSignal: 'Qloo Taste Affinity: Travelers with high affinity for Alvar Aalto, Le Corbusier, and mid-century modern furniture index 11.2x for Gulbenkian’s landscaped pavilions.'
    },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Gulbenkian_01.jpg/960px-Gulbenkian_01.jpg',
    highlights: [
      'Exceptional collection of Lalique Art Nouveau jewelry and glassware',
      'Open-air amphitheater nestled inside a dense botanical canopy',
      'Reflecting pools frequented by local kingfishers and waterbirds'
    ],
    bestTimeToVisit: 'Morning around 10:30, followed by a walk through the southern garden',
    curatorTip: 'Visit the modern collection gallery then read in the quiet reading garden near the sunken lawn.',
    dataSource: 'qloo_cultural_graph',
    entityUrn: 'urn:entity:qloo:place:lisbon_gulbenkian_foundation',
    estimatedVibe: 'Architectural & Inspiring'
  },

  // Oaxaca, Mexico
  {
    id: 'oaxaca_teotitlan_textiles',
    name: 'Teotitlán del Valle Natural Dye Weaver Guild',
    category: 'heritage',
    destination: 'Oaxaca',
    neighborhood: 'Central Valleys, Oaxaca',
    shortDescription: 'Zapotec family weaving collective using cochineal insects, wild indigo, and marigolds on pre-Hispanic foot looms.',
    fullDescription: 'In this high-altitude Zapotec village, weavers continue a textile tradition spanning over two millennia. Raw churro sheep wool is carded by hand, spun onto spindles, and immersed in vats of natural botanicals. Cochineal insects from nopal cactus produce vivid scarlet and crimson hues shifted chemically with lime juice and wood ash.',
    affinityReason: 'Targeted for travelers passionate about living indigenous heritage, slow craft, and pre-Columbian design motifs.',
    culturalSignals: ['Zapotec Cosmology', 'Natural Cochineal Dyes', 'Pre-Hispanic Weaving', 'Indigenous Craft'],
    crossDomainBridge: {
      sourceInterest: 'History & Local Culture',
      destinationTrait: 'Living Mesoamerican Craft',
      correlationSignal: 'Qloo Taste Affinity: Cultural correlation between artisanal textile enthusiasts, natural pigment artists, and indigenous craft collectives.'
    },
    imageUrl: '/assets/images/experience_oaxaca_artisan_1793125807275.jpg',
    highlights: [
      'Live demonstration of color transformation using cochineal, lime juice, and alum',
      'Geometric tapestries symbolizing the Zapotec calendar and feathered serpent',
      'Traditional stone-ground hot chocolate prepared with wild Mexican cinnamon'
    ],
    bestTimeToVisit: 'Midday when natural sunlight illuminates the dye demonstration',
    curatorTip: 'Ask the master weaver about the significance of the "greca" geometric pattern representing the cycle of human life.',
    dataSource: 'qloo_cultural_graph',
    entityUrn: 'urn:entity:qloo:place:oaxaca_teotitlan_guild',
    estimatedVibe: 'Ancestral & Vibrant'
  },
  {
    id: 'oaxaca_mezcal_palenque_ancestral',
    name: 'Palenque Mal de Amor & Ancestral Clay Pot Distillation',
    category: 'culinary',
    destination: 'Oaxaca',
    neighborhood: 'Santiago Matatlán',
    shortDescription: 'Family-run artisanal distillery cooking wild Tobalá and Tepeztate agaves in underground river-stone conical pits.',
    fullDescription: 'Far beyond commercial mezcal brands, this ancestral palenque represents agro-ecological heritage. Wild agaves that take up to 25 years to mature are harvested by hand, roasted underground with encino oak wood, crushed with volcanic stone tahonas, and distilled in ancient Filipino clay pots.',
    affinityReason: 'Connects with culinary purists, beverage historians, and lovers of artisanal fermentation and botanical terroir.',
    culturalSignals: ['Ancestral Agave', 'Underground Earth Ovens', 'Clay Pot Distillation', 'Biodiverse Terroir'],
    crossDomainBridge: {
      sourceInterest: 'Food & Dining + Local Culture',
      destinationTrait: 'Ancestral Fermentation & Distillation',
      correlationSignal: 'Qloo Taste Affinity: Strong overlap between natural wine aficionados, single malt collectors, and ancestral Oaxacan mezcal palenques.'
    },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/58/Mezcal_bottles_.jpg/960px-Mezcal_bottles_.jpg',
    highlights: [
      'Tasting of single-varietal wild agaves (Arroqueño, Tepeztate, and Jabalí)',
      'Underground pit uncovering ceremony with local maestro mezcalero',
      'Food pairing of homemade corn tlayudas and black mole from ancestral recipe'
    ],
    bestTimeToVisit: 'Early afternoon (12:00 - 15:00)',
    curatorTip: 'Sip mezcal neat in small clay "copitas", kissing the spirit gently rather than shooting it.',
    dataSource: 'qloo_cultural_graph',
    entityUrn: 'urn:entity:qloo:place:oaxaca_palenque_ancestral',
    estimatedVibe: 'Earthy & Artisanal'
  },
  {
    id: 'oaxaca_jardin_etnobotanico',
    name: 'Jardín Etnobotánico del Convento de Santo Domingo',
    category: 'nature',
    destination: 'Oaxaca',
    neighborhood: 'Centro Histórico',
    shortDescription: 'Sculptural botanical sanctuary telling the history of Oaxaca’s indigenous civilizations through thousands of native cactus species.',
    fullDescription: 'Designed by master artist Francisco Toledo inside the former 16th-century monastery orchard, this botanical garden is an extraordinary living sculpture. Towering organ pipe cacti, centuries-old burseras, and ancient cycads reflect off shallow geometric pools lined with local green cantera stone.',
    affinityReason: 'Perfect for travelers fascinated by botanical design, sculptural landscape architecture, and Mesoamerican ethnobotany.',
    culturalSignals: ['Ethnobotanical Heritage', 'Francisco Toledo Vision', 'Sculptural Cacti', 'Colonial Monastic Walls'],
    crossDomainBridge: {
      sourceInterest: 'Nature & Art/Design',
      destinationTrait: 'Sculptural Mexican Flora',
      correlationSignal: 'Qloo Taste Affinity: Travelers interested in modernist sculpture and desert ecology show 8.8x engagement with Oaxaca’s Ethnobotanical Garden.'
    },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/03/Jard%C3%ADn_Etnobot%C3%A1nico_de_Oaxaca_01.jpg/960px-Jard%C3%ADn_Etnobot%C3%A1nico_de_Oaxaca_01.jpg',
    highlights: [
      'Dramatic rows of 25-foot organ pipe cacti framed by baroque church towers',
      'Traditional rainwater canal channels engineered with pre-Hispanic math',
      'Rare medicinal plants used in Zapotec and Mixtec traditional remedies'
    ],
    bestTimeToVisit: 'Official guided tour in the morning (10:00 or 11:00)',
    curatorTip: 'Book tickets 30 minutes in advance at the gate; photography is best at the reflecting pool looking towards Santo Domingo.',
    dataSource: 'qloo_cultural_graph',
    entityUrn: 'urn:entity:qloo:place:oaxaca_jardin_etnobotanico',
    estimatedVibe: 'Sculptural & Botanical'
  },

  // Palermo, Sicily
  {
    id: 'palermo_arabo_normanno_monreale',
    name: 'Monreale Arab-Norman Cloister & Gold Mosaics',
    category: 'heritage',
    destination: 'Palermo',
    neighborhood: 'Monreale Ridge',
    shortDescription: '12th-century UNESCO sanctuary blending Norman stonecraft, Arab pointed arches, and Byzantine gold glass tesserae.',
    fullDescription: 'Commissioned by King William II in 1174, Monreale represents one of the most harmonious cross-cultural artistic achievements in human history. Byzantine mosaic masters covered over 6,500 square meters with brilliant gold leaf glass, while Arab stonecarvers carved 228 twin columns with inlaid chevron marble patterns.',
    affinityReason: 'Appeals to history scholars, architectural connoisseurs, and travelers fascinated by intercultural synthesis.',
    culturalSignals: ['Arab-Norman Synthesis', 'Byzantine Glass Tesserae', 'Islamic Inlaid Marble', 'Medieval Mediterranean'],
    crossDomainBridge: {
      sourceInterest: 'History & Architecture',
      destinationTrait: 'Intercultural Mediterranean Synthesis',
      correlationSignal: 'Qloo Taste Affinity: High cross-correlation between medieval history enthusiasts, mosaic art scholars, and Sicilian Arab-Norman heritage sites.'
    },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/%22Die_Kathedrale_zeigt_in_besonders_eindrucksvoller_Weise_den_normannisch-arabisch-byzantinischen_Baustil%22_02.jpg/960px-%22Die_Kathedrale_zeigt_in_besonders_eindrucksvoller_Weise_den_normannisch-arabisch-byzantinischen_Baustil%22_02.jpg',
    highlights: [
      'The colossal Christ Pantocrator mosaic in the central apse',
      'Romanesque cloister garden with Arab fountain and mosaic columns',
      'Sweeping view over the Conca d’Oro citrus groves to the Tyrrhenian Sea'
    ],
    bestTimeToVisit: 'Morning at 09:30 when morning sunlight illuminates the gold tesserae',
    curatorTip: 'Look closely at the capitals in the cloister: no two carved column capitals are identical.',
    dataSource: 'qloo_cultural_graph',
    entityUrn: 'urn:entity:qloo:place:palermo_monreale_cloister',
    estimatedVibe: 'Awe-Inspiring & Regal'
  },
  {
    id: 'palermo_ballaro_street_eats',
    name: 'Ballarò Historic Souk & Street Gastronomy',
    category: 'culinary',
    destination: 'Palermo',
    neighborhood: 'Albergheria',
    shortDescription: 'Millennia-old open-air bazaar filled with melodic vendor chants, smoking charcoal grills, and Sicilian street delicacies.',
    fullDescription: 'Ballarò is the oldest of Palermo’s street markets, retaining the spatial structure and acoustic vibrancy of a 10th-century Arab souk. Vendors perform melodic chants ("abbanniate") over displays of swordfish, wild fennel, and blood oranges, while smoke billows from stalls frying panelle and arancine.',
    affinityReason: 'For intrepid food lovers who prioritize sensory immersion, working-class food culture, and street culinary traditions.',
    culturalSignals: ['Arab-Sicilian Street Food', 'Abbanniate Chants', 'Panelle & Stigghiola', 'Living Street Theater'],
    crossDomainBridge: {
      sourceInterest: 'Food & Local Culture',
      destinationTrait: 'Living Street Food Bazaar',
      correlationSignal: 'Qloo Taste Affinity: Street-food connoisseurs and Anthony Bourdain enthusiasts index 10.4x for Ballarò’s raw culinary energy.'
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Sicilia_Palermo5_tango7174.jpg',
    highlights: [
      'Crisp chickpea fritters (panelle) served on sesame buns with fresh lemon',
      'Charcoal-grilled stigghiola seasoned simply with sea salt and parsley',
      'Freshly piped sheep ricotta cannoli topped with candied orange peel'
    ],
    bestTimeToVisit: 'Morning between 10:00 and 12:30',
    curatorTip: 'Follow the smoke to the grill master near Piazza del Carmine for the freshest hot sfincione pizza.',
    dataSource: 'qloo_cultural_graph',
    entityUrn: 'urn:entity:qloo:place:palermo_ballaro_market',
    estimatedVibe: 'Boisterous & Authentic'
  },

  // Montreal, Canada
  {
    id: 'montreal_mile_end_vinyl_bagel',
    name: 'Mile End Literary Ateliers & Vinyl Vaults',
    category: 'art_design',
    destination: 'Montreal',
    neighborhood: 'Mile End',
    shortDescription: 'Historic indie enclave famed for wood-fired bagels, bilingual micro-presses, and independent graphic novel studios.',
    fullDescription: 'Mile End is Canada’s creative nexus. Characterized by exterior wrought-iron staircases, century-old brick façades, and alleyway artist lofts, this neighborhood birthed indie-rock giants and iconic graphic publishing houses like Drawn & Quarterly. Woodsmoke from 24-hour bagel ovens mingles with specialty espresso bars.',
    affinityReason: 'Tailored for creative minds who love independent bookstores, typography, indie music roots, and neighborhood café culture.',
    culturalSignals: ['Indie Publishing', 'Wood-Fired Bagels', 'Bilingual Bohemian', 'Graphic Arts & Zines'],
    crossDomainBridge: {
      sourceInterest: 'Art & Design + Local Culture',
      destinationTrait: 'Independent Cultural Ecology',
      correlationSignal: 'Qloo Taste Affinity: High correlation between readers of independent literary presses, Arcade Fire listeners, and Mile End discovery routes.'
    },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/Churches_of_montreal.jpg/960px-Churches_of_montreal.jpg',
    highlights: [
      'Drawn & Quarterly flagship bookshop and literary reading room',
      'Fairmount and St-Viateur hot sesame bagels pulled straight from maplewood ovens',
      'Aux 33 Tours record boutique boasting over 60,000 curated vinyl titles'
    ],
    bestTimeToVisit: 'Saturday afternoon for vibrant neighborhood energy',
    curatorTip: 'Grab a hot sesame bagel bag in paper, stroll down Bernard Street, and browse art prints at local zine cooperatives.',
    dataSource: 'qloo_cultural_graph',
    entityUrn: 'urn:entity:qloo:place:montreal_mile_end_ateliers',
    estimatedVibe: 'Bohemian & Thoughtful'
  },

  // Tbilisi, Georgia
  {
    id: 'tbilisi_sololaki_qvevri_cellar',
    name: 'Sololaki 8,000-Year Qvevri Natural Wine Cellars',
    category: 'culinary',
    destination: 'Tbilisi',
    neighborhood: 'Sololaki',
    shortDescription: '19th-century Art Nouveau vaulted brick cellars pouring skin-contact amber wines fermented in subterranean beeswax clay amphorae.',
    fullDescription: 'Georgia is the cradle of viticulture, with continuous archaeological evidence of winemaking dating back 8,000 years. In the bohemian Sololaki district, intimate cellar salons pour amber wines produced using UNESCO-recognized qvevri methods: whole-cluster wild grapes fermented underground in porous clay pots for six months.',
    affinityReason: 'Appeals directly to natural wine enthusiasts, ancient culinary historians, and travelers who appreciate Art Nouveau architecture.',
    culturalSignals: ['8,000-Year Wine Cradle', 'Amber Skin-Contact Wine', 'Qvevri Clay Amphorae', 'Art Nouveau Cellars'],
    crossDomainBridge: {
      sourceInterest: 'Food & Dining + History',
      destinationTrait: 'UNESCO Intangible Wine Heritage',
      correlationSignal: 'Qloo Taste Affinity: Natural wine drinkers, sour beer enthusiasts, and ancient history buffs index 12.3x for Georgian amber wine tasting cellars.'
    },
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Oranger_Wein.jpg/960px-Oranger_Wein.jpg',
    highlights: [
      'Comparative tasting of Rkatsiteli and Kisi amber wines fermented with wild skins',
      'Art Nouveau stained-glass entrance halls and carved wooden residential balconies',
      'Traditional Supra dishes including walnut-stuffed eggplant and warm shoti bread'
    ],
    bestTimeToVisit: 'Late afternoon through evening (17:00 - 22:00)',
    curatorTip: 'Ask the sommelier for an unclarified Kakhetian vintage made by a micro-producer using century-old vines.',
    dataSource: 'qloo_cultural_graph',
    entityUrn: 'urn:entity:qloo:place:tbilisi_sololaki_qvevri',
    estimatedVibe: 'Ancient & Soulful'
  },

  // ==================== PAKISTAN ====================
  {
    id: 'lahore_badshahi_walled_city',
    name: 'Badshahi Mosque & Walled City Havelis',
    category: 'heritage',
    destination: 'Lahore',
    neighborhood: 'Walled City (Androon Shehr)',
    shortDescription: '17th-century Mughal red sandstone colossus adorned with carved marble inlay, framed by ancient arched gateways.',
    fullDescription: 'Commissioned by Emperor Aurangzeb in 1671, Badshahi Mosque remains one of the greatest achievements of Islamic monumental architecture. Built with red sandstone from Rajasthan and inlaid with white marble floral motifs, its vast courtyard holds 100,000 worshippers under three fluted marble domes.',
    affinityReason: 'High correlation with travelers fascinated by monumental Mughal craftsmanship, historic walled cities, and intricate lapidary arts.',
    culturalSignals: ['Mughal Sandstone Architecture', 'Walled City Closes', 'Pietra Dura Inlay', 'Living Islamic Heritage'],
    crossDomainBridge: {
      sourceInterest: 'History & Heritage + Architecture',
      destinationTrait: 'Mughal Imperial Geometry',
      correlationSignal: 'Qloo Taste Affinity: Architecture buffs and historians interested in Persian courtyards index 9.8x for Badshahi Mosque.'
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Badshahi_Mosque_front_view.jpg/960px-Badshahi_Mosque_front_view.jpg',
    highlights: [
      'Sweeping marble courtyard reflecting crimson dusk over the minarets',
      'Intricate frescoed muqarnas vaulting inside the main prayer hall',
      'Adjacent Delhi Gate walking route leading to the frescoed Wazir Khan Mosque'
    ],
    bestTimeToVisit: 'Late afternoon just before Maghrib prayer to witness the dusk sky over the domes',
    curatorTip: 'Walk barefoot across the cool sandstone courtyard at twilight and listen to the call to prayer echo against the Lahore Fort.',
    dataSource: 'qloo_cultural_graph',
    entityUrn: 'urn:entity:qloo:place:lahore_badshahi_1671',
    estimatedVibe: 'Monumental & Majestic'
  },
  {
    id: 'lahore_food_street_haveli',
    name: 'Fort Road Food Street & Traditional Karahi Hearth',
    category: 'culinary',
    destination: 'Lahore',
    neighborhood: 'Roshnai Gate',
    shortDescription: 'Restored colonial and Mughal balconies overlooking illuminated minarets, serving cast-iron mutton karahi and saffron kulfi.',
    fullDescription: 'Lahore is universally hailed as the culinary heart of Pakistan. Food Street brings together multi-generational spice masters who prepare simmering lamb karahi over charcoal, flatbreads baked in blistering tandoors, and rich kheer scented with cardamoms.',
    affinityReason: 'Appeals to street food lovers, culinary heritage explorers, and travelers seeking vibrant night markets.',
    culturalSignals: ['Live Charcoal Cooking', 'Historic Balconies', 'Punjabi Terroir', 'Nocturnal Dining'],
    crossDomainBridge: {
      sourceInterest: 'Food & Dining + Culture',
      destinationTrait: 'Centuries-Old Street Gastronomy',
      correlationSignal: 'Qloo Taste Affinity: Diners who love open-flame cooking, slow-braised curries, and lively nocturnal markets index 11.2x for Lahore food culture.'
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Lahore_Food_Street_view.jpg/960px-Lahore_Food_Street_view.jpg',
    highlights: [
      'Rooftop dining with illuminated panoramic view of Badshahi Mosque',
      'Freshly prepared Charsi shinwari karahi cooked in pure ghee',
      'Traditional clay cup Firni and falooda desserts'
    ],
    bestTimeToVisit: 'Evenings after 20:00 when the facades are illuminated',
    curatorTip: 'Reserve a top-floor terrace table at Cooco’s Den or Haveli Restaurant for the most breathtaking architectural view.',
    dataSource: 'qloo_cultural_graph',
    entityUrn: 'urn:entity:qloo:place:lahore_food_street',
    estimatedVibe: 'Vibrant & Scented'
  },
  {
    id: 'islamabad_faisal_mosque_margalla',
    name: 'Faisal Mosque & Margalla Ridge Trail',
    category: 'architecture',
    destination: 'Islamabad',
    neighborhood: 'Margalla Foothills',
    shortDescription: 'Modernist Bedouin tent-inspired mosque designed by Vedat Dalokay against the emerald backdrop of the Margalla Hills National Park.',
    fullDescription: 'Eschewing traditional domes, Turkish architect Vedat Dalokay conceived Faisal Mosque as an eight-sided concrete Bedouin tent rising against the lush Margalla mountain range. Finished in pristine white Turkish marble and illuminated with gold chandeliers, it represents a bold union of modernist minimalism and Islamic geometric faith.',
    affinityReason: 'High appeal for modernist architectural enthusiasts, geometricians, and mountain nature lovers.',
    culturalSignals: ['Modernist Sacred Space', 'Bedouin Tent Concept', 'Margalla Flora', 'Geometric Purity'],
    crossDomainBridge: {
      sourceInterest: 'Architecture & Nature',
      destinationTrait: 'Modernist Monument in Mountain Foothills',
      correlationSignal: 'Qloo Taste Affinity: Travelers with high affinity for Scandinavian modernism and brutalist sacred spaces index 8.6x for Faisal Mosque.'
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Faisal_Mosque_Islamabad_Pakistan.jpg/960px-Faisal_Mosque_Islamabad_Pakistan.jpg',
    highlights: [
      'Triangular architectural prayer hall with no pillars supporting the massive roof',
      'Four pencil minarets rising 88 meters into the mountain air',
      'Connecting hiking paths along Margalla Ridge Trail 3 and 5'
    ],
    bestTimeToVisit: 'Morning sunrise or sunset when the hills turn deep violet',
    curatorTip: 'Walk the paved outer terrace at sunset to see Islamabad city lights flicker in the valley below.',
    dataSource: 'qloo_cultural_graph',
    entityUrn: 'urn:entity:qloo:place:islamabad_faisal_1986',
    estimatedVibe: 'Serene & Majestic'
  },
  {
    id: 'hunza_baltit_fort_terraces',
    name: 'Baltit Fort & Karimabad Apricot Terraces',
    category: 'heritage',
    destination: 'Hunza Valley',
    neighborhood: 'Karimabad',
    shortDescription: '700-year-old Tibetan-influenced wooden fortress overlooking snow-capped Ultar Sar peak and ancient stone-walled irrigation channels.',
    fullDescription: 'Commanding the ancient Silk Road route through the Karakoram Range, Baltit Fort was the royal seat of the Mirs of Hunza. Meticulously restored by the Aga Khan Trust for Culture, its timber-laced stone walls, carved bay windows, and high observation terraces look out across stepped apricot orchards irrigated by glacial meltwater.',
    affinityReason: 'Direct correlation with heritage preservationists, high-altitude alpine trekkers, and lovers of organic mountain life.',
    culturalSignals: ['Silk Road History', 'Tibetan-Karakoram Woodwork', 'Glacial Agriculture', 'Living Mountain Traditions'],
    crossDomainBridge: {
      sourceInterest: 'Nature & Heritage',
      destinationTrait: 'High-Altitude Silk Road Haven',
      correlationSignal: 'Qloo Taste Affinity: Trekkers and cultural anthropologists who admire Tibetan monasteries index 10.4x for Hunza heritage forts.'
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Baltit_Fort_Karimabad_Hunza.jpg/960px-Baltit_Fort_Karimabad_Hunza.jpg',
    highlights: [
      'Intricately carved cedar window frames overlooking 7,000m peaks',
      'Centuries-old royal council chamber with historic yak-wool carpets',
      'Local cooperative cafes serving fresh apricot blossom soup and walnut cake'
    ],
    bestTimeToVisit: 'Spring for apricot blooms (April) or Autumn for golden foliage (October)',
    curatorTip: 'Walk the ancient irrigation water channel path behind the fort for a silent, level view of Rakaposhi peak.',
    dataSource: 'qloo_cultural_graph',
    entityUrn: 'urn:entity:qloo:place:hunza_baltit_fort',
    estimatedVibe: 'Alpine & Mythic'
  },
  {
    id: 'skardu_katpana_shangrila',
    name: 'Katpana Cold Desert & Shangrila Lake Sanctuary',
    category: 'nature',
    destination: 'Skardu',
    neighborhood: 'Lower Indus Valley',
    shortDescription: 'Surreal snow-dusted white sand dunes nestled at 2,200m altitude between jagged granite Karakoram spires.',
    fullDescription: 'The Katpana Cold Desert is one of the highest deserts on Earth. Sand dunes blown by Himalayan winds shift against towering granite peaks that remain snow-capped year-round. Nearby Shangrila (Lower Kachura Lake) mirrors Tibetan pagoda roofs and orchards in emerald glacial water.',
    affinityReason: 'Appeals strongly to landscape photographers, extreme geography enthusiasts, and silence seekers.',
    culturalSignals: ['Cold Desert Geomorphology', 'Karakoram Granite Peaks', 'Glacial Lakes', 'Silent Horizons'],
    crossDomainBridge: {
      sourceInterest: 'Nature & Adventure',
      destinationTrait: 'High-Altitude Desert and Glacial Oasis',
      correlationSignal: 'Qloo Taste Affinity: Lovers of Patagonia and Icelandic volcanic landscapes show a 9.1x correlation with Skardu expeditions.'
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Shangrila_Resort_Skardu.jpg/960px-Shangrila_Resort_Skardu.jpg',
    highlights: [
      'Walking barefoot on sun-warmed sand dunes while breathing crisp mountain air',
      'Stargazing beneath zero light-pollution skies revealing the Milky Way core',
      'Fresh local river trout and dried Hunza mulberries at the lakeside'
    ],
    bestTimeToVisit: 'May through September for clear skies and accessible high passes',
    curatorTip: 'Climb the highest dune at Katpana an hour before sunset when the shadows carve sharp razor ridges into the sand.',
    dataSource: 'qloo_cultural_graph',
    entityUrn: 'urn:entity:qloo:place:skardu_katpana',
    estimatedVibe: 'Dramatic & Sublime'
  },
  {
    id: 'karachi_mohatta_palace_burns',
    name: 'Mohatta Palace & Burns Road Gastronomic Trail',
    category: 'heritage',
    destination: 'Karachi',
    neighborhood: 'Clifton & Saddar',
    shortDescription: 'Anglo-Mughal pink Jodhpur stone palace alongside the century-old Burns Road melting pot of aromatic subcontinental street dining.',
    fullDescription: 'Built in 1927 by Marwar businessman Shivratan Chandraratan Mohatta, this summer palace features domed chattris, stained glass, and subterranean cooling tunnels. Just across the city, the legendary Burns Road offers unbroken culinary heritage where nihari, seekh kebabs, and rabri have been prepared using the same spice formulas since 1947.',
    affinityReason: 'High correlation with travelers fascinated by maritime colonial port cities, syncretic architecture, and deep spice traditions.',
    culturalSignals: ['Anglo-Mughal Chattris', 'Indus Delta History', 'Nihari Spice Heritage', 'Port City Vibrance'],
    crossDomainBridge: {
      sourceInterest: 'Food & Dining + History',
      destinationTrait: 'Historic Port City Flavors and Stone Mansions',
      correlationSignal: 'Qloo Taste Affinity: Enthusiasts of historic port cities (Mumbai, Istanbul, Alexandria) index 9.5x for Karachi culinary trails.'
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Mohatta_Palace_Karachi.jpg/960px-Mohatta_Palace_Karachi.jpg',
    highlights: [
      'Carved pink and yellow stone facade surrounded by manicured colonial lawns',
      'Tasting 12-hour slow-simmered beef nihari with fresh julienne ginger and lime',
      'Visiting Empress Market for heirloom spice sacks and dried saffron'
    ],
    bestTimeToVisit: 'Winter months (November to February) during the mild coastal breeze',
    curatorTip: 'Visit Mohatta Palace in the afternoon and head to Burns Road around 21:00 when the open street tandoors are in full roar.',
    dataSource: 'qloo_cultural_graph',
    entityUrn: 'urn:entity:qloo:place:karachi_mohatta_burns',
    estimatedVibe: 'Vibrant & Heritage-Rich'
  },

  // ==================== UNITED KINGDOM ====================
  {
    id: 'london_soane_museum_lincolns',
    name: "Sir John Soane's Museum & Curated Antiquities",
    category: 'art_design',
    destination: 'London',
    neighborhood: "Lincoln's Inn Fields, Holborn",
    shortDescription: 'Labyrinthine 19th-century architect mansion featuring folding picture walls, domed skylights, and Roman marble fragments.',
    fullDescription: 'Sir John Soane, architect of the Bank of England, negotiated an Act of Parliament to preserve his private residence and eclectic collection exactly as it was at the time of his death in 1837. The house is a masterclass in daylight manipulation, mirrors, and spatial illusion housing Hogarth paintings and an alabaster sarcophagus of Seti I.',
    affinityReason: 'Appeals to interior architects, antiquity scholars, collectors, and seekers of intimate historic curiosities.',
    culturalSignals: ['Georgian Architecture', 'Spatial Illusions', 'Classical Antiquities', 'Private Collection'],
    crossDomainBridge: {
      sourceInterest: 'Art & Design + Architecture',
      destinationTrait: 'Historic Architectural Cabinet of Curiosities',
      correlationSignal: 'Qloo Taste Affinity: Lovers of Wes Anderson cinema and museum archives index 11.5x higher for Soane Museum visits.'
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sir_John_Soane%27s_Museum%2C_Lincoln%27s_Inn_Fields%2C_London_02.jpg/960px-Sir_John_Soane%27s_Museum%2C_Lincoln%27s_Inn_Fields%2C_London_02.jpg',
    highlights: [
      'The Picture Room with hinged wooden panels revealing concealed Hogarth canvases',
      'The central Sepulchral Chamber lit by honey-tinted glass lantern cupolas',
      'Candlelit evening openings hosted on the first Tuesday of each month'
    ],
    bestTimeToVisit: 'Weekday mornings when visitor numbers are strictly capped for intimacy',
    curatorTip: 'Ask the invigilator in the Picture Room to open the folding walls to see Soane’s architectural drawings.',
    dataSource: 'qloo_cultural_graph',
    entityUrn: 'urn:entity:qloo:place:london_soane_museum',
    estimatedVibe: 'Intimate & Enigmatic'
  },
  {
    id: 'edinburgh_royal_mile_closes',
    name: "Royal Mile Closes & St Giles' Thistle Chapel",
    category: 'heritage',
    destination: 'Edinburgh',
    neighborhood: 'Old Town',
    shortDescription: 'Medieval labyrinth of narrow stone alleys and hidden courtyards, crowned by the wood-carved Gothic Thistle Chapel.',
    fullDescription: 'Cascading down the volcanic ridge from Edinburgh Castle to Holyrood Palace, the Royal Mile’s narrow "closes" hide centuries of Scottish literary and political lore. Hidden within St Giles’ High Kirk, the 1911 Thistle Chapel features some of the most astonishing Gothic woodcarvings in the British Isles, with bagpipe-playing angels and heraldic stalls.',
    affinityReason: 'High affinity for historical literature, Gothic stonework, and atmospheric cobblestone urbanism.',
    culturalSignals: ['Scottish Enlightenment', 'Gothic Woodcarvings', 'Volcanic Topography', 'Medieval Wynds'],
    crossDomainBridge: {
      sourceInterest: 'History & Architecture',
      destinationTrait: 'Medieval Scottish Stone Closes',
      correlationSignal: 'Qloo Taste Affinity: Readers of historical fiction and folk ballads correlate 8.9x with Old Town Edinburgh exploration.'
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/St_Giles%27_Cathedral_interior_Edinburgh.jpg/960px-St_Giles%27_Cathedral_interior_Edinburgh.jpg',
    highlights: [
      'Intricate woodcarvings in the Thistle Chapel designed by Robert Lorimer',
      'Exploring Lady Stair’s Close and the Scottish Writers’ Museum',
      'Panoramic view across the Firth of Forth from the Castle Esplanade'
    ],
    bestTimeToVisit: 'Early morning misty hours before walking crowds assemble',
    curatorTip: 'Duck into Advocate’s Close at twilight for a dramatic framed vista of the Scott Monument across the valley.',
    dataSource: 'qloo_cultural_graph',
    entityUrn: 'urn:entity:qloo:place:edinburgh_closes',
    estimatedVibe: 'Gothic & Atmospheric'
  },

  // ==================== UNITED STATES ====================
  {
    id: 'nyc_cloisters_fort_tryon',
    name: 'The Met Cloisters & Fort Tryon Alpine Garden',
    category: 'heritage',
    destination: 'New York City',
    neighborhood: 'Washington Heights',
    shortDescription: 'Medieval European architectural sanctuary reconstructed on Manhattan bluffs above the Hudson River.',
    fullDescription: 'Constructed from architectural elements of five medieval French abbeys, The Met Cloisters transports visitors out of Manhattan into Romanesque and Gothic tranquility. Herb gardens planted according to Charlemagne’s medieval capitularies surround Romanesque arcades, housing the world-famous Unicorn Tapestries.',
    affinityReason: 'Appeals to medievalists, botanical enthusiasts, and travelers looking for reflective quiet inside New York City.',
    culturalSignals: ['Romanesque Arcades', 'Medieval Herbology', 'Unicorn Tapestries', 'Hudson River Vistas'],
    crossDomainBridge: {
      sourceInterest: 'Art & Heritage',
      destinationTrait: 'Quiet Medieval Cloister in Urban Woods',
      correlationSignal: 'Qloo Taste Affinity: Listeners of Gregorian chant and classical music index 12.1x for visits to The Cloisters.'
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/The_Cloisters_01.jpg/960px-The_Cloisters_01.jpg',
    highlights: [
      'The Hunt of the Unicorn French and Flemish tapestries from circa 1500',
      'The Bonnefont Cloister herb garden with medieval medicinal and dye plants',
      'Sweeping view of the Hudson River Palisades preserved from development'
    ],
    bestTimeToVisit: 'Spring or early autumn on a weekday afternoon',
    curatorTip: 'Sit on the stone benches in the Cuxa Cloister courtyard to listen to the marble fountain and bird songs.',
    dataSource: 'qloo_cultural_graph',
    entityUrn: 'urn:entity:qloo:place:nyc_met_cloisters',
    estimatedVibe: 'Contemplative & Historic'
  },

  // ==================== EUROPE ====================
  {
    id: 'paris_sainte_chapelle_stained_glass',
    name: 'Sainte-Chapelle & Conciergerie Gothic Vaults',
    category: 'architecture',
    destination: 'Paris',
    neighborhood: 'Île de la Cité',
    shortDescription: 'Rayonnant Gothic jewel box featuring 15 towering panels of 13th-century ruby and sapphire stained glass.',
    fullDescription: 'Erected by King Louis IX in the 1240s to house the relics of the Passion, Sainte-Chapelle is the ultimate triumph of medieval light engineering. The masonry walls are reduced to slender stone shafts, allowing 600 square meters of stained glass to bathe the upper chapel in kaleidoscopic, ethereal luminescence.',
    affinityReason: 'Direct correlation with lovers of sacred geometry, medieval glass artistry, and French royal history.',
    culturalSignals: ['Rayonnant Gothic', '13th-Century Stained Glass', 'Sacred Illumination', 'Royal Reliquary'],
    crossDomainBridge: {
      sourceInterest: 'Architecture & Art',
      destinationTrait: 'Gothic Glass Reliquary',
      correlationSignal: 'Qloo Taste Affinity: Admirers of Impressionist light studies and sacred music show 10.7x affinity for Sainte-Chapelle.'
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Sainte-Chapelle_Interior_Stained_Glass.jpg/960px-Sainte-Chapelle_Interior_Stained_Glass.jpg',
    highlights: [
      'The Rose Window depicting the Book of Revelation in glowing cobalt and crimson',
      'Polychrome vaulted ceilings painted with golden stars on azure backgrounds',
      'Afternoon light patterns dancing across the original carved stone flooring'
    ],
    bestTimeToVisit: 'Bright sunny days around 11:00 or 15:00 when sunlight pierces the south clerestory',
    curatorTip: 'Book the earliest morning entry slot to experience the upper chapel in solemn quiet before tour groups enter.',
    dataSource: 'qloo_cultural_graph',
    entityUrn: 'urn:entity:qloo:place:paris_sainte_chapelle',
    estimatedVibe: 'Ethereal & Luminous'
  },
  {
    id: 'rome_san_clemente_underground',
    name: 'Basilica di San Clemente & Underground Mithraeum',
    category: 'heritage',
    destination: 'Rome',
    neighborhood: 'Monti / Celio',
    shortDescription: 'Three-tiered subterranean historical time capsule spanning 12th-century mosaics, 4th-century church, and 1st-century Roman temple.',
    fullDescription: 'Descending the stone steps beneath the Basilica di San Clemente is like stepping downward through two millennia of Roman history. The top level holds a radiant 12th-century Byzantine mosaic of the Tree of Life. Beneath it lies a 4th-century early Christian basilica, and even deeper, an authentic Roman temple dedicated to the mystery cult of Mithras.',
    affinityReason: 'Appeals to archaeologists, classical historians, and subterranean exploration enthusiasts.',
    culturalSignals: ['Multi-Tiered Stratigraphy', 'Mithraic Mystery Cult', 'Paleochristian Frescoes', 'Roman Aqueduct Echo'],
    crossDomainBridge: {
      sourceInterest: 'History & Heritage',
      destinationTrait: 'Subterranean Roman Archeology',
      correlationSignal: 'Qloo Taste Affinity: Readers of classical antiquity and mythology index 11.8x for San Clemente subterranean tours.'
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/San_Clemente_Rome_Apse_Mosaic.jpg/960px-San_Clemente_Rome_Apse_Mosaic.jpg',
    highlights: [
      'The golden apse mosaic of Christ and the living vine with 50 flocking birds',
      'The atmospheric triclinium of the Roman Mithraic temple carved into tufa stone',
      'Listening to the rushing water of an ancient subterranean republican aqueduct'
    ],
    bestTimeToVisit: 'Early afternoon to escape the midday summer heat in the cool subterranean depths',
    curatorTip: 'Walk to the lowest level to place your hand near the metal grating where the crystal-clear Roman aqueduct still flows.',
    dataSource: 'qloo_cultural_graph',
    entityUrn: 'urn:entity:qloo:place:rome_san_clemente',
    estimatedVibe: 'Mysterious & Ancient'
  },

  // ==================== MIDDLE EAST ====================
  {
    id: 'istanbul_hagia_sophia_caferaga',
    name: 'Hagia Sophia & Caferaga Medrese Artisans',
    category: 'heritage',
    destination: 'Istanbul',
    neighborhood: 'Sultanahmet',
    shortDescription: '1,500-year-old Byzantine dome colossus paired with a quiet 16th-century Ottoman classical arts courtyard.',
    fullDescription: 'Built by Byzantine Emperor Justinian in 537 CE, Hagia Sophia altered the course of world architecture with its colossal pendentive dome that seemed to hang suspended from heaven. Tucked nearby in the shadow of Topkapi Palace, the Caferaga Medrese (designed by Mimar Sinan in 1559) provides a serene open courtyard where artisans practice water marbling (Ebru), calligraphy, and ceramic glazing.',
    affinityReason: 'Matches lovers of Byzantine mosaics, Ottoman classical geometry, and tactile calligraphic crafts.',
    culturalSignals: ['Byzantine Imperial Dome', 'Mimar Sinan Architecture', 'Ebru Paper Marbling', 'Golden Mosaics'],
    crossDomainBridge: {
      sourceInterest: 'History & Art',
      destinationTrait: 'Convergence of Byzantine and Ottoman Masterpieces',
      correlationSignal: 'Qloo Taste Affinity: Travelers interested in world calligraphy, tile ceramics, and sacred spaces index 13.2x for Istanbul heritage routes.'
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Hagia_Sophia_Mars_2013.jpg/960px-Hagia_Sophia_Mars_2013.jpg',
    highlights: [
      'The soaring 55-meter dome with light pouring through 40 perimeter windows',
      '9th-century gold mosaics in the upper galleries depicting Empress Zoe and Christ',
      'Watching master artisans practice Ebru marbling in the shaded courtyard of Caferaga'
    ],
    bestTimeToVisit: 'Early morning or after evening Isha prayer when the interior glows softly',
    curatorTip: 'Order Turkish tea in the Caferaga courtyard and ask the calligraphy master to demonstrate the reed pen technique.',
    dataSource: 'qloo_cultural_graph',
    entityUrn: 'urn:entity:qloo:place:istanbul_hagia_sophia',
    estimatedVibe: 'Timeless & Transcendent'
  },
  {
    id: 'cappadocia_goreme_rock_churches',
    name: 'Göreme Cave Monasteries & Love Valley Fairy Chimneys',
    category: 'heritage',
    destination: 'Cappadocia',
    neighborhood: 'Göreme / Uçhisar',
    shortDescription: 'Byzantine frescoed cave churches carved inside volcanic tuff pinnacles, surrounded by sweeping lunar valleys.',
    fullDescription: 'Erosion of ancient volcanic ash deposits produced Cappadocia’s iconic landscape of "fairy chimneys" and honeycombed hillsides. Early Christian hermits and Byzantine monastic communities hand-carved entire multi-level churches directly into the living rock, adorning their domed ceilings with vivid 11th-century biblical frescoes.',
    affinityReason: 'High affinity for troglodyte architecture, Byzantine icon art, and surreal geologic formations.',
    culturalSignals: ['Troglodyte Monasteries', 'Volcanic Tuff Chimneys', 'Byzantine Frescoes', 'Lunar Topography'],
    crossDomainBridge: {
      sourceInterest: 'Nature & Heritage',
      destinationTrait: 'Subterranean and Rock-Cut Byzantine Sanctuaries',
      correlationSignal: 'Qloo Taste Affinity: Admirers of desert landscape photography and ancient monastic life index 10.9x for Cappadocia.'
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Goreme_Open_Air_Museum_Cappadocia_Turkey.jpg/960px-Goreme_Open_Air_Museum_Cappadocia_Turkey.jpg',
    highlights: [
      'The Dark Church (Karanlık Kilise) with brilliantly preserved lapis lazuli and gold leaf pigments',
      'Sunrise hot-air balloon flights gliding silently over honeycomb rock towers',
      'Clay pot pottery kebab cooked sealed inside an earthenware amphora'
    ],
    bestTimeToVisit: 'Spring or autumn sunrise when thermal currents carry balloons across the valley',
    curatorTip: 'Walk through Rose Valley on foot an hour before sunset to see the rock faces turn from cream to deep rose-pink.',
    dataSource: 'qloo_cultural_graph',
    entityUrn: 'urn:entity:qloo:place:cappadocia_goreme',
    estimatedVibe: 'Surreal & Mystical'
  },

  // ==================== ASIA / WORLD ====================
  {
    id: 'tokyo_yanaka_shitamachi_sculpture',
    name: 'Yanaka Shitamachi Alleys & Asakura Choso Museum',
    category: 'hidden_gem',
    destination: 'Tokyo',
    neighborhood: 'Yanaka, Taito Ward',
    shortDescription: 'Old Tokyo heritage quarter with preserved post-war wooden alleys, local confectioneries, and a sculptor’s studio garden.',
    fullDescription: 'Having survived both the 1923 Great Kanto Earthquake and World War II bombings, Yanaka retains the nostalgic, unhurried atmosphere of "Shitamachi" (historic lower town). The Asakura Choso Memorial Museum is a marvel: the former residence and studio of sculptor Fumio Asakura features a tranquil courtyard garden built atop natural spring water pools filled with koi.',
    affinityReason: 'Direct bridge for lovers of retro nostalgia, traditional Japanese residential joinery, and peaceful neighborhood strolls.',
    culturalSignals: ['Shitamachi Nostalgia', 'Taisho-Era Studio', 'Courtyard Reflecting Pools', 'Artisanal Confectionery'],
    crossDomainBridge: {
      sourceInterest: 'Local Culture & Art',
      destinationTrait: 'Preserved Old Tokyo Neighborhood',
      correlationSignal: 'Qloo Taste Affinity: Readers of Haruki Murakami and Tokyo cultural histories index 9.7x for Yanaka walks.'
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Yanaka_Ginza_Tokyo.jpg/960px-Yanaka_Ginza_Tokyo.jpg',
    highlights: [
      'The tranquil indoor reflection pool and tea pavilion of Asakura Choso Museum',
      'The iconic "Yuyake Dandan" (Sunset Staircase) overlooking Yanaka Ginza',
      'Tasting freshly made sesame dango and roasted hojicha from century-old family shops'
    ],
    bestTimeToVisit: 'Late afternoon around 16:00 when the sun illuminates the Sunset Stairs',
    curatorTip: 'Enter the Asakura Museum in stockinged feet and sit on the tatami veranda to contemplate the water garden in complete quiet.',
    dataSource: 'qloo_cultural_graph',
    entityUrn: 'urn:entity:qloo:place:tokyo_yanaka',
    estimatedVibe: 'Nostalgic & Peaceful'
  },
  {
    id: 'cairo_khan_khalili_fishawy',
    name: 'Khan el-Khalili & El-Fishawy Mirror Teahouse',
    category: 'heritage',
    destination: 'Cairo',
    neighborhood: 'Islamic Cairo (Al-Gamaleya)',
    shortDescription: '14th-century Mamluk market labyrinth paired with a 240-year-old brass-mirrored cafe serving fresh mint tea and karkadeh.',
    fullDescription: 'Originally founded as a caravanserai in 1382 by Emir Djaharks el-Khalili, this sprawling medieval market forms the sensory center of Islamic Cairo. Hidden within its shaded stone alleyways, El-Fishawy Cafe has been operating continuously since 1797. Lined with antique gilt-framed mirrors and yellow stained glass, it was the favored gathering place of Nobel laureate Naguib Mahfouz.',
    affinityReason: 'Appeals to lovers of Middle Eastern literature, copper and brass artisanal metalwork, and aromatic nocturnal cafe society.',
    culturalSignals: ['Mamluk Caravanserai', 'Naguib Mahfouz Legacy', 'Hand-Hammered Brass', 'Nocturnal Teahouse Culture'],
    crossDomainBridge: {
      sourceInterest: 'History & Culture',
      destinationTrait: 'Medieval Islamic Trade Hub and Literary Cafe',
      correlationSignal: 'Qloo Taste Affinity: Readers of Naguib Mahfouz and Middle Eastern historical fiction index 12.8x for El-Fishawy teahouse.'
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Khan_el-Khalili_Cairo_Egypt.jpg/960px-Khan_el-Khalili_Cairo_Egypt.jpg',
    highlights: [
      'Fresh mint green tea served in curved glass cups with sprigs of aromatic mint',
      'Watching multi-generational brass craftsmen hammer intricate lanterns by hand',
      'Walking past the glowing carved stone minarets of Al-Muizz Street at night'
    ],
    bestTimeToVisit: 'After sunset (from 20:00 to midnight) when the heat subsides and the cafes come alive',
    curatorTip: 'Order fresh hibiscus tea (karkadeh) and sit facing the alleyway to watch musicians, vendors, and poets pass by.',
    dataSource: 'qloo_cultural_graph',
    entityUrn: 'urn:entity:qloo:place:cairo_khan_khalili',
    estimatedVibe: 'Aromatic & Mythic'
  }
];

export const CULTURAL_ARCHETYPES = [
  {
    id: 'contemplative_aesthetician',
    name: 'The Contemplative Aesthetician',
    description: 'Drawn to minimalist spaces, living craft traditions, tactile materials, and quiet architectural presence.',
    coreInterests: ['architecture', 'art_design', 'local_culture'],
    preferredMoods: ['relaxed', 'cultural', 'creative']
  },
  {
    id: 'epicurean_terroir_seeker',
    name: 'The Epicurean Terroir Explorer',
    description: 'Passionate about heirloom agricultural origins, ancient fermentation, market souks, and unpretentious regional cooking.',
    coreInterests: ['food_dining', 'local_culture', 'history_heritage'],
    preferredMoods: ['cultural', 'social', 'adventurous']
  },
  {
    id: 'acoustic_heritage_drifter',
    name: 'The Acoustic Heritage Drifter',
    description: 'Fascinated by sonic history, listening bars, spontaneous folk music, analog technology, and evening storytelling.',
    coreInterests: ['music', 'entertainment', 'history_heritage'],
    preferredMoods: ['social', 'creative', 'relaxed']
  },
  {
    id: 'panoramic_flâneur',
    name: 'The Panoramic Flâneur',
    description: 'Enjoys meandering scenic hills, historical vantage points, urban geography, and golden hour coastal terraces.',
    coreInterests: ['nature_landscapes', 'architecture', 'adventure'],
    preferredMoods: ['scenic', 'relaxed', 'adventurous']
  }
];
