import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import InfoCard from '../../components/InfoCard';
import PrimaryButton from '../../components/PrimaryButton';
import { spareParts } from '../../data/mockData';
import { colors } from '../../styles/theme';

export default function PartsHomeScreen({ navigation }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Marketplace</Text>
        <Pressable onPress={() => navigation.navigate('History')}>
          <Text style={styles.history}>Order History</Text>
        </Pressable>
      </View>

      <FlatList
        data={spareParts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <InfoCard
            title={item.name}
            subtitle="Ready to deliver"
            rightNode={<Text style={styles.price}>${item.price}</Text>}
          >
            <Pressable style={styles.orderBtn} onPress={() => addToCart(item)}>
              <Text style={styles.orderText}>Order</Text>
            </Pressable>
          </InfoCard>
        )}
      />

      <PrimaryButton
        label={`Go to Cart (${cart.length})`}
        onPress={() => navigation.navigate('Cart', { cart })}
        disabled={cart.length === 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
    gap: 10
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  heading: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text
  },
  history: {
    color: colors.primary,
    fontWeight: '700'
  },
  price: {
    fontWeight: '800',
    color: colors.primary
  },
  orderBtn: {
    marginTop: 8,
    borderRadius: 10,
    backgroundColor: colors.primarySoft,
    paddingVertical: 10,
    alignItems: 'center'
  },
  orderText: {
    color: colors.primary,
    fontWeight: '700'
  }
});
