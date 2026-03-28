import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import InfoCard from '../../components/InfoCard';
import { maintenanceServices } from '../../data/mockData';
import { colors } from '../../styles/theme';

export default function MaintenanceHomeScreen({ navigation, appContext }) {
  const vehicle = appContext.selectedVehicle;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Home Maintenance Booking</Text>
      <InfoCard
        title="Selected Vehicle"
        subtitle={vehicle ? `${vehicle.make} ${vehicle.model} (${vehicle.year}) • ${vehicle.fuelType}` : 'Please add a default vehicle first'}
      />
      <FlatList
        data={maintenanceServices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('MaintenanceBooking', { service: item })}>
            <InfoCard
              title={item.title}
              subtitle={`Est. ${item.priceRangePkr} • Recommended: ${item.recommendedParts.slice(0, 2).join(', ')}`}
              rightNode={<Text style={styles.price}>{item.priceRangePkr}</Text>}
            />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: colors.background },
  heading: { fontSize: 20, fontWeight: '800', color: colors.text, marginBottom: 8 },
  price: { color: colors.primary, fontWeight: '800', fontSize: 13 }
});
