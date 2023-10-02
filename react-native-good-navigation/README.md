# react-native-good-navigation
An implementation of react-native stack that allows screens to be added and navigated to at runtime. 

![image](https://github.com/AntonyLoose/react-native-good-navigation/assets/86053464/75399bc1-9b4e-4711-a625-837eec4c93d4)
![image](https://github.com/AntonyLoose/react-native-good-navigation/assets/86053464/c37970d7-21fa-4794-921a-2c1406869ee4)
<img src="https://github.com/AntonyLoose/react-native-good-navigation/assets/86053464/0d2cee52-60ae-4722-ad9c-fdbb161ab78a"  width="300" height="600">
<img src="https://github.com/AntonyLoose/react-native-good-navigation/assets/86053464/dc854e0d-abeb-450c-a284-824bd0d91949"  width="300" height="600">

## Installation

`npm install react-navtive-good-navigation`
`npm install @react-navigation/native`

note: currently you have to install `@react-navigation/native` separately. I am working on fixing this so they are automatically installed with this package.

## Usage
To get started simply create some tabs, pass them into [GoodNavigator](#GoodNavigator) and your good to go! To navigate to a new screen just call [NavigationSession.inst.navigateTo()](#navigateTo). 


**IMPORTANT**:
- Every screen that you navigate to should take in a navigation object, in typescript you can type this using the [ScreenProps](#ScreenProps) interface provided in the package.
- You cannot pass props to screens like you can with `@react-navigation/stack`, I plan to add this in the future, however, if you want to use this package now you will have to use a state manager like Redux or manage your state in some other way.
- You must wrap the navigator in a `NavigationContainer`.
- `react-native-vector-icons` are used for tab icons. You can find the library of icons [here](https://oblador.github.io/react-native-vector-icons/) under MaterialCommunityIcons. 

```ts
import { GoodNavigator, NavigationSession, ScreenProps, Tab } from 'react-native-good-navigation';
import { Button, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';

const theme = {
    background: "white",
    text: "black",
    border: "#e8e8e8",
    tabFocused: "#e8e8e8"
}

const Homes: React.FC<ScreenProps> = ({ navigation }) => {
    return (
        <View
            style={{
		flex: 1,
		backgroundColor: theme.background,
		padding: 20
	    }}
        >
	    <Button
		title={"Home 1"}
		onPress={() => NavigationSession.inst.navigateTo(HomeScreen, navigation, "Home 1",
		"Unique ID")}
	    />
	
	    <Button	
		title={"Home 2"}
		onPress={() => NavigationSession.inst.navigateTo(HomeScreen, navigation, "Home 2",
		"Unique ID")}
	    />
	</View>
    )
}

const HomeScreen: React.FC<ScreenProps> = ({ navigation }) => {
    return (
	<View
	    style={{
		flex: 1,
		backgroundColor: theme.background,
		padding: 20
	    }}
	>		
	    {/* your content here */}
	</View>
    )	
}

const Screen2: React.FC<ScreenProps> = ({ navigation }) => {
    return (
	<View
	    style={{
		flex: 1,
		backgroundColor: theme.background,
		padding: 20
	    }}
	>	
	    {/* your content here */}
	</View>
    )
}

export default function App(){
    const tabs: Tab[] = [
	{
	    label: "Homes",
	    screen: {
		id: "HOMES",
		component: Homes,
		title: "Homes"
	    },
	    icon: {
		focused: "home",
		unfocused: "home-outline",
	    },
	    sidebar: {
		component: Homes,
		title: "Homes"
	    },
	},
	{
	    label: "Screen 2",
	    screen: {
		id: "SCREEN_2",
		component: Screen2,
		title: "Screen 2"
	    },
	    icon: {
		focused: "fullscreen",
		unfocused: "fullscreen-exit",
	    }
	}
    ]

    return (
	<NavigationContainer>
	    <GoodNavigator
		tabbarProps={{
		    tabs: tabs
		}}
		drawerProps={{	
		    tabs: tabs,
		    drawerTitle: "Your app"
		}}
		theme={theme}
	    />
	</NavigationContainer>
    )
}

```

## API Reference
### NavigationSession
IMPORTANT: do not use `navigation.navigate()` or `navigation.goBack()`, we do not have control over these, meaning you will get unexpected behaviour and your application will likely crash.
#### `navigateTo`
Navigates to the screen provided. 
```ts
// navigation prop should be passed into every screen, see ScreenProps
NavigationSession.inst.navigateTo(YOUR_SCREEN, navigation, "SCREEN_TITLE", "UNIQUE_ID");
```

#### `navigateBack`
Navigates to the previous screen and pops the current screen from the stack.
```ts
NavigationSession.inst.navigateBack(navigation);
```

### GoodNavigator
This navigator will render either a [TabNavigator](#TabNavigator) or [DrawerNavigator](#DrawerNavigator) depending on the width of the screen. You can pass tab bar and drawer navigator props into this navigator.

**theme**: Use this to apply a global style to the navigator on all device types. Providing styles for the tab bar and drawer will overwrite the theme in the area the style applies.

**tabbarProps**: [TabbarProps](#TabbarProps).

**drawerProps**: [DrawerProps](#DrawerProps).

#### Example
```ts
<NavigationContainer>
    <GoodNavigator
	tabbarProps={{
	    tabs: tabs
	}}
	drawerProps={{	
	    tabs: tabs,
	    drawerTitle: "Your app"
	}}
	theme={theme}
    />
</NavigationContainer>
```

### TabNavigator 
Pretty straightforward, just renders a tab bar at the bottom of the screen.
#### **TabbarProps:**
##### `tabs`:
- Type: [Tab](#Tab)[]
- Description: see below.

##### `landingTab`:
- Type: [Tab](#Tab)
- Description: An optional `Tab` object representing the tab that should be active when the component first renders. If not provided, the first tab in the `tabs` array will be the landing tab.

##### `theme`:
- Type: Theme
- Description: An optional theme object that defines background, text, border, and tabFocused colors.

##### `tabbarStyle`:
- Type: `ViewStyle`
- Description: Optional style object to customise the appearance of the tab bar.

##### `headerStyle`:
- Type: `TextStyle`
- Description: Optional style object to customise the appearance of the header.

##### `titleStyle`:
- Type: `TextStyle`
- Description: Optional style object to customise the appearance of the title text in the header.

##### `backIcon`:
- Type: [IconType](#IconType)
- Description: An optional object that specifies the icon used for the back button in the header, including its color and size.

##### `iconColor`:
- Type: `string`
- Description: An optional color string defining the color of the icon when a tab is not focused.

##### `focusedIconColor`:
- Type: `string`
- Description: An optional color string defining the color of the icon when a tab is focused.

##### `iconSize`:
- Type: `number`
- Description: An optional number defining the size of the icon in the tab. Default value is `40`.

##### `labelStyle`:
- Type: `TextStyle`
- Description: Optional style object to customise the appearance of the label text in the tab.

##### `Wrapper`:
- Type: `React.ComponentType<{ children: ReactNode }>`
-  Description: An optional component used to wrap the rendered tabs. If not provided, the tabs will be wrapped in a default `View` component.

### DrawerNavigator
Renders a drawer on the side of the screen that can be hidden, if a sidebar is provided for a tab then it will render next to the drawer.

#### DrawerProps
##### `tabs:`
- **Type:** [Tab](#Tab)[]
- Description: see below.

##### `drawerTitle:`
- **Type:** String
- Description: The title displayed at the top of the drawer. This is a required prop.

##### `landingTab:`
- **Type:** [Tab](#Tab).
- Description: The tab that should be active when the component is first mounted. Optional.

##### `theme:`
- **Type:** `Theme` object.
- Description: Styling properties that will be applied across various subcomponents. Optional.

##### `drawerStyle:`
- **Type:** `ViewStyle` object.
- Description: Styling properties for the drawer component. Optional.

##### `borderColor:`
- Type: `string` (color)
- Description: The color for the border of the drawer component. Optional.

##### `drawerTabUnfocusedStyle:`
- Type: `DrawerTabStyle` object.
- Description: Styling properties for the drawer tab when it is not focused. Optional.

##### `drawerTabFocusedStyle:`
- Type: `DrawerTabStyle` object.
- Description: Styling properties for the drawer tab when it is focused. Optional.

##### `toggleDrawerIcon:`
- Type: Object `{ color?: string; icon?: string; size?: number }`
- Description: Properties to render an icon used to toggle the drawer’s visibility. Optional.

##### `sidebarStyle:`
- Type: Object `{ style: ViewStyle; titleStyle?: TextStyle }`
- Description: Styling properties for the sidebar and its title. Optional.

##### `labelStyle:`
- Type: `TextStyle` object.
- Description: Styling properties for the label inside the drawer. Optional.

##### `drawerTitleStyle:`
- Type: `TextStyle` object.
- Description: Styling properties for the drawer title. Optional.

##### `screenHeaderStyle:`
- Type: `TextStyle` object.
- Description: Styling properties for the screen header inside the drawer. Optional.

##### `screenTitleStyle:`
- Type: `TextStyle` object.
- Description: Styling properties for the screen title inside the drawer. Optional.

##### `backIcon:`
- Type: [IconType](#IconType)
- Description: The icon to be used for the back button inside the drawer. Optional.

##### `tabIconStyle:`
- Type: `TabIconStyle` object.
- Description: Styling properties for the tab icon inside the drawer. Optional.

##### `emptyScreen:`
- Type: Object `{ style?: ViewStyle; textStyle?: TextStyle; component?: React.FC }`
- Description: Component to be rendered when no screens are available to display. It includes optional styling for the component and its text. Optional.

### Types
#### Tab
The `Tab` type represents the individual tab objects that are passed in the `tabs` array to the `TabNavigator` component. Each `Tab` object contains information and styles related to the screen it represents in the tab bar.
##### `screen`:
  - Type: `Screen`
  - Description: A `Screen` object that holds information about the React component to render, its title, and a unique identifier.

##### `label`:
  - Type: `string`
  - Description: An optional string that defines the label displayed on the tab.

##### `overrideTabbarLabelStyle`:
  - Type: `TextStyle`
  - Description: Optional style object to customize the appearance of the label text in the tab bar.

##### `tabbarStyle`:
  - Type: `{ focused: ViewStyle, unFocused: ViewStyle }`
  - Description: Allows specifying separate styles for the focused and unfocused state of each tab in the tab bar.

##### `overrideDrawerLabelStyle`:
  - Type: `TextStyle`
  - Description: Optional style object to customize the appearance of the label text in the drawer.

##### `drawerStyle`:
  - Type: `{ focused: ViewStyle, unFocused: ViewStyle }`
  - Description: Allows specifying separate styles for the focused and unfocused state of each tab in the drawer.

##### `icon`:
  - Type: ```
```ts
{
  focused: string;
  unfocused: string;
  tabbarStyle?: {
    size?: number;
    overrideColor?: string;
    overrideFocusedColor?: string;
  };
  drawerStyle?: {
    size?: number;
    overrideColor?: string;
    overrideFocusedColor?: string;
  };
}
```
  - Description: An optional object specifying the icons to be used for the tab in both focused and unfocused states, with possible overrides for color and size in both tab bar and drawer scenarios.

##### `sidebar`:
  - Type: `{ title: string, titleStyle?: TextStyle, component: React.FC<any>, style?: ViewStyle; }`
  - Description: An optional object defining a sidebar component, its title, style, and title style.

#### ScreenProps
- navigation (`NavigationProp<ParamListBase>`): Represents the navigation prop from React Navigation which allows navigating between different screens.

#### IconType
- icon (string): The icon to be used.
- color? (string): The color of the icon.
- size? (number): The size of the icon.

#### Theme
- background (string): The background color.
- text (string): The text color.
- border (string): The border color.
- tabFocused (string): The color to be used when the tab is focused.

#### Screen
- id (string): A unique identifier for the screen.
- component (`React.FC<ScreenProps>`): The component to be rendered for this screen.
- title (string): The title of the screen.

#### getScreenType
A utility function that returns either "wide" or "narrow" based on the width of the window.
- Returns: "wide" if the window width is more than 750, otherwise "narrow".

### Examples
TODO

## Contact
`antony35007@gmail.com`

## Changelog
[Change Log](./CHANGELOG.md)
