import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { DimensionValue, Platform, Pressable, SafeAreaView, Text, TextStyle, View, ViewStyle } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Header } from "../components/Header";
import { PressableIcon } from "../components/PressableIcon";
import { NavigationSession } from "../state/NavigationSession";
import { NavigationStateManager } from "../state/NavigationStateManager";
import { IconType, Screen, Tab, Theme } from "./types"

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

export interface DrawerProps {
    tabs: Tab[];
    drawerTitle: string;
    landingTab?: Tab;
    theme?: Theme;
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
    emptyScreen?: {
        style?: ViewStyle;
        textStyle?: TextStyle;
        component?: React.FC;
    }
}

export const DrawerNavigator: React.FC<DrawerProps> = ({ 
    tabs,
    drawerTitle,
    landingTab,
    theme,
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
    tabIconStyle,
    emptyScreen
 }) => {
    const [activeTab, setActiveTab] = useState<Tab>(landingTab || tabs[0]);
    const [drawerVisible, setDrawerVisible] = useState<boolean>(true);
    const [screens, setScreens] = useState<Screen[]>(activeTab.sidebar == undefined ? [activeTab.screen] : []);

    useEffect(() => {
        // we only want to add show the first screen if there is no sidebar
        if (activeTab.sidebar == undefined){
            NavigationSession.inst.addScreen(activeTab.screen);
        }
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
        NavigationSession.inst.activeTab = tab;
        if (tab.sidebar != undefined){
            NavigationSession.inst.clearScreens();
        }else{
            NavigationSession.inst.clearScreens(tab.screen);
        }
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
                                borderColor: borderColor || theme?.border || "#e8e8e8",
                                paddingTop: drawerStyle?.padding || 20,
                                backgroundColor: drawerStyle?.backgroundColor || theme?.background
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
                                        color={toggleDrawerIcon?.color || theme?.text || "#000000"}
                                        onPress={() => setDrawerVisible(false)}
                                    />
                                    <Text 
                                        style={[
                                            {
                                                fontWeight: "bold",
                                                fontSize: 25,
                                                paddingLeft: 10,
                                                color: drawerTitleStyle?.color || theme?.text
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
                                                theme={theme}
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
                        titleStyle={activeTab.sidebar.titleStyle || sidebarStyle?.titleStyle || { color: theme?.text }}
                        style={activeTab.sidebar.style || sidebarStyle?.style || { backgroundColor: theme?.background }}
                        drawerVisible={drawerVisible}
                        toggleDrawerIcon={{
                            icon: toggleDrawerIcon?.icon || "book-open-outline",
                            size: toggleDrawerIcon?.size || 30,
                            color: toggleDrawerIcon?.color || theme?.text || "#000000",
                            onPress: () => setDrawerVisible(true)
                        }}
                        theme={theme}
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
                                backgroundColor: screenHeaderStyle?.backgroundColor || theme?.background
                            }}
                        >
                            <View
                                style={{
                                    paddingHorizontal: 20,
                                    paddingTop: 20
                                }}
                            >    
                                <PressableIcon
                                    icon={toggleDrawerIcon?.icon || "book-open-outline"}
                                    size={toggleDrawerIcon?.size || 30 }
                                    color={toggleDrawerIcon?.color || theme?.text || "#000000"}
                                    onPress={() => setDrawerVisible(true)}
                                />
                            </View>
                        </SafeAreaView>
                    )
                }

                {
                    screens.length <= 0 ? (emptyScreen?.component != undefined ? <emptyScreen.component /> : <EmptyScreen theme={theme} style={emptyScreen?.style} textStyle={emptyScreen?.textStyle}/>) : (
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
                                                        style={screenHeaderStyle || { backgroundColor: theme?.background }}
                                                        titleStyle={screenTitleStyle || { color: theme?.text }}
                                                        backIcon={backIcon?.icon || "chevron-left"}
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
                    )
                }
            </View>
        </View>
    )
}

interface EmptyScreenProps {
    theme?: Theme;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const EmptyScreen: React.FC<EmptyScreenProps> = ({
    theme,
    style,
    textStyle
}) => {
    return (
        <View
            style={[
                {
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: style?.backgroundColor || theme?.background
                },
                style
            ]}
        >
            <Text
                style={[
                    {
                        color: textStyle?.color || theme?.text,
                        fontWeight: textStyle?.fontWeight || "bold"
                    },
                    textStyle
                ]}
            >No item selected</Text>
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
    theme?: Theme;
    style?: ViewStyle;
}

const TabComponent: React.FC<TabProps> = ({ tab, onPress, focused=false, iconStyle, height, width, padding, labelStyle, theme, style }) => {
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
                    focused == true ? { backgroundColor: tab.drawerStyle?.focused.backgroundColor || style?.backgroundColor || theme?.tabFocused || "#e8e8e8" } : {},
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
                        color={focused ? tab.icon?.drawerStyle?.overrideFocusedColor || iconStyle?.focusedColor || theme?.text || "#000000" : tab.icon?.drawerStyle?.overrideColor || iconStyle?.unFocusedColor || theme?.text || "#000000"}
                    />
                    <View style={{ paddingHorizontal: 5 }}/>
                    <Text 
                        style={tab?.overrideDrawerLabelStyle || labelStyle || {
                            fontWeight: "400",
                            fontSize: 17,
                            color: theme?.text
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
    theme?: Theme;
    style?: ViewStyle;
}

const Sidebar: React.FC<SidebarProps> = ({ Screen, title, drawerVisible, toggleDrawerIcon, titleStyle, theme, style }) => {
    return (
        <View
            style={[
                {
                    borderRightWidth: style?.borderRightWidth || 1,
                    borderColor: style?.borderColor || theme?.border || "#e8e8e8",
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
                                    paddingLeft: !drawerVisible ? 20 : 0,
                                    color: titleStyle?.color || theme?.text
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