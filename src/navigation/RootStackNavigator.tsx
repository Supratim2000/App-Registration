import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import RegistrationScreen from '../screens/RegistrationScreen';
import BasicInfoScreen from '../screens/BasicInfoScreen';
import AppBottomTabNavigator from './AppBottomTabNavigator';
import AppSplashScreen from '../screens/AppSplashScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator : React.FC = () : React.JSX.Element => {
    return (
        <Stack.Navigator
        initialRouteName='AppSplash'
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right'
            }}
        >
            <Stack.Screen name='AppSplash' component={AppSplashScreen}/>
            <Stack.Screen name='Registration' component={RegistrationScreen}/>
            <Stack.Screen name='BasicInfo' component={BasicInfoScreen}/>
            <Stack.Screen name='BottomTab' component={AppBottomTabNavigator}/>
        </Stack.Navigator>
    );
};

export default RootStackNavigator;