import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import InfoCard from '../../components/InfoCard';
import PrimaryButton from '../../components/PrimaryButton';
import { nearbyMechanics } from '../../data/mockData';
import { colors } from '../../styles/theme';

export default function EmergencyHomeScreen({ navigation }) {
  const [location, setLocation] = useState(null);

  const detectLocation = () => {
    setLocation({ address: 'Downtown Avenue, Sector 12', lat: '24.8607', lng: '67.0011' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>Need urgent roadside help?</Text>
        <Text style={styles.heroSubtitle}>Tap emergency and instantly connect with nearby mechanics.</Text>
        <PrimaryButton label="Emergency" onPress={detectLocation} />
      </View>

      {location ? (
        <InfoCard title="Detected Location" subtitle={`${location.address} • ${location.lat}, ${location.lng}`} />
      ) : null}

      <Text style={styles.sectionTitle}>Nearby mechanics</Text>
      <FlatList
        data={nearbyMechanics}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('MechanicDetails', { mechanic: item })}>
            <InfoCard
              title={item.name}
              subtitle={`⭐ ${item.rating} • ETA ${item.eta} • ${item.distance}`}
              rightNode={<Text style={styles.select}>Select</Text>}
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
    backgroundColor: colors.background,
    padding: 16
  },
  heroCard: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 16,
    borderColor: colors.border,
    borderWidth: 1,
    marginBottom: 14
  },
  heroTitle: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 20
  },
  heroSubtitle: {
    color: colors.subtext,
    marginVertical: 10
  },
  sectionTitle: {
    marginVertical: 10,
    color: colors.text,
    fontWeight: '700',
    fontSize: 16
  },
  select: {
    color: colors.primary,
    fontWeight: '700'
  }
});
