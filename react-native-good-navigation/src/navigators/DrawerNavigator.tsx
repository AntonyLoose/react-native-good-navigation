import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useState } from "react";
import { DimensionValue, Platform, Pressable, SafeAreaView, Text, TextStyle, View, ViewStyle } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Header } from "../components/Header";
import { PressableIcon } from "../components/PressableIcon";
import { IconType, Tab } from "../types"

type DrawerTabStyle = {
    style: ViewStyle;
    height?: DimensionValue;
    width?: DimensionValue;
    padding?: number;
    overrideLabelStyle?: TextStyle;
}

type TabIconStyle = {
    focusedColor?: string;
    unFocusedColor?: string;
    size?: string;
}

interface Props {
    tabs: Tab[];
    drawerTitle: string;
    drawerStyle?: ViewStyle;
    borderColor?: string;
    drawerTabUnfocusedStyle?: DrawerTabStyle;
    drawerTabFocusedStyle?: DrawerTabStyle;
    toggleDrawerIcon?: {
        color?: string,
        icon?: string,
        size?: number
    };
    sidebarStyle?: {
        style: ViewStyle,
        titleStyle: TextStyle
    };
    labelStyle?: TextStyle;
    drawerTitleStyle?: TextStyle;
    screenHeaderStyle?: TextStyle;
    screenTitleStyle?: TextStyle,
    backIcon?: IconType;
    tabIconStyle?: TabIconStyle;
}

export const DrawerNavigator: React.FC<Props> = ({ 
    tabs,
    drawerTitle,
    drawerTitleStyle,
    drawerStyle,
    borderColor,
    drawerTabUnfocusedStyle,
    drawerTabFocusedStyle,
    toggleDrawerIcon,
    sidebarStyle,
    labelStyle,
    screenHeaderStyle,
    screenTitleStyle,
    backIcon,
    tabIconStyle
 }) => {

    const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);
    const [drawerVisible, setDrawerVisible] = useState<boolean>(true);

    const Stack = createStackNavigator();

    const onTabPress = (tab: Tab) => {
        setActiveTab(tab);
    }

    return (
        <View
            style={{
                flex: 1,
                flexDirection: "row",
            }}
        >
            {/* Drawer */}
            { 
                !drawerVisible ? undefined : (
                    <View
                        style={[
                            {
                                width: "25%",
                                height: "100%",
                                borderRightWidth: 1,
                                borderColor: borderColor || "#e8e8e8",
                                paddingTop: 20
                            },
                            drawerStyle
                        ]}
                    >
                        <SafeAreaView
                            style={{
                                flex: 1
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    paddingHorizontal: 20
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center"
                                    }}
                                >
                                    <PressableIcon
                                        icon={toggleDrawerIcon?.icon || "book-open-outline"}
                                        size={toggleDrawerIcon?.size || 30 }
                                        color={toggleDrawerIcon?.color || "#000000"}
                                        onPress={() => setDrawerVisible(false)}
                                    />
                                    <Text 
                                        style={[
                                            {
                                                fontWeight: "bold",
                                                fontSize: 25,
                                                paddingLeft: 10
                                            },
                                            drawerTitleStyle
                                        ]}   
                                    >{drawerTitle}</Text>
                                </View>

                                {
                                    tabs.map((tab, i) => {

                                        // for demo purposes
                                        const focused = tab.screen.title == activeTab.screen.title;

                                        return (
                                            <TabComponent  
                                                key={i} 
                                                tab={tab} 
                                                onPress={onTabPress}
                                                focused={focused}
                                                iconStyle={tabIconStyle}
                                                height={focused ? drawerTabFocusedStyle?.height : drawerTabUnfocusedStyle?.height} 
                                                width={focused ? drawerTabFocusedStyle?.width : drawerTabUnfocusedStyle?.width} 
                                                padding={focused ? drawerTabFocusedStyle?.padding : drawerTabUnfocusedStyle?.padding}
                                                labelStyle={(focused ? drawerTabFocusedStyle?.overrideLabelStyle : drawerTabUnfocusedStyle?.overrideLabelStyle) || labelStyle} 
                                                style={focused ? drawerTabFocusedStyle?.style : drawerTabUnfocusedStyle?.style}
                                            />
                                        )
                                    })
                                }
                            </View>
                        </SafeAreaView>
                    </View>
                )
            }
            
            {/* Sidebar */}
            {
                activeTab.sidebar == undefined ? undefined : (
                    <Sidebar 
                        Screen={activeTab.sidebar.component}
                        title={activeTab.sidebar.title}
                        titleStyle={activeTab.sidebar.titleStyle || sidebarStyle?.titleStyle}
                        style={activeTab.sidebar.style || sidebarStyle?.style}
                        drawerVisible={drawerVisible}
                        toggleDrawerIcon={{
                            icon: toggleDrawerIcon?.icon || "book-open-outline",
                            size: toggleDrawerIcon?.size || 30,
                            color: toggleDrawerIcon?.color || "#000000",
                            onPress: () => setDrawerVisible(true)
                        }}
                    />
                )
            }

            {/* Screen */}
            <View
                style={{
                    flex: 1
                }}
            >
                {
                    (drawerVisible == true || activeTab.sidebar != undefined) ? undefined : (
                        <SafeAreaView
                            style={{
                                backgroundColor: screenHeaderStyle?.backgroundColor
                            }}
                        >
                            <View
                                style={{
                                    paddingHorizontal: 20,
                                    paddingTop: Platform.OS == "web" ? 20 : 0
                                }}
                            >    
                                <PressableIcon
                                    icon={toggleDrawerIcon?.icon || "book-open-outline"}
                                    size={toggleDrawerIcon?.size || 30 }
                                    color={toggleDrawerIcon?.color || "#000000"}
                                    onPress={() => setDrawerVisible(true)}
                                />
                            </View>
                        </SafeAreaView>
                    )
                }
                <Stack.Navigator>
                    {
                        tabs.map((tab, i) => {
                            return (
                                <Stack.Screen
                                    key={tab.screen.title}
                                    name={tab.screen.title}
                                    component={tab.screen.component}
                                    options={({ navigation }) => ({
                                        header: () => (
                                            <Header
                                                title={tab.screen.title}
                                                isNotFirstScreen={i > 0}
                                                style={screenHeaderStyle}
                                                titleStyle={screenTitleStyle}
                                                backIcon={backIcon?.icon || "chevron-left"}
                                                backIconStyle={backIcon?.style}
                                                backIconSize={backIcon?.size}
                                                backIconColor={backIcon?.color}
                                                navigation={navigation}
                                            />
                                        )
                                    })}
                                />
                            )
                        })
                    }
                </Stack.Navigator>
            </View>
        </View>
    )
}

