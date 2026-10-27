// The Settings page (Menu → Settings). Wording copied from mywordsmatter.app/settings.
//
// Working so far:
//   Appearance — switches light/dark mode (same as the lightbulb button)
//   Text-to-Speech Language — saved on this phone; used by Introduce Myself
//   PEC Card Search Style — saved on this phone; will be used by the picture cards
// In place but not working yet (they need accounts):
//   Account — the "Log in" link
//   Device Pairing — the "Enter a Pairing Code" button
//
// App-only change: the blue buttons use dark navy text in dark mode, like the
// app's other blue buttons, because the website's white-on-light-blue is hard to read.

import { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SiteHeader } from '@/components/site-header';
import { Fonts, ThemeColors } from '@/constants/colors';
import { useTheme } from '@/context/theme';
import {
  DEFAULT_SEARCH_MODE,
  DEFAULT_TTS_LANGUAGE,
  loadSearchMode,
  loadTtsLanguage,
  saveSearchMode,
  saveTtsLanguage,
  SearchMode,
  TTS_LANGUAGES,
  TtsLanguage,
} from '@/lib/settings';

const SEARCH_OPTIONS: { value: SearchMode; label: string }[] = [
  { value: 'type', label: 'Type to Search' },
  { value: 'category', label: 'Browse by Category' },
];

