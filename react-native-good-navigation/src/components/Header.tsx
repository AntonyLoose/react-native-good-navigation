import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from "react"
import { Dimensions, Platform, Text, TextStyle, View, ViewStyle } from "react-native"
import { getScreenType } from "../navigators/types";
import { NavigationSession } from "../state/NavigationSession";
import { PressableIcon } from "./PressableIcon";

interface Props {
    title: string;
    isNotFirstScreen: boolean;
    navigation?: NavigationProp<ParamListBase>;
    backgroundColor?: string;
    titleStyle?: TextStyle;
    style?: ViewStyle;
    backIcon?: string;
    backIconColor?: string;
    backIconSize?: number;
}

export const Header: React.FC<Props> = ({
    title,
    isNotFirstScreen,
    navigation,
    titleStyle,
    style,
    backIcon,
    backIconColor,
    backIconSize
}) => {
    return (
        <View
            style={[
                {
                    alignItems: "center",
                    flexDirection: "row",
                    paddingHorizontal: isNotFirstScreen ? 5 : 20,
                    backgroundColor: style?.backgroundColor || "#FFFFFF",
                    paddingTop: getScreenType() == "wide" ? (Platform.OS == "web" ? 10 : 20) : 0
                },
                style
            ]}
        >   
            {
                isNotFirstScreen ? <PressableIcon onPress={() => NavigationSession.inst.navigateBack(navigation)} icon={backIcon || "chevron-left"} size={backIconSize || 60} color={backIconColor || "black"}/> : null
            }
            <Text
                style={[
                    {
                        fontWeight: titleStyle?.fontWeight || "bold",
                        fontSize: titleStyle?.fontSize || 55,
                        width: Dimensions.get("window").width - (isNotFirstScreen ? (backIconSize || 60) : 0) - (isNotFirstScreen ? 5 : 20)
                    },
                    titleStyle
                ]}
            >
                {title}
            </Text>
        </View>
    )
}