import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Dimensions, Image,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

const { width } = Dimensions.get('window');

const appLogo = require('../../assets/images/app-logo.png');
const maleAvatar = require('../../assets/images/male-avatar.png');
const femaleAvatar = require('../../assets/images/female-avatar.png');

interface Props {
  onNext: (gender: 'male' | 'female') => void;
  onBack: () => void;
}

export default function GenderScreen({ onNext, onBack }: Props) {
  const [selected, setSelected] = useState<'male' | 'female' | null>(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={onBack}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image source={appLogo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.brand}>
          <Text style={styles.brandCyan}>Try</Text>
          <Text style={styles.brandGreen}>On</Text>
          <Text style={styles.brandCyan}>Ava</Text>
        </Text>
      </View>

      <Text style={styles.title}>Tell us about you</Text>
      <Text style={styles.subtitle}>Select your gender to personalize your avatar and style recommendations</Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[styles.option, selected === 'male' && styles.optionSelected]}
          onPress={() => setSelected('male')}
          activeOpacity={0.8}>
          <Image source={maleAvatar} style={styles.avatarIcon} resizeMode="contain" />
          <Text style={styles.optionText}>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, selected === 'female' && styles.optionSelected]}
          onPress={() => setSelected('female')}
          activeOpacity={0.8}>
          <Image source={femaleAvatar} style={styles.avatarIcon} resizeMode="contain" />
          <Text style={styles.optionText}>Female</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, !selected && styles.buttonDisabled]}
        onPress={() => selected && onNext(selected)}
        activeOpacity={0.8}
        disabled={!selected}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: colors.background,
    alignItems: 'center', paddingHorizontal: spacing.lg, paddingTop: 60,
  },
  back: { position: 'absolute', top: 56, left: spacing.lg },
  backText: { color: colors.text, fontSize: 24 },
  logoContainer: { alignItems: 'center', marginBottom: spacing.lg, marginTop: spacing.md },
  logo: { width: 60, height: 60, marginBottom: spacing.xs },
  brand: { fontSize: 20, fontWeight: '700' },
  brandCyan: { color: colors.primary },
  brandGreen: { color: colors.accent },
  title: { ...typography.h2, color: colors.text, fontWeight: '700', marginBottom: spacing.xs },
  subtitle: { ...typography.p2, color: colors.subtext, textAlign: 'center', marginBottom: spacing.xl },
  optionsContainer: { width: '100%', gap: spacing.md, flex: 1 },
  option: {
    width: '100%', alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.cardSecondary, borderRadius: 16,
    paddingVertical: spacing.lg, borderWidth: 1, borderColor: colors.stroke, flex: 1,
  },
  optionSelected: { borderColor: colors.primary, backgroundColor: '#0A1F33' },
  avatarIcon: { width: 48, height: 48, marginBottom: spacing.sm },
  optionText: { ...typography.p1, color: colors.text, fontWeight: '600' },
  button: {
    backgroundColor: colors.primary, width: width - spacing.lg * 2,
    height: 52, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
    marginTop: spacing.xl, marginBottom: 60,
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { ...typography.p1, color: colors.background, fontWeight: '700' },
});
