import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Card, Button } from '@drivemate/ui';
import { Chauffeur } from '@drivemate/types';

const ChauffeurProfileScreen = () => {
  const { chauffeurId } = useLocalSearchParams<{ chauffeurId: string }>();
  // TODO: Fetch chauffeur data using chauffeurId
  const chauffeur: Partial<Chauffeur> = {
    name: 'John Doe',
    rating: 4.8,
    totalRides: 150,
    vehicleInfo: {
      make: 'Toyota',
      model: 'Camry',
      year: 2022,
      color: 'Black',
      licensePlate: 'ABC123',
    },
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        <Card style={styles.infoCard}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{chauffeur.name}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>{chauffeur.rating} ★</Text>
              <Text style={styles.rides}>({chauffeur.totalRides} rides)</Text>
            </View>
          </View>
        </Card>
      </View>

      <Card style={styles.vehicleCard}>
        <Text style={styles.sectionTitle}>Vehicle Information</Text>
        <View style={styles.vehicleInfo}>
          <Text style={styles.vehicleText}>
            {chauffeur.vehicleInfo?.year} {chauffeur.vehicleInfo?.make}{' '}
            {chauffeur.vehicleInfo?.model}
          </Text>
          <Text style={styles.vehicleText}>
            Color: {chauffeur.vehicleInfo?.color}
          </Text>
          <Text style={styles.vehicleText}>
            License: {chauffeur.vehicleInfo?.licensePlate}
          </Text>
        </View>
      </Card>

      <Card style={styles.actionsCard}>
        <Button
          title="Book This Chauffeur"
          onPress={() => {
            // TODO: Navigate to booking screen with chauffeurId
          }}
          style={styles.bookButton}
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 16,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  infoCard: {
    width: '100%',
    padding: 16,
  },
  nameContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 18,
    color: '#FFD700',
    marginRight: 8,
  },
  rides: {
    fontSize: 16,
    color: '#666',
  },
  vehicleCard: {
    margin: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  vehicleInfo: {
    gap: 8,
  },
  vehicleText: {
    fontSize: 16,
    color: '#333',
  },
  actionsCard: {
    margin: 16,
    padding: 16,
  },
  bookButton: {
    marginTop: 8,
  },
});

export default ChauffeurProfileScreen; 