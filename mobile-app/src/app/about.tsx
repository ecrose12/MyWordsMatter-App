// The "About My Words Matter" page (Menu → About → About My Words Matter).
// Words copied exactly from mywordsmatter.app/about; see src/content/about.ts.

import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ContentBlocks } from '@/components/content-blocks';
import { SiteHeader } from '@/components/site-header';
import { ABOUT_BLOCKS } from '@/content/about';
import { useTheme } from '@/context/theme';

export default function AboutScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <SiteHeader />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 48 }]}>
        <View style={styles.column}>
          <ContentBlocks blocks={ABOUT_BLOCKS} />
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
    paddingTop: 24,
    alignItems: 'center',
  },
  column: {
    width: '100%',
    maxWidth: 780, // same as the website, so lines don't get too long on tablets
  },
});
