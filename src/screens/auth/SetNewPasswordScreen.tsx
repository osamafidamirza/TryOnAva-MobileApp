import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  KeyboardAvoidingView, Platform, Alert, ActivityIndicator, Image, ScrollView,
} from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../../api/auth';
import { colors, typography, spacing } from '../../theme';

const iconRecover = require('../../assets/images/icon-recover.png');
const iconEmailSent = require('../../assets/images/icon-email-sent.png');

const DEV_RESET_TOKEN = 'dev-reset-token';

interface Props {
  resetToken: string;
  onReset: () => void;
  onBack: () => void;
}

export default function SetNewPasswordScreen({ resetToken, onReset, onBack }: Props) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [done, setDone] = useState(false);

  const mutation = useMutation<void, Error, void>({
    mutationFn: async () => {
      if (resetToken === DEV_RESET_TOKEN) return;
      await authApi.resetPassword(resetToken, password);
    },
    onSuccess: () => {
      setDone(true);
      setTimeout(() => onReset(), 1500);
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.message || 'Password reset failed');
    },
  });

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    mutation.mutate();
  };

  const isValid = password.length >= 8 && confirmPassword.length >= 8;

  if (done) {
    return (
      <View style={styles.container}>
        <View style={styles.successContainer}>
          <Image source={iconEmailSent} style={styles.iconLarge} resizeMode="contain" />
          <Text style={styles.successTitle}>Password Reset!</Text>
          <Text style={styles.successSubtitle}>You can now log in with your new password.</Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={styles.back} onPress={onBack}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <View style={styles.iconContainer}>
          <Image source={iconRecover} style={styles.icon} resizeMode="contain" />
          <Text style={styles.screenTitle}>New Password</Text>
          <Text style={styles.subtitle}>Set a new password for your account</Text>
        </View>

        <Text style={styles.label}>Create Password</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, styles.inputFlex]}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor={colors.subtext}
            secureTextEntry={!showPass}
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPass(!showPass)}>
            <Text style={styles.eyeText}>{showPass ? '🙈' : '👁'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Re-enter Password</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, styles.inputFlex]}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="••••••••"
            placeholderTextColor={colors.subtext}
            secureTextEntry={!showConfirm}
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowConfirm(!showConfirm)}>
            <Text style={styles.eyeText}>{showConfirm ? '🙈' : '👁'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, (!isValid || mutation.isPending) && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={!isValid || mutation.isPending}
          activeOpacity={0.8}>
          {mutation.isPending
            ? <ActivityIndicator color={colors.background} />
            : <Text style={styles.buttonText}>Set New Password</Text>}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: spacing.lg, paddingTop: 60, paddingBottom: 40 },
  back: { marginBottom: spacing.lg },
  backText: { color: colors.text, fontSize: 24 },
  iconContainer: { alignItems: 'center', marginBottom: spacing.xl },
  icon: { width: 120, height: 120, marginBottom: spacing.lg },
  screenTitle: { ...typography.h1, color: colors.text, fontWeight: '700', marginBottom: spacing.sm },
  subtitle: { ...typography.p2, color: colors.subtext, textAlign: 'center' },
  label: { ...typography.p2, color: colors.subtext, marginBottom: spacing.xs, marginTop: spacing.md },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  input: {
    backgroundColor: colors.cardSecondary, borderRadius: 12, height: 52,
    paddingHorizontal: spacing.md, color: colors.text, ...typography.p1,
    borderWidth: 1, borderColor: colors.stroke,
  },
  inputFlex: { flex: 1 },
  eyeBtn: { paddingHorizontal: spacing.md },
  eyeText: { fontSize: 18 },
  button: {
    backgroundColor: colors.primary, height: 52, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', marginTop: spacing.xl,
  },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { ...typography.p1, color: colors.background, fontWeight: '700' },
  successContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.lg },
  iconLarge: { width: 140, height: 140 },
  successTitle: { ...typography.h1, color: colors.text, fontWeight: '700' },
  successSubtitle: { ...typography.p1, color: colors.subtext, textAlign: 'center', paddingHorizontal: spacing.xl },
});
