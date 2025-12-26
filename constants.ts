
import { PricingCityOption } from './types.ts';
import { CITY_DATA as MODULAR_CITY_DATA } from './data/cities/index.ts';

export interface ExtendedPricingCityOption extends PricingCityOption {
  lat?: number;
  lng?: number;
  path?: string;
}

export const CITIES_OPTIONS: ExtendedPricingCityOption[] = [
  { value: 'Delhi-NCR', label: 'Delhi & NCR', travelCost: 2500, thumbnail: 'https://placehold.co/100x100/ef4444/ffffff?text=DL', lat: 28.6139, lng: 77.2090, path: '/delhi-ncr' },
  { value: 'Hyderabad', label: 'Hyderabad', travelCost: 1500, thumbnail: 'https://placehold.co/100x100/6366f1/ffffff?text=HYD', lat: 17.3850, lng: 78.4867, path: '/hyderabad' },
  { value: 'Ballia', label: 'Ballia', travelCost: 1500, thumbnail: 'https://placehold.co/100x100/22c55e/ffffff?text=UP', lat: 25.7600, lng: 84.1400, path: '/ballia' },
  { value: 'Mumbai', label: 'Mumbai', travelCost: 3000, thumbnail: 'https://placehold.co/100x100/3b82f6/ffffff?text=MUM', lat: 19.0760, lng: 72.8777 },
  { value: 'Bengaluru', label: 'Bengaluru', travelCost: 2500, thumbnail: 'https://placehold.co/100x100/10b981/ffffff?text=BLR', lat: 12.9716, lng: 77.5946 },
  { value: 'Jaipur', label: 'Jaipur', travelCost: 3500, thumbnail: 'https://placehold.co/100x100/ec4899/ffffff?text=JPR', lat: 26.9124, lng: 75.7873 },
  { value: 'Udaipur', label: 'Udaipur', travelCost: 4000, thumbnail: 'https://placehold.co/100x100/a855f7/ffffff?text=UDR', lat: 24.5854, lng: 73.7125 },
];

export const CITY_DATA = MODULAR_CITY_DATA;
