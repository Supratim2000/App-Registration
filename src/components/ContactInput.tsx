import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ContactProps } from '../utils/ProjectTypes';
import PhoneInput from 'react-native-phone-number-input';

const ContactInput: React.FC<ContactProps> = ({
    heading,
    isMandatory = false,
    isError = false,
    errorSetter = () => {},
    errorPrompt = '',
    contactRef,
    defaultValue,
    defaultCode,
    contactCodeValue,
    textChangeHandler,
    textChangeFormattedHandler,
    autoFocus = false,
    containerStyle
}): React.JSX.Element => {
    useEffect(() => {
        const checkIfValidContactNumber = contactRef.current?.isValidNumber(defaultValue);
        if(checkIfValidContactNumber) {
            errorSetter(false);
        } else {
            errorSetter(true);
        }
    }, [defaultValue, contactCodeValue]);

    return (
        <View style={[styles.fieldInputContainer, containerStyle]}>
            <Text style={styles.nameHeading}>{ heading }</Text>
            
            <PhoneInput
                ref={contactRef}
                defaultValue={defaultValue}
                defaultCode={defaultCode}
                layout="second"
                onChangeText={(text) => {
                    textChangeHandler(text);
                }}
                onChangeFormattedText={(text) => {
                    textChangeFormattedHandler(text);
                }}
                autoFocus={false}
                containerStyle={[styles.phoneContainer, isError && styles.errorTextInputStyle]}
                textContainerStyle={styles.phoneTextContainer}
                textInputStyle={styles.phoneTextInput}
                codeTextStyle={styles.phoneCodeText}
                flagButtonStyle={styles.flagButton}
                />
        
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
    errorText: {
        fontSize: 12,
        color: 'red',
        fontFamily: 'PlayfairDisplay-Regular'
    },
    phoneContainer: {
        width: '100%',
        height: 48,
        borderWidth: 1,
        borderColor: '#acacac',
        borderRadius: 4,
        backgroundColor: '#ffffff',
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
    }
});


export default ContactInput;