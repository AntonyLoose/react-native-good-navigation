import React from "react"
import { Pressable, TextStyle, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
    icon: string;
    size: number;
    color: string;
    onPress?: () => void;
}

export const PressableIcon: React.FC<Props> = ({
    icon,
    size,
    color,
    onPress
}) => {
    return (
        <Pressable onPress={onPress}>
            <Icon name={icon} size={size} color={color}/>
        </Pressable>
    )
}