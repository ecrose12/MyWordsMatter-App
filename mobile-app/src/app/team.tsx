// The "Meet the Creators" page (Menu → About → Meet the Creators).
// Words copied from mywordsmatter.app/team; see src/content/team.ts.

import { Image } from 'expo-image';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SiteHeader } from '@/components/site-header';
import { Fonts, ThemeColors } from '@/constants/colors';
import { TEAM, TEAM_PHOTOS, TeamBlock } from '@/content/team';
import { useTheme } from '@/context/theme';

export default function TeamScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <SiteHeader />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 48 }]}>
        <View style={styles.column}>
          <Text style={[styles.title, { color: colors.text }]} accessibilityRole="header">
            {TEAM.title}
          </Text>
          <Text style={[styles.intro, { color: colors.textSecondary }]}>{TEAM.intro}</Text>

          <View style={styles.cards}>
            {TEAM.cards.map((card, i) => (
              <View
                key={card.name}
                style={[styles.card, { backgroundColor: colors.bg, borderColor: colors.border }]}>
                <Image
                  source={TEAM_PHOTOS[i]}
                  contentFit="cover"
                  accessibilityLabel={card.photoAlt}
                  style={[styles.photo, { borderColor: colors.border }]}
                />
                <Text style={[styles.name, { color: colors.text }]} accessibilityRole="header">
                  {card.name}
                </Text>
                {card.blocks.map((block, j) => (
                  <CardBlock key={j} block={block} colors={colors} />
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function CardBlock({ block, colors }: { block: TeamBlock; colors: ThemeColors }) {
  const body = [styles.body, { color: colors.textSecondary }];

  switch (block.type) {
    case 'p':
      return <Text style={body}>{block.text}</Text>;
    case 'label':
      return <Text style={[styles.label, { color: colors.text }]}>{block.text}</Text>;
    case 'arrowList':
      return (
        <View style={styles.arrowList}>
          {block.items.map((item, i) => (
            <Text key={i} style={[styles.arrowItem, { color: colors.textSecondary }]}>
              {item}
            </Text>
          ))}
        </View>
      );
    case 'boldLead':
      return (
        <Text style={body}>
          <Text style={styles.bold}>{block.lead}</Text> {block.rest}
        </Text>
      );
    case 'link':
      // Opens in the phone's web browser.
      return (
        <Text style={body}>
          {block.label}{' '}
          <Text
            onPress={() => Linking.openURL(block.url)}
            accessibilityRole="link"
            style={[styles.bold, { color: colors.accentStrong }]}>
            {block.text}
          </Text>
        </Text>
      );
  }
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
    marginBottom: 32,
  },
  cards: {
    gap: 20,
  },
  card: {
    borderWidth: 2,
    borderRadius: 16,
    padding: 24,
  },
  photo: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    alignSelf: 'center',
    marginBottom: 16,
  },
  name: {
    fontFamily: Fonts.extraBold,
    fontSize: 18.4,
    lineHeight: 27.6,
    textAlign: 'center',
    marginBottom: 8,
  },
  body: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    lineHeight: 24.8,
    marginBottom: 12,
  },
  bold: {
    fontFamily: Fonts.bold,
  },
  label: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    lineHeight: 24.8,
    marginBottom: 6.4,
  },
  arrowList: {
    gap: 5.6,
    marginBottom: 12,
  },
  arrowItem: {
    fontFamily: Fonts.regular,
    fontSize: 15.2,
    lineHeight: 22.8,
  },
});
