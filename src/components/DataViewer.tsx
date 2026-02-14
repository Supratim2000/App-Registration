import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { DataProps } from '../utils/ProjectTypes';

const DataViewer: React.FC<DataProps> = ({ heading, content }): React.JSX.Element => {
    return (
        <View style={styles.infoContainer}>
            <Text style={styles.dataText}>{heading}: </Text>
            <Text style={[styles.dataText, styles.fadeColorText]}>{ content }</Text>
            </View>
        );
}

const styles = StyleSheet.create({
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
    },
    dataText: {
        color: '#000000',
        fontSize: 18,
        fontFamily: 'PTSerif-Regular'
    },
    fadeColorText: {
        color: '#222',
        flexShrink: 1
    }
});

export default DataViewer;