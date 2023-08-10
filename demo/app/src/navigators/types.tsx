import { NavigationProp, ParamListBase } from "@react-navigation/native"
import React from "react"
import { Dimensions, TextStyle, ViewStyle } from "react-native";

export interface ScreenProps {
    navigation: NavigationProp<ParamListBase>;
}

export type IconType = {
    icon: string,
    color?: string,
    size?: number,
}

export type Theme = {
  background: string;
  text: string;
  border: string;
  tabFocused: string;
}

export type Screen = {
  id: string,
  component: React.FC<ScreenProps>,
  title: string
}

/**
 * This is the object the navigators take in.
 * Use this type to set the initial tabs for navigation.
 */
export type Tab = {
    screen: Screen;
    label?: string,
    overrideTabbarLabelStyle?: TextStyle,
    tabbarStyle?: { // allows you to have seperate styles for each tab in tabbar
      focused: ViewStyle,
      unFocused: ViewStyle
    }
    overrideDrawerLabelStyle?: TextStyle, 
    drawerStyle?: { // allows you to have seperate styles for each tab in drawer
      focused: ViewStyle, 
      unFocused: ViewStyle
    },
    icon?: {
      focused: string,
      unfocused: string,
      tabbarStyle?: {
        size?: number,
        overrideColor?: string, 
        overrideFocusedColor?: string
      },
      drawerStyle?: {
        size?: number,
        overrideColor?: string, 
        overrideFocusedColor?: string
      }
    },
    sidebar?: {
      title: string,
      titleStyle?: TextStyle,
      component: React.FC<any>,
      style?: ViewStyle;
    }
}

export const getScreenType = (): "wide" | "narrow" => {
  const { width } = Dimensions.get("window");

  return width > 750 ? "wide" : "narrow";
}