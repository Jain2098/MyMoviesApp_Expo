import React from 'react';
import AppNavigator from './AppNavigator';
import { View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <AppNavigator />
      </View>
  );
}