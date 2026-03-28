import React, { useMemo, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AuthScreen from './src/screens/auth/AuthScreen';
import RootNavigator from './src/navigation/RootNavigator';
import VehicleSetupScreen from './src/screens/vehicle/VehicleSetupScreen';

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
  const [authStage, setAuthStage] = useState('auth');
  const [orderHistory, setOrderHistory] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [defaultVehicleId, setDefaultVehicleId] = useState(null);

  const selectedVehicle = vehicles.find((v) => v.id === defaultVehicleId) || null;

  const addHistoryItem = (item) => {
    setOrderHistory((prev) => [{ id: Date.now().toString(), ...item }, ...prev]);
  };

  const addVehicle = (vehicle) => {
    const id = Date.now().toString();
    const newVehicle = { id, ...vehicle };
    setVehicles((prev) => [...prev, newVehicle]);
    if (!defaultVehicleId) setDefaultVehicleId(id);
  };

  const updateVehicle = (id, payload) => {
    setVehicles((prev) => prev.map((v) => (v.id === id ? { ...v, ...payload } : v)));
  };

  const deleteVehicle = (id) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
    if (defaultVehicleId === id) {
      const next = vehicles.find((v) => v.id !== id);
      setDefaultVehicleId(next?.id || null);
    }
  };

  const appContext = useMemo(
    () => ({
      addHistoryItem,
      orderHistory,
      vehicles,
      addVehicle,
      updateVehicle,
      deleteVehicle,
      defaultVehicleId,
      setDefaultVehicleId,
      selectedVehicle
    }),
    [orderHistory, vehicles, defaultVehicleId, selectedVehicle]
  );

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style="dark" />
      {authStage === 'auth' ? (
        <AuthScreen onAuthSuccess={() => setAuthStage('vehicle-setup')} />
      ) : null}

      {authStage === 'vehicle-setup' ? (
        <VehicleSetupScreen
          appContext={appContext}
          onContinue={() => setAuthStage('main')}
          onSkip={() => setAuthStage('main')}
        />
      ) : null}

      {authStage === 'main' ? <RootNavigator appContext={appContext} onLogout={() => setAuthStage('auth')} /> : null}
    </NavigationContainer>
  );
}
