import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors, typography } from '../theme';
import HomeScreen from '../screens/main/HomeScreen';
import ClosetScreen from '../screens/main/ClosetScreen';
import OrdersScreen from '../screens/main/OrdersScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import EditProfileScreen from '../screens/main/EditProfileScreen';
import NotificationSettingsScreen from '../screens/main/NotificationSettingsScreen';
import PrivacyPolicyScreen from '../screens/main/PrivacyPolicyScreen';
import TermsScreen from '../screens/main/TermsScreen';
import EditStyleScreen from '../screens/main/EditStyleScreen';

type Tab = 'home' | 'closet' | 'orders' | 'profile';
type SubScreen = 'edit-profile' | 'notifications' | 'privacy' | 'terms' | 'edit-style';

const TABS: { key: Tab; label: string; icon: string; iconActive: string }[] = [
  { key: 'home',    label: 'Home',      icon: '⌂',  iconActive: '⌂'  },
  { key: 'closet',  label: 'Closet',    icon: '⊡',  iconActive: '⊡'  },
  { key: 'orders',  label: 'My Orders', icon: '☰',  iconActive: '☰'  },
  { key: 'profile', label: 'Profile',   icon: '◯',  iconActive: '◉'  },
];

interface Props {
  onLogout: () => void;
}

export default function MainNavigator({ onLogout }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [subScreen, setSubScreen] = useState<SubScreen | null>(null);

  const handleNavigate = (screen: SubScreen) => {
    setSubScreen(screen);
  };

  const handleBack = () => {
    setSubScreen(null);
  };

  if (subScreen) {
    switch (subScreen) {
      case 'edit-profile':
        return <EditProfileScreen onBack={handleBack} />;
      case 'notifications':
        return <NotificationSettingsScreen onBack={handleBack} />;
      case 'privacy':
        return <PrivacyPolicyScreen onBack={handleBack} />;
      case 'terms':
        return <TermsScreen onBack={handleBack} />;
      case 'edit-style':
        return <EditStyleScreen onBack={handleBack} />;
    }
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':    return <HomeScreen />;
      case 'closet':  return <ClosetScreen />;
      case 'orders':  return <OrdersScreen />;
      case 'profile': return <ProfileScreen onLogout={onLogout} onNavigate={handleNavigate} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>
        {renderScreen()}
      </View>

      <SafeAreaView style={styles.tabBar}>
        {TABS.map(tab => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tab}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.7}>
              <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
                <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>
                  {isActive ? tab.iconActive : tab.icon}
                </Text>
              </View>
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  screenContainer: { flex: 1 },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.navTabs,
    borderTopWidth: 1,
    borderTopColor: colors.stroke,
    paddingTop: 8,
    paddingBottom: 4,
  },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 4 },
  iconWrap: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 2,
  },
  iconWrapActive: { backgroundColor: colors.primary },
  tabIcon: { fontSize: 20, color: colors.subtext },
  tabIconActive: { color: colors.background },
  tabLabel: { ...typography.small, color: colors.subtext, fontWeight: '500' },
  tabLabelActive: { color: colors.primary, fontWeight: '700' },
});
