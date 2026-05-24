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

const STYLES = [
  { id: 'street', label: 'Street Style' },
  { id: 'sports', label: 'Sports Style' },
  { id: 'casual', label: 'Casual Style' },
  { id: 'formal', label: 'Formal Style' },
];

interface Props {
  onGetStarted: (styles: string[]) => void;
  onBack: () => void;
}

export default function StyleScreen({ onGetStarted, onBack }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id],
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={onBack}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Choose Your Style</Text>
      <Text style={styles.subtitle}>Select the styles you like to personalize your experience</Text>

      <View style={styles.grid}>
        {STYLES.map(style => {
          const isSelected = selected.includes(style.id);
          return (
            <TouchableOpacity
              key={style.id}
              style={[styles.styleCard, isSelected && styles.styleCardSelected]}
              onPress={() => toggle(style.id)}
              activeOpacity={0.8}>
              <View style={styles.imagePlaceholder}>
                <Text style={styles.placeholderIcon}>👔</Text>
              </View>
              <Text style={styles.styleLabel}>{style.label}</Text>
              {isSelected && (
                <View style={styles.checkBadge}>
                  <Text style={styles.checkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={[styles.button, selected.length === 0 && styles.buttonDisabled]}
        onPress={() => onGetStarted(selected)}
        activeOpacity={0.8}
        disabled={selected.length === 0}>
        <Text style={styles.buttonText}>Get Started →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: spacing.lg,
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
  title: {
    ...typography.h2,
    color: colors.text,
    fontWeight: '700',
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
  subtitle: {
    ...typography.p2,
    color: colors.subtext,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'center',
    width: '100%',
  },
  styleCard: {
    width: (width - spacing.lg * 2 - spacing.md) / 2,
    aspectRatio: 0.85,
    borderRadius: 16,
    backgroundColor: colors.cardSecondary,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  styleCardSelected: {
    borderColor: colors.primary,
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: '#1A2B3C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    fontSize: 48,
  },
  styleLabel: {
    ...typography.small,
    color: colors.text,
    textAlign: 'center',
    padding: spacing.sm,
    fontWeight: '600',
  },
  checkBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: '700',
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
