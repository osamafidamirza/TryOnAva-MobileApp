import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

const { width, height } = Dimensions.get('window');
const ITEM_HEIGHT = 60;
const AGES = Array.from({ length: 83 }, (_, i) => i + 18);

interface Props {
  onNext: (age: number) => void;
  onBack: () => void;
}

export default function AgeScreen({ onNext, onBack }: Props) {
  const [selectedAge, setSelectedAge] = useState(23);
  const flatListRef = useRef<FlatList>(null);

  const initialIndex = AGES.indexOf(23);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={onBack}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Select age</Text>

      <Text style={styles.title}>Select your age</Text>
      <Text style={styles.subtitle}>Select your age to refine your fit and style journey.</Text>

      <View style={styles.pickerContainer}>
        <FlatList
          ref={flatListRef}
          data={AGES}
          keyExtractor={item => item.toString()}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          initialScrollIndex={initialIndex}
          getItemLayout={(_, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          onMomentumScrollEnd={e => {
            const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
            setSelectedAge(AGES[index] ?? selectedAge);
          }}
          contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }}
          renderItem={({ item }) => {
            const isSelected = item === selectedAge;
            return (
              <View style={[styles.ageItem, isSelected && styles.ageItemSelected]}>
                <Text style={[styles.ageText, isSelected && styles.ageTextSelected]}>
                  {item}
                </Text>
              </View>
            );
          }}
        />
        <View style={styles.selectionOverlay} pointerEvents="none" />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => onNext(selectedAge)}
        activeOpacity={0.8}>
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
  header: {
    ...typography.small,
    color: colors.subtext,
    marginBottom: spacing.xl,
  },
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
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  pickerContainer: {
    height: ITEM_HEIGHT * 5,
    width: width - spacing.lg * 2,
    overflow: 'hidden',
  },
  ageItem: {
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ageItemSelected: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    marginHorizontal: spacing.md,
  },
  ageText: {
    ...typography.h2,
    color: colors.subtext,
    fontWeight: '400',
  },
  ageTextSelected: {
    color: colors.background,
    fontWeight: '700',
  },
  selectionOverlay: {
    position: 'absolute',
    top: ITEM_HEIGHT * 2,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
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
