import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import RegistrationScreen from '../screens/RegistrationScreen';
import BasicInfoScreen from '../screens/BasicInfoScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();


const RootStackNavigator : React.FC = () : React.JSX.Element => {
    return (
        <Stack.Navigator
        initialRouteName='Registration'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='Registration' component={RegistrationScreen}/>
            <Stack.Screen name='BasicInfo' component={BasicInfoScreen}/>
        </Stack.Navigator>
    );
};

export default RootStackNavigator;