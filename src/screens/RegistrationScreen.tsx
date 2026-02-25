import React, { useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Keyboard, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { checkDateGreaterThanToday, isMobilePortrait } from '../utils/ProjectUtils';
import AppHeading from '../components/AppHeading';
import PhoneInput from 'react-native-phone-number-input';
import useIsPortrait from '../hooks/useIsPortrait';
import useEnable from '../hooks/useEnable';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { FieldType, GENDER_SELECTOR_OPTIONS, RadioValue, STATE_DATA } from '../utils/ProjectConstants';
import CustomButton from '../components/CustomButton';
import FormField from '../components/FormField';
import { useDevicetype } from '../hooks/useDeviceType';

type Props = NativeStackScreenProps<RootStackParamList, 'Registration'>;

const RegistrationScreen : React.FC<Props> = ({ navigation, route }) : React.JSX.Element => {
    const insets = useSafeAreaInsets();
    const { width, height, isPortrait } = useIsPortrait();
    const deviceType: string = useDevicetype();

    const phoneInputRef = useRef<PhoneInput>(null);

    const [firstNameErrorPresent, setFirstNameErrorPresent] = useState<boolean>(true);
    const [firstNameInputValue, setFirstNameInputValue] = useState<string>('');

    const [lastNameInputValue, setLastNameInputValue] = useState<string>('');

    const [addressErrorPresent, setAddressErrorPresent] = useState<boolean>(true);
    const [addressInputValue, setAddressInputValue] = useState<string>('');

    const [contactInputValue, setContactInputValue] = useState<string>("");
    const [fullyQualifiedContactValue, setFullyQualifiedContactValue] = useState<string>('');
    const [contactErrorPresent, setContactErrorPresent] = useState<boolean>(true);

    const [emailErrorPresent, setEmailErrorPresent] = useState<boolean>(true);
    const [emailInputValue, setEmailInputValue] = useState<string>('');
    
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [isDateErrorPresent, setIsDateErrorPresent] = useState<boolean>(true);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState<boolean>(false);

    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [isStateSelectorError, setIsStateSelectorError] = useState<boolean>(true);

    const [selectedGender, setSelectedGender] = useState<RadioValue | null>(null);
    const [genderErrorPresent, setGenderErrorPresent] = useState<boolean>(true);

    const isSignUpButtonDisabled = useEnable([
        firstNameErrorPresent,
        addressErrorPresent,
        contactErrorPresent,
        emailErrorPresent,
        isDateErrorPresent,
        isStateSelectorError,
        genderErrorPresent
    ]);

    const isMobileLayout = isMobilePortrait(deviceType, isPortrait);

    const inputWidthStyle = useMemo(() => (
        isMobileLayout ? { width: '100%' } as ViewStyle : { width: '49%' } as ViewStyle
    ), [isMobileLayout]);

    const handleDatePickCancel = () : void => {
        setIsDatePickerVisible(false);
    };

    const handleSelectedDate = (date: Date) : void => {
        const { isGreater, formattedDate } = checkDateGreaterThanToday(date);
        setIsDateErrorPresent(isGreater);
        isGreater ? setSelectedDate('') : setSelectedDate(formattedDate);
        setIsDatePickerVisible(false);
    };

    const showDatePickerHandler = (): void => {
        setIsDatePickerVisible(true);
    };

    const navigateBasicInfoScreen = (): void => {
        Keyboard.dismiss();
        navigation.navigate('BasicInfo', {
            firstName: firstNameInputValue.trim(),
            ...(lastNameInputValue.trim() && { lastName: lastNameInputValue.trim() }),
            address: addressInputValue.trim(),
            contact: fullyQualifiedContactValue.trim(),
            email: emailInputValue.trim(),
            dob: selectedDate,
            state: selectedState ?? '',
            gender: selectedGender ?? ''
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
                    extraScrollHeight={70}
                    keyboardShouldPersistTaps='handled'
                    showsVerticalScrollIndicator={true}
                    enableAutomaticScroll={true}
                    contentContainerStyle={{
                        paddingBottom: insets.bottom + 20,
                        flexGrow: 1
                    }}
                >
                    <View style={styles.registerHeadingContiner}>
                        <Text style={styles.registerHeadingText}>Register</Text>
                    </View>
                            
                    <View style={styles.inputExtractionContainer}>
                        <View style={isMobileLayout ? 
                            styles.mobilePortraitContainer : 
                            styles.tabletOrientationContainer}
                        >
                            <FormField
                                fieldType={FieldType.TEXT}
                                heading='First Name'
                                isMandatory={true}
                                isError={firstNameErrorPresent}
                                errorSetter={setFirstNameErrorPresent}
                                errorPrompt="Field can't be empty or can't contain special character"
                                specialCharacterCheck={true}
                                inputData={firstNameInputValue}
                                setInputData={setFirstNameInputValue}
                                containerContentStyle={inputWidthStyle}
                            />

                            <FormField
                                fieldType={FieldType.TEXT}
                                heading='Last Name (Optional)'
                                inputData={lastNameInputValue}
                                setInputData={setLastNameInputValue}
                                containerContentStyle={inputWidthStyle}
                            />
                        </View>

                        <FormField
                            fieldType={FieldType.TEXT}
                            heading='Address'
                            isMandatory={true}
                            isError={addressErrorPresent}
                            errorSetter={setAddressErrorPresent}
                            errorPrompt="Address field can't be empty"
                            inputData={addressInputValue}
                            setInputData={setAddressInputValue}
                            internalStyle={styles.addressExtraStyle}
                        />

                        <View style={isMobileLayout ? 
                            styles.mobilePortraitContainer : 
                            styles.tabletOrientationContainer}
                        >
                            <FormField
                                fieldType={FieldType.PHONE}
                                heading='Phone'
                                isMandatory={true}
                                isError={contactErrorPresent}
                                errorSetter={setContactErrorPresent}
                                errorPrompt="Contact details isn't valid"
                                elementRef={phoneInputRef}
                                contactValue={contactInputValue}
                                fullyQualifiedContactValue={fullyQualifiedContactValue}
                                onChangeContactValue={setContactInputValue}
                                onChangeFullyQualifiedContactValue={setFullyQualifiedContactValue}
                                defaultCode='IN'
                                containerContentStyle={inputWidthStyle}
                                placeholderTextColor='gray'
                                selectionColor='gray'
                            />

                            <FormField
                                fieldType={FieldType.EMAIL}
                                heading='Email'
                                isMandatory={true}
                                isError={emailErrorPresent}
                                errorSetter={setEmailErrorPresent}
                                errorPrompt='Entered email is invalid'
                                inputData={emailInputValue}
                                setInputData={setEmailInputValue}
                                containerContentStyle={inputWidthStyle}
                            />
                        </View>

                        <View style={isMobileLayout ? 
                            styles.mobilePortraitContainer : 
                            styles.tabletOrientationContainer}
                        >
                            <FormField
                                fieldType={FieldType.DATE}
                                heading='DOB'
                                isMandatory={true}
                                isError={isDateErrorPresent}
                                errorSetter={setIsDateErrorPresent}
                                errorPrompt="Please select date"
                                dateValue={selectedDate}
                                disableFurtherDates={true}
                                pickerModalVisible={isDatePickerVisible}
                                datePickerButtonHandler={showDatePickerHandler}
                                onConfirmSelection={handleSelectedDate}
                                onCancelSelection={handleDatePickCancel}
                                containerContentStyle={inputWidthStyle}
                                buttonStyle={{backgroundColor: '#1778F2'}}
                                buttonText='Pick Date'
                            />

                            <FormField
                                fieldType={FieldType.SELECTION}
                                heading='State'
                                listData={STATE_DATA}
                                isMandatory={true}
                                isError={isStateSelectorError}
                                errorSetter={setIsStateSelectorError}
                                errorPrompt='Select a valid state'
                                inputSelection={selectedState}
                                setInputSelection={setSelectedState}
                                searchEnabled={true}
                                containerContentStyle={inputWidthStyle}
                                placeholder='Select State'
                                searchPlaceholder='Search State...'
                            />
                        </View>

                        <FormField
                            fieldType={FieldType.RADIO}
                            heading='Select Gender'
                            isMandatory={true}
                            isError={genderErrorPresent}
                            errorPrompt='Please select one gender'
                            errorSetter={setGenderErrorPresent}
                            selectorData={GENDER_SELECTOR_OPTIONS}
                            radioValue={selectedGender}
                            setRadioValue={setSelectedGender}
                            isSelectorHorizontal={!isPortrait}
                            radioBorderColor='#999'
                            selectionColor='#1778F2'
                        />

                        <CustomButton
                            isDisabled={isSignUpButtonDisabled}
                            buttonText='Sign Up'
                            pressHandler={navigateBasicInfoScreen}
                            buttonStyle={styles.signUpButton}
                            enableStyle={styles.enabledButton}
                            disableStyle={styles.disabledButton}
                            textStyle={styles.signUpText}
                            extraStyle={{marginTop: 2}}/>
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
    mobilePortraitContainer: {
        flexDirection: 'column',
    },
    tabletOrientationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdown: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
    },
    stateSelectorModal: {
        borderRadius: 20,
        padding: 12,
        backgroundColor: '#ffffff',
    },
    individualState: {
        backgroundColor: '#ffffff',
        borderColor: '#ededed',
        borderBottomWidth: 1
    },
    stateText: {
        fontFamily: 'PTSerif-Regular',
        fontSize: 16
    },
    stateSearchInput: {
    },
    addressExtraStyle: {
        height: 98,
        textAlignVertical: 'top'
    }
});

export default RegistrationScreen;