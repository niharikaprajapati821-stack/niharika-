import { Spot, ScamAdvisory, EtiquetteItem, TransitLine, LocationContext } from '../types';

export const LOCATIONS: Record<string, LocationContext> = {
  'kyoto-shimogyo': {
    city: 'Kyoto',
    ward: 'Shimogyo Ward',
    arrivedAgo: 'Arrived 2h ago',
    weather: {
      temp: 21,
      condition: 'Partly Sunny',
      icon: 'wb_sunny'
    },
    timeJST: '14:40 JST',
    areaLabel: 'Station Area West',
    baseSubwayFare: '¥210',
    taxiFlagDrop: '¥500'
  },
  'kyoto-gion': {
    city: 'Kyoto',
    ward: 'Higashiyama (Gion)',
    arrivedAgo: 'Arrived 3h ago',
    weather: {
      temp: 20,
      condition: 'Pleasant Breeze',
      icon: 'air'
    },
    timeJST: '14:40 JST',
    areaLabel: 'Historic Preserve',
    baseSubwayFare: '¥210',
    taxiFlagDrop: '¥500'
  },
  'kyoto-arashiyama': {
    city: 'Kyoto',
    ward: 'Ukyo Ward (Arashiyama)',
    arrivedAgo: 'Day excursion',
    weather: {
      temp: 19,
      condition: 'Clear Sky',
      icon: 'light_mode'
    },
    timeJST: '14:40 JST',
    areaLabel: 'Bamboo Grove & River',
    baseSubwayFare: '¥240',
    taxiFlagDrop: '¥500'
  },
  'osaka-namba': {
    city: 'Osaka',
    ward: 'Chuo Ward (Namba)',
    arrivedAgo: 'Connected 45m ago',
    weather: {
      temp: 22,
      condition: 'Sunny',
      icon: 'wb_sunny'
    },
    timeJST: '14:40 JST',
    areaLabel: 'Minami Food District',
    baseSubwayFare: '¥190',
    taxiFlagDrop: '¥600'
  }
};

