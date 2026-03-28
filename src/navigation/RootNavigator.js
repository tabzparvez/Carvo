import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text } from 'react-native';
import EmergencyHomeScreen from '../screens/emergency/EmergencyHomeScreen';
import MechanicDetailsScreen from '../screens/emergency/MechanicDetailsScreen';
import TrackingScreen from '../screens/emergency/TrackingScreen';
import MaintenanceHomeScreen from '../screens/maintenance/MaintenanceHomeScreen';
import MaintenanceBookingScreen from '../screens/maintenance/MaintenanceBookingScreen';
import PartsHomeScreen from '../screens/parts/PartsHomeScreen';
import CartScreen from '../screens/parts/CartScreen';
import SuccessScreen from '../screens/SuccessScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import { colors } from '../styles/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function EmergencyStack({ appContext }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="EmergencyHome" options={{ title: 'Emergency Help' }}>
        {(props) => <EmergencyHomeScreen {...props} appContext={appContext} />}
      </Stack.Screen>
      <Stack.Screen name="MechanicDetails" component={MechanicDetailsScreen} options={{ title: 'Mechanic Details' }} />
      <Stack.Screen name="Tracking" component={TrackingScreen} />
      <Stack.Screen name="Success" component={SuccessScreen} options={{ title: 'Confirmation' }} />
    </Stack.Navigator>
  );
}

function MaintenanceStack({ appContext }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MaintenanceHome" options={{ title: 'Maintenance' }}>
        {(props) => <MaintenanceHomeScreen {...props} appContext={appContext} />}
      </Stack.Screen>
      <Stack.Screen name="MaintenanceBooking" options={{ title: 'Schedule Service' }}>
        {(props) => <MaintenanceBookingScreen {...props} appContext={appContext} />}
      </Stack.Screen>
      <Stack.Screen name="Success" component={SuccessScreen} options={{ title: 'Confirmation' }} />
    </Stack.Navigator>
  );
}

function PartsStack({ appContext }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PartsHome" options={{ title: 'Spare Parts' }}>
        {(props) => <PartsHomeScreen {...props} appContext={appContext} />}
      </Stack.Screen>
      <Stack.Screen name="Cart" options={{ title: 'Cart' }}>
        {(props) => <CartScreen {...props} appContext={appContext} />}
      </Stack.Screen>
      <Stack.Screen name="Success" component={SuccessScreen} options={{ title: 'Order Placed' }} />
      <Stack.Screen name="History" options={{ title: 'Order History' }}>
        {(props) => <OrderHistoryScreen {...props} appContext={appContext} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function RootNavigator({ appContext, onLogout }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerRight: () => (
          <Pressable onPress={onLogout} style={styles.logout} accessibilityRole="button" accessibilityLabel="Logout">
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        ),
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabItem,
        tabBarLabelStyle: styles.tabLabel,
        tabBarActiveTintColor: route.name === 'Emergency' ? colors.primary : colors.subtext,
        tabBarInactiveTintColor: colors.subtext,
        tabBarIcon: ({ focused, size }) => {
          const icons = {
            Emergency: 'alert-circle',
            Maintenance: 'construct',
            Parts: 'cart'
          };
          const iconColor = route.name === 'Emergency' && focused ? colors.primary : colors.subtext;
          return <Ionicons name={icons[route.name]} size={size} color={iconColor} />;
        }
      })}
    >
      <Tab.Screen name="Emergency" options={{ headerShown: false }}>
        {(props) => <EmergencyStack {...props} appContext={appContext} />}
      </Tab.Screen>
      <Tab.Screen name="Maintenance" options={{ headerShown: false }}>
        {(props) => <MaintenanceStack {...props} appContext={appContext} />}
      </Tab.Screen>
      <Tab.Screen name="Parts" options={{ headerShown: false }}>
        {(props) => <PartsStack {...props} appContext={appContext} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  logout: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: colors.primarySoft
  },
  logoutText: {
    color: colors.primary,
    fontWeight: '600'
  },
  tabBar: {
    height: 66,
    paddingBottom: 6,
    paddingTop: 6
  },
  tabItem: {
    paddingVertical: 4
  },
  tabLabel: {
    fontWeight: '700',
    fontSize: 12
  }
});
