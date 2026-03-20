import React from "react";
import { IconButtonProps } from "../utils/ProjectTypes";
import { TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const IconButton: React.FC<IconButtonProps> = ({ isVisible, currentCartData, onIconPress, iconName, iconSize, iconColor }): React.JSX.Element => {
    const isButtonVisible = isVisible ?? true;
    const currentData = currentCartData ?? {};
    const iconButtonSize = iconSize ?? 26;
    const iconButtonColor = iconColor ?? '#000';

    return (
        <>
            { isButtonVisible && <TouchableOpacity onPress={() => onIconPress?.(currentData)}>
                <Icon name={iconName} size={iconButtonSize} color={iconButtonColor} />
            </TouchableOpacity> }
        </>
    );
}

export default IconButton;