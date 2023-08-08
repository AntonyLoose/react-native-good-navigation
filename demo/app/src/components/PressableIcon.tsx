import React from "react"
import { Pressable, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
    icon: string;
    size: number;
    color: string;
    style?: ViewStyle;
    onPress?: () => void;
}

export const PressableIcon: React.FC<Props> = ({
    icon,
    size,
    color,
    style,
    onPress
}) => {
    return (
        <Pressable onPress={onPress}>
            <Icon name={icon} size={size} color={color} style={style}/>
        </Pressable>
    )
}