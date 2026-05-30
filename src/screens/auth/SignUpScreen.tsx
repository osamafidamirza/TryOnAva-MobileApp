import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  KeyboardAvoidingView, Platform, ScrollView,
  ActivityIndicator, Alert, Image,
} from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../../api/auth';
import { colors, typography, spacing } from '../../theme';

const appLogo = require('../../assets/images/app-logo.png');

interface Props {
  onRegister: (email: string, password: string) => void;
  onLogin: () => void;
}

export default function SignUpScreen({ onRegister, onLogin }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const registerMutation = useMutation({
    mutationFn: () => authApi.register({ name, email, password }),
    onSuccess: () => onRegister(email, password),
    onError: (err: any) => {
      Alert.alert('Registration Failed', err.response?.data?.message || 'Something went wrong');
    },
  });

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    registerMutation.mutate();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <Image source={appLogo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.brand}>
            <Text style={styles.brandCyan}>Try</Text>
            <Text style={styles.brandGreen}>On</Text>
            <Text style={styles.brandCyan}>Ava</Text>
          </Text>
          <Text style={styles.screenTitle}>Create an account</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Your name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName}
            placeholder="John Smith" placeholderTextColor={colors.subtext} />

          <Text style={styles.label}>Email Address</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail}
            placeholder="johnggg@gmail.com" placeholderTextColor={colors.subtext}
            keyboardType="email-address" autoCapitalize="none" />

          <Text style={styles.label}>Create Password</Text>
          <View style={styles.inputRow}>
            <TextInput style={[styles.input, styles.inputFlex]} value={password}
              onChangeText={setPassword} placeholder="••••••••"
              placeholderTextColor={colors.subtext} secureTextEntry={!showPass} />
            <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPass(!showPass)}>
              <Text style={styles.eyeText}>{showPass ? '🙈' : '👁'}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Re-enter Password</Text>
          <View style={styles.inputRow}>
            <TextInput style={[styles.input, styles.inputFlex]} value={confirmPassword}
              onChangeText={setConfirmPassword} placeholder="••••••••"
              placeholderTextColor={colors.subtext} secureTextEntry={!showConfirm} />
            <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowConfirm(!showConfirm)}>
              <Text style={styles.eyeText}>{showConfirm ? '🙈' : '👁'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.termsRow} onPress={() => setAgreed(!agreed)} activeOpacity={0.8}>
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.termsText}>
              I agree to <Text style={styles.termsLink}>Terms & Conditions</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, (!agreed || registerMutation.isPending) && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={!agreed || registerMutation.isPending}
            activeOpacity={0.8}>
            {registerMutation.isPending
              ? <ActivityIndicator color={colors.background} />
              : <Text style={styles.buttonText}>Register</Text>}
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn}>
              <Text style={styles.socialIcon}>G</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Text style={styles.socialIcon}>🍎</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={onLogin}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { flexGrow: 1, paddingHorizontal: spacing.lg, paddingTop: 60, paddingBottom: 40 },
  logoContainer: { alignItems: 'center', marginBottom: spacing.xl },
  logo: { width: 80, height: 80, marginBottom: spacing.sm },
  brand: { fontSize: 22, fontWeight: '700', marginBottom: spacing.sm },
  brandCyan: { color: colors.primary },
  brandGreen: { color: colors.accent },
  screenTitle: { ...typography.h1, color: colors.text, fontWeight: '700' },
  form: { width: '100%' },
  label: { ...typography.p2, color: colors.subtext, marginBottom: spacing.xs, marginTop: spacing.md },
  input: {
    backgroundColor: colors.cardSecondary, borderRadius: 12, height: 52,
    paddingHorizontal: spacing.md, color: colors.text, ...typography.p1,
    borderWidth: 1, borderColor: colors.stroke,
  },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  inputFlex: { flex: 1 },
  eyeBtn: { position: 'absolute', right: spacing.md },
  eyeText: { fontSize: 18 },
  termsRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.lg, marginBottom: spacing.lg, gap: spacing.sm },
  checkbox: {
    width: 18, height: 18, borderRadius: 4, borderWidth: 1,
    borderColor: colors.subtext, alignItems: 'center', justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkmark: { color: colors.background, fontSize: 12, fontWeight: '700' },
  termsText: { ...typography.p2, color: colors.subtext },
  termsLink: { color: colors.primary },
  button: {
    backgroundColor: colors.primary, height: 52, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { ...typography.p1, color: colors.background, fontWeight: '700' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: spacing.lg, gap: spacing.sm },
  divider: { flex: 1, height: 1, backgroundColor: colors.stroke },
  dividerText: { ...typography.p2, color: colors.subtext },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: spacing.lg, marginBottom: spacing.xl },
  socialBtn: {
    width: 52, height: 52, borderRadius: 26, backgroundColor: colors.cardSecondary,
    borderWidth: 1, borderColor: colors.stroke, alignItems: 'center', justifyContent: 'center',
  },
  socialIcon: { fontSize: 22, color: colors.text, fontWeight: '700' },
  loginRow: { flexDirection: 'row', justifyContent: 'center' },
  loginText: { ...typography.p2, color: colors.subtext },
  loginLink: { ...typography.p2, color: colors.primary, fontWeight: '700' },
});
