import React from 'react';
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
  onNext: () => void;
}

export default function OnboardingScreen({ onNext }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.outerRing}>
          <View style={styles.innerRing}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarIcon}>🧍</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Create Your</Text>
        <Text style={styles.titleAccent}>Digital Twin</Text>
        <Text style={styles.subtitle}>
          Generate a hyper-realistic 3D avatar with couture-level precision for a bespoke virtual fitting room experience
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onNext} activeOpacity={0.8}>
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
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  avatarContainer: {
    marginBottom: spacing.xxl,
  },
  outerRing: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#00D4FF22',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerRing: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 1,
    borderColor: '#00D4FF44',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#0D2137',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: {
    fontSize: 60,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    fontWeight: '600',
  },
  titleAccent: {
    ...typography.h1,
    color: colors.primary,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.p2,
    color: colors.subtext,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: spacing.md,
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
  buttonText: {
    ...typography.p1,
    color: colors.background,
    fontWeight: '700',
  },
});
