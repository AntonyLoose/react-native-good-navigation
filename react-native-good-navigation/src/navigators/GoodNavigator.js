"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodNavigator = void 0;
const react_1 = __importDefault(require("react"));
const DrawerNavigator_1 = require("./DrawerNavigator");
const TabNavigator_1 = require("./TabNavigator");
const types_1 = require("./types");
/**
 * Chooses to render either a drawer or tab bar based on the size of the screen
 * @param props {@link Props}
 * @returns
 */
const GoodNavigator = ({ theme, drawerProps, tabbarProps }) => {
    if ((0, types_1.getScreenType)() == "wide") {
        return react_1.default.createElement(DrawerNavigator_1.DrawerNavigator, { tabs: drawerProps.tabs, drawerTitle: drawerProps.drawerTitle, landingTab: drawerProps.landingTab, theme: drawerProps.theme || theme, drawerStyle: drawerProps.drawerStyle, borderColor: drawerProps.borderColor, drawerTabUnfocusedStyle: drawerProps.drawerTabUnfocusedStyle, drawerTabFocusedStyle: drawerProps.drawerTabFocusedStyle, toggleDrawerIcon: drawerProps.toggleDrawerIcon, sidebarStyle: drawerProps.sidebarStyle, labelStyle: drawerProps.labelStyle, drawerTitleStyle: drawerProps.drawerTitleStyle, screenHeaderStyle: drawerProps.screenHeaderStyle, screenTitleStyle: drawerProps.screenTitleStyle, backIcon: drawerProps.backIcon, tabIconStyle: drawerProps.tabIconStyle, emptyScreen: drawerProps.emptyScreen });
    }
    else {
        return react_1.default.createElement(TabNavigator_1.TabNavigator, { tabs: tabbarProps.tabs, landingTab: tabbarProps.landingTab, theme: tabbarProps.theme || theme, tabbarStyle: tabbarProps.tabbarStyle, headerStyle: tabbarProps.headerStyle, titleStyle: tabbarProps.titleStyle, backIcon: tabbarProps.backIcon, iconColor: tabbarProps.iconColor, focusedIconColor: tabbarProps.focusedIconColor, iconSize: tabbarProps.iconSize, labelStyle: tabbarProps.labelStyle });
    }
};
exports.GoodNavigator = GoodNavigator;
