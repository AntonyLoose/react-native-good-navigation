import { NavigationContainer } from '@react-navigation/native';
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
      <GoodNavigator
        tabbarProps={{
          tabs: tabs
        }}
        drawerProps={{
          tabs: tabs,
          drawerTitle: "Navigator"
        }}
        theme={theme}
      />
    </NavigationContainer>
  );
}

