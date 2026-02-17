import React from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { StateSelectorProps } from '../utils/ProjectTypes';

const StateSelector: React.FC<StateSelectorProps> = ({
    heading,
    listData,
    isMandatory=false,
    isError=false,
    errorSetter,
    errorPrompt='',
    inputState,
    setInputState
}): React.JSX.Element => {

    const handleStateSelect = (stateValue: string): void => {
        setInputState(stateValue);
        if(errorSetter) {
            errorSetter(stateValue === null)
        }
    }

    return (
        <View style={styles.stateSelectorContainer}>
            <Text style={styles.nameHeading}>{ heading }</Text>
            <Dropdown
                style={[styles.dropdown, isError && styles.errorTextInputStyle]}
                data={listData}
                labelField="label"
                valueField="value"
                placeholder="Select state"
                value={inputState}
                onChange={stateObj => handleStateSelect(stateObj.value)}
                mode='modal'
                containerStyle={styles.stateSelectorModal}
                itemContainerStyle={styles.individualState}
                itemTextStyle={styles.stateText}
                backgroundColor="rgba(0, 0, 0, 0.5)"
                activeColor="#e9e9e9"
                search
                searchPlaceholder="Search state..."
                inputSearchStyle={styles.stateSearchInput}
                autoScroll
                onFocus={() => Keyboard.dismiss()}
            />
            {isMandatory && ((isError) ? <Text style={styles.errorText}>{ errorPrompt }</Text> : <Text style={styles.errorText}></Text>) }
        </View>
    );
}

const styles = StyleSheet.create({
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
    errorText: {
        fontSize: 12,
        color: 'red',
        fontFamily: 'PlayfairDisplay-Regular'
    },
    errorTextInputStyle: {
        borderColor: 'red'
    }
});

export default StateSelector;