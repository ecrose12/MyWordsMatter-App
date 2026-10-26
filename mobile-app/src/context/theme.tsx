// Light/dark mode for the whole app, working the same way as mywordsmatter.app:
// 1. If someone has picked light or dark before, use that.
// 2. Otherwise, match the phone's own light/dark setting.
// 3. Remember the current choice, so it stays the same next time the app opens.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import { Colors, ThemeColors } from '@/constants/colors';

type Scheme = 'light' | 'dark';

// Same name the website uses to remember the choice.
const STORAGE_KEY = 'pecs-theme';

type ThemeContextValue = {
  scheme: Scheme;
  colors: ThemeColors;
  toggleTheme: () => void;
  ready: boolean; // false until the saved choice has been read
};

const ThemeContext = createContext<ThemeContextValue>({
  scheme: 'light',
  colors: Colors.light,
  toggleTheme: () => {},
  ready: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const phoneScheme: Scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const [scheme, setScheme] = useState<Scheme>(phoneScheme);
  const [ready, setReady] = useState(false);

  // When the app opens: look for a saved choice.
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (saved === 'light' || saved === 'dark') {
          setScheme(saved);
        } else {
          setScheme(phoneScheme);
        }
      })
      .catch(() => setScheme(phoneScheme))
      .finally(() => setReady(true));
    // Only run once, when the app opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Whenever the mode changes, remember it.
  useEffect(() => {
    if (ready) {
      AsyncStorage.setItem(STORAGE_KEY, scheme).catch(() => {});
    }
  }, [scheme, ready]);

  const toggleTheme = () => setScheme((current) => (current === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ scheme, colors: Colors[scheme], toggleTheme, ready }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
