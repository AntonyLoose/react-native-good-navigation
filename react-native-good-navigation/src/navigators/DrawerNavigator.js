"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawerNavigator = void 0;
const react_1 = __importDefault(require("react"));
const stack_1 = require("@react-navigation/stack");
const react_2 = require("react");
const react_native_1 = require("react-native");
const MaterialCommunityIcons_1 = __importDefault(require("react-native-vector-icons/MaterialCommunityIcons"));
const Header_1 = require("../components/Header");
const PressableIcon_1 = require("../components/PressableIcon");
const NavigationSession_1 = require("../state/NavigationSession");
const NavigationStateManager_1 = require("../state/NavigationStateManager");
const DrawerNavigator = ({ tabs, drawerTitle, landingTab, theme, drawerTitleStyle, drawerStyle, borderColor, drawerTabUnfocusedStyle, drawerTabFocusedStyle, toggleDrawerIcon, sidebarStyle, labelStyle, screenHeaderStyle, screenTitleStyle, backIcon, tabIconStyle, emptyScreen }) => {
    var _a;
    const [activeTab, setActiveTab] = (0, react_2.useState)(landingTab || tabs[0]);
    const [drawerVisible, setDrawerVisible] = (0, react_2.useState)(true);
    const [screens, setScreens] = (0, react_2.useState)(activeTab.sidebar == undefined ? [activeTab.screen] : []);
    (0, react_2.useEffect)(() => {
        // we only want to add show the first screen if there is no sidebar
        if (activeTab.sidebar == undefined) {
            NavigationSession_1.NavigationSession.inst.addScreen(activeTab.screen);
        }
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
        NavigationSession_1.NavigationSession.inst.activeTab = tab;
        if (tab.sidebar != undefined) {
            NavigationSession_1.NavigationSession.inst.clearScreens();
        }
        else {
            NavigationSession_1.NavigationSession.inst.clearScreens(tab.screen);
        }
        setActiveTab(tab);
    };
    return (react_1.default.createElement(react_native_1.View, { style: {
            flex: 1,
            flexDirection: "row",
        } },
        !drawerVisible ? undefined : (react_1.default.createElement(react_native_1.View, { style: [
                {
                    width: "25%",
                    height: "100%",
                    borderRightWidth: 1,
                    borderColor: borderColor || (theme === null || theme === void 0 ? void 0 : theme.border) || "#e8e8e8",
                    paddingTop: (drawerStyle === null || drawerStyle === void 0 ? void 0 : drawerStyle.padding) || 20,
                    backgroundColor: (drawerStyle === null || drawerStyle === void 0 ? void 0 : drawerStyle.backgroundColor) || (theme === null || theme === void 0 ? void 0 : theme.background)
                },
                drawerStyle
            ] },
            react_1.default.createElement(react_native_1.SafeAreaView, { style: {
                    flex: 1
                } },
                react_1.default.createElement(react_native_1.View, { style: {
                        flex: 1,
                        paddingHorizontal: 20
                    } },
                    react_1.default.createElement(react_native_1.View, { style: {
                            flexDirection: "row",
                            alignItems: "center"
                        } },
                        react_1.default.createElement(PressableIcon_1.PressableIcon, { icon: (toggleDrawerIcon === null || toggleDrawerIcon === void 0 ? void 0 : toggleDrawerIcon.icon) || "book-open-outline", size: (toggleDrawerIcon === null || toggleDrawerIcon === void 0 ? void 0 : toggleDrawerIcon.size) || 30, color: (toggleDrawerIcon === null || toggleDrawerIcon === void 0 ? void 0 : toggleDrawerIcon.color) || (theme === null || theme === void 0 ? void 0 : theme.text) || "#000000", onPress: () => setDrawerVisible(false) }),
                        react_1.default.createElement(react_native_1.Text, { style: [
                                {
                                    fontWeight: "bold",
                                    fontSize: 25,
                                    paddingLeft: 10,
                                    color: (drawerTitleStyle === null || drawerTitleStyle === void 0 ? void 0 : drawerTitleStyle.color) || (theme === null || theme === void 0 ? void 0 : theme.text)
                                },
                                drawerTitleStyle
                            ] }, drawerTitle)),
                    tabs.map((tab, i) => {
                        // for demo purposes
                        const focused = tab.screen.title == activeTab.screen.title;
                        return (react_1.default.createElement(TabComponent, { key: i, tab: tab, onPress: onTabPress, focused: focused, iconStyle: tabIconStyle, height: focused ? drawerTabFocusedStyle === null || drawerTabFocusedStyle === void 0 ? void 0 : drawerTabFocusedStyle.height : drawerTabUnfocusedStyle === null || drawerTabUnfocusedStyle === void 0 ? void 0 : drawerTabUnfocusedStyle.height, width: focused ? drawerTabFocusedStyle === null || drawerTabFocusedStyle === void 0 ? void 0 : drawerTabFocusedStyle.width : drawerTabUnfocusedStyle === null || drawerTabUnfocusedStyle === void 0 ? void 0 : drawerTabUnfocusedStyle.width, padding: focused ? drawerTabFocusedStyle === null || drawerTabFocusedStyle === void 0 ? void 0 : drawerTabFocusedStyle.padding : drawerTabUnfocusedStyle === null || drawerTabUnfocusedStyle === void 0 ? void 0 : drawerTabUnfocusedStyle.padding, labelStyle: (focused ? drawerTabFocusedStyle === null || drawerTabFocusedStyle === void 0 ? void 0 : drawerTabFocusedStyle.overrideLabelStyle : drawerTabUnfocusedStyle === null || drawerTabUnfocusedStyle === void 0 ? void 0 : drawerTabUnfocusedStyle.overrideLabelStyle) || labelStyle, theme: theme, style: focused ? drawerTabFocusedStyle === null || drawerTabFocusedStyle === void 0 ? void 0 : drawerTabFocusedStyle.style : drawerTabUnfocusedStyle === null || drawerTabUnfocusedStyle === void 0 ? void 0 : drawerTabUnfocusedStyle.style }));
                    }))))),
        activeTab.sidebar == undefined ? undefined : (react_1.default.createElement(Sidebar, { Screen: activeTab.sidebar.component, title: activeTab.sidebar.title, titleStyle: ((_a = activeTab.sidebar) === null || _a === void 0 ? void 0 : _a.titleStyle) || (sidebarStyle === null || sidebarStyle === void 0 ? void 0 : sidebarStyle.titleStyle) || { color: theme === null || theme === void 0 ? void 0 : theme.text }, style: activeTab.sidebar.style || (sidebarStyle === null || sidebarStyle === void 0 ? void 0 : sidebarStyle.style) || { backgroundColor: theme === null || theme === void 0 ? void 0 : theme.background }, drawerVisible: drawerVisible, toggleDrawerIcon: {
                icon: (toggleDrawerIcon === null || toggleDrawerIcon === void 0 ? void 0 : toggleDrawerIcon.icon) || "book-open-outline",
                size: (toggleDrawerIcon === null || toggleDrawerIcon === void 0 ? void 0 : toggleDrawerIcon.size) || 30,
                color: (toggleDrawerIcon === null || toggleDrawerIcon === void 0 ? void 0 : toggleDrawerIcon.color) || (theme === null || theme === void 0 ? void 0 : theme.text) || "#000000",
                onPress: () => setDrawerVisible(true)
            }, theme: theme })),
        react_1.default.createElement(react_native_1.View, { style: {
                flex: 1
            } },
            (drawerVisible == true || activeTab.sidebar != undefined) ? undefined : (react_1.default.createElement(react_native_1.SafeAreaView, { style: {
                    backgroundColor: (screenHeaderStyle === null || screenHeaderStyle === void 0 ? void 0 : screenHeaderStyle.backgroundColor) || (theme === null || theme === void 0 ? void 0 : theme.background)
                } },
                react_1.default.createElement(react_native_1.View, { style: {
                        paddingHorizontal: 20,
                        paddingTop: 20
                    } },
                    react_1.default.createElement(PressableIcon_1.PressableIcon, { icon: (toggleDrawerIcon === null || toggleDrawerIcon === void 0 ? void 0 : toggleDrawerIcon.icon) || "book-open-outline", size: (toggleDrawerIcon === null || toggleDrawerIcon === void 0 ? void 0 : toggleDrawerIcon.size) || 30, color: (toggleDrawerIcon === null || toggleDrawerIcon === void 0 ? void 0 : toggleDrawerIcon.color) || (theme === null || theme === void 0 ? void 0 : theme.text) || "#000000", onPress: () => setDrawerVisible(true) })))),
            screens.length <= 0 ? ((emptyScreen === null || emptyScreen === void 0 ? void 0 : emptyScreen.component) != undefined ? react_1.default.createElement(emptyScreen.component, null) : react_1.default.createElement(EmptyScreen, { theme: theme, style: emptyScreen === null || emptyScreen === void 0 ? void 0 : emptyScreen.style, textStyle: emptyScreen === null || emptyScreen === void 0 ? void 0 : emptyScreen.textStyle })) : (react_1.default.createElement(Stack.Navigator, null, screens.map((screen, i) => {
                return (react_1.default.createElement(Stack.Screen, { key: screen.id, name: screen.title, component: screen.component, options: ({ navigation }) => ({
                        animationEnabled: i > 0 && !(react_native_1.Platform.OS == "web"),
                        header: () => (react_1.default.createElement(Header_1.Header, { title: screen.title, isNotFirstScreen: i > 0, style: screenHeaderStyle || { backgroundColor: theme === null || theme === void 0 ? void 0 : theme.background }, titleStyle: screenTitleStyle || { color: theme === null || theme === void 0 ? void 0 : theme.text }, backIcon: (backIcon === null || backIcon === void 0 ? void 0 : backIcon.icon) || "chevron-left", backIconSize: backIcon === null || backIcon === void 0 ? void 0 : backIcon.size, backIconColor: (backIcon === null || backIcon === void 0 ? void 0 : backIcon.color) || (theme === null || theme === void 0 ? void 0 : theme.text), navigation: navigation }))
                    }) }));
            }))))));
};
exports.DrawerNavigator = DrawerNavigator;
const EmptyScreen = ({ theme, style, textStyle }) => {
    return (react_1.default.createElement(react_native_1.View, { style: [
            {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: (style === null || style === void 0 ? void 0 : style.backgroundColor) || (theme === null || theme === void 0 ? void 0 : theme.background)
            },
            style
        ] },
        react_1.default.createElement(react_native_1.Text, { style: [
                {
                    color: (textStyle === null || textStyle === void 0 ? void 0 : textStyle.color) || (theme === null || theme === void 0 ? void 0 : theme.text),
                    fontWeight: (textStyle === null || textStyle === void 0 ? void 0 : textStyle.fontWeight) || "bold"
                },
                textStyle
            ] }, "No item selected")));
};
const TabComponent = ({ tab, onPress, focused = false, iconStyle, height, width, padding, labelStyle, theme, style }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    // TODO: this current styling couples padding and height which is annoying, fix
    return (react_1.default.createElement(react_native_1.View, { style: {
            width: width || "100%",
            height: height || "10%",
            paddingVertical: padding || 10
        } },
        react_1.default.createElement(react_native_1.Pressable, { style: [
                {
                    flex: 1,
                    borderRadius: 10,
                    paddingHorizontal: 10
                },
                focused == true ? { backgroundColor: ((_a = tab.drawerStyle) === null || _a === void 0 ? void 0 : _a.focused.backgroundColor) || (style === null || style === void 0 ? void 0 : style.backgroundColor) || (theme === null || theme === void 0 ? void 0 : theme.tabFocused) || "#e8e8e8" } : {},
                style || focused ? (_b = tab.drawerStyle) === null || _b === void 0 ? void 0 : _b.focused : (_c = tab.drawerStyle) === null || _c === void 0 ? void 0 : _c.unFocused
            ], onPress: () => onPress(tab) },
            react_1.default.createElement(react_native_1.View, { style: {
                    flex: 1,
                    alignItems: "center",
                    flexDirection: "row",
                } },
                react_1.default.createElement(MaterialCommunityIcons_1.default, { name: focused ? ((_d = tab.icon) === null || _d === void 0 ? void 0 : _d.focused) || "" : ((_e = tab.icon) === null || _e === void 0 ? void 0 : _e.unfocused) || "", size: ((_g = (_f = tab.icon) === null || _f === void 0 ? void 0 : _f.drawerStyle) === null || _g === void 0 ? void 0 : _g.size) || (iconStyle === null || iconStyle === void 0 ? void 0 : iconStyle.size) || 40, color: focused ? ((_j = (_h = tab.icon) === null || _h === void 0 ? void 0 : _h.drawerStyle) === null || _j === void 0 ? void 0 : _j.overrideFocusedColor) || (iconStyle === null || iconStyle === void 0 ? void 0 : iconStyle.focusedColor) || (theme === null || theme === void 0 ? void 0 : theme.text) || "#000000" : ((_l = (_k = tab.icon) === null || _k === void 0 ? void 0 : _k.drawerStyle) === null || _l === void 0 ? void 0 : _l.overrideColor) || (iconStyle === null || iconStyle === void 0 ? void 0 : iconStyle.unFocusedColor) || (theme === null || theme === void 0 ? void 0 : theme.text) || "#000000" }),
                react_1.default.createElement(react_native_1.View, { style: { paddingHorizontal: 5 } }),
                react_1.default.createElement(react_native_1.Text, { style: (tab === null || tab === void 0 ? void 0 : tab.overrideDrawerLabelStyle) || labelStyle || {
                        fontWeight: "400",
                        fontSize: 17,
                        color: theme === null || theme === void 0 ? void 0 : theme.text
                    } }, tab.label)))));
};
const Sidebar = ({ Screen, title, drawerVisible, toggleDrawerIcon, titleStyle, theme, style }) => {
    return (react_1.default.createElement(react_native_1.View, { style: [
            {
                borderRightWidth: (style === null || style === void 0 ? void 0 : style.borderRightWidth) || 1,
                borderColor: (style === null || style === void 0 ? void 0 : style.borderColor) || (theme === null || theme === void 0 ? void 0 : theme.border) || "#e8e8e8",
                width: (style === null || style === void 0 ? void 0 : style.width) || "25%",
                height: "100%",
                paddingTop: (style === null || style === void 0 ? void 0 : style.paddingTop) || 20,
                backgroundColor: (style === null || style === void 0 ? void 0 : style.backgroundColor) || (theme === null || theme === void 0 ? void 0 : theme.background) || "#FFFFFF"
            },
            style
        ] },
        react_1.default.createElement(react_native_1.View, { style: {
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20
            } },
            drawerVisible ? undefined : (react_1.default.createElement(PressableIcon_1.PressableIcon, { icon: toggleDrawerIcon.icon, size: toggleDrawerIcon.size, color: toggleDrawerIcon.color, onPress: toggleDrawerIcon.onPress })),
            react_1.default.createElement(react_native_1.Text, { style: [
                    {
                        fontWeight: (titleStyle === null || titleStyle === void 0 ? void 0 : titleStyle.fontWeight) || "bold",
                        fontSize: (titleStyle === null || titleStyle === void 0 ? void 0 : titleStyle.fontSize) || 25,
                        paddingLeft: !drawerVisible ? 20 : 0,
                        color: (titleStyle === null || titleStyle === void 0 ? void 0 : titleStyle.color) || (theme === null || theme === void 0 ? void 0 : theme.text)
                    },
                    titleStyle
                ] }, title)),
        react_1.default.createElement(Screen, null)));
};
