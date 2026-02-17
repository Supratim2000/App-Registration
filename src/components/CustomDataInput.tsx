import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { InputProps } from '../utils/ProjectTypes';
import { checkEmailValidity } from '../utils/ProjectUtils';

const CustomDataInput: React.FC<InputProps> = ({
    heading,
    inputType = 'default',
    infoType,
    isMandatory = false,
    isError = false,
    errorSetter = () => {},
    errorPrompt = '',
    inputData,
    setInputData,
    containerStyle
}): React.JSX.Element => {

    const handleTextChanges = (text: string): void => {
        if(infoType === 'email') {
            setInputData(text);
            checkEmailValidity(text) ? errorSetter(false) : errorSetter(true);
        } else {
            setInputData(text);
            text.trim().length ? errorSetter(false) : errorSetter(true);
        }
    };

    return (
        <View style={[styles.fieldInputContainer, containerStyle]}>
            <Text style={styles.nameHeading}>{ heading }</Text>
            { infoType === 'address'? 
            <TextInput
                value={inputData}
                onChangeText={(text) => { handleTextChanges(text) }}
                style={[styles.basicTextInputStyle, styles.addressTextInputStyle, isError && styles.errorTextInputStyle]}
                multiline
                numberOfLines={4}
                textAlignVertical="top"/>
            :
            <TextInput
                value={inputData}
                onChangeText={(text) => { handleTextChanges(text) }}
                keyboardType={inputType}
                autoCapitalize={ infoType === 'email' ? 'none' : 'words' }
                autoCorrect={false}
                style={[styles.basicTextInputStyle, isError && styles.errorTextInputStyle]}
            /> }
            {isMandatory && ((isError) ? <Text style={styles.errorText}>{ errorPrompt }</Text> : <Text style={styles.errorText}></Text>) }
        </View>
    );
};

const styles = StyleSheet.create({
    fieldInputContainer: {
    },
    nameHeading: {
        color: '#000000',
        fontSize: 18,
        fontFamily: 'PTSerif-Regular'
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
    errorText: {
        fontSize: 12,
        color: 'red',
        fontFamily: 'PlayfairDisplay-Regular'
    },
    addressTextInputStyle: {
        height: 98,
    },
    errorTextInputStyle: {
        borderColor: 'red'
    }
});

export default CustomDataInput;