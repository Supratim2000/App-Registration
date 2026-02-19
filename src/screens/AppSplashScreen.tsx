import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Modal, Pressable } from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/types';
import { retriveRegistrationDataFromAsyncStorage } from '../redux/slices/RegistrationSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'AppSplash'>;

const AppSplashScreen: React.FC<Props> = ({ navigation, route }): React.JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const { firstName, isInitialized } = useSelector((state: RootState) => state.registration );

    useEffect(() => {
        dispatch(retriveRegistrationDataFromAsyncStorage());
    }, []);

    useEffect(() => {
        if(isInitialized) {
            if(firstName === '') {
                navigation.replace('Registration');
            } else {
                navigation.replace('BottomTab');
            }
        }
    },[firstName, isInitialized]);

    return (
        <View style={styles.loadingContainer}>
            <View style={styles.loadingSubContainer}>
                <Text style={styles.splashHeading}>Checking registration data</Text>
                <ActivityIndicator size={80} color="#1778F2" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingSubContainer: {
        borderColor: '#c1c1c1',
        borderWidth: 1,
        padding: 8,
        borderRadius: 16
    },
    splashHeading: {
        fontFamily: 'CrimsonText-Bold',
        color: '#000000',
        fontSize: 28,
        textAlign: 'center'
    },
})

export default AppSplashScreen;