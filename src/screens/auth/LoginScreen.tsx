import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

const { width } = Dimensions.get('window');

interface Props {
  onLogin: () => void;
  onForgotPassword: () => void;
  onSignUp: () => void;
}

export default function LoginScreen({ onLogin, onForgotPassword, onSignUp }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>⊕</Text>
          </View>
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
            <TouchableOpacity
              style={styles.eyeBtn}
              onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.eyeText}>{showPassword ? '🙈' : '👁'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.checkRow}
              onPress={() => setRememberMe(!rememberMe)}>
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.rememberText}>Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onForgotPassword}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={onLogin} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Sign In</Text>
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
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#1A3A5C',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  iconText: { fontSize: 28, color: colors.primary },
  brand: { fontSize: 22, fontWeight: '700', marginBottom: spacing.sm },
  brandCyan: { color: colors.primary },
  brandGreen: { color: colors.accent },
  screenTitle: { ...typography.h1, color: colors.text, fontWeight: '700' },
  form: { width: '100%' },
  label: {
    ...typography.p2,
    color: colors.subtext,
    marginBottom: spacing.xs,
    marginTop: spacing.md,
  },
  input: {
    backgroundColor: colors.cardSecondary,
    borderRadius: 12,
    height: 52,
    paddingHorizontal: spacing.md,
    color: colors.text,
    ...typography.p1,
    borderWidth: 1,
    borderColor: colors.stroke,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputFlex: { flex: 1 },
  eyeBtn: {
    position: 'absolute',
    right: spacing.md,
  },
  eyeText: { fontSize: 18 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.subtext,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkmark: { color: colors.background, fontSize: 12, fontWeight: '700' },
  rememberText: { ...typography.p2, color: colors.subtext },
  forgotText: { ...typography.p2, color: colors.primary },
  button: {
    backgroundColor: colors.primary,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { ...typography.p1, color: colors.background, fontWeight: '700' },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
    gap: spacing.sm,
  },
  divider: { flex: 1, height: 1, backgroundColor: colors.stroke },
  dividerText: { ...typography.p2, color: colors.subtext },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  socialBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.cardSecondary,
    borderWidth: 1,
    borderColor: colors.stroke,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: { fontSize: 22, color: colors.text, fontWeight: '700' },
  signupRow: { flexDirection: 'row', justifyContent: 'center' },
  signupText: { ...typography.p2, color: colors.subtext },
  signupLink: { ...typography.p2, color: colors.primary, fontWeight: '700' },
});
