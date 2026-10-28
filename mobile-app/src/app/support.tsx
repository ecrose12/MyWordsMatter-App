// The "Contact My Words Matter Support" page (Menu → Contact Support).
// Wording and behavior copied from mywordsmatter.app/support. The message is sent to
// the same place as the website's form, so it lands in the same support inbox.
//
// App-only additions (approved):
//   - Our own wording for mistakes, since phones don't have the browser's built-in warnings:
//     "Please fill in your name, email, and message." / "Please enter a valid email address."
//   - The blue button uses dark navy text in dark mode, so it's easier to read.

import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SiteHeader } from '@/components/site-header';
import { Fonts } from '@/constants/colors';
import { useTheme } from '@/context/theme';
import { apiUrl } from '@/lib/api';

const TITLE = 'Contact My Words Matter Support';

const MSG_MISSING = 'Please fill in your name, email, and message.';
const MSG_BAD_EMAIL = 'Please enter a valid email address.';
const MSG_GENERIC = 'Something went wrong. Please try again.';
const MSG_OFFLINE = "Couldn't reach the server. Please try again.";

// A simple check that the email looks like name@example.com.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function SupportScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function handleSend() {
    // Check the boxes first (the website's browser does this for it).
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError(MSG_MISSING);
      setStatus('error');
      return;
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError(MSG_BAD_EMAIL);
      setStatus('error');
      return;
    }

    setStatus('sending');
    setError('');
    try {
      const response = await fetch(apiUrl('/api/support'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error || MSG_GENERIC);
        setStatus('error');
        return;
      }
      setStatus('sent');
    } catch {
      setError(MSG_OFFLINE);
      setStatus('error');
    }
  }

  const label = [styles.label, { color: colors.text }];
  const input = [
    styles.input,
    { color: colors.text, backgroundColor: colors.bg, borderColor: colors.borderSubtle },
  ];

  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <SiteHeader />
      {/* Slides the form up when the phone's keyboard opens */}
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 48 }]}>
          <View style={styles.column}>
            <Text style={[styles.title, { color: colors.text }]} accessibilityRole="header">
              {TITLE}
            </Text>

            {status === 'sent' ? (
              <Text
                style={[styles.intro, { color: colors.textSecondary }]}
                accessibilityLiveRegion="polite">
                Thanks — your message has been received. We&apos;ll get back to you as soon as we can.
              </Text>
            ) : (
              <>
                <Text style={[styles.intro, { color: colors.textSecondary }]}>
                  Having trouble, or have a question? Send us a message below.
                </Text>

                <View style={[styles.form, { backgroundColor: colors.bg, borderColor: colors.border }]}>
                  <Text style={label}>Name</Text>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    accessibilityLabel="Name"
                    autoComplete="name"
                    textContentType="name"
                    returnKeyType="next"
                    style={input}
                  />

                  <Text style={label}>Email</Text>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    accessibilityLabel="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="email"
                    textContentType="emailAddress"
                    returnKeyType="next"
                    style={input}
                  />

                  <Text style={label}>How can we help?</Text>
                  <TextInput
                    value={message}
                    onChangeText={setMessage}
                    accessibilityLabel="How can we help?"
                    multiline
                    style={[input, styles.textarea]}
                  />

                  {status === 'error' && error !== '' && (
                    <Text
                      accessibilityRole="alert"
                      accessibilityLiveRegion="assertive"
                      style={[styles.error, { color: colors.error }]}>
                      {error}
                    </Text>
                  )}

                  <Pressable
                    onPress={handleSend}
                    disabled={status === 'sending'}
                    accessibilityRole="button"
                    style={[
                      styles.button,
                      { backgroundColor: colors.buttonPrimaryBg, borderColor: colors.buttonPrimaryBg },
                      status === 'sending' && styles.buttonBusy,
                    ]}>
                    <Text style={[styles.buttonText, { color: colors.buttonPrimaryText }]}>
                      {status === 'sending' ? 'Sending…' : 'Send Message'}
                    </Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  form: {
    borderWidth: 3,
    borderRadius: 16,
    padding: 28,
    gap: 8,
  },
  label: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
  },
  input: {
    fontFamily: Fonts.regular,
    fontSize: 16.8,
    minHeight: 48,
    paddingVertical: 9.6,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderRadius: 10,
  },
  textarea: {
    minHeight: 174,
    textAlignVertical: 'top',
  },
  error: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
  },
  button: {
    marginTop: 12,
    minHeight: 54,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBusy: {
    opacity: 0.7,
  },
  buttonText: {
    fontFamily: Fonts.bold,
    fontSize: 17.6,
    lineHeight: 26.4,
  },
});
