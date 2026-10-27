// Home screen: the header, "Choose a Category", and the nine category tiles.
// All wording here is copied exactly from mywordsmatter.app.
// The header stays at the top; the tiles scroll underneath it.
// The category tiles are not tappable yet.

import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CategoryIcon, CategoryIconName } from '@/components/category-icons';
import { SiteHeader } from '@/components/site-header';
import { Fonts } from '@/constants/colors';
import { useTheme } from '@/context/theme';

const CATEGORIES: { label: string; icon: CategoryIconName }[] = [
  { label: 'Single PEC Selector', icon: 'single-pec-selector' },
  { label: 'Sentence Creator', icon: 'sentence-creator' },
  { label: 'In An Emergency', icon: 'emergency-cards' },
  { label: "Today's Schedule", icon: 'todays-schedule' },
  { label: 'Daily Task Checklist', icon: 'daily-schedule' },
  { label: 'Detailed Daily Chore List', icon: 'chore-list' },
  { label: 'Weekly Chore List', icon: 'weekly-chore-list' },
  { label: 'First / Then', icon: 'first-then' },
  { label: 'Consequence / Reward', icon: 'consequence-reward' },
];

const GAP = 16; // space between tiles, same as the website
const SIDE_PADDING = 24;
const MAX_GRID_WIDTH = 560; // keeps tiles from getting huge on tablets

export default function HomeScreen() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // Two tiles per row, sized to fit the screen.
  const gridWidth = Math.min(width - SIDE_PADDING * 2, MAX_GRID_WIDTH);
  const tileWidth = (gridWidth - GAP) / 2;

  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <SiteHeader />

      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 40 }]}>
        <Text style={[styles.heading, { color: colors.text }]} accessibilityRole="header">
          Choose a Category
        </Text>

        <View style={[styles.grid, { width: gridWidth }]}>
          {CATEGORIES.map((category) => (
            <View
              key={category.icon}
              accessible
              accessibilityLabel={category.label}
              style={[styles.tile, { width: tileWidth, borderColor: colors.border }]}>
              <CategoryIcon
                name={category.icon}
                color={category.icon === 'emergency-cards' ? colors.error : colors.text}
              />
              <Text style={[styles.tileLabel, { color: colors.text }]}>{category.label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 32,
  },
  heading: {
    fontFamily: Fonts.extraBold,
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 32,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
  },
  tile: {
    minHeight: 120,
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderWidth: 3,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  tileLabel: {
    fontFamily: Fonts.bold,
    fontSize: 17.6,
    lineHeight: 23,
    textAlign: 'center',
  },
});
