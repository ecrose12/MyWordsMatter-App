// The "Coming Soon" page (Menu → About → Coming Soon).
// Words copied exactly from mywordsmatter.app/coming-soon; see src/content/coming-soon.ts.

import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SiteHeader } from '@/components/site-header';
import { Fonts } from '@/constants/colors';
import { COMING_SOON } from '@/content/coming-soon';
import { useTheme } from '@/context/theme';

export default function ComingSoonScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <SiteHeader />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 48 }]}>
        <View style={styles.column}>
          <Text style={[styles.title, { color: colors.text }]} accessibilityRole="header">
            {COMING_SOON.title}
          </Text>
          <Text style={[styles.intro, { color: colors.textSecondary }]}>{COMING_SOON.intro}</Text>

          <View style={styles.list}>
            {COMING_SOON.items.map((item) => (
              <View
                key={item.name}
                style={[styles.item, { backgroundColor: colors.bg, borderColor: colors.borderSubtle }]}>
                <Text style={[styles.itemText, { color: colors.text }]}>
                  <Text style={styles.itemName}>{item.name}</Text> {item.description}
                </Text>
              </View>
            ))}
          </View>
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
    paddingHorizontal: 24,
    paddingTop: 32,
    alignItems: 'center',
  },
  column: {
    width: '100%',
    maxWidth: 780,
  },
  title: {
    fontFamily: Fonts.extraBold,
    fontSize: 28,
    lineHeight: 42,
    textAlign: 'center',
    marginBottom: 8,
  },
  intro: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  list: {
    gap: 12,
  },
  item: {
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  itemText: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    lineHeight: 24,
  },
  itemName: {
    fontFamily: Fonts.black,
  },
});
