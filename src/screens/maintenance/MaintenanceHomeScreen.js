import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import InfoCard from '../../components/InfoCard';
import { maintenanceServices } from '../../data/mockData';
import VehicleSelectorCard from '../../components/VehicleSelectorCard';
import { colors } from '../../styles/theme';

export default function MaintenanceHomeScreen({ navigation, appContext }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Book maintenance at home</Text>
      <VehicleSelectorCard vehicle={appContext.vehicle} setVehicle={appContext.setVehicle} />
      <FlatList
        data={maintenanceServices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('MaintenanceBooking', { service: item })}>
            <InfoCard
              title={item.title}
              subtitle={`Est. ${item.priceRange} • Recommended: ${item.recommendedParts.slice(0, 2).join(', ')}`}
              rightNode={<Text style={styles.price}>${item.basePrice}</Text>}
            />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background
  },
  heading: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12
  },
  price: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 16
  }
});
