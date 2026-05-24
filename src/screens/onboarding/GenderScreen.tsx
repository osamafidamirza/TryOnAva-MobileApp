import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

const { width } = Dimensions.get('window');

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
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>⊕</Text>
        </View>
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
          <Text style={styles.optionIcon}>👤</Text>
          <Text style={styles.optionText}>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, selected === 'female' && styles.optionSelected]}
          onPress={() => setSelected('female')}
          activeOpacity={0.8}>
          <Text style={styles.optionIcon}>👤</Text>
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
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: 60,
  },
  back: {
    position: 'absolute',
    top: 56,
    left: spacing.lg,
  },
  backText: {
    color: colors.text,
    fontSize: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    marginTop: spacing.lg,
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
  iconText: {
    fontSize: 28,
    color: colors.primary,
  },
  brand: {
    fontSize: 22,
    fontWeight: '700',
  },
  brandCyan: { color: colors.primary },
  brandGreen: { color: colors.accent },
  title: {
    ...typography.h2,
    color: colors.text,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.p2,
    color: colors.subtext,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  optionsContainer: {
    width: '100%',
    gap: spacing.md,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardSecondary,
    borderRadius: 12,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'transparent',
    gap: spacing.md,
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: '#0D2137',
  },
  optionIcon: {
    fontSize: 24,
  },
  optionText: {
    ...typography.p1,
    color: colors.text,
    fontWeight: '600',
  },
  button: {
    backgroundColor: colors.primary,
    width: width - spacing.lg * 2,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 60,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    ...typography.p1,
    color: colors.background,
    fontWeight: '700',
  },
});
