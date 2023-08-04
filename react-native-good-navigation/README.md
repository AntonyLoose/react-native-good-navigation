# react-native-good-navigation
An implementation of react-native stack that allows screens to be added and navigated to at runtime

## Types

### Tab

This is the type passed into the navigators, the navigators will render the screen when the associated tab is pressed. Optional props are included to allow styling of any part of the navigators.

```typescript
type Tab = {
  screen: React.FC,
  label?: string,
  overrideTabbarLabelStyle?: ViewStyle,
  tabbarStyle?: ViewStyle, // allows you to have seperate styles for each tab in tabbar
  overrideDrawerLabelStyle?: ViewStyle, 
  drawerStyle?: ViewStyle, // allows you to have seperate styles for each tab in drawer
  icon?: {
    focused: string,
    unfocused: string,
    size?: number,
    overrideColor?: string, 
    overrideFocusedColor?: string
  },
  sidebar?: {
    title: string,
    titleStyle?: ViewStyle,
    component: React.FC,
  }
}
```

### Tab bar

- Allows for complete styling of the tabbar.
- Renders the tabs, uses the styles provided, unless, the tab has a style override.

```typescript
interface TabbarProps {
  tabs: Tab[],
  tabbarStyle?: ViewStyle,
  headerStyle?: ViewStyle,
  titleStyle?: ViewStyle,
  backIcon?: string,
  backIconStyle?: string,
  iconColor?: string,
  focusedIconColor?: string
}
```