export const INITIAL_SPOTS: Spot[] = [
  {
    id: 'nishiki-dashi',
    name: 'Nishiki Market Dashi Bar',
    tier: 'budget',
    tierLabel: 'Pocket-Friendly $',
    category: 'Morning Eatery',
    distance: '650m away',
    status: 'Open now',
    statusOpen: true,
    priceAvg: 'Avg. ¥450',
    quote: '"Best dashi tamagoyaki rolled before 11 AM; stand at wooden rail, cash only."',
    description: 'A third-generation master artisan gently folds golden dashi-infused broth into velvety rolled omelets. Served straight from copper tamagoyaki pans on simple bamboo paper trays.',
    address: 'Nishikikoji-dori, Nakagyo Ward, Kyoto',
    japaneseAddress: '京都府京都市中京区錦小路通',
    taxiNote: '錦市場（にしきいちば）までお願いします。',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4Q29Fhq8oqxr6_UThUlWWdcXe-Y6vsEVimVtzMSIPTzMIFFdsaW1m9m1KVp2v7ZImnyJ0Yznz4axUbYkmyVLTxkPkm_EbDll9PYuGzyIwvPO7krQD67Ii9C1j3-bYkli2_NfPfxcOl-45XkIbhv1dhu27Ovm6tCL10QZtt5iRmbk-f_F_-vJxQWVnqRimX-bX3IMegR-g5cyZsM1QT4g_U3ASQimJRLapz9nhDN8WuOfQSKUNkEZq',
    imageAlt: 'Warm golden light spilling over freshly steamed Japanese dashi tamagoyaki omelet being sliced at a traditional wooden stall in Nishiki Market Kyoto, shot in an editorial mindful food documentary style with soft steam and rustic ceramic plating.',
    locationArea: 'Nishiki Market',
    hours: '08:30 – 14:00 (Wed closed)',
    tips: [
      'Cash only: coins or 1,000 yen notes preferred.',
      'Eat directly in front of the stall rail—eating while walking down Nishiki street is frowned upon.',
      'Pairs beautifully with their hot roasted hojicha tea.'
    ]
  },
  {
    id: 'gion-okaru',
    name: 'Gion Okaru Heritage Udon',
    tier: 'iconic',
    tierLabel: 'Iconic $$',
    category: 'Heritage Comfort',
    distance: '1.2km away',
    status: 'Opens 17:00',
    statusOpen: false,
    priceAvg: 'Avg. ¥1,200',
    quote: '"Beloved rich curry udon served late night in historic preserved alleyway."',
    description: 'Since 1925, Okaru has comforted local artists, geiko, and nighttime travelers with piping hot bowls of thick, silky Kansai-style dashi curry broth and handmade chewy noodles.',
    address: 'Tominagacho, Higashiyama Ward, Kyoto',
    japaneseAddress: '京都府京都市東山区祇園富永町137',
    taxiNote: '祇園の「おかる」うどん屋までお願いします。',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6YqKFntkLcMg0gqD_Ys2DdTuRk7vaGAKoLZbu1N-8N2Ctu39Eo50bkPmCLLbO8AAPh7HOqFFd-X5IYwk3B7K0K6aMp2_5CuojGP253vxOFEX4tWMUbcKXz2EXtiK74qcXEPSW0cJTvFViA1itqI14FYM9Gnk27507yphe3QsEXx2_oGeejCLh6pzPE84K_6Q6YqR1AYChmPYxp55fSKEi83pSlE3OE0-RcH8WTnxYhd6077qNuwi_',
    imageAlt: 'Atmospheric wooden lantern-lit narrow alleyway in Gion Kyoto at twilight with traditional noren curtain entrance of a historic heritage udon shop, soft rain sheen on cobblestones, refined serene travel photography.',
    locationArea: 'Gion Core',
    hours: '17:00 – 02:00',
    tips: [
      'The cheese curry udon or meat curry udon (Niku Curry) are the local treasures.',
      'Paper aprons are provided to protect against splashes.',
      'Expect a 10-15 minute queue during peak 18:30-20:00 hours.'
    ]
  },
  {
    id: 'bar-k6',
    name: 'Bar K-6 Vinyl & Cocktails',
    tier: 'gem',
    tierLabel: 'Hidden Gem $$$',
    category: 'Listening Salon',
    distance: '800m away',
    status: 'Opens 18:00',
    statusOpen: false,
    priceAvg: 'Cover ¥1,000',
    quote: '"Quiet, respectful listening bar with rare Japanese whiskies and bespoke ice spheres."',
    description: 'Founded by master bartender Minoru Nishida, K-6 is a sanctuary for music connoisseurs and cocktail purists. Vintage vacuum-tube amplifiers fill the dark wood room with pristine analog sound.',
    address: 'Kiyamachi-dori, Nakagyo Ward, Kyoto',
    japaneseAddress: '京都府京都市中京区木屋町通二条下ル上樵木町488',
    taxiNote: '木屋町二条のバー「K-6」までお願いします。',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQATyomSKLhLuBluNebPCZjmFFqlXsC3OE2iEXPj57uHazGW468Jn8z-5cmEIinAZrRIYu58ASKrbNhVrZXya-okFG8y1wQD3FeBYbRLK0nLMJWoj4OY-It1uMufdWKMIJtxIb_yV0bv0AzQfwug-VzJWFFJ8vNilNfn67Pp9QSThIclXCtyFMJzTPLLn-dhNxpxQmZ6JWC8dcDCe7ur_t7OWRUk1N22zlLGI-GT2ox_IjxYn9F8tK',
    imageAlt: 'Intimate dark timber audiophile jazz listening bar in Kyoto with back-lit single malt whiskey bottles on dark walnut shelves, glowing vintage tube amplifiers and vinyl record turntable, calm minimalist evening atmosphere.',
    locationArea: 'Takase River / Kiyamachi',
    hours: '18:00 – 02:00',
    tips: [
      'Keep conversations in quiet whispers to respect fellow listeners.',
      'Try the seasonal fresh fruit cocktail or highball with artisanal hand-carved ice sphere.',
      'Table charge is ¥1,000 per guest, which includes delicate savory amuse-bouche.'
    ]
  },
  {
    id: 'shoraian-tofu',
    name: 'Shoraian Tofu Cuisine',
    tier: 'fine',
    tierLabel: 'Splurge $$$$',
    category: 'Riverside Kaiseki',
    distance: 'Arashiyama (22m)',
    status: 'Reservation Req.',
    statusOpen: false,
    priceAvg: '¥9,000+ course',
    quote: '"Waterside Kaiseki overlooking Katsura River cliffs. Sublime tranquility."',
    description: 'Perched along a winding stone path in Arashiyama park, this former prime minister villa serves multi-course tofu art created with mountain spring water. Windows open to lush bamboo and emerald water.',
    address: 'Kanko-dori, Saga Kameocho, Ukyo Ward, Kyoto',
    japaneseAddress: '京都府京都市右京区嵯峨亀ノ尾町官有地内',
    taxiNote: '嵐山の渡月橋の北詰、亀山公園入口の松籟庵（しょうらいあん）までお願いします。',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHRPt34NYRdhbPr8IbwkEt9BFYqsQi_83egfuijXR6fL36tIwRxxoZuYqZUAC0y853bP3Pc8ZJHMxMrLU_1YzM-61ZMfAzefMrDg0VdYcJwqDI5dBKjgCpkOaHSrObzlWVrX1JqMaWXY_rM6z8efqcFcMGLwx12VjtlBvIX8PXlbN55hyh8GD0m1-st8kLuHKzfw19m-QJDrryB5i_KPgnBUVqbNyNOggpOK_jEnnN8AbBlrxdkAD4',
    imageAlt: 'Traditional secluded Japanese pavilion dining room overlooking lush emerald Katsura River gorge and green bamboo trees in Arashiyama Kyoto, minimalist tatami mat setting with delicate ceramic kaiseki seasonal courses.',
    locationArea: 'Arashiyama Forest',
    hours: '11:00 – 17:00 (Lunch & Early Dinner)',
    tips: [
      'Book at least 3-4 weeks in advance through your hotel concierge or official booking portal.',
      'Allow 15 minutes of peaceful forest walking from Togetsukyo Bridge along the river path.',
      'Remove shoes at the genkan entrance.'
    ]
  },
  {
    id: 'stardust-cafe',
    name: 'Stardust Tea & Linen Salon',
    tier: 'gem',
    tierLabel: 'Hidden Gem $$$',
    category: 'Mindful Sanctuary',
    distance: '2.5km away',
    status: 'Open now',
    statusOpen: true,
    priceAvg: 'Avg. ¥1,600',
    quote: '"Ancient repurposed machiya with biodynamic herbal infusions and silent courtyard."',
    description: 'A restored Kyoto townhouse curating organic botanical teas, vegan raw sweets, and artisanal natural linen garments in an ethereal, whisper-soft space.',
    address: 'Shichiku Shimo-takecho, Kita Ward, Kyoto',
    japaneseAddress: '京都府京都市北区紫竹下竹殿町41',
    taxiNote: '北区紫竹のスターダスト（町家カフェ）までお願いします。',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQATyomSKLhLuBluNebPCZjmFFqlXsC3OE2iEXPj57uHazGW468Jn8z-5cmEIinAZrRIYu58ASKrbNhVrZXya-okFG8y1wQD3FeBYbRLK0nLMJWoj4OY-It1uMufdWKMIJtxIb_yV0bv0AzQfwug-VzJWFFJ8vNilNfn67Pp9QSThIclXCtyFMJzTPLLn-dhNxpxQmZ6JWC8dcDCe7ur_t7OWRUk1N22zlLGI-GT2ox_IjxYn9F8tK',
    imageAlt: 'Calm natural linen and ceramic decor inside a traditional wooden Machiya house in Kyoto with soft filtered daylight.',
    locationArea: 'Kita Kyoto',
    hours: '11:00 – 18:00',
    tips: [
      'No photography with shutter sound allowed inside.',
      'Try the signature organic medicinal herbal infusion and raw cacao tart.',
      'A quiet oasis after temple visits.'
    ]
  }
];

