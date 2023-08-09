import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from "react";
import { Screen, ScreenProps, Tab } from "../navigators/types";
import { NavigationStateManager } from "./NavigationStateManager";

class NavigationSession {

    public static readonly inst = new NavigationSession();

    private _screens: Screen[] = [];
    public get screens(){
        return this._screens;
    }

    private _activeTab?: Tab;
    public get activeTab(): Tab | undefined {
        return this._activeTab
    }
    public set activeTab(tab: Tab | undefined){
        this._activeTab = tab;
        NavigationStateManager.activeTabUpdated.publish();
    }

    /**
     * This method is called when the stack has been rerendered after a screen has been addded. It is used to navigate to the new screen as soon as 
     * it is loaded
     */
    public navigateOnLoad = () => {}

    /**
     * Clears the screens and sets the first screen
     * @param setFirstScreen the only screen that will be rendered in the stack
     */
    public clearScreens(setFirstScreen: Screen){
        this._screens = [setFirstScreen];
        NavigationStateManager.screenStackUpdated.publish();
    }

    /**
     * This method does not perform any navigation, it simply adds a screen to the stack.
     * Used for setting the tab bar
     * @param screen 
     */
    public addScreen(screen: Screen){
        this._screens.push(screen);
        NavigationStateManager.screenStackUpdated.publish();
    }

    /**
     * Adds a screen to the stack and navigates to it
     * @param screen the screen to navigate to
     * @param navigation the navigation prop
     * @param title the title of the screen, this sets the title in the header component of our navigation
     */
    public navigateTo(screen: React.FC<ScreenProps>, navigation: NavigationProp<ParamListBase>, title: string){
        if (navigation == undefined){
            this._screens = [];
        }
        this._screens.push({
            id: title, // TODO
            component: screen,
            title: title
        });
        this.navigateOnLoad = () => {
            if (this._screens.length > 1 && navigation != undefined) {
                navigation.navigate(title);
            }
        };
        NavigationStateManager.screenStackUpdated.publish();
    }

    public navigateBack(navigation?: NavigationProp<ParamListBase>){
        if (navigation == undefined || !navigation.canGoBack()) {
            this._screens = [];
        } else {
            this._screens.pop();
            navigation.goBack();
        }
        NavigationStateManager.screenStackUpdated.publish();
    }

}

export { NavigationSession }