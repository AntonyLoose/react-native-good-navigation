import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native"
import { Header } from "../components/Header";
import { PressableIcon } from "../components/PressableIcon";
import { IconType, Tab } from "./types"

interface Props {
    tabs: Tab[],
    tabbarStyle?: ViewStyle,
    headerStyle?: TextStyle,
    titleStyle?: TextStyle,
    backIcon?: IconType,
    iconColor?: string,
    focusedIconColor?: string,
    iconSize?: number;
    labelStyle?: TextStyle;
}

export const TabNavigator: React.FC<Props> = ({ 
    tabs, 
    headerStyle, 
    tabbarStyle,
    titleStyle,
    backIcon,
    iconColor = "black",
    focusedIconColor,
    iconSize = 40,
    labelStyle
}) => {

    const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);

    const Stack = createStackNavigator();
    
    const onTabPress = (tab: Tab) => {
        setActiveTab(tab);
    }

    return (
        <View
            style={{
                flex: 1
            }}
        >
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
                                            style={headerStyle}
                                            titleStyle={titleStyle}
                                            backIcon={backIcon?.icon}
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

            <SafeAreaView edges={["bottom"]}>
                <View
                    style={[
                        {
                            flexDirection: "row",
                            width: "100%",
                            paddingVertical: 10
                        },
                        tabbarStyle
                    ]}
                >
                    {
                        tabs.map((tab, i) => {

                            const focused = tab.label == activeTab.label;

                            return (
                                <TabComponent key={i} onPress={onTabPress} tab={tab} color={(focused ? tab.icon?.tabbarStyle?.overrideFocusedColor : tab.icon?.tabbarStyle?.overrideColor) || iconColor} size={iconSize} focused={focused} labelStyle={labelStyle}/>
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
    labelStyle?: TextStyle;
}

const TabComponent: React.FC<TabProps> = ({ tab, color, size, focused, onPress, labelStyle }) => {
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
                    { textAlign: "center" },
                    tab.overrideTabbarLabelStyle || labelStyle
                ]}
            >
                {tab.label}
            </Text>
        </Pressable>
    )
}