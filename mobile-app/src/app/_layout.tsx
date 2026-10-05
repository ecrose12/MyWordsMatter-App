// The frame around every screen: loads the Lexend font, then shows the app.

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

// Keep the splash screen up until the font is ready, so text never "jumps".
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Lexend_400Regular,
    Lexend_700Bold,
    Lexend_800ExtraBold,
    Lexend_900Black,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
