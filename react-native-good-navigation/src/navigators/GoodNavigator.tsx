import React from "react";
import { DrawerNavigator, DrawerProps } from "./DrawerNavigator";
import { TabNavigator, TabNavigatorProps } from "./TabNavigator";
import { getScreenType, Theme } from "./types";

interface Props {
    theme?: Theme;
    drawerProps: DrawerProps;
    tabbarProps: TabNavigatorProps;
}

/**
 * Chooses to render either a drawer or tab bar based on the size of the screen
 * @param props {@link Props}
 * @returns 
 */
export const GoodNavigator: React.FC<Props> = ({ theme, drawerProps, tabbarProps }) => {

    if (getScreenType() == "wide"){
        return <DrawerNavigator
            tabs={drawerProps.tabs}
            drawerTitle={drawerProps.drawerTitle}
            landingTab={drawerProps.landingTab}
            theme={drawerProps.theme || theme}
            drawerStyle={drawerProps.drawerStyle}
            borderColor={drawerProps.borderColor}
            drawerTabUnfocusedStyle={drawerProps.drawerTabUnfocusedStyle}
            drawerTabFocusedStyle={drawerProps.drawerTabFocusedStyle}
            toggleDrawerIcon={drawerProps.toggleDrawerIcon}
            sidebarStyle={drawerProps.sidebarStyle}
            labelStyle={drawerProps.labelStyle}
            drawerTitleStyle={drawerProps.drawerTitleStyle}
            screenHeaderStyle={drawerProps.screenHeaderStyle}
            screenTitleStyle={drawerProps.screenTitleStyle}
            backIcon={drawerProps.backIcon}
            tabIconStyle={drawerProps.tabIconStyle}
            emptyScreen={drawerProps.emptyScreen}
        />
    }else{
        return <TabNavigator
            tabs={tabbarProps.tabs}
            landingTab={tabbarProps.landingTab}
            theme={tabbarProps.theme || theme}
            tabbarStyle={tabbarProps.tabbarStyle}
            headerStyle={tabbarProps.headerStyle}
            titleStyle={tabbarProps.titleStyle}
            backIcon={tabbarProps.backIcon}
            iconColor={tabbarProps.iconColor}
            focusedIconColor={tabbarProps.focusedIconColor}
            iconSize={tabbarProps.iconSize}
            labelStyle={tabbarProps.labelStyle}
        />
    }
}