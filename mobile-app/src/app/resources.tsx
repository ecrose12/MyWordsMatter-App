// The "Resource Links" page (Menu → Resource Links).
// Words copied from mywordsmatter.app/resources; see src/content/resources.ts.
// Tapping a resource name opens that website in the phone's browser.

import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SiteHeader } from '@/components/site-header';
import { Fonts } from '@/constants/colors';
import { RESOURCES } from '@/content/resources';
import { useTheme } from '@/context/theme';

export default function ResourcesScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <SiteHeader />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 48 }]}>
        <View style={styles.column}>
          <Text style={[styles.title, { color: colors.text }]} accessibilityRole="header">
            {RESOURCES.title}
          </Text>
          <Text style={[styles.intro, { color: colors.textSecondary }]}>{RESOURCES.intro}</Text>

          {RESOURCES.sections.map((section) => (
            <View key={section.heading} style={styles.section}>
              <Text style={[styles.heading, { color: colors.text }]} accessibilityRole="header">
                {section.heading}
              </Text>
              <View style={styles.list}>
                {section.items.map((item) => (
                  <View
                    key={item.url}
                    style={[styles.item, { backgroundColor: colors.bg, borderColor: colors.borderSubtle }]}>
                    <Pressable
                      onPress={() => Linking.openURL(item.url)}
                      accessibilityRole="link"
                      accessibilityHint="Opens in your browser"
                      hitSlop={{ top: 8, bottom: 8 }}>
                      <Text style={[styles.link, { color: colors.accentStrong }]}>{item.name}</Text>
                    </Pressable>
                    <Text style={[styles.description, { color: colors.textSecondary }]}>
                      {item.description}
                    </Text>
                  </View>
                ))}
              </View>
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
    marginBottom: 12,
  },
  intro: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  heading: {
    fontFamily: Fonts.extraBold,
    fontSize: 19.2,
    lineHeight: 28.8,
    marginBottom: 16,
  },
  list: {
    gap: 16,
  },
  item: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 20,
  },
  link: {
    fontFamily: Fonts.bold,
    fontSize: 17.6,
    lineHeight: 26.4,
    textDecorationLine: 'underline',
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
  },
});
