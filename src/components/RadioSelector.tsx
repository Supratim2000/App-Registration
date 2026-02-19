import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { GenderSelectorProp, SelectorType } from '../utils/ProjectTypes';

const RadioSelector: React.FC<GenderSelectorProp> = ({ heading, errorPrompt, selectorData, selected, setSelected, isPortrait }): React.JSX.Element => {
    return (
        <View style={styles.masterContainer}>
            <Text style={styles.headingText}>{ heading }</Text>

            <RadioButton.Group
                onValueChange={newValue => setSelected(newValue)}
                value={selected ?? ''}
            >
                <View style={isPortrait ? styles.verticalContainer : styles.horizontalContainer}>
                    {
                        selectorData.map((_selector: SelectorType) => (
                            <TouchableOpacity
                                key={_selector.value}
                                style={styles.individualSelector}
                                onPress={() => setSelected(_selector.value)}
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
            { (selected === null) ? <Text style={styles.errorText}>{ errorPrompt }</Text> : <Text style={styles.errorText}></Text> }
        </View>
    );
}

const styles = StyleSheet.create({
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
    errorText: {
        fontSize: 12,
        color: 'red',
        fontFamily: 'PlayfairDisplay-Regular'
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

export default RadioSelector;