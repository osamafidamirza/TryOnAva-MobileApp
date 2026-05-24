import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  KeyboardAvoidingView, Platform, ActivityIndicator, Alert,
} from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../../api/auth';
import { colors, typography, spacing } from '../../theme';

interface Props {
  onBack: () => void;
  onSent: () => void;
}

export default function ForgotPasswordScreen({ onBack, onSent }: Props) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const mutation = useMutation({
    mutationFn: () => authApi.forgotPassword(email),
    onSuccess: () => {
      setSent(true);
      setTimeout(() => onSent(), 2000);
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Something went wrong');
    },
  });

  if (sent) {
    return (
      <View style={styles.container}>
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Text style={styles.successIconText}>✓</Text>
          </View>
          <Text style={styles.successTitle}>Email sent</Text>
          <Text style={styles.successSubtitle}>
            Check your email inbox for password reset instructions.
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

      <View style={styles.logoContainer}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>⊕</Text>
        </View>
        <Text style={styles.brand}>
          <Text style={styles.brandCyan}>Try</Text>
          <Text style={styles.brandGreen}>On</Text>
          <Text style={styles.brandCyan}>Ava</Text>
        </Text>
        <Text style={styles.screenTitle}>Forgot Password</Text>
        <Text style={styles.subtitle}>Enter your email address to receive a password reset link</Text>
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
          : <Text style={styles.buttonText}>Send Password Reset Link</Text>}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: spacing.lg, paddingTop: 60 },
  back: { marginBottom: spacing.xl },
  backText: { color: colors.text, fontSize: 24 },
  logoContainer: { alignItems: 'center', marginBottom: spacing.xl },
  iconCircle: {
    width: 70, height: 70, borderRadius: 35, backgroundColor: '#1A3A5C',
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm,
  },
  iconText: { fontSize: 28, color: colors.primary },
  brand: { fontSize: 22, fontWeight: '700', marginBottom: spacing.sm },
  brandCyan: { color: colors.primary },
  brandGreen: { color: colors.accent },
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
  successContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  successIcon: {
    width: 80, height: 80, borderRadius: 40, borderWidth: 3,
    borderColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xl,
  },
  successIconText: { fontSize: 36, color: colors.primary },
  successTitle: { ...typography.h1, color: colors.text, fontWeight: '700', marginBottom: spacing.md },
  successSubtitle: { ...typography.p1, color: colors.subtext, textAlign: 'center', paddingHorizontal: spacing.xl },
});
