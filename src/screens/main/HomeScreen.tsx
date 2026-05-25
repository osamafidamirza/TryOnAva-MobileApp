import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image, FlatList, Dimensions, SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { colors, typography, spacing } from '../../theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - spacing.lg * 2 - spacing.sm) / 2;
const CAT_CARD_WIDTH = (width - spacing.lg * 2 - spacing.sm * 2) / 3;

// placeholder images from existing assets
const IMG_1 = require('../../assets/images/male-casual.png');
const IMG_2 = require('../../assets/images/male-street.png');
const IMG_3 = require('../../assets/images/male-formal.png');
const IMG_4 = require('../../assets/images/male-sports.png');

const CATEGORIES = ['Casual', 'Formal', 'Sports'];

const CAT_PRODUCTS = [
  { id: '1', name: 'Casual Friday', price: 45,  color: 'Light Grey', sizes: 'S/M/L', image: IMG_1 },
  { id: '2', name: 'Street Style',  price: 50,  color: 'Light Grey', sizes: 'S/M/L', image: IMG_2 },
  { id: '3', name: 'Evening Chic',  price: 55,  color: 'Light Grey', sizes: 'S/M/L', image: IMG_3 },
];

const RECOMMENDED = [
  { id: '1', name: 'Leather Jacket', price: 199, color: 'Light Blue', sizes: 'S/M/L', image: IMG_2 },
  { id: '2', name: 'Woolen Hoody',   price: 180, color: 'Light Blue', sizes: 'S/M/L', image: IMG_1 },
  { id: '3', name: 'Woolen Hoody',   price: 180, color: 'Light Blue', sizes: 'S/M/L', image: IMG_4 },
  { id: '4', name: 'Leather Jacket', price: 199, color: 'Light Blue', sizes: 'S/M/L', image: IMG_3 },
];

