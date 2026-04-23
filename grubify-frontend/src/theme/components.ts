import type { Components, Theme } from '@mui/material/styles';
import { radius, elevation } from './tokens';

// MUI component overrides for the Snack4U brand.
// Accepts the active mode so we can tune shadows and surface treatments per mode.
export function getComponents(mode: 'light' | 'dark'): Components<Theme> {
  const shadows = mode === 'dark' ? elevation.dark : elevation.light;

  return {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: radius.md,
          boxShadow: shadows.low,
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: radius.md,
          textTransform: 'none',
          fontWeight: 600,
          paddingInline: 18,
        },
        containedPrimary: {
          boxShadow: shadows.low,
          '&:hover': { boxShadow: shadows.medium },
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: 'default',
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: shadows.low,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: radius.md,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: radius.pill,
          fontWeight: 500,
        },
      },
    },
  };
}
