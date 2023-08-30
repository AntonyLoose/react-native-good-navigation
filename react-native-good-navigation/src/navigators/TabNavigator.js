"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabNavigator = void 0;
const react_1 = __importDefault(require("react"));
const stack_1 = require("@react-navigation/stack");
const react_2 = require("react");
const react_native_1 = require("react-native");
const react_native_2 = require("react-native");
const react_native_3 = require("react-native");
const Header_1 = require("../components/Header");
const PressableIcon_1 = require("../components/PressableIcon");
const NavigationStateManager_1 = require("../state/NavigationStateManager");
const NavigationSession_1 = require("../state/NavigationSession");
const TabNavigator = ({ tabs, landingTab, theme, headerStyle, tabbarStyle, titleStyle, backIcon, iconColor, focusedIconColor, iconSize = 40, labelStyle }) => {
    const [activeTab, setActiveTab] = (0, react_2.useState)(landingTab || tabs[0]);
    const [screens, setScreens] = (0, react_2.useState)([activeTab.screen]);
    (0, react_2.useEffect)(() => {
        NavigationSession_1.NavigationSession.inst.addScreen(activeTab.screen);
        NavigationStateManager_1.NavigationStateManager.screenStackUpdated.subscribe(() => {
            setScreens([...NavigationSession_1.NavigationSession.inst.screens]);
        });
        NavigationStateManager_1.NavigationStateManager.activeTabUpdated.subscribe(() => {
            setActiveTab(NavigationSession_1.NavigationSession.inst.activeTab || tabs[0]);
        });
    }, []);
    (0, react_2.useEffect)(() => {
        NavigationSession_1.NavigationSession.inst.navigateOnLoad();
        NavigationSession_1.NavigationSession.inst.navigateOnLoad = () => { };
    }, [screens]);
    const Stack = (0, stack_1.createStackNavigator)();
    const onTabPress = (tab) => {
        NavigationSession_1.NavigationSession.inst.clearScreens(tab.screen);
        NavigationSession_1.NavigationSession.inst.activeTab = tab;
        setActiveTab(tab);
    };
    return (react_1.default.createElement(react_native_1.View, { style: {
            flex: 1
        } },
        react_1.default.createElement(react_native_2.SafeAreaView, { style: {
                flex: 1,
                backgroundColor: (headerStyle === null || headerStyle === void 0 ? void 0 : headerStyle.backgroundColor) || (theme === null || theme === void 0 ? void 0 : theme.background)
            } },
            react_1.default.createElement(Stack.Navigator, { screenOptions: {
                    // We have to disable as we cannot override the method called on back
                    gestureEnabled: false // TODO: replace this gesture
                } }, screens.map((screen, i) => {
                return (react_1.default.createElement(Stack.Screen, { key: screen.id, name: screen.title, component: screen.component, options: ({ navigation }) => ({
                        animationEnabled: i > 0 && !(react_native_1.Platform.OS == "web"),
                        header: () => (react_1.default.createElement(Header_1.Header, { title: screen.title, isNotFirstScreen: i > 0, style: headerStyle || { backgroundColor: theme === null || theme === void 0 ? void 0 : theme.background }, titleStyle: titleStyle || { color: theme === null || theme === void 0 ? void 0 : theme.text }, backIcon: backIcon === null || backIcon === void 0 ? void 0 : backIcon.icon, backIconSize: backIcon === null || backIcon === void 0 ? void 0 : backIcon.size, backIconColor: (backIcon === null || backIcon === void 0 ? void 0 : backIcon.color) || (theme === null || theme === void 0 ? void 0 : theme.text), navigation: navigation }))
                    }) }));
            }))),
        react_1.default.createElement(react_native_1.View, { style: [
                {
                    flexDirection: "row",
                    width: "100%",
                    paddingBottom: 10,
                    backgroundColor: (tabbarStyle === null || tabbarStyle === void 0 ? void 0 : tabbarStyle.backgroundColor) || (theme === null || theme === void 0 ? void 0 : theme.background)
                },
                tabbarStyle
            ] }, tabs.map((tab, i) => {
            var _a, _b, _c, _d;
            const focused = tab.label == activeTab.label;
            return (react_1.default.createElement(TabComponent, { key: i, onPress: onTabPress, tab: tab, color: (focused ? (((_b = (_a = tab.icon) === null || _a === void 0 ? void 0 : _a.tabbarStyle) === null || _b === void 0 ? void 0 : _b.overrideFocusedColor) || focusedIconColor) : (_d = (_c = tab.icon) === null || _c === void 0 ? void 0 : _c.tabbarStyle) === null || _d === void 0 ? void 0 : _d.overrideColor) || iconColor || (theme === null || theme === void 0 ? void 0 : theme.text) || "#FFFFFF", size: iconSize, focused: focused, theme: theme, labelStyle: labelStyle }));
        }))));
};
exports.TabNavigator = TabNavigator;
const TabComponent = ({ tab, color, size, focused, onPress, theme, labelStyle }) => {
    var _a, _b, _c, _d, _e, _f, _g;
    return (react_1.default.createElement(react_native_1.Pressable, { style: [
            {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 20
            },
            focused ? (_a = tab.tabbarStyle) === null || _a === void 0 ? void 0 : _a.focused : (_b = tab.tabbarStyle) === null || _b === void 0 ? void 0 : _b.unFocused
        ], onPress: () => onPress(tab) },
        react_1.default.createElement(PressableIcon_1.PressableIcon, { onPress: () => onPress(tab), icon: (focused ? (_c = tab.icon) === null || _c === void 0 ? void 0 : _c.focused : (_d = tab.icon) === null || _d === void 0 ? void 0 : _d.unfocused) || "", size: ((_f = (_e = tab.icon) === null || _e === void 0 ? void 0 : _e.tabbarStyle) === null || _f === void 0 ? void 0 : _f.size) || size, color: color }),
        react_1.default.createElement(react_native_3.Text, { style: [
                {
                    textAlign: "center",
                    color: ((_g = tab.overrideTabbarLabelStyle) === null || _g === void 0 ? void 0 : _g.color) || (labelStyle === null || labelStyle === void 0 ? void 0 : labelStyle.color) || (theme === null || theme === void 0 ? void 0 : theme.text)
                },
                tab.overrideTabbarLabelStyle || labelStyle
            ] }, tab.label)));
};
