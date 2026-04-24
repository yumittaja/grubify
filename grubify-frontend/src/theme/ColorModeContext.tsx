import React from 'react';
import { PaletteMode } from '@mui/material';

export const COLOR_MODE_STORAGE_KEY = 'snack4u-color-mode';

export type ColorModeContextValue = {
  mode: PaletteMode;
  toggleColorMode: () => void;
};

export const ColorModeContext = React.createContext<ColorModeContextValue>({
  mode: 'dark',
  toggleColorMode: () => {},
});
