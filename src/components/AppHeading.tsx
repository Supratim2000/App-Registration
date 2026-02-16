import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { HeadingProp } from '../utils/ProjectTypes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AppHeading: React.FC<HeadingProp> = ({ isPortrait, headingMessage }): React.JSX.Element => {
    const insets = useSafeAreaInsets();

    return (
        <LinearGradient
            style={[(isPortrait ? styles.headingContainerPortrait : styles.headingContainerLandscape), { paddingTop: insets.top }]}
            colors={['#0061ff', '#60efff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <Text style={styles.headingText}>{ headingMessage }</Text>
        </LinearGradient>
    );
}

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
});

export default AppHeading;