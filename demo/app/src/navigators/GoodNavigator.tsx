import React from "react";
import { Dimensions } from "react-native";
import { DrawerNavigator, DrawerNavigatorProps } from "./DrawerNavigator";
import { TabNavigator, TabNavigatorProps } from "./TabNavigator";
import { Tab, Theme } from "./types";

interface Props {
    theme?: Theme;
    drawerProps: DrawerNavigatorProps;
    tabbarProps: TabNavigatorProps;
}

/**
 * Chooses to render either a drawer or tab bar based on the size of the screen
 * @param props {@link Props}
 * @returns 
 */
export const GoodNavigator: React.FC<Props> = ({ theme, drawerProps, tabbarProps }) => {

    const isLargeScreen = () => {  

        const { width } = Dimensions.get("window");

        return width > 750;
    }

    if (isLargeScreen()){
        return <DrawerNavigator 
            tabs={drawerProps.tabs}
            drawerTitle={drawerProps.drawerTitle}
            theme={drawerProps.theme || theme}
        />
    }else{
        return <TabNavigator
            tabs={tabbarProps.tabs}
            theme={tabbarProps.theme || theme}
            landingTab={tabbarProps.landingTab}
        />
    }
}