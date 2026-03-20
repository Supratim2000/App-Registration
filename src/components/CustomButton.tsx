import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { CustomButtonProp } from '../utils/ProjectTypes';

const CustomButton: React.FC<CustomButtonProp> = ({
    isDisabled = false,
    showLoadingIndicator = false,
    buttonText,
    pressHandler,
    buttonStyle = {},
    enableStyle = {},
    disableStyle = {},
    textStyle = {},
    extraStyle = {}
}): React.JSX.Element => {
    return(
        <TouchableOpacity
            disabled={isDisabled}
            activeOpacity={0.5}
            style={[buttonStyle, extraStyle, isDisabled ? disableStyle : enableStyle]}
            onPress={pressHandler}
            >
                {showLoadingIndicator ?
                    <ActivityIndicator color="#ffffff"/> :
                    <Text style={textStyle}>{buttonText}</Text>}
        </TouchableOpacity>
    );
}

export default CustomButton;