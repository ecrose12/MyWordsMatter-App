// Home screen: "Choose a Category" and the nine category tiles.
// All wording here is copied exactly from mywordsmatter.app.
// Step 3a: the tiles are not tappable yet.

import { ScrollView, StyleSheet, Text, useColorScheme, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CategoryIcon, CategoryIconName } from '@/components/category-icons';
import { Colors, Fonts } from '@/constants/colors';

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
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[scheme];
  const { width } = useWindowDimensions();

  // Two tiles per row, sized to fit the screen.
  const gridWidth = Math.min(width - SIDE_PADDING * 2, MAX_GRID_WIDTH);
  const tileWidth = (gridWidth - GAP) / 2;

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.bg }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.appTitle, { color: colors.text }]} accessibilityRole="header">
          My Words Matter
        </Text>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 16,
    paddingBottom: 40,
  },
  appTitle: {
    fontFamily: Fonts.black,
    fontSize: 22,
    marginBottom: 24,
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
