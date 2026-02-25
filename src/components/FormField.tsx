import React, { useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Keyboard } from 'react-native';
import { FormFieldProps, SelectorType } from '../utils/ProjectTypes';
import { FieldType, RadioValue } from '../utils/ProjectConstants';
import { checkEmailValidity, hasSpecialCharacter } from '../utils/ProjectUtils';
import PhoneInput from 'react-native-phone-number-input';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomButton from './CustomButton';
import { Dropdown } from 'react-native-element-dropdown';
import { RadioButton } from 'react-native-paper';
import { Consumer } from 'react-native-paper/lib/typescript/core/settings';

const FormField: React.FC<FormFieldProps> = (props): React.JSX.Element => {
    const { 
        heading,
        isMandatory = false,
        isError=false,
        errorSetter = () => {},
        errorPrompt = '',
        containerContentStyle = {},
        internalStyle = {}
    } = props;

    const renderedFormField = (): React.JSX.Element | null => {
        switch(props.fieldType) {
            case FieldType.TEXT:
            case FieldType.EMAIL:
                const specialCharacterCheckEnabled = props.specialCharacterCheck ?? false;

                return (
                    <TextInput
                        value={props.inputData}
                        onChangeText={(text) => {
                            const trimmedText = text.trim();
                            const isEmpty = trimmedText.length === 0;
                            const containsSpecialCharacter = specialCharacterCheckEnabled && hasSpecialCharacter(trimmedText);

                            props.setInputData(text);

                            props.fieldType === FieldType.EMAIL?
                                errorSetter?.(!checkEmailValidity(text)):
                                errorSetter?.(isEmpty || containsSpecialCharacter);
                        }}
                        keyboardType={props.fieldType === FieldType.EMAIL ? 'email-address' : 'default'}
                        autoCapitalize={ props.fieldType === FieldType.EMAIL ? 'none' : 'words' }
                        autoCorrect={false}
                        style={[styles.basicTextInputStyle, internalStyle, isError && styles.errorOutlineStyle]}
                    />
                );
            case FieldType.PHONE:
                useEffect(() => {
                    const checkIfValidContactNumber = props.elementRef.current?.isValidNumber(props.contactValue);
                    errorSetter(!checkIfValidContactNumber);
                }, [props.contactValue]);

                return (
                    <PhoneInput
                        ref={props.elementRef}
                        defaultValue={props.contactValue}
                        defaultCode={(props.defaultCode ?? 'IN') as React.ComponentProps<typeof PhoneInput>["defaultCode"]}
                        layout="second"
                        onChangeText={(text) => {
                            props.onChangeContactValue(text);
                        }}
                        onChangeFormattedText={(text) => {
                            props.onChangeFullyQualifiedContactValue(text);
                        }}
                        autoFocus={false}
                        containerStyle={[styles.phoneContainer, internalStyle, isError && styles.errorTextInputStyle]}
                        textContainerStyle={styles.phoneTextContainer}
                        textInputStyle={styles.phoneTextInput}
                        codeTextStyle={styles.phoneCodeText}
                        flagButtonStyle={styles.flagButton}
                    />
                );
            case FieldType.DATE:
                const maxDate: Date | undefined = props.disableFurtherDates ? new Date() : undefined;
                const pickButtonText = props.buttonText ?? 'Pick';

                return (
                    <View style={[styles.DobContainer, internalStyle]}>
                        <TextInput
                            value={props.dateValue}
                            style={[styles.basicTextInputStyle, styles.disabledInput, isError && styles.errorTextInputStyle, props.viewerStyle]}
                            editable={false}
                        />

                        <CustomButton
                            buttonText={pickButtonText}
                            pressHandler={props.datePickerButtonHandler}
                            buttonStyle={[styles.dobPickButton, props.buttonStyle]}
                            textStyle={styles.dobPickText}
                        />

                        <DateTimePickerModal
                            isVisible={props.pickerModalVisible}
                            maximumDate={maxDate}
                            mode="date"
                            onConfirm={props.onConfirmSelection}
                            onCancel={props.onCancenSelection}
                        />
                    </View>
                );
            case FieldType.SELECTION:
                const searchEnabled: boolean = props.searchEnabled ?? false;
                const placeholder: string = props.placeholder ?? 'Select';
                const searchPlaceholder: string = props.searchPlaceholder ?? 'Search';

                const handleStateSelect = (stateValue: string): void => {
                    props.setInputSelection(stateValue);
                    if(errorSetter) {
                        errorSetter(stateValue === null)
                    }
                };

                return (
                    <Dropdown
                        style={[styles.dropdown, props.internalStyle, isError && styles.errorTextInputStyle]}
                        data={props.listData}
                        labelField="label"
                        valueField="value"
                        placeholder={placeholder}
                        value={props.inputSelection}
                        onChange={stateObj => handleStateSelect(stateObj.value)}
                        mode='modal'
                        containerStyle={styles.stateSelectorModal}
                        itemContainerStyle={styles.individualState}
                        itemTextStyle={styles.stateText}
                        backgroundColor="rgba(0, 0, 0, 0.5)"
                        activeColor="#e9e9e9"
                        search={searchEnabled}
                        searchPlaceholder={searchPlaceholder}
                        inputSearchStyle={styles.stateSearchInput}
                        autoScroll
                        onFocus={() => Keyboard.dismiss()}
                    />
                );
            case FieldType.RADIO:
                return (
                    <View style={[styles.masterContainer, props.internalStyle]}>
                        <RadioButton.Group
                            onValueChange={(newValue: string) => {
                                props.setRadioValue(newValue as RadioValue);
                                errorSetter(false);
                            }}
                            value={props.radioValue ?? ''}
                        >
                            <View style={[props.isSelectorHorizontal ? styles.horizontalContainer : styles.verticalContainer, props.radioSelectorContainerStyle]}>
                                {
                                    props.selectorData.map((_selector: SelectorType) => (
                                        <TouchableOpacity
                                            key={_selector.value}
                                            style={[styles.individualSelector, props.fieldSelectorStyle]}
                                            onPress={() => {
                                                props.setRadioValue(_selector.value as RadioValue);
                                                errorSetter(false);
                                            }}
                                            activeOpacity={0.7}
                                        >
                                            <RadioButton
                                                value={_selector.value}
                                                color="#1778F2"
                                                uncheckedColor="#999"
                                            />
                                            <Text style={styles.radioText}>
                                                {_selector.key}
                                            </Text>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        </RadioButton.Group>
                    </View>
                );
            default:
                return null;
        }
    }

    return (
        <View style={[styles.container, containerContentStyle]}>
            <Text style={styles.heading}>{heading}</Text>

            {renderedFormField()}

            {isMandatory ?
                (<Text style={styles.errorText}>{isError ? errorPrompt : ''}</Text>) :
                <Text style={styles.errorText}></Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    heading: {
        color: '#000000',
        fontSize: 18,
        fontFamily: 'PTSerif-Regular'
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        fontFamily: 'PlayfairDisplay-Regular'
    },
    basicTextInputStyle: {
        height: 48,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 15,
        fontSize: 16,
        borderColor: '#acacac',
        color: '#3e3e3e',
    },
    errorOutlineStyle: {
        borderColor: 'red'
    },
    phoneTextContainer: {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        paddingVertical: 0,
    },

    phoneTextInput: {
        height: 50,
        fontSize: 16,
        color: '#3e3e3e',
    },

    phoneCodeText: {
        fontSize: 16,
        color: '#363636',
    },
    flagButton: {
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        backgroundColor: '#e1e1e1',
        color: '#FFFFFF'
    },
    errorTextInputStyle: {
        borderColor: 'red'
    },
    phoneContainer: {
        width: '100%',
        height: 48,
        borderWidth: 1,
        borderColor: '#acacac',
        borderRadius: 4,
        backgroundColor: '#ffffff',
    },
    DobContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    disabledInput: {
        backgroundColor: '#e4e4e4',
        color: '#5b5b5b',
        flex: 1
    },
    dobPickButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
        paddingHorizontal: 8,
        backgroundColor: '#000000',
        borderRadius: 4,
        height: 48
    },
    dobPickText: {
        fontFamily: 'CrimsonText-Bold',
        color: '#ffffff',
        fontSize: 16
    },
    stateSelectorContainer: {
    },
    nameHeading: {
        color: '#000000',
        fontSize: 18,
        fontFamily: 'PTSerif-Regular'
    },
    dropdown: {
        height: 48,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 15,
        fontSize: 16,
        borderColor: '#acacac',
        color: '#3e3e3e',
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
    masterContainer: {
        width: '100%'
    },
    individualSelector: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    horizontalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    verticalContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    headingText: {
        fontFamily: 'PTSerif-Regular',
        fontSize: 18,
    },
    radioText: {
        fontSize: 16,
        fontFamily: 'PTSerif-Regular',
    }
});

export default FormField;