// The "Edit Your Introduction" box that opens from the pencil button.
// Wording, look and behavior copied from mywordsmatter.app:
// - Opens filled in with the current message.
// - Save keeps it on this phone; an empty box brings back the default message.
// - Cancel, or tapping the dimmed area outside the box, closes without saving.

import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Fonts } from '@/constants/colors';
import { useTheme } from '@/context/theme';
import { INTRO_MAX_LENGTH, loadIntroMessage, saveIntroMessage } from '@/lib/intro-message';

const QUESTION = 'What should be spoken when you tap "Introduce Myself"?';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export function IntroEditor({ visible, onClose }: Props) {
  const { colors } = useTheme();
  const [draft, setDraft] = useState('');
  const [saving, setSaving] = useState(false);

  // Each time the box opens, fill it in with the current message.
  useEffect(() => {
    if (visible) {
      loadIntroMessage().then(setDraft);
    }
  }, [visible]);

  async function handleSave() {
    setSaving(true);
    try {
      await saveIntroMessage(draft);
    } finally {
      setSaving(false);
      onClose();
    }
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      {/* Slides the box up when the phone's keyboard opens */}
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* The dimmed area: tapping it closes the box */}
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close without saving"
        />

        <View
          style={[styles.dialog, { backgroundColor: colors.bg }]}
          accessibilityViewIsModal
          accessibilityLabel="Edit introduction message">
          <Text style={[styles.title, { color: colors.text }]} accessibilityRole="header">
            Edit Your Introduction
          </Text>

          <Text style={[styles.question, { color: colors.text }]}>{QUESTION}</Text>

          <TextInput
            value={draft}
            onChangeText={setDraft}
            multiline
            maxLength={INTRO_MAX_LENGTH}
            autoFocus
            accessibilityLabel={QUESTION}
            style={[
              styles.input,
              { color: colors.text, backgroundColor: colors.bg, borderColor: colors.borderSubtle },
            ]}
          />

          <Text style={[styles.notice, { color: colors.textSecondary }]}>
            This device isn&apos;t linked to an account, so this will only be saved here.
          </Text>

          <View style={styles.actions}>
            <Pressable
              onPress={onClose}
              accessibilityRole="button"
              style={[styles.actionButton, { backgroundColor: colors.bg, borderColor: colors.borderSubtle }]}>
              <Text style={[styles.actionText, { color: colors.text }]}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={handleSave}
              disabled={saving}
              accessibilityRole="button"
              style={[
                styles.actionButton,
                { backgroundColor: colors.buttonPrimaryBg, borderColor: colors.buttonPrimaryBg },
              ]}>
              <Text style={[styles.actionText, { color: colors.buttonPrimaryText }]}>Save</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialog: {
    width: '100%',
    maxWidth: 480,
    borderRadius: 16,
    padding: 28,
  },
  title: {
    fontFamily: Fonts.regular,
    fontSize: 22.4,
    lineHeight: 33.6,
    marginBottom: 16,
  },
  question: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  input: {
    fontFamily: Fonts.regular,
    fontSize: 17.6,
    lineHeight: 26.4,
    minHeight: 134,
    padding: 12,
    borderWidth: 2,
    borderRadius: 10,
    textAlignVertical: 'top',
  },
  notice: {
    fontFamily: Fonts.regular,
    fontSize: 15.2,
    lineHeight: 22.8,
    marginTop: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 24,
  },
  actionButton: {
    minHeight: 48,
    paddingVertical: 9.6,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
});
