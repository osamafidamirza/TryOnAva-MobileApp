import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  KeyboardAvoidingView, Platform, ActivityIndicator, Alert, Image,
} from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../../api/auth';
import { colors, typography, spacing } from '../../theme';

const iconRecover = require('../../assets/images/icon-recover.png');
const iconEmailSent = require('../../assets/images/icon-email-sent.png');

interface Props {
  onBack: () => void;
  onSent: (email: string) => void;
}

export default function ForgotPasswordScreen({ onBack, onSent }: Props) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const mutation = useMutation({
    mutationFn: () => authApi.forgotPassword(email),
    onSuccess: () => {
      setSent(true);
      setTimeout(() => onSent(email), 2000);
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Something went wrong');
    },
  });

  if (sent) {
    return (
      <View style={styles.container}>
        <View style={styles.successContainer}>
          <Image source={iconEmailSent} style={styles.iconLarge} resizeMode="contain" />
          <Text style={styles.successTitle}>Email Sent</Text>
          <Text style={styles.successSubtitle}>
            A 6-digit verification code has been sent to your email.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableOpacity style={styles.back} onPress={onBack}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <View style={styles.iconContainer}>
        <Image source={iconRecover} style={styles.icon} resizeMode="contain" />
        <Text style={styles.screenTitle}>Forgot Password</Text>
        <Text style={styles.subtitle}>Enter your email address to receive a 6-digit reset code</Text>
      </View>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="johnggg@gmail.com"
        placeholderTextColor={colors.subtext}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={[styles.button, mutation.isPending && styles.buttonDisabled]}
        onPress={() => mutation.mutate()}
        disabled={mutation.isPending}
        activeOpacity={0.8}>
        {mutation.isPending
          ? <ActivityIndicator color={colors.background} />
          : <Text style={styles.buttonText}>Send OTP Code</Text>}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: spacing.lg, paddingTop: 60 },
  back: { marginBottom: spacing.lg },
  backText: { color: colors.text, fontSize: 24 },
  iconContainer: { alignItems: 'center', marginBottom: spacing.xl },
  icon: { width: 120, height: 120, marginBottom: spacing.lg },
  screenTitle: { ...typography.h1, color: colors.text, fontWeight: '700', marginBottom: spacing.sm },
  subtitle: { ...typography.p2, color: colors.subtext, textAlign: 'center' },
  label: { ...typography.p2, color: colors.subtext, marginBottom: spacing.xs, marginTop: spacing.md },
  input: {
    backgroundColor: colors.cardSecondary, borderRadius: 12, height: 52,
    paddingHorizontal: spacing.md, color: colors.text, ...typography.p1,
    borderWidth: 1, borderColor: colors.stroke, marginBottom: spacing.xl,
  },
  button: {
    backgroundColor: colors.primary, height: 52, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { ...typography.p1, color: colors.background, fontWeight: '700' },
  successContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.lg },
  iconLarge: { width: 140, height: 140 },
  successTitle: { ...typography.h1, color: colors.text, fontWeight: '700' },
  successSubtitle: { ...typography.p1, color: colors.subtext, textAlign: 'center', paddingHorizontal: spacing.xl },
});
