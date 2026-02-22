import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Modal, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../navigation/types';
import useIsPortrait from '../hooks/useIsPortrait';
import DataViewer from '../components/DataViewer';
import AppHeading from '../components/AppHeading';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/types';
import { saveRegistrationDataIntoAsyncStorage } from '../redux/slices/RegistrationSlice';
import CustomButton from '../components/CustomButton';
import UserInfo from '../components/UserInfo';

type Props = NativeStackScreenProps<RootStackParamList, 'BasicInfo'>;

const BasicInfoScreen : React.FC<Props> = ({ navigation, route }) : React.JSX.Element => {
    const { firstName, lastName, address, contact, email, dob, state, gender } = route.params;
    const { width, height, isPortrait } = useIsPortrait();
    const [isSubmited, setIsSubmited] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();
    
    const handleFormSubmit = async (): Promise<void> =>{
        try {
            setIsSubmited(true);
            await dispatch(saveRegistrationDataIntoAsyncStorage(route.params)).unwrap();

            navigation.reset({
                index: 0,
                routes: [{ name: 'BottomTab' }],
            });
        } catch(error) {
            console.error(error);
        } finally {
            setIsSubmited(false);
        }
    }

    return (
        <>
            <AppHeading
                isPortrait={isPortrait}
                headingMessage='Welcome to App'
            />

            <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
                <Modal
                    visible={showModal}
                    transparent
                    animationType="fade">
                    <Pressable
                        style={styles.modalOverlay}
                        onPress={() => setShowModal(false)}>
                        <Pressable
                            style={styles.modalContainer}
                            onPress={(_event) => _event.stopPropagation()}>
                            <Text style={styles.modalText}>
                                Do you want to proceed with registration?
                            </Text>

                            <View style={styles.modalButtonContainer}>
                                <CustomButton
                                    buttonText='Cancel'
                                    pressHandler={() => { setShowModal(false) }}
                                    buttonStyle={{...styles.modalButton, ...styles.cancelButton}}
                                    textStyle={styles.blueText}/>
                                
                                <CustomButton
                                    buttonText='OK'
                                    pressHandler={() => {
                                        setShowModal(false);
                                        handleFormSubmit();
                                    }}
                                    buttonStyle={{...styles.modalButton, ...styles.okButton}}
                                    textStyle={styles.whiteText}/>
                            </View>
                        </Pressable>
                    </Pressable>
                </Modal>

                <ScrollView contentContainerStyle={{ padding: 8 }}>
                    <View style={[styles.basicInfoHeadingContiner, { marginBottom: 4 }]}>
                        <Text style={styles.basicInfoHeadingText}>Basic Info</Text>
                    </View>

                    <View style={styles.basicInfoContainer}>
                        <UserInfo heading="First Name" value={firstName} />
                        {lastName && <UserInfo heading="Last Name" value={lastName} />}
                        <UserInfo heading="Address" value={address} />
                        <UserInfo heading="Phone" value={contact} />
                        <UserInfo heading="Email" value={email} />
                        <UserInfo heading="DOB" value={dob} />
                        <UserInfo heading="State" value={state} />
                        <UserInfo heading="Gender" value={gender} />
                    </View>

                    <View style={[styles.buttonContainer, { marginTop: 18 }]}>
                        <CustomButton
                            buttonText='Edit'
                            pressHandler={() =>{ navigation.goBack() }}
                            buttonStyle={{...styles.buttonTouchableOpacity, ...styles.editButton}}
                            textStyle={{...styles.buttonTouchableOpacityText, ...styles.blueText}}/>

                        <CustomButton
                            isDisabled={isSubmited}
                            showLoadingIndicator={isSubmited}
                            buttonText='Submit'
                            pressHandler={() =>{ setShowModal(true) }}
                            buttonStyle={{...styles.buttonTouchableOpacity, ...styles.submitBotton}}
                            disableStyle={{ opacity: 0.7 }}
                            textStyle={{...styles.buttonTouchableOpacityText, ...styles.whiteText}}/>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    headingContainerPortrait: {
        minHeight: 115,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headingContainerLandscape: {
        minHeight: 90,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    headingText: {
        color: '#FFFFFF',
        fontSize: 26,
        fontWeight: 'bold',
    },
    basicInfoHeadingContiner: {
        paddingHorizontal: 8
    },
    basicInfoHeadingText: {
        fontSize: 36,
        fontFamily: 'PTSerif-Bold'
    },
    basicInfoContainer: {
        marginHorizontal: 8,
        borderColor: '#acacac',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
    },
    marginEffect: {
        marginVertical: 4
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 8
    },
    buttonTouchableOpacity: {
        height: 48,
        width: '49%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    submitBotton: {
        backgroundColor: '#1778F2'
    },
    editButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#1778F2',
    },
    buttonTouchableOpacityText: {
        fontFamily: 'CrimsonText-Bold',
        fontSize: 18
    },
    blueText: {
        color: '#1778F2',
    },
    whiteText: {
        color: '#ffffff',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 12,
    },
    modalText: {
        fontSize: 18,
        fontFamily: 'PTSerif-Regular',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        width: '48%',
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    okButton: {
        backgroundColor: '#1778F2',
    },
    cancelButton: {
        borderWidth: 1,
        borderColor: '#1778F2',
    }
});

export default BasicInfoScreen;