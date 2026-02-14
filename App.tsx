import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import RootStackNavigator from './src/navigation/RootStackNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
