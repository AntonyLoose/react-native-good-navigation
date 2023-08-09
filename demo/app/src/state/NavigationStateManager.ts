import NavigationPublisher from "./impl/NavigationPublisher";

class NavigationStateManager {
    public static readonly screenStackUpdated = new NavigationPublisher();
}

export { NavigationStateManager };
