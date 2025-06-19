import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';

type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Booking: undefined;
  Wallet: undefined;
  Profile: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? '#0A0A1A' : '#FFFFFF' }
    ]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[
            styles.greeting,
            { color: isDark ? '#F5F5F5' : '#111827' }
          ]}>
            Hi, User 👋
          </Text>
          <Text style={[
            styles.subtitle,
            { color: isDark ? '#F5F5F5' : '#111827' }
          ]}>
            Where would you like to go?
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: isDark ? '#1A1A2E' : '#F9FAFB' }]}
            onPress={() => navigation.navigate('Booking')}
          >
            <Text style={[
              styles.actionButtonText,
              { color: isDark ? '#F5F5F5' : '#111827' }
            ]}>
              🚗 Book Now
            </Text>
            <Text style={[
              styles.actionButtonSubtext,
              { color: isDark ? '#6B7280' : '#9CA3AF' }
            ]}>
              Quick ride booking
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: isDark ? '#1A1A2E' : '#F9FAFB' }]}
          >
            <Text style={[
              styles.actionButtonText,
              { color: isDark ? '#F5F5F5' : '#111827' }
            ]}>
              📅 Schedule Ride
            </Text>
            <Text style={[
              styles.actionButtonSubtext,
              { color: isDark ? '#6B7280' : '#9CA3AF' }
            ]}>
              Plan ahead
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[
            styles.sectionTitle,
            { color: isDark ? '#F5F5F5' : '#111827' }
          ]}>
            Recent Rides
          </Text>
          <View style={[styles.card, { backgroundColor: isDark ? '#1A1A2E' : '#F9FAFB' }]}>
            <Text style={[
              styles.cardTitle,
              { color: isDark ? '#F5F5F5' : '#111827' }
            ]}>
              No recent rides
            </Text>
            <Text style={[
              styles.cardSubtitle,
              { color: isDark ? '#F5F5F5' : '#111827' }
            ]}>
              Book your first ride to see it here
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[
            styles.sectionTitle,
            { color: isDark ? '#F5F5F5' : '#111827' }
          ]}>
            Quick Actions
          </Text>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={[styles.quickActionButton, { backgroundColor: isDark ? '#1A1A2E' : '#F9FAFB' }]}
              onPress={() => navigation.navigate('Wallet')}
            >
              <Text style={styles.quickActionIcon}>💰</Text>
              <Text style={[
                styles.quickActionText,
                { color: isDark ? '#F5F5F5' : '#111827' }
              ]}>
                Wallet
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.quickActionButton, { backgroundColor: isDark ? '#1A1A2E' : '#F9FAFB' }]}
            >
              <Text style={styles.quickActionIcon}>📋</Text>
              <Text style={[
                styles.quickActionText,
                { color: isDark ? '#F5F5F5' : '#111827' }
              ]}>
                History
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.quickActionButton, { backgroundColor: isDark ? '#1A1A2E' : '#F9FAFB' }]}
            >
              <Text style={styles.quickActionIcon}>⭐</Text>
              <Text style={[
                styles.quickActionText,
                { color: isDark ? '#F5F5F5' : '#111827' }
              ]}>
                Favorites
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.tabBar, { backgroundColor: isDark ? '#1A1A2E' : '#F9FAFB' }]}>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={[
            styles.tabText,
            { color: '#007AFF' }
          ]}>
            🏠 Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('Booking')}
        >
          <Text style={[
            styles.tabText,
            { color: isDark ? '#F5F5F5' : '#111827' }
          ]}>
            🚗 Bookings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('Wallet')}
        >
          <Text style={[
            styles.tabText,
            { color: isDark ? '#F5F5F5' : '#111827' }
          ]}>
            💰 Wallet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={[
            styles.tabText,
            { color: isDark ? '#F5F5F5' : '#111827' }
          ]}>
            👤 Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  actions: {
    padding: 20,
    gap: 12,
  },
  actionButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtonSubtext: {
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardSubtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  quickActionIcon: {
    fontSize: 24,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '500',
  },
  tabBar: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
  },
}); 