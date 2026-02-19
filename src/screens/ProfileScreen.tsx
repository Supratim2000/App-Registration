import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useCallback, useState } from 'react';
import { AppBottomTabParamList } from '../navigation/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/types';
import { useFocusEffect } from '@react-navigation/native';
import { clearRegistrationDataFromAsyncStorage, retriveRegistrationDataFromAsyncStorage } from '../redux/slices/RegistrationSlice';
import UserInfo from '../components/UserInfo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';

type Props = BottomTabScreenProps<AppBottomTabParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = ({ navigation, route }): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { firstName, lastName, address, contact, email, dob, state, gender, loading } = useSelector((state: RootState) => state.registration);

  const [ userLoggingOut, setUserLoggingOut] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      dispatch(retriveRegistrationDataFromAsyncStorage());
    }, [])
  );

  const handleLogout = async () => {
    setUserLoggingOut(true);
    await dispatch(clearRegistrationDataFromAsyncStorage());

    navigation.dispatch(
    CommonActions.reset({
        index: 0,
        routes: [{ name: 'Registration' }],
      })
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top' , 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Profile Information</Text>

          <TouchableOpacity
            disabled={userLoggingOut}
            style={[styles.logoutButton, userLoggingOut && styles.logoutButtonDisabled]}
            activeOpacity={0.7}
            onPress={handleLogout}
          >
            {!userLoggingOut ? <Text style={styles.logoutText}>Logout</Text> : <ActivityIndicator color="#ffffff"/>}
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <UserInfo heading="First Name" value={firstName} />
          <UserInfo heading="Last Name" value={lastName} />
          <UserInfo heading="Address" value={address} />
          <UserInfo heading="Contact" value={contact} />
          <UserInfo heading="Email" value={email} />
          <UserInfo heading="Date of Birth" value={dob} />
          <UserInfo heading="State" value={state} />
          <UserInfo heading="Gender" value={gender} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    backgroundColor: '#f5f6fa',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoutButton: {
    width: 90,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#1778F2',
    justifyContent: 'center',
    alignItems: 'center'
  },

  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  logoutButtonDisabled: {
    backgroundColor: '#A0C4FF'
  }
});

export default ProfileScreen;