import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import InfoCard from '../components/InfoCard';
import { colors } from '../styles/theme';

export default function OrderHistoryScreen({ appContext }) {
  const { orderHistory } = appContext;

  return (
    <View style={styles.container}>
      {orderHistory.length === 0 ? (
        <Text style={styles.empty}>No orders yet. Complete a booking to see history.</Text>
      ) : (
        <FlatList
          data={orderHistory}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <InfoCard title={item.title} subtitle={item.subtitle} rightNode={<Text style={styles.amount}>{item.amount}</Text>} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background
  },
  empty: {
    color: colors.subtext,
    textAlign: 'center',
    marginTop: 32
  },
  amount: {
    color: colors.primary,
    fontWeight: '700'
  }
});
