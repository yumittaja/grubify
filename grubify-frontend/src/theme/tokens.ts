// Snack4U brand design tokens.
// Premium dark-first palette with gold + teal accents on deep slate surfaces.

export type ColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export const goldScale: ColorScale = {
  50: '#FBF6E3',
  100: '#F5EAB6',
  200: '#EFDC85',
  300: '#E8CE54',
  400: '#DEC042',
  500: '#D4AF37', // Snack4U signature gold
  600: '#B8962C',
  700: '#917322',
  800: '#6B5419',
  900: '#473810',
};

export const tealScale: ColorScale = {
  50: '#E6FAF5',
  100: '#B8F1E2',
  200: '#86E7CD',
  300: '#52DCB7',
  400: '#2DD0A6',
  500: '#14B8A6', // Snack4U signature teal
  600: '#0F9488',
  700: '#0B746B',
  800: '#08544D',
  900: '#053632',
};

// Neutral slate scale used for surfaces, borders, and text in dark mode.
export const slateScale: ColorScale = {
  50: '#F8FAFC',
  100: '#F1F5F9',
  200: '#E2E8F0',
  300: '#CBD5E1',
  400: '#94A3B8',
  500: '#64748B',
  600: '#475569',
  700: '#334155',
  800: '#1E293B',
  900: '#0F172A', // Deep slate surface for dark mode
};

export type SemanticPalette = {
  success: string;
  warning: string;
  info: string;
  error: string;
};

export const semantic: SemanticPalette = {
  success: '#22C55E',
  warning: '#F59E0B',
  info: '#3B82F6',
  error: '#EF4444',
};

// Typography stack — Inter delivered via <link> in index.html.
export const fontFamily =
  '"Inter", "Segoe UI", "Helvetica Neue", "Arial", system-ui, -apple-system, sans-serif';

export const radius = {
  sm: 6,
  md: 12,
  lg: 18,
  pill: 9999,
} as const;

// Spacing helpers (MUI base spacing is 8px; these are semantic shortcuts).
export const spacing = {
  xs: 0.5,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 5,
} as const;

// Elevation hints — rgba shadows tuned for dark mode + light mode parity.
export const elevation = {
  light: {
    low: '0 1px 2px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.08)',
    medium: '0 4px 12px rgba(15, 23, 42, 0.08), 0 2px 4px rgba(15, 23, 42, 0.06)',
    high: '0 12px 32px rgba(15, 23, 42, 0.12), 0 4px 8px rgba(15, 23, 42, 0.08)',
  },
  dark: {
    low: '0 1px 2px rgba(0, 0, 0, 0.45), 0 1px 3px rgba(0, 0, 0, 0.35)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.55), 0 2px 4px rgba(0, 0, 0, 0.4)',
    high: '0 12px 32px rgba(0, 0, 0, 0.65), 0 4px 8px rgba(0, 0, 0, 0.45)',
  },
} as const;

export const brand = {
  gold: goldScale,
  teal: tealScale,
  slate: slateScale,
  semantic,
} as const;
