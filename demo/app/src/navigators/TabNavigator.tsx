import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { Platform, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaView as TopSafeAreaView } from "react-native";
import { Text } from "react-native"
import { Header } from "../components/Header";
import { PressableIcon } from "../components/PressableIcon";
import { IconType, Screen, Tab, Theme } from "./types"
import { NavigationStateManager } from "../state/NavigationStateManager";
import { NavigationSession } from "../state/NavigationSession";

export interface TabNavigatorProps {
    tabs: Tab[],
    landingTab?: Tab,
    theme?: Theme,
    tabbarStyle?: ViewStyle,
    headerStyle?: TextStyle,
    titleStyle?: TextStyle,
    backIcon?: IconType,
    iconColor?: string,
    focusedIconColor?: string,
    iconSize?: number;
    labelStyle?: TextStyle;
}

export const TabNavigator: React.FC<TabNavigatorProps> = ({ 
    tabs, 
    landingTab,
    theme,
    headerStyle, 
    tabbarStyle,
    titleStyle,
    backIcon,
    iconColor,
    focusedIconColor,
    iconSize = 40,
    labelStyle
}) => {

    const [activeTab, setActiveTab] = useState<Tab>(landingTab || tabs[0]);
    const [screens, setScreens] = useState<Screen[]>([activeTab.screen]);

    useEffect(() => {
        NavigationSession.inst.addScreen(activeTab.screen);
        NavigationStateManager.screenStackUpdated.subscribe(() => {
            setScreens([...NavigationSession.inst.screens]);
        })

        NavigationStateManager.activeTabUpdated.subscribe(() => {
            setActiveTab(NavigationSession.inst.activeTab || tabs[0]);
        })
    }, [])
    
    useEffect(() => {
        NavigationSession.inst.navigateOnLoad();
        NavigationSession.inst.navigateOnLoad = () => {};
    }, [screens])

    const Stack = createStackNavigator();
    
    const onTabPress = (tab: Tab) => {
        NavigationSession.inst.clearScreens(tab.screen);
        NavigationSession.inst.activeTab = tab;
        setActiveTab(tab);
    }

    return (
        <View
            style={{
                flex: 1
            }}
        >
            <TopSafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: headerStyle?.backgroundColor || theme?.background
                }}
            >
                <Stack.Navigator>
                    {
                        screens.map((screen, i) => {
                            return (
                                <Stack.Screen
                                    key={screen.id}
                                    name={screen.id}
                                    component={screen.component}
                                    options={({ navigation }) => ({
                                        animationEnabled: i > 0 && !(Platform.OS == "web"),
                                        header: () => (
                                            <Header
                                                title={screen.title}
                                                isNotFirstScreen={i > 0}
                                                style={headerStyle || { backgroundColor: theme?.background }}
                                                titleStyle={titleStyle || { color: theme?.text }}
                                                backIcon={backIcon?.icon}
                                                backIconStyle={backIcon?.style}
                                                backIconSize={backIcon?.size}
                                                backIconColor={backIcon?.color || theme?.text}
                                                navigation={navigation}
                                            />
                                        )
                                    })}
                                />
                            )
                        })
                    }
                </Stack.Navigator>
            </TopSafeAreaView>

            <SafeAreaView edges={["bottom"]}>
                <View
                    style={[
                        {
                            flexDirection: "row",
                            width: "100%",
                            paddingVertical: 10,
                            backgroundColor: tabbarStyle?.backgroundColor || theme?.background
                        },
                        tabbarStyle
                    ]}
                >
                    {
                        tabs.map((tab, i) => {
                            const focused = tab.label == activeTab.label;
                            return (
                                <TabComponent key={i} onPress={onTabPress} tab={tab} color={(focused ? (tab.icon?.tabbarStyle?.overrideFocusedColor || focusedIconColor) : tab.icon?.tabbarStyle?.overrideColor) || iconColor || theme?.text || "#FFFFFF"} size={iconSize} focused={focused} theme={theme} labelStyle={labelStyle}/>
                            )
                        })
                    }
                </View>
            </SafeAreaView>

        </View>
    )
}

interface TabProps {
    tab: Tab;
    color: string;
    size: number;
    focused: boolean;
    onPress: (tab: Tab) => void;
    theme?: Theme;
    labelStyle?: TextStyle;
}

const TabComponent: React.FC<TabProps> = ({ tab, color, size, focused, onPress, theme, labelStyle }) => {
    return (
        <Pressable 
            style={[
                { 
                    flex: 1, 
                    justifyContent: "center",
                    paddingBottom: 20 
                },
                focused ? tab.tabbarStyle?.focused : tab.tabbarStyle?.unFocused
            ]}
            onPress={() => onPress(tab)}
        >
            <PressableIcon onPress={() => onPress(tab)} icon={(focused ? tab.icon?.focused : tab.icon?.unfocused) || ""} size={tab.icon?.tabbarStyle?.size || size} color={color} style={{ alignSelf: "center"}}/>
            <Text 
                style={[
                    { 
                        textAlign: "center", 
                        color: tab.overrideTabbarLabelStyle?.color || labelStyle?.color || theme?.text
                    },
                    tab.overrideTabbarLabelStyle || labelStyle
                ]}
            >
                {tab.label}
            </Text>
        </Pressable>
    )
}