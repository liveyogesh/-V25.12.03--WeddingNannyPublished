
import { homeData } from './home.ts';
import { balliaData } from './ballia.ts';
import { delhiNcrData } from './delhi-ncr.ts';
import { hyderabadData } from './hyderabad.ts';
import { CityData } from '../../types.ts';

export const CITY_DATA: Record<string, CityData> = {
  home: homeData,
  ballia: balliaData,
  'delhi-ncr': delhiNcrData,
  hyderabad: hyderabadData
};
