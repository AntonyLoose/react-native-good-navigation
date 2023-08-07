import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from "react"
import { SafeAreaView, Text, TextStyle, View, ViewStyle } from "react-native"
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
    backgroundColor = "#FFFFFF",
    titleStyle,
    style,
    backIcon,
    backIconStyle,
    backIconColor,
    backIconSize
}) => {
    return (
        <SafeAreaView style={{ backgroundColor: backgroundColor }}>
            <View
                style={[
                    {
                        alignItems: "center",
                        flexDirection: "row",
                        paddingHorizontal: isNotFirstScreen ? 5 : 20,
                        paddingTop: 10,
                        backgroundColor: backgroundColor
                    },
                    style
                ]}
            >   
                {
                    isNotFirstScreen ? <PressableIcon onPress={navigation?.goBack} icon={backIcon || "chevron-left"} size={backIconSize || 60} color={backIconColor || "black"} style={backIconStyle}/> : null
                }
                <Text
                    style={[
                        titleStyle || {
                            fontWeight: "bold",
                            fontSize: 55,
                        },
                    ]}
                >
                    {title}
                </Text>
            </View>
        </SafeAreaView>
    )
}