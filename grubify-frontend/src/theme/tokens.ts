export type ColorMode = 'light' | 'dark';

export const tokens = {
  radius: {
    sm: 10,
    md: 14,
    lg: 22,
  },
  shadow: {
    soft: '0 10px 30px rgba(15, 23, 42, 0.12)',
    lift: '0 18px 40px rgba(15, 23, 42, 0.2)',
  },
  typography: {
    heading: '"Fraunces", "Times New Roman", serif',
    body: '"Space Grotesk", "Segoe UI", sans-serif',
  },
  light: {
    primary: '#B8860B',
    secondary: '#0F766E',
    background: '#F6F7FB',
    paper: '#FFFFFF',
    textPrimary: '#111827',
    textSecondary: '#4B5563',
    divider: 'rgba(17, 24, 39, 0.12)',
    heroStart: '#B8860B',
    heroEnd: '#0F766E',
  },
  dark: {
    primary: '#D4AF37',
    secondary: '#2DD4BF',
    background: '#0F172A',
    paper: '#162038',
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    divider: 'rgba(148, 163, 184, 0.2)',
    heroStart: '#D4AF37',
    heroEnd: '#0EA5A5',
  },
} as const;
