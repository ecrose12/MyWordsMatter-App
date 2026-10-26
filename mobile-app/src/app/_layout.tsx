// The frame around every screen: loads the Lexend font and the saved
// light/dark choice, then shows the app.

import {
  Lexend_400Regular,
  Lexend_700Bold,
  Lexend_800ExtraBold,
  Lexend_900Black,
  useFonts,
} from '@expo-google-fonts/lexend';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { ThemeProvider, useTheme } from '@/context/theme';

// Keep the splash screen up until everything is ready, so nothing "jumps".
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}

function AppShell() {
  const { scheme, colors, ready: themeReady } = useTheme();
  const [fontsLoaded, fontError] = useFonts({
    Lexend_400Regular,
    Lexend_700Bold,
    Lexend_800ExtraBold,
    Lexend_900Black,
  });
  const fontsReady = fontsLoaded || !!fontError;

  useEffect(() => {
    if (fontsReady && themeReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsReady, themeReady]);

  if (!fontsReady || !themeReady) {
    return null;
  }

  return (
    <>
      {/* Phone's clock and battery icons: light on dark mode, dark on light mode */}
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}
      />
    </>
  );
}
