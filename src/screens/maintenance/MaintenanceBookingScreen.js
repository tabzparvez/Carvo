import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PrimaryButton from '../../components/PrimaryButton';
import { colors } from '../../styles/theme';

export default function MaintenanceBookingScreen({ route, navigation, appContext }) {
  const { service } = route.params;
  const [date, setDate] = useState(new Date());

  const bookService = () => {
    appContext.addHistoryItem({
      title: service.title,
      subtitle: `Maintenance • ${date.toLocaleString()}`,
      amount: `$${service.price}`
    });

    navigation.navigate('Success', {
      title: 'Service Booked',
      message: `${service.title} is scheduled for ${date.toLocaleString()}.`
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{service.title}</Text>
      <Text style={styles.price}>Fixed Price: ${service.price}</Text>
      <Text style={styles.label}>Choose Date & Time</Text>

      <View style={styles.pickerCard}>
        <DateTimePicker
          value={date}
          mode="datetime"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(_, selectedDate) => selectedDate && setDate(selectedDate)}
        />
      </View>

      <PrimaryButton label="Confirm Booking" onPress={bookService} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text
  },
  price: {
    marginTop: 6,
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700'
  },
  label: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: '700',
    color: colors.text
  },
  pickerCard: {
    padding: 8,
    borderRadius: 14,
    backgroundColor: '#fff',
    borderColor: colors.border,
    borderWidth: 1,
    marginBottom: 16
  }
});
