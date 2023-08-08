import React from "react";
import { DrawerNavigator } from "./DrawerNavigator";
import { TabNavigator } from "./TabNavigator";
import { Tab } from "./types";

interface Props {
    tabs: Tab[]
}

/**
 * Chooses to render either a drawer or tab bar based on the size of the screen
 * @param props {@link Props}
 * @returns 
 */
export const GoodNavigator: React.FC<Props> = ({ tabs }) => {

    const isLargeScreen = () => {  
        return false;
    }

    return isLargeScreen() ? <DrawerNavigator tabs={tabs}/> : <TabNavigator tabs={tabs}/>
}