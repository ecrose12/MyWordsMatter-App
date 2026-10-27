// The "Introduce Myself" message, working the same way as mywordsmatter.app:
// - If a message has been saved on this phone, use it.
// - Otherwise, use the default message below (same wording as the website).
// Tapping "Introduce Myself" reads the message out loud with the phone's voice.

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';

// Same wording as the website.
export const DEFAULT_INTRO_MESSAGE =
  'Hi, I use this app to help me communicate. Thank you for your patience.';

// Same limit as the website's text box.
export const INTRO_MAX_LENGTH = 300;

// Same name the website uses to remember the message.
export const INTRO_STORAGE_KEY = 'pecs-intro-message';

export async function loadIntroMessage(): Promise<string> {
  try {
    const saved = await AsyncStorage.getItem(INTRO_STORAGE_KEY);
    return saved ? saved : DEFAULT_INTRO_MESSAGE;
  } catch {
    return DEFAULT_INTRO_MESSAGE;
  }
}

// Saves a new message on this phone. Extra spaces at the start and end are
// trimmed off, and an empty message brings back the default (like the website).
export async function saveIntroMessage(text: string): Promise<string> {
  const trimmed = text.trim();
  const message = trimmed.length > 0 ? trimmed : DEFAULT_INTRO_MESSAGE;
  await AsyncStorage.setItem(INTRO_STORAGE_KEY, message);
  return message;
}

// Stops anything already being spoken, then speaks the introduction from the start.
export async function speakIntroMessage() {
  const message = await loadIntroMessage();
  await Speech.stop();
  Speech.speak(message);
}
