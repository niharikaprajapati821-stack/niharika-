export type NavScreen = 'arrival-feed' | 'transit-hub' | 'safety-and-scams' | 'curated-spots' | 'local-etiquette';

export type SpotTier = 'all' | 'budget' | 'iconic' | 'gem' | 'fine';

export interface Spot {
  id: string;
  name: string;
  tier: 'budget' | 'iconic' | 'gem' | 'fine';
  tierLabel: string;
  category: string;
  distance: string;
  status: string;
  statusOpen: boolean;
  priceAvg: string;
  quote: string;
  description: string;
  address: string;
  japaneseAddress: string;
  taxiNote: string;
  imageUrl: string;
  imageAlt: string;
  locationArea: string;
  hours: string;
  tips: string[];
  bookmarked?: boolean;
}

export interface ScamAdvisory {
  id: string;
  patternNumber: string;
  title: string;
  category: string;
  frequency: string;
  description: string;
  countermeasureLabel: string;
  countermeasure: string;
  icon: string;
  verifiedTime: string;
  location: string;
}

export interface EtiquetteItem {
  id: string;
  category: string;
  title: string;
  description: string;
  actionTip: string;
  icon: string;
  bgClass: string;
  iconColorClass: string;
  detailedRules?: string[];
}

export interface TransitLine {
  id: string;
  name: string;
  lineCode: string;
  color: string;
  destination: string;
  departureMin: number;
  platform: string;
  frequency: string;
  fare: string;
}

export interface LocationContext {
  city: string;
  ward: string;
  arrivedAgo: string;
  weather: {
    temp: number;
    condition: string;
    icon: string;
  };
  timeJST: string;
  areaLabel: string;
  baseSubwayFare: string;
  taxiFlagDrop: string;
}
