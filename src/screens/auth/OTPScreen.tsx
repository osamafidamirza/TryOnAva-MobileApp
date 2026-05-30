import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  Dimensions, Alert, ActivityIndicator, Image,
} from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../../api/auth';
import { colors, typography, spacing } from '../../theme';

const iconVerification = require('../../assets/images/icon-verification.png');
const iconEmailSent = require('../../assets/images/icon-email-sent.png');

const DEV_OTP = '786786';
const { width } = Dimensions.get('window');
const OTP_LENGTH = 6;

interface Props {
  email?: string;
  onVerified: () => void;
  onBack: () => void;
}

export default function OTPScreen({ email, onVerified, onBack }: Props) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [verified, setVerified] = useState(false);
  const inputs = useRef<TextInput[]>([]);

  const mutation = useMutation<void, Error, string>({
    mutationFn: async (code: string) => {
      await authApi.verifyOtp({ email: email || '', code });
    },
    onSuccess: () => {
      setVerified(true);
      setTimeout(() => onVerified(), 1000);
    },
    onError: () => {
      Alert.alert('Invalid OTP', 'Please enter the correct code');
      setOtp(Array(OTP_LENGTH).fill(''));
      inputs.current[0]?.focus();
    },
  });

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
    if (newOtp.every(d => d !== '')) {
      mutation.mutate(newOtp.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  if (verified) {
    return (
      <View style={styles.container}>
        <View style={styles.successContainer}>
          <Image source={iconEmailSent} style={styles.iconLarge} resizeMode="contain" />
          <Text style={styles.successTitle}>Verification Complete!</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={onBack}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Image source={iconVerification} style={styles.icon} resizeMode="contain" />
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>Enter the OTP code sent to your email</Text>
      {email && <Text style={styles.email}>{email}</Text>}

      <View style={styles.otpRow}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => { if (ref) inputs.current[index] = ref; }}
            style={[styles.otpInput, digit ? styles.otpInputFilled : null]}
            value={digit}
            onChangeText={text => handleChange(text.slice(-1), index)}
            onKeyPress={e => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            textAlign="center"
          />
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, mutation.isPending && styles.buttonDisabled]}
        onPress={() => mutation.mutate(otp.join(''))}
        disabled={mutation.isPending}
        activeOpacity={0.8}>
        {mutation.isPending
          ? <ActivityIndicator color={colors.background} />
          : <Text style={styles.buttonText}>Confirm</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: colors.background,
    paddingHorizontal: spacing.lg, paddingTop: 60, alignItems: 'center',
  },
  back: { alignSelf: 'flex-start', marginBottom: spacing.lg },
  backText: { color: colors.text, fontSize: 24 },
  icon: { width: 120, height: 120, marginBottom: spacing.lg },
  title: { ...typography.h2, color: colors.text, fontWeight: '700', marginBottom: spacing.sm },
  subtitle: { ...typography.p2, color: colors.subtext, textAlign: 'center', marginBottom: spacing.xs },
  email: { ...typography.p2, color: colors.primary, marginBottom: spacing.xl },
  otpRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl, marginTop: spacing.xl },
  otpInput: {
    width: (width - spacing.lg * 2 - spacing.sm * 5) / 6,
    height: 56, backgroundColor: colors.cardSecondary, borderRadius: 12,
    borderWidth: 1, borderColor: colors.stroke, color: colors.text,
    ...typography.h2, fontWeight: '700',
  },
  otpInputFilled: { borderColor: colors.primary, backgroundColor: '#0D2137' },
  button: {
    backgroundColor: colors.primary, width: width - spacing.lg * 2,
    height: 52, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { ...typography.p1, color: colors.background, fontWeight: '700' },
  successContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.xl },
  iconLarge: { width: 140, height: 140 },
  successTitle: { ...typography.h2, color: colors.text, fontWeight: '700' },
});
