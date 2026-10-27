// The lightbulb button that switches between light and dark mode.
// Look, size and labels copied from mywordsmatter.app (phone size).

import { Pressable, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '@/context/theme';

export function ThemeToggle() {
  const { scheme, colors, toggleTheme } = useTheme();
  const isDark = scheme === 'dark';
  const bulbColor = isDark ? '#fff' : '#000';

  return (
    <Pressable
      onPress={toggleTheme}
      accessibilityRole="button"
      accessibilityLabel={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={[styles.button, { backgroundColor: colors.bg, borderColor: colors.border }]}>
      <Svg width={20} height={20} viewBox="0 0 24 24" accessible={false}>
        <Path
          fill={bulbColor}
          d="M12 2a7 7 0 0 0-4 12.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26A7 7 0 0 0 12 2zm-2 17h4v1a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1z"
        />
      </Svg>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    borderWidth: 3,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
