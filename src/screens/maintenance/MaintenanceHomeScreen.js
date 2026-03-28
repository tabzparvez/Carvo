import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import InfoCard from '../../components/InfoCard';
import { maintenanceServices } from '../../data/mockData';
import { colors } from '../../styles/theme';

export default function MaintenanceHomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Book maintenance at home</Text>
      <FlatList
        data={maintenanceServices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('MaintenanceBooking', { service: item })}>
            <InfoCard
              title={item.title}
              subtitle={`Fixed price service`}
              rightNode={<Text style={styles.price}>${item.price}</Text>}
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
