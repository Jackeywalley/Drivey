import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Button } from '@drivemate/ui';
import { Transaction, Client } from '@drivemate/types';

const WalletScreen = () => {
  // TODO: Fetch wallet data from API
  const wallet: Partial<Client> = {
    walletBalance: 250.75,
  };

  const transactions: Partial<Transaction>[] = [
    {
      id: '1',
      amount: 50.00,
      type: 'credit',
      status: 'completed',
      createdAt: '2024-03-15T10:00:00Z',
    },
    {
      id: '2',
      amount: 25.50,
      type: 'debit',
      status: 'completed',
      createdAt: '2024-03-14T15:30:00Z',
    },
    // Add more sample transactions as needed
  ];

  const renderTransactionItem = ({ item }: { item: Partial<Transaction> }) => (
    <Card style={styles.transactionCard}>
      <View style={styles.transactionHeader}>
        <Text style={styles.transactionType}>
          {item.type === 'credit' ? 'Added Funds' : 'Ride Payment'}
        </Text>
        <Text
          style={[
            styles.transactionAmount,
            { color: item.type === 'credit' ? '#4CAF50' : '#F44336' },
          ]}
        >
          {item.type === 'credit' ? '+' : '-'}${item.amount?.toFixed(2)}
        </Text>
      </View>
      <View style={styles.transactionFooter}>
        <Text style={styles.transactionDate}>
          {new Date(item.createdAt!).toLocaleDateString()}
        </Text>
        <Text style={styles.transactionStatus}>{item.status}</Text>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Card style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={styles.balanceAmount}>
          ${wallet.walletBalance?.toFixed(2)}
        </Text>
        <Button
          title="Add Funds"
          onPress={() => {
            // TODO: Navigate to add funds screen
          }}
          style={styles.addFundsButton}
        />
      </Card>

      <View style={styles.transactionsContainer}>
        <Text style={styles.sectionTitle}>Transaction History</Text>
        <FlatList
          data={transactions}
          renderItem={renderTransactionItem}
          keyExtractor={(item) => item.id!}
          contentContainerStyle={styles.transactionsList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  balanceCard: {
    margin: 16,
    padding: 16,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  addFundsButton: {
    width: 200,
  },
  transactionsContainer: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  transactionsList: {
    gap: 12,
  },
  transactionCard: {
    padding: 16,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  transactionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
  },
  transactionStatus: {
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
  },
});

export default WalletScreen; 