import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type ColorMode = 'light' | 'dark';

export interface ColorModeContextValue {
  mode: ColorMode;
  toggleColorMode: () => void;
  setColorMode: (mode: ColorMode) => void;
}

const STORAGE_KEY = 'snack4u.colorMode';
const DEFAULT_MODE: ColorMode = 'dark';

const ColorModeContext = createContext<ColorModeContextValue | undefined>(
  undefined,
);

function readStoredMode(): ColorMode {
  if (typeof window === 'undefined') return DEFAULT_MODE;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // localStorage may be unavailable (private mode, SSR-like envs); fall back.
  }
  return DEFAULT_MODE;
}

export interface ColorModeProviderProps {
  children: React.ReactNode;
  /** Override the initial mode (mainly for tests). */
  initialMode?: ColorMode;
}

export const ColorModeProvider: React.FC<ColorModeProviderProps> = ({
  children,
  initialMode,
}) => {
  const [mode, setMode] = useState<ColorMode>(
    () => initialMode ?? readStoredMode(),
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // Ignore storage failures — non-critical for runtime behavior.
    }
  }, [mode]);

  const toggleColorMode = useCallback(() => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const setColorMode = useCallback((next: ColorMode) => {
    setMode(next);
  }, []);

  const value = useMemo<ColorModeContextValue>(
    () => ({ mode, toggleColorMode, setColorMode }),
    [mode, toggleColorMode, setColorMode],
  );

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  );
};

export function useColorMode(): ColorModeContextValue {
  const ctx = useContext(ColorModeContext);
  if (!ctx) {
    throw new Error('useColorMode must be used within a ColorModeProvider');
  }
  return ctx;
}
