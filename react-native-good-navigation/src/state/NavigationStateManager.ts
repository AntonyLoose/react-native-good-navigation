import NavigationPublisher from "./impl/NavigationPublisher";

class NavigationStateManager {
    public static readonly screenStackUpdated = new NavigationPublisher();
    public static readonly activeTabUpdated = new NavigationPublisher();
}

export { NavigationStateManager };
