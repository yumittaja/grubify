import { Restaurant } from '../types';

export const ETA_UNAVAILABLE_LABEL = 'ETA unavailable';

/**
 * Returns true when both ETA min/max minutes are present on the restaurant.
 */
export const hasEta = (
  restaurant: Pick<Restaurant, 'etaMinMinutes' | 'etaMaxMinutes'>
): boolean =>
  restaurant.etaMinMinutes != null && restaurant.etaMaxMinutes != null;

/**
 * Formats a restaurant's ETA for display, falling back to "ETA unavailable".
 * @param prefix Optional prefix to prepend to the formatted range (e.g., "ETA ").
 */
export const formatEta = (
  restaurant: Pick<Restaurant, 'etaMinMinutes' | 'etaMaxMinutes'>,
  prefix: string = ''
): string =>
  hasEta(restaurant)
    ? `${prefix}${restaurant.etaMinMinutes}-${restaurant.etaMaxMinutes} min`
    : ETA_UNAVAILABLE_LABEL;
