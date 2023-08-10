import React from "react";
import { DrawerNavigator, DrawerProps } from "./DrawerNavigator";
import { TabNavigator, TabNavigatorProps } from "./TabNavigator";
import { getScreenType, Tab, Theme } from "./types";

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
            theme={drawerProps.theme || theme}
            landingTab={drawerProps.landingTab}
            emptyScreen={drawerProps.emptyScreen}
        />
    }else{
        return <TabNavigator
            tabs={tabbarProps.tabs}
            theme={tabbarProps.theme || theme}
            landingTab={tabbarProps.landingTab}
            iconColor={tabbarProps.iconColor}
            labelStyle={tabbarProps.labelStyle}
        />
    }
}