export default function HomeScreen() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [activeCategory, setActiveCategory] = useState('Casual');
  const [saved, setSaved] = useState<string[]>([]);

  const toggleSave = (id: string) => {
    setSaved(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const firstName = user?.name?.split(' ')[0] ?? 'there';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatar} />
            <View style={styles.greetingBlock}>
              <Text style={styles.greetingHello}>Hello {firstName}</Text>
              <Text style={styles.greetingTagline}>Ready to try on?</Text>
            </View>
          </View>
          <View style={styles.bellWrapper}>
            <Text style={styles.bellIcon}>🔔</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>5</Text>
            </View>
          </View>
        </View>

        {/* Avatar Action Cards */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.actionCard, styles.actionCardPrimary]} activeOpacity={0.8}>
            <View style={styles.actionIconCircle}>
              <Text style={styles.actionIconText}>⊕</Text>
            </View>
            <Text style={styles.actionTitle}>Create Your Avatar</Text>
            <Text style={styles.actionSubtitle}>Scan your body to get started</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
            <View style={styles.actionIconCircle}>
              <Text style={styles.actionIconText}>◎</Text>
            </View>
            <Text style={styles.actionTitle}>View My Avatar</Text>
            <Text style={styles.actionSubtitle}>Try on clothes virtually</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillRow} contentContainerStyle={styles.pillContent}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.pill, activeCategory === cat && styles.pillActive]}
              onPress={() => setActiveCategory(cat)}
              activeOpacity={0.8}>
              <Text style={[styles.pillText, activeCategory === cat && styles.pillTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          data={CAT_PRODUCTS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.catProductList}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.catCard} activeOpacity={0.8}>
              <Image source={item.image} style={styles.catImage} resizeMode="cover" />
              <Text style={styles.catName}>{item.name} <Text style={styles.catPrice}>${item.price}</Text></Text>
              <Text style={styles.catMeta}>{item.color} • {item.sizes}</Text>
            </TouchableOpacity>
          )}
        />

        {/* Recommended */}
        <Text style={[styles.sectionTitle, { marginTop: spacing.xl, marginBottom: spacing.md }]}>Recommended</Text>

        <View style={styles.recGrid}>
          {RECOMMENDED.map(item => (
            <TouchableOpacity key={item.id + item.name} style={styles.recCard} activeOpacity={0.8}>
              <Image source={item.image} style={styles.recImage} resizeMode="cover" />
              <TouchableOpacity
                style={styles.heartBtn}
                onPress={() => toggleSave(item.id)}
                activeOpacity={0.8}>
                <Text style={styles.heartIcon}>{saved.includes(item.id) ? '♥' : '♡'}</Text>
              </TouchableOpacity>
              <View style={styles.recInfo}>
                <Text style={styles.recName}>{item.name}</Text>
                <Text style={styles.recPrice}>${item.price}</Text>
              </View>
              <Text style={styles.recMeta}>{item.color} • {item.sizes}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, backgroundColor: colors.background },

  // Header
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.lg,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  avatar: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: colors.cardSecondary, borderWidth: 1, borderColor: colors.stroke,
  },
  greetingBlock: {},
  greetingHello: { ...typography.p2, color: colors.subtext },
  greetingTagline: { ...typography.h2, color: colors.text, fontWeight: '700' },
  bellWrapper: { position: 'relative' },
  bellIcon: { fontSize: 24 },
  badge: {
    position: 'absolute', top: -4, right: -6,
    backgroundColor: '#FF4444', borderRadius: 10,
    minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: { ...typography.small, color: colors.text, fontWeight: '700', fontSize: 10 },

  // Action Cards
  actionRow: {
    flexDirection: 'row', gap: spacing.sm,
    paddingHorizontal: spacing.lg, marginBottom: spacing.xl,
  },
  actionCard: {
    flex: 1, backgroundColor: colors.card, borderRadius: 16,
    padding: spacing.md, borderWidth: 1, borderColor: colors.stroke,
  },
  actionCardPrimary: { backgroundColor: '#0D2137' },
  actionIconCircle: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: `${colors.primary}22`,
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm,
  },
  actionIconText: { fontSize: 18, color: colors.primary },
  actionTitle: { ...typography.p2, color: colors.text, fontWeight: '700', marginBottom: 2 },
  actionSubtitle: { ...typography.small, color: colors.subtext, lineHeight: 16 },

  // Section
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.lg, marginBottom: spacing.sm,
  },
  sectionTitle: { ...typography.h3, color: colors.text, fontWeight: '700', paddingHorizontal: spacing.lg },
  viewAll: { ...typography.p2, color: colors.primary, fontWeight: '600' },

  // Pills
  pillRow: { marginBottom: spacing.md },
  pillContent: { paddingHorizontal: spacing.lg, gap: spacing.sm },
  pill: {
    paddingHorizontal: spacing.md, paddingVertical: spacing.xs + 2,
    borderRadius: 20, borderWidth: 1, borderColor: colors.stroke,
    backgroundColor: colors.card,
  },
  pillActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  pillText: { ...typography.p2, color: colors.subtext, fontWeight: '500' },
  pillTextActive: { color: colors.background, fontWeight: '700' },

  // Category Products
  catProductList: { paddingHorizontal: spacing.lg, gap: spacing.sm },
  catCard: { width: CAT_CARD_WIDTH },
  catImage: {
    width: CAT_CARD_WIDTH, height: CAT_CARD_WIDTH * 1.2,
    borderRadius: 12, backgroundColor: colors.card, marginBottom: spacing.xs,
  },
  catName: { ...typography.small, color: colors.text, fontWeight: '600' },
  catPrice: { color: colors.primary, fontWeight: '700' },
  catMeta: { ...typography.small, color: colors.subtext },

  // Recommended Grid
  recGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: spacing.lg, gap: spacing.sm,
  },
  recCard: { width: CARD_WIDTH, backgroundColor: colors.card, borderRadius: 16, overflow: 'hidden' },
  recImage: { width: CARD_WIDTH, height: CARD_WIDTH * 1.15, backgroundColor: colors.cardSecondary },
  heartBtn: {
    position: 'absolute', top: spacing.sm, right: spacing.sm,
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: `${colors.background}CC`,
    alignItems: 'center', justifyContent: 'center',
  },
  heartIcon: { fontSize: 16, color: colors.text },
  recInfo: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: spacing.sm, paddingTop: spacing.sm,
  },
  recName: { ...typography.p2, color: colors.text, fontWeight: '600', flex: 1 },
  recPrice: { ...typography.p2, color: colors.primary, fontWeight: '700' },
  recMeta: { ...typography.small, color: colors.subtext, paddingHorizontal: spacing.sm, paddingBottom: spacing.sm },
});
