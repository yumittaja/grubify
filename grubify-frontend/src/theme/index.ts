import { createTheme, PaletteMode } from '@mui/material/styles';
import { getComponentOverrides } from './components';
import { tokens } from './tokens';

export const getTheme = (mode: PaletteMode) => {
  const colorSet = mode === 'dark' ? tokens.dark : tokens.light;

  return createTheme({
    palette: {
      mode,
      primary: {
        main: colorSet.primary,
      },
      secondary: {
        main: colorSet.secondary,
      },
      background: {
        default: colorSet.background,
        paper: colorSet.paper,
      },
      text: {
        primary: colorSet.textPrimary,
        secondary: colorSet.textSecondary,
      },
      success: {
        main: '#22C55E',
      },
      warning: {
        main: '#F59E0B',
      },
      info: {
        main: '#38BDF8',
      },
      error: {
        main: '#F87171',
      },
      divider: colorSet.divider,
    },
    shape: {
      borderRadius: tokens.radius.md,
    },
    typography: {
      fontFamily: tokens.typography.body,
      h1: {
        fontFamily: tokens.typography.heading,
        fontWeight: 700,
      },
      h2: {
        fontFamily: tokens.typography.heading,
        fontWeight: 700,
      },
      h3: {
        fontFamily: tokens.typography.heading,
        fontWeight: 700,
      },
      h4: {
        fontFamily: tokens.typography.heading,
        fontWeight: 700,
      },
      h5: {
        fontFamily: tokens.typography.heading,
        fontWeight: 700,
      },
      h6: {
        fontFamily: tokens.typography.heading,
        fontWeight: 700,
      },
      button: {
        fontFamily: tokens.typography.body,
      },
    },
    components: getComponentOverrides(mode),
  });
};