export default function SettingsScreen() {
  const { colors, scheme, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const [language, setLanguage] = useState<TtsLanguage>(DEFAULT_TTS_LANGUAGE);
  const [searchMode, setSearchMode] = useState<SearchMode>(DEFAULT_SEARCH_MODE);
  const [pickerOpen, setPickerOpen] = useState(false);

  // Show the choices saved on this phone.
  useEffect(() => {
    loadTtsLanguage().then(setLanguage);
    loadSearchMode().then(setSearchMode);
  }, []);

  function chooseLanguage(code: TtsLanguage) {
    setLanguage(code);
    saveTtsLanguage(code);
    setPickerOpen(false);
  }

  function chooseSearchMode(mode: SearchMode) {
    setSearchMode(mode);
    saveSearchMode(mode);
  }

  const languageLabel = TTS_LANGUAGES.find((l) => l.code === language)?.label ?? '';
  const sectionStyle = [styles.section, { backgroundColor: colors.bg, borderColor: colors.border }];
  const h2 = [styles.h2, { color: colors.text }];
  const p = [styles.p, { color: colors.textSecondary }];

  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <SiteHeader />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 48 }]}>
        <View style={styles.column}>
          <Text style={[styles.title, { color: colors.text }]} accessibilityRole="header">
            Settings
          </Text>

          {/* Appearance */}
          <View style={sectionStyle}>
            <Text style={h2} accessibilityRole="header">
              Appearance
            </Text>
            <Text style={p}>Choose how the app looks.</Text>
            <BlueButton
              label={scheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              onPress={toggleTheme}
              colors={colors}
            />
          </View>

          {/* Text-to-Speech Language */}
          <View style={sectionStyle}>
            <Text style={h2} accessibilityRole="header">
              Text-to-Speech Language
            </Text>
            <Text style={[styles.label, { color: colors.text }]}>Choose the voice language</Text>
            <Pressable
              onPress={() => setPickerOpen(true)}
              accessibilityRole="button"
              accessibilityLabel={`Choose the voice language: ${languageLabel}`}
              style={[styles.select, { backgroundColor: colors.bg, borderColor: colors.borderSubtle }]}>
              <Text style={[styles.selectText, { color: colors.text }]}>{languageLabel}</Text>
              <Text style={[styles.selectCaret, { color: colors.text }]}>▼</Text>
            </Pressable>
          </View>

          {/* PEC Card Search Style */}
          <View style={sectionStyle}>
            <Text style={h2} accessibilityRole="header">
              PEC Card Search Style
            </Text>
            <Text style={p}>Choose how you&apos;d like to find picture cards when selecting one.</Text>
            <View style={styles.radioGroup} accessibilityRole="radiogroup">
              {SEARCH_OPTIONS.map((option) => {
                const selected = searchMode === option.value;
                return (
                  <Pressable
                    key={option.value}
                    onPress={() => chooseSearchMode(option.value)}
                    accessibilityRole="radio"
                    aria-checked={selected}
                    hitSlop={{ top: 10, bottom: 10 }}
                    style={styles.radioOption}>
                    <View style={[styles.radioCircle, { borderColor: colors.accentStrong }]}>
                      {selected && (
                        <View style={[styles.radioDot, { backgroundColor: colors.accentStrong }]} />
                      )}
                    </View>
                    <Text style={[styles.radioLabel, { color: colors.text }]}>{option.label}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Account (logging in comes in a later step) */}
          <View style={sectionStyle}>
            <Text style={h2} accessibilityRole="header">
              Account
            </Text>
            <Text style={p}>
              Not signed in.{' '}
              <Text accessibilityRole="link" style={[styles.link, { color: colors.accentStrong }]}>
                Log in
              </Text>{' '}
              to make changes here.
            </Text>
          </View>

          {/* Device Pairing (pairing comes in a later step) */}
          <View style={sectionStyle}>
            <Text style={h2} accessibilityRole="header">
              Device Pairing
            </Text>
            <Text style={[styles.status, { color: colors.text }]}>
              This device isn&apos;t paired to a family yet.
            </Text>
            <BlueButton label="Enter a Pairing Code" onPress={() => {}} colors={colors} />
          </View>
        </View>
      </ScrollView>

      {/* The list of voice languages */}
      <Modal visible={pickerOpen} transparent animationType="fade" onRequestClose={() => setPickerOpen(false)}>
        <View style={styles.overlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setPickerOpen(false)}
            accessibilityRole="button"
            accessibilityLabel="Close without changing"
          />
          <View
            style={[styles.picker, { backgroundColor: colors.bg, borderColor: colors.border }]}
            accessibilityViewIsModal>
            <Text style={[styles.label, styles.pickerTitle, { color: colors.text }]} accessibilityRole="header">
              Choose the voice language
            </Text>
            {TTS_LANGUAGES.map((l) => {
              const selected = l.code === language;
              return (
                <Pressable
                  key={l.code}
                  onPress={() => chooseLanguage(l.code)}
                  accessibilityRole="radio"
                  aria-checked={selected}
                  style={[styles.pickerOption, selected && { backgroundColor: colors.bgAccent }]}>
                  <Text style={[styles.pickerOptionText, { color: colors.text }]}>{l.label}</Text>
                  {selected && <Text style={[styles.pickerCheck, { color: colors.accentStrong }]}>✓</Text>}
                </Pressable>
              );
            })}
          </View>
        </View>
      </Modal>
    </View>
  );
}

function BlueButton({
  label,
  onPress,
  colors,
}: {
  label: string;
  onPress: () => void;
  colors: ThemeColors;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={[styles.button, { backgroundColor: colors.buttonPrimaryBg, borderColor: colors.buttonPrimaryBg }]}>
      <Text style={[styles.buttonText, { color: colors.buttonPrimaryText }]}>{label}</Text>
    </Pressable>
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
    marginBottom: 32,
  },
  section: {
    borderWidth: 3,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  h2: {
    fontFamily: Fonts.extraBold,
    fontSize: 20,
    lineHeight: 30,
    marginBottom: 16,
  },
  p: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  label: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  status: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  link: {
    fontFamily: Fonts.bold,
  },
  button: {
    alignSelf: 'flex-start',
    minHeight: 52,
    paddingVertical: 9.6,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    lineHeight: 24,
  },
  select: {
    minHeight: 48,
    paddingVertical: 9.6,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: {
    fontFamily: Fonts.regular,
    fontSize: 16.8,
  },
  selectCaret: {
    fontSize: 12,
  },
  radioGroup: {
    gap: 16,
    marginTop: 8,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9.6,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  radioLabel: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    lineHeight: 24,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    maxWidth: 400,
    borderWidth: 2,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  pickerTitle: {
    paddingHorizontal: 12,
  },
  pickerOption: {
    minHeight: 48,
    paddingHorizontal: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerOptionText: {
    fontFamily: Fonts.medium,
    fontSize: 16.8,
  },
  pickerCheck: {
    fontFamily: Fonts.bold,
    fontSize: 18,
  },
});
