import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Cog6ToothIcon, HeartIcon, HomeIcon } from 'react-native-heroicons/solid';
import TvHome from '../../screens/TvHome';
import DrawerNavigator from '../drawer/DrawerNavigator';
import { theme } from '../../theme/style';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: theme.background,
      // borderWidth: 0 has no effect, somehow the border is still there
      tabBarStyle: { backgroundColor: 'black', borderTopWidth: 0, height: 55 },
      tabBarLabelStyle: { fontWeight: 'bold' },
    }}
    >
      <Tab.Screen
            name ="DrawerHome"
            options={{
                headerShown: false,
                tabBarIcon: ({ color }) => <HomeIcon color={color} />,
                tabBarLabel:"Home",
                tabBarShowLabel: false,
                }}
            component={DrawerNavigator}
            listeners={({ navigation, route }) => ({
              tabPress: e => {
                console.log(route)
                e.preventDefault();
                const state = navigation.getState();
                const currentTabIndex = state.index;
                const targetTabIndex = state.routes.findIndex(r => r.name === route.name);
                console.log('state', state);
                console.log('currentTabIndex', currentTabIndex);
                console.log('targetTabIndex', targetTabIndex);
                if (currentTabIndex === targetTabIndex) {
                  navigation.navigate('HomeScreen');
                } else {
                  navigation.navigate(route.name);
                }
              },
            })}
        />
      <Tab.Screen
              name ="tv" 
              options={{headerShown: false, tabBarShowLabel: false, tabBarIcon:({color})=><HeartIcon color={color} />}}
              component={TvHome}
      />
    </Tab.Navigator>
  )
}