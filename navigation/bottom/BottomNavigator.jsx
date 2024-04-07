import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Cog6ToothIcon, HeartIcon, HomeIcon } from 'react-native-heroicons/solid';
import TvHome from '../../screens/TvHome';
import DrawerNavigator from '../drawer/DrawerNavigator';
import { theme } from '../../theme/style';
import { getCurrentRouteName } from '../../helper/getCurrentRouteName';

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
                e.preventDefault();

                const state = navigation.getState();
                const currentTabIndex = state.index;
                const targetTabIndex = state.routes.findIndex(r => r.name === route.name);

                // console.log('state: \n\n', JSON.stringify(state, null, 2));

                const activeScreen = getCurrentRouteName(state);
                const noResetScreens = ['HomeScreen', 'Parent'];

                // console.log(state.routes)
                if (currentTabIndex === targetTabIndex) {
                  if(!noResetScreens.includes(activeScreen)){
                    console.log('Resetting to Parent')
                    navigation.reset ({
                      index: 0,
                      routes: [{ name: 'Parent' }]
                    })
                    return;
                  }
                  console.log('Already on the same screen')

                  // console.log('\n\nNested State: ', JSON.stringify(nestedState, null, 2))
                  // console.log('nestedState: ', JSON.stringify(nestedState, null, 2))
                  // console.log('nestedState.routes: ', JSON.stringify(nestedState.routes, null, 2))
                  // console.log('nestedState.index: ', nestedState.index)
                  // console.log('nestedState.routes.length', nestedState.routes.length)

                  // console.log('currentScreenName: ', currentScreenName)

                  // console.log(route.screen)
                  /*
                  navigation.reset ({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }]
                  })
                  */
                 
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