interface TabProps {
    tab: Tab;
    onPress: (tab: Tab) => void;
    iconStyle?: TabIconStyle;
    focused?: boolean;
    height?: DimensionValue;
    width?: DimensionValue;
    padding?: number;
    labelStyle?: TextStyle;
    style?: ViewStyle;
}

const TabComponent: React.FC<TabProps> = ({ tab, onPress, focused=false, iconStyle, height, width, padding, labelStyle, style }) => {
    // TODO: this current styling couples padding and height which is annoying, fix
    return (
        <View
            style={{
                width: width || "100%",
                height: height || "10%",
                paddingVertical: padding || 10 
            }}
        >
            <Pressable
                style={[
                    {
                        flex: 1,
                        borderRadius: 10,
                        paddingHorizontal: 10
                    },
                    focused == true ? { backgroundColor: tab.drawerStyle?.focused.backgroundColor || style?.backgroundColor || "#e8e8e8" } : {},
                    style || focused ? tab.drawerStyle?.focused : tab.drawerStyle?.unFocused
                ]}
                onPress={() => onPress(tab)}
            >
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        flexDirection: "row",
                    }}
                >
                    <Icon 
                        name={focused ? tab.icon?.focused || "" : tab.icon?.unfocused || ""} 
                        size={tab.icon?.drawerStyle?.size || iconStyle?.size || 40} 
                        color={focused ? tab.icon?.drawerStyle?.overrideFocusedColor || iconStyle?.focusedColor || "#000000" : tab.icon?.drawerStyle?.overrideColor || iconStyle?.unFocusedColor || "#000000"}
                    />
                    <View style={{ paddingHorizontal: 5 }}/>
                    <Text 
                        style={tab?.overrideDrawerLabelStyle || labelStyle || {
                            fontWeight: "400",
                            fontSize: 17
                        }}
                    >
                        {tab.label}
                    </Text>
                </View>

            </Pressable>
        </View>
    )
}

interface SidebarProps {
    Screen: React.FC;
    title: string;
    drawerVisible: boolean;
    toggleDrawerIcon: {
        icon: string,
        size: number,
        color: string,
        onPress: () => void
    };
    titleStyle?: TextStyle;
    style?: ViewStyle;
}

const Sidebar: React.FC<SidebarProps> = ({ Screen, title, drawerVisible, toggleDrawerIcon, titleStyle, style }) => {
    return (
        <View
            style={[
                {
                    borderRightWidth: style?.borderRightWidth || 1,
                    borderColor: style?.borderColor || "#e8e8e8",
                    width: style?.width || "25%",
                    height: "100%",
                    paddingTop: style?.paddingTop || 20
                },
                style
            ]}
        >

            <SafeAreaView
                style={{
                    flex: 1
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 20
                    }}
                >
                    {
                        drawerVisible ? undefined : (
                            <PressableIcon
                                icon={toggleDrawerIcon.icon}
                                size={toggleDrawerIcon.size}
                                color={toggleDrawerIcon.color}
                                onPress={toggleDrawerIcon.onPress}
                            />
                        )
                    }
                    <Text
                        style={[
                                {
                                    fontWeight: titleStyle?.fontWeight || "bold",
                                    fontSize: titleStyle?.fontSize || 25,
                                    paddingLeft: !drawerVisible ? 20 : 0
                                },
                                titleStyle
                            ]}
                        >
                        {title}
                    </Text>
                </View>
                <Screen/>
            </SafeAreaView>
        </View>

    )
}