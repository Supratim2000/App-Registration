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
                headingMessage='Welcome to App'/>

            <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
                <Modal
                    visible={showModal}
                    transparent
                    animationType="fade"
                >
                    <Pressable
                        style={styles.modalOverlay}
                        onPress={() => setShowModal(false)}
                    >
                        <Pressable
                            style={styles.modalContainer}
                            onPress={(_event) => _event.stopPropagation()}
                        >
                            <Text style={styles.modalText}>
                                Do you want to proceed with registration?
                            </Text>

                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    style={[styles.modalButton, styles.cancelButton]}
                                    onPress={() => setShowModal(false)}
                                >
                                    <Text style={styles.blueText}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                activeOpacity={0.5}
                                    style={[styles.modalButton, styles.okButton]}
                                    onPress={() => {
                                        setShowModal(false);
                                        handleFormSubmit();
                                    }}
                                >
                                    <Text style={styles.whiteText}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </Pressable>
                    </Pressable>
                </Modal>
                <ScrollView contentContainerStyle={{ padding: 8 }}>
                    <View style={styles.basicInfoHeadingContiner}>
                        <Text style={styles.basicInfoHeadingText}>Basic Info</Text>
                    </View>

                    <View style={styles.marginEffect}></View>

                    <View style={styles.basicInfoContainer}>
                        <DataViewer heading='First Name' content={firstName}/>
                        <View style={styles.marginEffect}></View>

                        { lastName && <DataViewer heading='Last Name' content={lastName}/> }
                        { lastName && <View style={styles.marginEffect}></View> }

                        <DataViewer heading='Address' content={address}/>
                        <View style={styles.marginEffect}></View>

                        <DataViewer heading='Phone' content={contact}/>
                        <View style={styles.marginEffect}></View>

                        <DataViewer heading='Email' content={email}/>
                        <View style={styles.marginEffect}></View>

                        <DataViewer heading='DOB' content={dob}/>
                        <View style={styles.marginEffect}></View>

                        <DataViewer heading='State' content={state}/>
                        <View style={styles.marginEffect}></View>

                        <DataViewer heading='Gender' content={gender}/>
                        <View style={styles.marginEffect}></View>
                    </View>

                    <View style={styles.marginEffect}></View>
                    <View style={styles.marginEffect}></View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.buttonTouchableOpacity, styles.editButton]}
                            activeOpacity={0.5}
                            onPress={() => {
                                navigation.goBack();
                            }}
                        >
                            <Text style={[styles.buttonTouchableOpacityText, styles.blueText]}>Edit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            disabled={isSubmited}
                            style={[styles.buttonTouchableOpacity, styles.submitBotton, isSubmited && { opacity: 0.7 }]}
                            activeOpacity={0.5}
                            onPress={() => {
                                setShowModal(true);
                            }}
                        >
                            { !isSubmited ?
                                <Text style={[styles.buttonTouchableOpacityText, styles.whiteText]}>Submit</Text>
                                :
                                <ActivityIndicator color="#ffffff"/> }
                        </TouchableOpacity>
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
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8
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
        padding: 4,
        marginHorizontal: 8,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#acacac',
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