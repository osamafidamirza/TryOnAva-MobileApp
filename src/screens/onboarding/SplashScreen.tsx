import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { colors, typography } from '../../theme';

const { width } = Dimensions.get('window');

interface Props {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: Props) {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const progressWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(progressWidth, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }),
      Animated.delay(400),
    ]).start(() => onFinish());
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: logoOpacity }]}>
        {/* Outer ring */}
        <View style={styles.outerRing}>
          <View style={styles.innerRing}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>⊕</Text>
            </View>
          </View>
        </View>

        <Text style={styles.brand}>
          <Text style={styles.brandCyan}>Try</Text>
          <Text style={styles.brandGreen}>On</Text>
          <Text style={styles.brandCyan}>Ava</Text>
        </Text>
        <Text style={styles.tagline}>VIRTUAL FASHION EXPERIENCE</Text>
      </Animated.View>

      <Animated.View style={styles.bottomContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progressWidth.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '60%'],
              }),
            },
          ]}
        />
        <Text style={styles.initText}>INITIALIZING DIGITAL ATELIER...</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  outerRing: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: '#00D4FF33',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  innerRing: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 1,
    borderColor: '#00D4FF55',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#1A3A5C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 36,
    color: colors.primary,
  },
  brand: {
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: 1,
  },
  brandCyan: {
    color: colors.primary,
  },
  brandGreen: {
    color: colors.accent,
  },
  tagline: {
    ...typography.small,
    color: colors.subtext,
    letterSpacing: 4,
    marginTop: 8,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
    width: width,
  },
  progressBar: {
    height: 2,
    backgroundColor: colors.primary,
    borderRadius: 1,
    marginBottom: 12,
  },
  initText: {
    ...typography.small,
    color: colors.subtext,
    letterSpacing: 2,
  },
});
