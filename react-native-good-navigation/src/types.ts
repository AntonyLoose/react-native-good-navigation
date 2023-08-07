import { NavigationProp, ParamListBase } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native";

export interface ScreenProps {
    navigation: NavigationProp<ParamListBase>;
}

/**
 * This is the object the navigators take in.
 * Use this type to set the initial tabs for navigation.
 */
export type Tab = {
    screen: {
        component: React.FC<ScreenProps>,
        title: string
    },
    label?: string,
    overrideTabbarLabelStyle?: TextStyle,
    tabbarStyle?: ViewStyle, // allows you to have seperate styles for each tab in tabbar
    overrideDrawerLabelStyle?: TextStyle, 
    drawerStyle?: ViewStyle, // allows you to have seperate styles for each tab in drawer
    icon?: {
      focused: string,
      unfocused: string,
      size?: number,
      overrideColor?: string, 
      overrideFocusedColor?: string
    },
    sidebar?: {
      title: string,
      titleStyle?: TextStyle,
      component: React.FC,
    }
}