import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, useWindowDimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { checkDateGreaterThanToday, checkEmailValidity, getFormatedDateLocalTimeZone } from '../utils/ProjectUtils';
import AppHeading from '../components/AppHeading';
import PhoneInput from 'react-native-phone-number-input';
import CustomDataInput from '../components/CustomDataInput';
import CustomDatePicker from '../components/CustomDatePicker';
import ContactInput from '../components/ContactInput';
import useIsPortrait from '../hooks/useIsPortrait';
import useEnable from '../hooks/useEnable';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Registration'>;

const RegistrationScreen : React.FC<Props> = ({navigation, route}) : React.JSX.Element => {
    const { width, height, isPortrait } = useIsPortrait();

    const phoneInputRef = useRef<PhoneInput>(null);

    const [firstNameErrorPresent, setFirstNameErrorPresent] = useState<boolean>(true);
    const [firstNameInputValue, setFirstNameInputValue] = useState<string>('');

    const [lastNameInputValue, setLastNameInputValue] = useState<string>('');

    const [addressErrorPresent, setAddressErrorPresent] = useState<boolean>(true);
    const [addressInputValue, setAddressInputValue] = useState<string>('');

    const [contactErrorPresent, setContactErrorPresent] = useState<boolean>(true);
    const [contactInputValue, setContactInputValue] = useState<string>("");

    const [emailErrorPresent, setEmailErrorPresent] = useState<boolean>(true);
    const [emailInputValue, setEmailInputValue] = useState<string>('');
    
    const [selectedDate, setSelectedDate] = useState<string>(getFormatedDateLocalTimeZone(new Date()));
    const [contactCodeValue, setContactCodeValue] = useState<string>("");
    const [isDobGreaterThanCurrent, setDobGreaterThanCurrent] = useState<boolean>(false);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState<boolean>(false);

    const isSignUpButtonDisabled = useEnable([
        firstNameErrorPresent,
        addressErrorPresent,
        contactErrorPresent,
        emailErrorPresent,
        isDobGreaterThanCurrent
    ]);

    const handleDatePickCancel = () : void => {
        setIsDatePickerVisible(false);
    };

    const handleSelectedDate = (date: Date) : void => {
        const { isGreater, formattedDate } = checkDateGreaterThanToday(date);
        setDobGreaterThanCurrent(isGreater);
        setSelectedDate(formattedDate);
        setIsDatePickerVisible(false);
    };

    const showDatePickerHandler = (): void => {
        setIsDatePickerVisible(true);
    };

    const navigateBasicInfoScreen = (): void => {
        navigation.navigate('BasicInfo', {
            firstName: firstNameInputValue.trim(),
            ...(lastNameInputValue && { lastName: lastNameInputValue.trim() }),
            address: addressInputValue.trim(),
            contact: contactCodeValue.trim(),
            email: emailInputValue.trim(),
            dob: selectedDate
        });
    };

    return (
        <>
            <AppHeading
                isPortrait={isPortrait}
                headingMessage='Welcome to App'/>

            <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
                <KeyboardAwareScrollView
                    enableOnAndroid
                    extraScrollHeight={10}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 10,
                        flexGrow: 1
                    }}
                >
                    <View style={styles.registerHeadingContiner}>
                        <Text style={styles.registerHeadingText}>Register</Text>
                    </View>
                            
                    <View style={styles.inputExtractionContainer}>
                        <CustomDataInput
                            heading='First Name'
                            infoType='first_name'
                            isMandatory={true}
                            isError={firstNameErrorPresent}
                            errorSetter={setFirstNameErrorPresent}
                            errorPrompt="First name field can't be empty"
                            inputData={firstNameInputValue}
                            setInputData={setFirstNameInputValue}
                        />

                        <CustomDataInput
                            heading='Last Name (Optional)'
                            infoType='last_name'
                            inputData={lastNameInputValue}
                            setInputData={setLastNameInputValue}
                        />

                        <CustomDataInput
                            heading='Address'
                            infoType='address'
                            isMandatory={true}
                            isError={addressErrorPresent}
                            errorSetter={setAddressErrorPresent}
                            errorPrompt="Address field can't be empty"
                            inputData={addressInputValue}
                            setInputData={setAddressInputValue}
                        />

                        <ContactInput
                            heading='Phone'
                            isMandatory={true}
                            isError={contactErrorPresent}
                            errorSetter={setContactErrorPresent}
                            errorPrompt="Contact details isn't valid"
                            contactRef={phoneInputRef}
                            defaultValue={contactInputValue}
                            defaultCode='IN'
                            contactCodeValue={contactCodeValue}
                            textChangeHandler={setContactInputValue}
                            textChangeFormattedHandler={setContactCodeValue}
                        />

                        <CustomDataInput
                            heading='Email'
                            infoType='email'
                            inputType='email-address'
                            isMandatory={true}
                            isError={emailErrorPresent}
                            errorSetter={setEmailErrorPresent}
                            errorPrompt='Entered email is invalid'
                            inputData={emailInputValue}
                            setInputData={setEmailInputValue}
                        />
                                
                        <CustomDatePicker
                            selectedDate={selectedDate}
                            isError={isDobGreaterThanCurrent}
                            errorPrompt="Date of birth can't be more than today"
                            datePickerHandler={showDatePickerHandler}
                            pickerVisible={isDatePickerVisible}
                            confirmHandler={handleSelectedDate}
                            cancelHandler={handleDatePickCancel}
                        />

                        <View style={styles.marginEffect}></View>
                        <View style={styles.marginEffect}></View>
                            
                        <TouchableOpacity
                            disabled={isSignUpButtonDisabled}
                            activeOpacity={0.5}
                            style={[styles.signUpButton, isSignUpButtonDisabled ? styles.disabledButton : styles.enabledButton]}
                            onPress={() => {
                                Keyboard.dismiss();
                                navigateBasicInfoScreen();
                            }}
                        >
                            <Text style={styles.signUpText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    headingContainerPortrait: {
        minHeight: 115,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
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
    registerHeadingContiner: {
        paddingHorizontal: 12
    },
    registerHeadingText: {
        fontSize: 36,
        fontFamily: 'PTSerif-Bold'
    },
    inputExtractionContainer: {
        padding: 12
    },
    marginEffect: {
        marginVertical: 2
    },
    signUpButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 12,
        borderRadius: 12,
    },
    disabledButton: {
        backgroundColor: '#4e4e4e',
        opacity: 0.7
    },
    enabledButton: {
        backgroundColor: '#1778F2',
        opacity: 1.0
    },
    signUpText: {
        fontFamily: 'CrimsonText-Bold',
        color: '#ffffff',
        fontSize: 20
    },
});

export default RegistrationScreen;