export const SCAM_ADVISORIES: ScamAdvisory[] = [
  {
    id: 'scam-01',
    patternNumber: 'Pattern #01',
    title: 'The "Private Teahouse Invitation" Trap',
    category: 'Street Tout / Cultural Trap',
    frequency: 'Low frequency',
    description: 'Friendly fluent English touts near Gion bridge strike casual conversation, offering an "exclusive, unlicensed geisha tea tasting" with hidden seating surcharges.',
    countermeasureLabel: 'Clear Action',
    countermeasure: 'Politely decline unsolicited street invitations in Gion; authentic ochaya strictly operate on prior reservation or introduction.',
    icon: 'local_cafe',
    verifiedTime: 'Verified 40m ago',
    location: 'Gion / Shijo Dori Bridge'
  },
  {
    id: 'scam-02',
    patternNumber: 'Pattern #02',
    title: 'Unregistered Luggage Storage Lockers',
    category: 'Station Hubs',
    frequency: 'Station Hubs',
    description: 'Independent storefronts displaying counterfeit "Official JR Locker" placards charging ¥2,500/bag with restrictive 6 PM pickup curfews and zero loss insurance.',
    countermeasureLabel: 'Verified Countermeasure',
    countermeasure: 'Use station Coin Lockers (¥500–¥800) or verified Ecbo Cloak partner stores via the official mobile app.',
    icon: 'luggage',
    verifiedTime: 'Verified 2h ago',
    location: 'Kyoto Station North & Hachijo Exits'
  },
  {
    id: 'scam-03',
    patternNumber: 'Pattern #03',
    title: 'Unauthorized "Fast-Track" Temple Ticket Vendors',
    category: 'Sightseeing Trap',
    frequency: 'Moderate on weekends',
    description: 'Resellers hovering near Kiyomizu-dera approach foreign travelers claiming general tickets are sold out and selling laminated non-transferable passes for 3x face value.',
    countermeasureLabel: 'Official Protocol',
    countermeasure: 'All Kyoto temples sell tickets directly at official wooden admission gates for flat ¥400–¥600. Tickets never sell out during standard hours.',
    icon: 'confirmation_number',
    verifiedTime: 'Verified yesterday',
    location: 'Kiyomizu Slope / Higashiyama'
  }
];

