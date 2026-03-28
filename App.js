import React, { useMemo, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AuthScreen from './src/screens/auth/AuthScreen';
import RootNavigator from './src/navigation/RootNavigator';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F4F7FB',
    card: '#FFFFFF',
    primary: '#1E6BFF',
    text: '#1B1F2A',
    border: '#E4E8F0'
  }
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [vehicle, setVehicle] = useState({ make: 'Toyota', model: 'Corolla' });

  const addHistoryItem = (item) => {
    setOrderHistory((prev) => [{ id: Date.now().toString(), ...item }, ...prev]);
  };

  const appContext = useMemo(
    () => ({
      addHistoryItem,
      orderHistory,
      vehicle,
      setVehicle
    }),
    [orderHistory, vehicle]
  );

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style="dark" />
      {isAuthenticated ? (
        <RootNavigator appContext={appContext} onLogout={() => setIsAuthenticated(false)} />
      ) : (
        <AuthScreen onAuthSuccess={() => setIsAuthenticated(true)} />
      )}
    </NavigationContainer>
  );
}
