import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import RootStackNavigator from './src/navigation/RootStackNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { Store } from './src/redux/Store';

function App(): React.JSX.Element {
  return (
    <Provider store={Store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootStackNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
