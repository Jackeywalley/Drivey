import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card } from '@drivemate/ui';
import { Booking } from '@drivemate/types';

const RideHistoryScreen = () => {
  // TODO: Fetch ride history from API
  const rides: Partial<Booking>[] = [
    {
      id: '1',
      pickup: {
        address: '123 Main St',
        latitude: 37.78825,
        longitude: -122.4324,
      },
      dropoff: {
        address: '456 Market St',
        latitude: 37.78825,
        longitude: -122.4324,
      },
      scheduledFor: '2024-03-15T10:00:00Z',
      status: 'completed',
      fare: 25.50,
      rating: 5,
    },
    // Add more sample rides as needed
  ];

  const renderRideItem = ({ item }: { item: Partial<Booking> }) => (
    <Card style={styles.rideCard}>
      <View style={styles.rideHeader}>
        <Text style={styles.date}>
          {new Date(item.scheduledFor!).toLocaleDateString()}
        </Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>

      <View style={styles.locationContainer}>
        <View style={styles.locationRow}>
          <View style={styles.locationDot} />
          <Text style={styles.locationText}>{item.pickup?.address}</Text>
        </View>
        <View style={styles.locationLine} />
        <View style={styles.locationRow}>
          <View style={[styles.locationDot, styles.dropoffDot]} />
          <Text style={styles.locationText}>{item.dropoff?.address}</Text>
        </View>
      </View>

      <View style={styles.rideFooter}>
        <Text style={styles.fare}>${item.fare?.toFixed(2)}</Text>
        {item.rating && (
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{item.rating} ★</Text>
          </View>
        )}
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={rides}
        renderItem={renderRideItem}
        keyExtractor={(item) => item.id!}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
  },
  rideCard: {
    marginBottom: 16,
    padding: 16,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  date: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  status: {
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
  },
  locationContainer: {
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 8,
  },
  dropoffDot: {
    backgroundColor: '#F44336',
  },
  locationLine: {
    width: 2,
    height: 20,
    backgroundColor: '#E0E0E0',
    marginLeft: 3,
  },
  locationText: {
    fontSize: 14,
    color: '#333',
  },
  rideFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fare: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    color: '#FFD700',
  },
});

export default RideHistoryScreen; 