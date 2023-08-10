import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, Text, View } from 'react-native';
import { GoodNavigator } from './src/navigators/GoodNavigator';
import { Tab } from './src/navigators/types';
import { Account } from './src/screens/Account';
import { Home } from './src/screens/home/Home';
import { HomeSidebar } from './src/screens/home/HomeSidebar';
import { Settings } from './src/screens/Settings';
import { theme } from './src/styles';

export default function App() {

  const tabs: Tab[] = [
    {
      label: "Homes",
      screen: {
        id: "HOMES",
        component: HomeSidebar,
        title: "Homes"
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
        id: "ACCOUNT",
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
        id: "SETTINGS",
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
      <StatusBar hidden={true}/>
      <GoodNavigator
        tabbarProps={{
          tabs: tabs,
          landingTab: tabs[0],
          iconColor: theme.secondary,
          labelStyle: {
            color: theme.secondary
          }
        }}
        drawerProps={{
          tabs: tabs,
          drawerTitle: "Navigator",
          landingTab: tabs[0],
        }}
        theme={theme}
      />
    </NavigationContainer>
  );
}

