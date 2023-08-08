import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React, { useEffect } from "react"
import { Platform, SafeAreaView, Text, TextStyle, View, ViewStyle } from "react-native"
import { PressableIcon } from "./PressableIcon";

interface Props {
    title: string;
    isNotFirstScreen: boolean;
    navigation?: NavigationProp<ParamListBase>;
    backgroundColor?: string;
    titleStyle?: TextStyle;
    style?: ViewStyle;
    backIcon?: string;
    backIconStyle?: ViewStyle;
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
    backIconStyle,
    backIconColor,
    backIconSize
}) => {
    return (
        <SafeAreaView style={{ backgroundColor: style?.backgroundColor || "#FFFFFF" }}>
            <View
                style={[
                    {
                        alignItems: "center",
                        flexDirection: "row",
                        paddingHorizontal: isNotFirstScreen ? 5 : 20,
                        backgroundColor: style?.backgroundColor || "#FFFFFF",
                        paddingTop: Platform.OS == "web" ? 10 : 0
                    },
                    style
                ]}
            >   
                {
                    isNotFirstScreen ? <PressableIcon onPress={navigation?.goBack} icon={backIcon || "chevron-left"} size={backIconSize || 60} color={backIconColor || "black"} style={backIconStyle}/> : null
                }
                <Text
                    style={[
                        {
                            fontWeight: titleStyle?.fontWeight || "bold",
                            fontSize: titleStyle?.fontSize || 55,
                        },
                        titleStyle
                    ]}
                >
                    {title}
                </Text>
            </View>
        </SafeAreaView>
    )
}