export const ETIQUETTE_ITEMS: EtiquetteItem[] = [
  {
    id: 'etiquette-01',
    category: 'Dining & Hospitality',
    title: 'Strictly No Tipping',
    description: 'Can cause confusion or distress. Exceptional, attentive service is already honored and included everywhere.',
    actionTip: 'Say "Gochisousama" instead',
    icon: 'money_off',
    bgClass: 'bg-secondary-fixed',
    iconColorClass: 'text-on-secondary-fixed',
    detailedRules: [
      'Leaving extra cash on the table will often result in the server running down the street to return your forgotten money.',
      'Express heartfelt gratitude at the register with "Gochisousama deshita" (Thank you for the feast).',
      'If you wish to show appreciation at high-end ryokan, an envelope with crisp new bills handed to your personal nakai-san is traditional, but never expected of international guests.'
    ]
  },
  {
    id: 'etiquette-02',
    category: 'Train & Metro',
    title: 'Quiet Carriage Protocol',
    description: 'Mute phone audio (Manner Mode). No voice calls. Wear bulky backpacks in front or place on overhead racks.',
    actionTip: 'Queuing: Left on stairs in Kansai',
    icon: 'volume_off',
    bgClass: 'bg-primary-fixed',
    iconColorClass: 'text-on-primary-fixed',
    detailedRules: [
      'Switch your smartphone to Manner Mode (vibrate only) immediately upon entering stations and carriages.',
      'Never answer voice calls on trains. If urgent, whisper that you will call back once off the train, or move to the vestibule area on Shinkansen.',
      'Backpack etiquette: Slip your bag off shoulders and carry it in front of your chest to avoid bumping seated passengers.'
    ]
  },
  {
    id: 'etiquette-03',
    category: 'Sacred Grounds',
    title: 'Chozuya Purification',
    description: 'Bow once at Torii gate. Wash left hand, then right hand, and rinse mouth gently at the water basin before stepping up.',
    actionTip: 'Step over door thresholds',
    icon: 'temple_buddhist',
    bgClass: 'bg-tertiary-fixed',
    iconColorClass: 'text-on-tertiary-fixed',
    detailedRules: [
      'At Shinto shrines: Hold wooden ladle in right hand, scoop water, pour over left hand. Switch hands, wash right. Scoop again into left palm to rinse mouth (never drink directly from ladle). Tilt ladle upright to wash handle for next visitor.',
      'Shinto worship sequence: Two deep bows, two claps, silent intention, one final bow (Ni-rei, Ni-hai, Ichi-rei).',
      'At Buddhist temples: No clapping; simply press palms together in silent Gassho prayer.'
    ]
  },
  {
    id: 'etiquette-04',
    category: 'Daily Transactions',
    title: 'Keep ¥10,000 Cash',
    description: 'While convenience stores and trains use IC, small temple admission booths, historic udon shops, and coin lockers are cash only.',
    actionTip: '7-Bank ATMs accept Visa/MC',
    icon: 'payments',
    bgClass: 'bg-surface-container-high',
    iconColorClass: 'text-on-surface',
    detailedRules: [
      '7-Eleven (Seven Bank) and Post Office (Japan Post Bank) ATMs offer the best international card compatibility with zero foreign transaction markup.',
      'Small coins (¥100 and ¥500) are essential for temple donation boxes, coin lockers, and street vending machines.',
      'When paying with cash, place your banknotes and coins neatly in the small plastic tray (tsuritobon) rather than handing directly to the cashier.'
    ]
  }
];

