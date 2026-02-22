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
    const { firstName, loading, error } = useSelector((state: RootState) => state.registration );

    useEffect(() => {
        dispatch(retriveRegistrationDataFromAsyncStorage());
    }, []);

    useEffect(() => {
        if(!loading && !error) {
            firstName === '' ? navigation.replace('Registration') : navigation.replace('BottomTab');
        }
    },[loading]);

    return (
        <View style={styles.loadingContainer}>
            {
                error?
                    <View style={styles.errorSubContainer}>
                        <Text style={styles.errorHeading}>Failed to fetch user data!</Text>
                    </View>
                    :
                    <View style={styles.loadingSubContainer}>
                        <Text style={styles.splashHeading}>Checking registration data...</Text>
                        <ActivityIndicator size={80} color="#1778F2" />
                    </View>
            }
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
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8
    },
    errorSubContainer: {
        borderColor: '#ff3333',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        elevation: 4,
        shadowColor: '#ff3333',
        shadowOpacity: 0.1,
        shadowRadius: 8
    },
    splashHeading: {
        fontFamily: 'CrimsonText-Bold',
        color: '#000000',
        fontSize: 28,
        textAlign: 'center'
    },
    errorHeading: {
        fontFamily: 'CrimsonText-Bold',
        color: '#ff3333',
        fontSize: 28,
        textAlign: 'center'
    }
})

export default AppSplashScreen;