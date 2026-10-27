// The header at the top of the screen, copied from mywordsmatter.app (phone size):
//   Row 1: My Words Matter
//   Row 2: Menu + light/dark switch on the left, Log In + Sign Up on the right
//   Row 3: Introduce Myself + the pencil (edit) button
// Working so far: the menu, the light/dark switch, Introduce Myself (speaks
// out loud), and the pencil (opens "Edit Your Introduction").
// The other buttons are in place, with the same labels as the website,
// and will be wired up in later steps.

import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IntroEditor } from '@/components/intro-editor';
import { NavMenu } from '@/components/nav-menu';
import { ThemeToggle } from '@/components/theme-toggle';
import { Fonts } from '@/constants/colors';
import { useTheme } from '@/context/theme';
import { speakIntroMessage } from '@/lib/intro-message';

// Makes small buttons easier to tap without changing how they look.
const EXTRA_TAP_AREA = { top: 4, bottom: 4, left: 4, right: 4 };

export function SiteHeader() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [editorOpen, setEditorOpen] = useState(false);

  return (
    <View
      style={[
        styles.header,
        {
          paddingTop: insets.top + 8,
          backgroundColor: colors.bg,
          borderBottomColor: colors.border,
        },
      ]}>
      {/* Row 1 */}
      <Text style={[styles.title, { color: colors.text }]} accessibilityRole="header">
        My Words Matter
      </Text>

      {/* Row 2 */}
      <View style={styles.row2}>
        <View style={styles.group}>
          <NavMenu />
          <ThemeToggle />
        </View>

        <View style={styles.group}>
          <Pressable
            accessibilityRole="link"
            hitSlop={EXTRA_TAP_AREA}
            style={[styles.pill, { backgroundColor: colors.bg, borderColor: colors.border }]}>
            <Text style={[styles.pillText, { color: colors.text }]}>Log In</Text>
          </Pressable>
          <Pressable
            accessibilityRole="link"
            hitSlop={EXTRA_TAP_AREA}
            style={[
              styles.pill,
              { backgroundColor: colors.buttonPrimaryBg, borderColor: colors.buttonPrimaryBg },
            ]}>
            <Text style={[styles.pillText, { color: colors.buttonPrimaryText }]}>Sign Up</Text>
          </Pressable>
        </View>
      </View>

      {/* Row 3 */}
      <View style={styles.row3}>
        <Pressable
          onPress={speakIntroMessage}
          accessibilityRole="button"
          accessibilityLabel="Introduce myself"
          style={[
            styles.introButton,
            { backgroundColor: colors.buttonPrimaryBg, borderColor: colors.border },
          ]}>
          <Text style={[styles.introText, { color: colors.buttonPrimaryText }]}>
            🔊 Introduce Myself
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setEditorOpen(true)}
          accessibilityRole="button"
          accessibilityLabel="Edit introduction message"
          style={[styles.roundButton, { backgroundColor: colors.bg, borderColor: colors.border }]}>
          <Text style={[styles.editIcon, { color: colors.text }]}>✎</Text>
        </Pressable>
      </View>

      <IntroEditor visible={editorOpen} onClose={() => setEditorOpen(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 8,
    paddingBottom: 10.4,
    borderBottomWidth: 3,
    gap: 12,
  },
  title: {
    fontFamily: Fonts.black,
    fontSize: 20.8,
    textAlign: 'center',
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pill: {
    minHeight: 40,
    paddingVertical: 6.4,
    paddingHorizontal: 8.8,
    borderWidth: 2,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillText: {
    fontFamily: Fonts.bold,
    fontSize: 12.48,
  },
  row3: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  introButton: {
    minHeight: 48,
    paddingVertical: 9.6,
    paddingHorizontal: 17.6,
    borderWidth: 3,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  introText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
  roundButton: {
    width: 48,
    height: 48,
    borderWidth: 3,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    fontSize: 19.2,
  },
});