export const TRANSIT_LINES: TransitLine[] = [
  {
    id: 'karasuma',
    name: 'Karasuma Subway Line',
    lineCode: 'K09',
    color: '#007A3D',
    destination: 'Kokusaikaikan via Shijo & Kyoto Sta.',
    departureMin: 4,
    platform: 'Platform 2 (Northbound)',
    frequency: 'Every 5 min',
    fare: '¥210 - ¥290'
  },
  {
    id: 'tozai',
    name: 'Tozai Subway Line',
    lineCode: 'T12',
    color: '#E60012',
    destination: 'Uzumasa Tenjingawa / Rokojizo',
    departureMin: 7,
    platform: 'Transfer at Karasuma Oike',
    frequency: 'Every 7 min',
    fare: '¥210 - ¥360'
  },
  {
    id: 'kyoto-bus-205',
    name: 'Kyoto City Bus #205 (Loop)',
    lineCode: 'Bus 205',
    color: '#E06A3B',
    destination: 'Kinkaku-ji & Kyoto Station Loop',
    departureMin: 3,
    platform: 'Bus Stop B3',
    frequency: 'Every 4-6 min',
    fare: 'Flat ¥230 (IC / Cash)'
  },
  {
    id: 'haruka-express',
    name: 'JR Kansai Airport Haruka',
    lineCode: 'JR Haruka',
    color: '#005BBB',
    destination: 'KIX Kansai Airport (Direct 75m)',
    departureMin: 18,
    platform: 'JR Platform 30',
    frequency: 'Every 30 min',
    fare: '¥3,430 (Reserved)'
  },
  {
    id: 'shinkansen-nozomi',
    name: 'Tokaido Shinkansen (Nozomi)',
    lineCode: 'Nozomi 42',
    color: '#002B49',
    destination: 'Tokyo (Direct 2h 15m)',
    departureMin: 12,
    platform: 'Shinkansen Track 12',
    frequency: 'Every 8 min',
    fare: '¥14,170'
  }
];

export const EMERGENCY_PHRASES = [
  {
    english: 'Where is the police station (Koban)?',
    japanese: '交番はどこですか？',
    romaji: 'Kouban wa doko desu ka?',
    situation: 'General Safety'
  },
  {
    english: 'Please call an ambulance!',
    japanese: '救急車を呼んでください！',
    romaji: 'Kyuukyuusha o yonde kudasai!',
    situation: 'Medical Emergency'
  },
  {
    english: 'I lost my passport / wallet.',
    japanese: 'パスポート・財布を落としました。',
    romaji: 'Pasupooto / saifu o otoshimashita.',
    situation: 'Lost Items'
  },
  {
    english: 'Can you speak English?',
    japanese: '英語が話せますか？',
    romaji: 'Eigo ga hanasemasu ka?',
    situation: 'Communication'
  },
  {
    english: 'Please take me to this address.',
    japanese: 'この住所までお願いします。',
    romaji: 'Kono juusho made onegai shimasu.',
    situation: 'Taxi Driver'
  }
];
