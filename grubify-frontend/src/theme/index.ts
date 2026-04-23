import { createTheme, type Theme } from '@mui/material/styles';
import {
  goldScale,
  tealScale,
  slateScale,
  semantic,
  fontFamily,
  radius,
} from './tokens';
import { getComponents } from './components';

// Builds the Snack4U MUI theme for the requested mode.
// Gold = primary, Teal = secondary, slate scale drives surfaces in dark mode.
export function getTheme(mode: 'light' | 'dark'): Theme {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: goldScale[500],
        light: goldScale[400],
        dark: goldScale[700],
        contrastText: slateScale[900],
      },
      secondary: {
        main: tealScale[500],
        light: tealScale[400],
        dark: tealScale[700],
        contrastText: '#FFFFFF',
      },
      success: { main: semantic.success },
      warning: { main: semantic.warning },
      info: { main: semantic.info },
      error: { main: semantic.error },
      background: isDark
        ? {
            default: slateScale[900],
            paper: slateScale[800],
          }
        : {
            default: slateScale[50],
            paper: '#FFFFFF',
          },
      text: isDark
        ? {
            primary: slateScale[50],
            secondary: slateScale[300],
          }
        : {
            primary: slateScale[900],
            secondary: slateScale[600],
          },
      divider: isDark ? slateScale[700] : slateScale[200],
    },
    typography: {
      fontFamily,
      h1: { fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.02em' },
      h2: { fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em' },
      h3: { fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.01em' },
      h4: { fontSize: '1.5rem', fontWeight: 600 },
      h5: { fontSize: '1.25rem', fontWeight: 600 },
      h6: { fontSize: '1.05rem', fontWeight: 600 },
      button: { fontWeight: 600, textTransform: 'none' },
    },
    shape: {
      borderRadius: radius.md,
    },
    components: getComponents(mode),
  });
}

export { goldScale, tealScale, slateScale, semantic } from './tokens';
