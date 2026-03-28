import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { colors } from '../../styles/theme';

export default function CartScreen({ route, navigation, appContext }) {
  const cart = route.params?.cart || [];
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const confirmOrder = () => {
    appContext.addHistoryItem({
      title: `Parts Order (${cart.length} items)`,
      subtitle: cart[0]?.vehicleLabel || 'Spare parts marketplace',
      amount: `₨ ${total}`
    });

    navigation.navigate('Success', {
      title: 'Order Confirmed',
      message: `Your parts order of ₨ ${total} has been placed successfully.`
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemMeta}>{item.category} • {item.brand}</Text>
              <Text style={styles.itemMeta}>{item.oemRecommended ? 'OEM Recommended' : 'Aftermarket'}</Text>
              <Text style={styles.itemMeta}>Vehicle: {item.vehicleLabel}</Text>
              <Text style={styles.itemMeta}>Qty: {item.qty}</Text>
            </View>
            <Text style={styles.itemPrice}>{`₨ ${item.price * item.qty}`}</Text>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.total}>Total</Text>
            <Text style={styles.totalPrice}>{`₨ ${total}`}</Text>
          </View>
        }
      />

      <PrimaryButton label="Confirm Order" onPress={confirmOrder} disabled={cart.length === 0} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16
  },
  row: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemName: {
    fontWeight: '600',
    color: colors.text
  },
  itemPrice: {
    fontWeight: '700',
    color: colors.primary
  },
  itemMeta: {
    color: colors.subtext,
    fontSize: 12,
    marginTop: 2
  },
  footer: {
    marginTop: 8,
    marginBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  total: {
    fontWeight: '800',
    fontSize: 18,
    color: colors.text
  },
  totalPrice: {
    fontWeight: '800',
    fontSize: 18,
    color: colors.primary
  }
});
