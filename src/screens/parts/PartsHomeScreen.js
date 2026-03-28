import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import InfoCard from '../../components/InfoCard';
import PrimaryButton from '../../components/PrimaryButton';
import { partsCatalog, smartRecommendations } from '../../data/mockData';
import { colors } from '../../styles/theme';

export default function PartsHomeScreen({ navigation, appContext }) {
  const vehicle = appContext.selectedVehicle;
  const [cart, setCart] = useState([]);
  const [selectedBrandMap, setSelectedBrandMap] = useState({});
  const [qtyMap, setQtyMap] = useState({});

  const recommendation = useMemo(() => {
    const mileage = vehicle?.mileage || 0;
    return mileage > 80000 ? smartRecommendations.highMileage : smartRecommendations.lowMileage;
  }, [vehicle]);

  const addToCart = (item) => {
    const brand = selectedBrandMap[item.id] || item.brands[0];
    const qty = qtyMap[item.id] || 1;
    const price = 2500 + item.id.length * 300;

    setCart((prev) => [
      ...prev,
      {
        id: item.id,
        name: item.category,
        category: item.category,
        brand,
        price,
        qty,
        oemRecommended: recommendation.suggestedBrands.includes(brand),
        vehicleLabel: vehicle ? `${vehicle.make} ${vehicle.model} ${vehicle.year}` : 'No vehicle'
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Parts</Text>
        <Pressable onPress={() => navigation.navigate('History')}>
          <Text style={styles.history}>Order History</Text>
        </Pressable>
      </View>

      <InfoCard
        title="Selected Vehicle"
        subtitle={vehicle ? `${vehicle.make} ${vehicle.model} (${vehicle.year}) • ${vehicle.fuelType}` : 'No default vehicle selected'}
      />

      <InfoCard
        title="Smart Recommendations"
        subtitle={`Oil: ${recommendation.oilType} • Tyre: ${recommendation.tyreSize} • Battery: ${recommendation.battery}`}
      >
        <Text style={styles.recBrands}>Recommended brands: {recommendation.suggestedBrands.join(', ')}</Text>
      </InfoCard>

      <FlatList
        data={partsCatalog}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const selectedBrand = selectedBrandMap[item.id] || item.brands[0];
          const qty = qtyMap[item.id] || 1;
          return (
            <InfoCard title={item.category} subtitle={`Brand: ${selectedBrand} • Price: ₨ ${2500 + item.id.length * 300}`}>
              <View style={styles.wrap}>
                {item.brands.map((brand) => (
                  <Pressable
                    key={brand}
                    style={[styles.chip, selectedBrand === brand && styles.chipActive]}
                    onPress={() => setSelectedBrandMap((prev) => ({ ...prev, [item.id]: brand }))}
                  >
                    <Text style={[styles.chipText, selectedBrand === brand && styles.chipTextActive]}>{brand}</Text>
                  </Pressable>
                ))}
              </View>

              <View style={styles.qtyRow}>
                <Text style={styles.meta}>Quantity</Text>
                <View style={styles.qtyControls}>
                  <Pressable style={styles.qtyBtn} onPress={() => setQtyMap((prev) => ({ ...prev, [item.id]: Math.max(1, qty - 1) }))}><Text>-</Text></Pressable>
                  <Text style={styles.qtyValue}>{qty}</Text>
                  <Pressable style={styles.qtyBtn} onPress={() => setQtyMap((prev) => ({ ...prev, [item.id]: qty + 1 }))}><Text>+</Text></Pressable>
                </View>
              </View>

              <Pressable style={styles.orderBtn} onPress={() => addToCart(item)}>
                <Text style={styles.orderText}>Add to Cart</Text>
              </Pressable>
            </InfoCard>
          );
        }}
      />

      <PrimaryButton label={`Go to Cart (${cart.length})`} onPress={() => navigation.navigate('Cart', { cart })} disabled={cart.length === 0} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: colors.background },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  heading: { fontSize: 20, fontWeight: '800', color: colors.text },
  history: { color: colors.primary, fontWeight: '700' },
  recBrands: { color: colors.subtext, fontSize: 12, fontWeight: '600' },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  chip: { borderWidth: 1, borderColor: colors.border, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6, backgroundColor: '#fff' },
  chipActive: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  chipText: { color: colors.subtext, fontSize: 12, fontWeight: '600' },
  chipTextActive: { color: colors.primary, fontWeight: '700' },
  meta: { color: colors.subtext, fontWeight: '600' },
  qtyRow: { marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  qtyControls: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qtyBtn: { width: 26, height: 26, borderWidth: 1, borderColor: colors.border, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  qtyValue: { fontWeight: '700', color: colors.text },
  orderBtn: { marginTop: 8, borderRadius: 10, backgroundColor: colors.primarySoft, paddingVertical: 10, alignItems: 'center' },
  orderText: { color: colors.primary, fontWeight: '800' }
});
