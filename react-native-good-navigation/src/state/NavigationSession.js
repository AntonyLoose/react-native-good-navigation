"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationSession = void 0;
const NavigationStateManager_1 = require("./NavigationStateManager");
class NavigationSession {
    constructor() {
        this._screens = [];
        /**
         * This method is called when the stack has been rerendered after a screen has been addded. It is used to navigate to the new screen as soon as
         * it is loaded
         */
        this.navigateOnLoad = () => { };
    }
    get screens() {
        return this._screens;
    }
    get activeTab() {
        return this._activeTab;
    }
    set activeTab(tab) {
        this._activeTab = tab;
        NavigationStateManager_1.NavigationStateManager.activeTabUpdated.publish();
    }
    /**
     * Clears the screens and sets the first screen (optional)
     * @param setFirstScreen the only screen that will be rendered in the stack
     */
    clearScreens(setFirstScreen) {
        this._screens = [];
        setFirstScreen != undefined ? this.screens.push(setFirstScreen) : null;
        NavigationStateManager_1.NavigationStateManager.screenStackUpdated.publish();
    }
    /**
     * This method does not perform any navigation, it simply adds a screen to the stack.
     * Used for setting the tab bar
     * @param screen
     */
    addScreen(screen) {
        this._screens.push(screen);
        NavigationStateManager_1.NavigationStateManager.screenStackUpdated.publish();
    }
    /**
     * Adds a screen to the stack and navigates to it
     * @param screen the screen to navigate to
     * @param navigation the navigation prop
     * @param title the title of the screen, this sets the title in the header component of our navigation
     */
    navigateTo(screen, navigation, title) {
        if (navigation == undefined) {
            this._screens = [];
        }
        this._screens.push({
            id: title,
            component: screen,
            title: title
        });
        this.navigateOnLoad = () => {
            if (this._screens.length > 1 && navigation != undefined) {
                navigation.navigate(title);
            }
        };
        NavigationStateManager_1.NavigationStateManager.screenStackUpdated.publish();
    }
    navigateBack(navigation) {
        if (navigation == undefined || !navigation.canGoBack()) {
            this._screens = [];
        }
        else {
            this._screens.pop();
            navigation.goBack();
        }
        NavigationStateManager_1.NavigationStateManager.screenStackUpdated.publish();
    }
}
exports.NavigationSession = NavigationSession;
NavigationSession.inst = new NavigationSession();
