// Choices from the Settings page, saved on this phone.
// Same saved names and options as mywordsmatter.app, so they behave the same way.

import AsyncStorage from '@react-native-async-storage/async-storage';

// ---- Text-to-Speech Language ----

export const TTS_LANGUAGES = [
  { code: 'en-US', label: 'English (US)' },
  { code: 'en-GB', label: 'English (UK)' },
  { code: 'es-ES', label: 'Spanish (Spain)' },
  { code: 'es-MX', label: 'Spanish (Mexico)' },
  { code: 'fr-FR', label: 'French' },
  { code: 'de-DE', label: 'German' },
] as const;

export type TtsLanguage = (typeof TTS_LANGUAGES)[number]['code'];

export const DEFAULT_TTS_LANGUAGE: TtsLanguage = 'en-US';
const TTS_LANGUAGE_KEY = 'pecs-tts-language';

export async function loadTtsLanguage(): Promise<TtsLanguage> {
  try {
    const saved = await AsyncStorage.getItem(TTS_LANGUAGE_KEY);
    const match = TTS_LANGUAGES.find((l) => l.code === saved);
    return match ? match.code : DEFAULT_TTS_LANGUAGE;
  } catch {
    return DEFAULT_TTS_LANGUAGE;
  }
}

export async function saveTtsLanguage(code: TtsLanguage) {
  await AsyncStorage.setItem(TTS_LANGUAGE_KEY, code);
}

// ---- PEC Card Search Style ----

export type SearchMode = 'type' | 'category';

export const DEFAULT_SEARCH_MODE: SearchMode = 'type';
const SEARCH_MODE_KEY = 'pecs-search-mode';

export async function loadSearchMode(): Promise<SearchMode> {
  try {
    const saved = await AsyncStorage.getItem(SEARCH_MODE_KEY);
    return saved === 'type' || saved === 'category' ? saved : DEFAULT_SEARCH_MODE;
  } catch {
    return DEFAULT_SEARCH_MODE;
  }
}

export async function saveSearchMode(mode: SearchMode) {
  await AsyncStorage.setItem(SEARCH_MODE_KEY, mode);
}
