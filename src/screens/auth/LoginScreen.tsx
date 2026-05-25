import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../../api/auth';
import { colors, typography, spacing } from '../../theme';

const appLogo = require('../../assets/images/app-logo.png');

interface Props {
  onLogin: (data: any) => void;
  onForgotPassword: () => void;
  onSignUp: () => void;
}

export default function LoginScreen({ onLogin, onForgotPassword, onSignUp }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useMutation({
    mutationFn: () => authApi.login({ email, password }),
    onSuccess: async res => {
      const { user, tokens } = res.data;
      await AsyncStorage.setItem('accessToken', tokens.access.token);
      await AsyncStorage.setItem('refreshToken', tokens.refresh.token);
      onLogin({ user, tokens });
    },
    onError: (err: any) => {
      Alert.alert('Login Failed', err.response?.data?.message || 'Invalid credentials');
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <Image source={appLogo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.brand}>
            <Text style={styles.brandCyan}>Try</Text>
            <Text style={styles.brandGreen}>On</Text>
            <Text style={styles.brandCyan}>Ava</Text>
          </Text>
          <Text style={styles.screenTitle}>Login</Text>
        </View>

        <View style={styles.form}>
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

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.inputFlex]}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor={colors.subtext}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.eyeText}>{showPassword ? '🙈' : '👁'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.checkRow} onPress={() => setRememberMe(!rememberMe)}>
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.rememberText}>Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onForgotPassword}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.button, loginMutation.isPending && styles.buttonDisabled]}
            onPress={() => loginMutation.mutate()}
            disabled={loginMutation.isPending}
            activeOpacity={0.8}>
            {loginMutation.isPending
              ? <ActivityIndicator color={colors.background} />
              : <Text style={styles.buttonText}>Sign In</Text>}
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

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={onSignUp}>
              <Text style={styles.signupLink}>Sign Up</Text>
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
  row: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginTop: spacing.md, marginBottom: spacing.lg,
  },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  checkbox: {
    width: 18, height: 18, borderRadius: 4, borderWidth: 1,
    borderColor: colors.subtext, alignItems: 'center', justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkmark: { color: colors.background, fontSize: 12, fontWeight: '700' },
  rememberText: { ...typography.p2, color: colors.subtext },
  forgotText: { ...typography.p2, color: colors.primary },
  button: {
    backgroundColor: colors.primary, height: 52, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  buttonDisabled: { opacity: 0.6 },
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
  signupRow: { flexDirection: 'row', justifyContent: 'center' },
  signupText: { ...typography.p2, color: colors.subtext },
  signupLink: { ...typography.p2, color: colors.primary, fontWeight: '700' },
});
