import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Card, Button } from '@drivemate/ui';

const SettingsScreen = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement account deletion logic
            router.replace('/welcome');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Push Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notifications ? '#2196F3' : '#f4f3f4'}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Location Services</Text>
          <Switch
            value={locationServices}
            onValueChange={setLocationServices}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={locationServices ? '#2196F3' : '#f4f3f4'}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={darkMode ? '#2196F3' : '#f4f3f4'}
          />
        </View>
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <Button
          title="Change Password"
          onPress={() => {
            // TODO: Navigate to change password screen
          }}
          variant="outline"
          style={styles.settingButton}
        />
        <Button
          title="Privacy Policy"
          onPress={() => {
            // TODO: Navigate to privacy policy screen
          }}
          variant="outline"
          style={styles.settingButton}
        />
        <Button
          title="Terms of Service"
          onPress={() => {
            // TODO: Navigate to terms of service screen
          }}
          variant="outline"
          style={styles.settingButton}
        />
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <Button
          title="Contact Support"
          onPress={() => {
            // TODO: Navigate to support screen
          }}
          variant="outline"
          style={styles.settingButton}
        />
        <Button
          title="FAQ"
          onPress={() => {
            // TODO: Navigate to FAQ screen
          }}
          variant="outline"
          style={styles.settingButton}
        />
      </Card>

      <Button
        title="Delete Account"
        onPress={handleDeleteAccount}
        variant="outline"
        style={[styles.settingButton, styles.deleteButton]}
      />

      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    margin: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  settingButton: {
    marginVertical: 8,
  },
  deleteButton: {
    margin: 16,
    borderColor: '#F44336',
  },
  version: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 16,
  },
});

export default SettingsScreen; 