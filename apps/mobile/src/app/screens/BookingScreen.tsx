import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Button, Input, Card } from '@drivemate/ui';
import { Booking } from '@drivemate/types';

const BookingScreen = () => {
  const router = useRouter();
  const [pickupLocation, setPickupLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    address: '',
  });
  const [dropoffLocation, setDropoffLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    address: '',
  });
  const [scheduledTime, setScheduledTime] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    try {
      setLoading(true);
      // TODO: Implement booking creation logic
      const booking: Partial<Booking> = {
        pickup: {
          address: pickupLocation.address,
          latitude: pickupLocation.latitude,
          longitude: pickupLocation.longitude,
        },
        dropoff: {
          address: dropoffLocation.address,
          latitude: dropoffLocation.latitude,
          longitude: dropoffLocation.longitude,
        },
        scheduledFor: scheduledTime,
      };

      // TODO: Call API to create booking
      Alert.alert('Success', 'Booking created successfully!');
      router.push('/home');
    } catch (error) {
      Alert.alert('Error', 'Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: pickupLocation.latitude,
            longitude: pickupLocation.longitude,
          }}
          title="Pickup Location"
        />
        <Marker
          coordinate={{
            latitude: dropoffLocation.latitude,
            longitude: dropoffLocation.longitude,
          }}
          title="Dropoff Location"
        />
      </MapView>

      <Card style={styles.bookingForm}>
        <ScrollView>
          <Input
            label="Pickup Location"
            value={pickupLocation.address}
            onChangeText={(text) =>
              setPickupLocation({ ...pickupLocation, address: text })
            }
            placeholder="Enter pickup address"
          />
          <Input
            label="Dropoff Location"
            value={dropoffLocation.address}
            onChangeText={(text) =>
              setDropoffLocation({ ...dropoffLocation, address: text })
            }
            placeholder="Enter dropoff address"
          />
          <Input
            label="Scheduled Time"
            value={scheduledTime}
            onChangeText={setScheduledTime}
            placeholder="Enter scheduled time"
          />
          <Button
            title="Book Now"
            onPress={handleBooking}
            loading={loading}
            style={styles.bookButton}
          />
        </ScrollView>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    height: '50%',
    width: '100%',
  },
  bookingForm: {
    flex: 1,
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  bookButton: {
    marginTop: 16,
  },
});

export default BookingScreen; 