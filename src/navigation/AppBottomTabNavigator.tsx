import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { AppBottomTabParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import BasketScreen from '../screens/BasketScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator<AppBottomTabParamList>();

const AppBottomTabNavigator: React.FC = (): React.JSX.Element => {
    return (
        <Tab.Navigator
        initialRouteName='Home'
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: string = '';

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } 
                    else if (route.name === 'Basket') {
                        iconName = focused ? 'cart' : 'cart-outline';
                    } 
                    else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#1778F2',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name='Home' component={HomeScreen}/>
            <Tab.Screen name='Basket' component={BasketScreen}/>
            <Tab.Screen name='Profile' component={ProfileScreen}/>
        </Tab.Navigator>
    );
}

export default AppBottomTabNavigator;