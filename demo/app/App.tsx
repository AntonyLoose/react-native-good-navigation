import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigator } from './src/navigators/DrawerNavigator';
import { TabNavigator } from './src/navigators/TabNavigator';
import { Tab } from './src/navigators/types';
import { Account } from './src/screens/Account';
import { Home } from './src/screens/home/Home';
import { HomeSidebar } from './src/screens/home/HomeSidebar';
import { Settings } from './src/screens/Settings';
import { colours } from './src/styles';

export default function App() {

  const tabs: Tab[] = [
    {
      label: "Home",
      screen: {
        component: Home,
        title: "Home"
      },
      icon: {
        focused: "home",
        unfocused: "home-outline",
      },
      sidebar: {
        component: HomeSidebar,
        title: "Homes"
      },
    },
    {
      label: "Account",
      screen: {
        component: Account,
        title: "Account"
      },
      icon: {
        focused: "account",
        unfocused: "account-outline",
      }
    },
    {
      label: "Settings",
      screen: {
        component: Settings,
        title: "Settings"
      },
      icon: {
        focused: "cog",
        unfocused: "cog-outline",
      }
    }
  ]

  return (
    <NavigationContainer>
      {/* <TabNavigator 
        tabs={tabs}
        tabbarStyle={{
          backgroundColor: colours.background
        }}
        headerStyle={{
          backgroundColor: colours.background
        }}
        titleStyle={{
          color: colours.text
        }}
        iconColor={colours.text}
        labelStyle={{
          color: colours.text
        }}
        backIcon={{
          icon: "chevron-left",
          color: colours.text
        }}
      /> */}
      <DrawerNavigator 
        tabs={tabs} 
        drawerTitle={"Navigator"}
        drawerStyle={{
          backgroundColor: colours.background
        }}  
        drawerTabFocusedStyle={{
          style: {
            backgroundColor: colours.card
          }
        }}
        drawerTitleStyle={{
          color: colours.text
        }}
        toggleDrawerIcon={{
          color: colours.text
        }}
        labelStyle={{
          color: colours.text
        }} 
        tabIconStyle={{
          focusedColor: colours.text,
          unFocusedColor: colours.text
        }}
        sidebarStyle={{
          style: {
            backgroundColor: colours.background,
            borderColor: colours.card
          },
          titleStyle: {
            color: colours.text
          }
        }}
        screenHeaderStyle={{
          backgroundColor: colours.background
        }}
        screenTitleStyle={{
          color: colours.text
        }}
        borderColor={colours.card}
      />
    </NavigationContainer>
  );
}

