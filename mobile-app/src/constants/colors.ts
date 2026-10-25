// Colors copied from mywordsmatter.app, so the phone app matches the website.
// "light" and "dark" follow the phone's own light/dark setting.

export const Colors = {
  light: {
    text: '#000',
    textSecondary: '#444',
    textMuted: '#595959',
    textOnAccent: '#0b3d78',
    error: '#a4231c',
    bg: '#fff',
    bgSubtle: '#89ce00',
    bgAccent: '#dbeafe',
    border: '#000',
    borderSubtle: '#999',
    focus: '#1a5fb4',
    accentStrong: '#0b5fb0',
    buttonPrimaryBg: '#0b5fb0',
    buttonPrimaryText: '#fff',
  },
  dark: {
    text: '#f5f5f5',
    textSecondary: '#cfcfcf',
    textMuted: '#a8a8a8',
    textOnAccent: '#cfe4ff',
    error: '#ff8a80',
    bg: '#121212',
    bgSubtle: '#1e1e1e',
    bgAccent: '#163a5c',
    border: '#f5f5f5',
    borderSubtle: '#6b6b6b',
    focus: '#7ab8ff',
    accentStrong: '#7ab8ff',
    buttonPrimaryBg: '#7ab8ff',
    buttonPrimaryText: '#0a2540',
  },
};

export type ThemeColors = typeof Colors.light;

// Lexend, the same font as the website. Each weight is its own font name.
export const Fonts = {
  regular: 'Lexend_400Regular',
  bold: 'Lexend_700Bold',
  extraBold: 'Lexend_800ExtraBold',
  black: 'Lexend_900Black',
};
