import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Dimensions, Image,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - spacing.lg * 2 - spacing.md) / 2;

const STYLE_IMAGES: Record<string, Record<string, any>> = {
  male: {
    street: require('../../assets/images/male-street.png'),
    sports: require('../../assets/images/male-sports.png'),
    casual: require('../../assets/images/male-casual.png'),
    formal: require('../../assets/images/male-formal.png'),
  },
  female: {
    street: require('../../assets/images/female-street.png'),
    sports: require('../../assets/images/female-sports.png'),
    casual: require('../../assets/images/female-casual.png'),
    formal: require('../../assets/images/female-formal.png'),
  },
};

const STYLES = [
  { id: 'street', label: 'Street Style' },
  { id: 'sports', label: 'Sports Style' },
  { id: 'casual', label: 'Casual Style' },
  { id: 'formal', label: 'Formal Style' },
];

interface Props {
  gender: 'male' | 'female';
  onGetStarted: (style: string) => void;
  onBack: () => void;
}

export default function StyleScreen({ gender, onGetStarted, onBack }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const images = STYLE_IMAGES[gender];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={onBack}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Choose Style</Text>
      <Text style={styles.subtitle}>Select the style you like to personalize your experience</Text>

      <View style={styles.grid}>
        {STYLES.map(style => {
          const isSelected = selected === style.id;
          return (
            <TouchableOpacity
              key={style.id}
              style={[styles.card, isSelected && styles.cardSelected]}
              onPress={() => setSelected(style.id)}
              activeOpacity={0.8}>
              <Image source={images[style.id]} style={styles.cardImage} resizeMode="cover" />
              <Text style={styles.cardLabel}>{style.label}</Text>
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
        style={[styles.button, !selected && styles.buttonDisabled]}
        onPress={() => selected && onGetStarted(selected)}
        activeOpacity={0.8}
        disabled={!selected}>
        <Text style={styles.buttonText}>Get Started  →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: colors.background,
    alignItems: 'center', paddingTop: 60, paddingHorizontal: spacing.lg,
  },
  back: { position: 'absolute', top: 56, left: spacing.lg },
  backText: { color: colors.text, fontSize: 24 },
  title: { ...typography.h2, color: colors.text, fontWeight: '700', marginBottom: spacing.xs, marginTop: spacing.lg },
  subtitle: { ...typography.p2, color: colors.subtext, textAlign: 'center', marginBottom: spacing.lg },
  grid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md,
    justifyContent: 'center', width: '100%', flex: 1,
  },
  card: {
    width: CARD_SIZE, height: CARD_SIZE * 1.2,
    borderRadius: 16, backgroundColor: colors.cardSecondary,
    overflow: 'hidden', borderWidth: 2, borderColor: 'transparent',
  },
  cardSelected: { borderColor: colors.primary },
  cardImage: { width: '100%', flex: 1 },
  cardLabel: {
    ...typography.small, color: colors.text,
    textAlign: 'center', paddingVertical: spacing.sm, fontWeight: '600',
  },
  checkBadge: {
    position: 'absolute', top: 8, right: 8,
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center',
  },
  checkText: { color: colors.background, fontSize: 12, fontWeight: '700' },
  button: {
    backgroundColor: colors.primary, width: width - spacing.lg * 2,
    height: 52, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
    marginTop: spacing.lg, marginBottom: 60,
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { ...typography.p1, color: colors.background, fontWeight: '700' },
});
