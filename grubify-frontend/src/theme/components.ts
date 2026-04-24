import { alpha, Components, Theme } from '@mui/material/styles';

export const getComponentOverrides = (mode: 'light' | 'dark'): Components<Theme> => {
  const darkMode = mode === 'dark';

  return {
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: darkMode ? '0 14px 30px rgba(2, 6, 23, 0.35)' : '0 10px 26px rgba(2, 6, 23, 0.08)',
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: `1px solid ${alpha(theme.palette.divider, darkMode ? 0.65 : 1)}`,
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: 12,
        },
        containedPrimary: {
          boxShadow: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundImage: 'none',
          backgroundColor: alpha(theme.palette.background.paper, darkMode ? 0.9 : 0.95),
          backdropFilter: 'blur(8px)',
          borderBottom: `1px solid ${theme.palette.divider}`,
          color: theme.palette.text.primary,
        }),
      },
    },
  };
};
