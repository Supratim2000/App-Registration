import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DateProps } from '../utils/ProjectTypes';

const CustomDatePicker: React.FC<DateProps> = ({
    selectedDate,
    isError,
    errorPrompt,
    datePickerHandler,
    pickerVisible,
    confirmHandler,
    cancelHandler
}): React.JSX.Element => {
    console.log(isError);
    return (
        <View style={styles.fieldInputContainer}>
            <Text style={styles.nameHeading}>DOB</Text>
            <View style={styles.DobContainer}>
                <TextInput
                    value={selectedDate}
                    style={[styles.basicTextInputStyle, styles.disabledInput, isError && styles.errorTextInputStyle]}
                    editable={false}
                />
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.dobPickButton}
                    onPress={datePickerHandler}
                >
                    <Text style={styles.dobPickText}>Pick Date</Text>
                </TouchableOpacity>
            </View>
                {isError ? <Text style={styles.errorText}>{ errorPrompt }</Text> : <Text style={styles.errorText}></Text>}
                <DateTimePickerModal
                    isVisible={pickerVisible}
                    mode="date"
                    onConfirm={confirmHandler}
                    onCancel={cancelHandler}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    fieldInputContainer: {
    },
    nameHeading: {
        color: '#000000',
        fontSize: 18,
        fontFamily: 'PTSerif-Regular'
    },
    DobContainer: {
        flexDirection: 'row',
    },
    basicTextInputStyle: {
        height: 44,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 15,
        fontSize: 16,
        borderColor: '#acacac',
        color: '#3e3e3e',
    },
    disabledInput: {
        backgroundColor: '#e4e4e4',
        color: '#5b5b5b',
        flex: 1
    },
    errorTextInputStyle: {
        borderColor: 'red'
    },
    dobPickButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
        paddingHorizontal: 8,
        backgroundColor: '#1778F2',
        borderRadius: 4,
        height: 44
    },
    dobPickText: {
        fontFamily: 'CrimsonText-Bold',
        color: '#ffffff',
        fontSize: 16
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        fontFamily: 'PlayfairDisplay-Regular'
    },
});

export default CustomDatePicker;