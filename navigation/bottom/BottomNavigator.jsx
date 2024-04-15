import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeartIcon, HomeIcon } from "react-native-heroicons/solid";
import { theme } from "../../theme/style";
import { getCurrentRouteName } from "../../helper/getCurrentRouteName";
import FavoriteScreen from "../../screens/FavoriteScreen";
import StackNavigator from "../stack/StackNavigator";
import BottomStack from "../stack/BottomStack";

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.background,
        // borderWidth: 0 has no effect, somehow the border is still there
        tabBarStyle: { backgroundColor: "black", borderTopWidth: 0, height: 50 },
        tabBarLabelStyle: { fontWeight: "bold" },
      }}>

      {
      /* <Tab.Screen
            name ="StackHome"
            options={{
                headerShown: false,
                tabBarIcon: ({ color }) => <HomeIcon color={color} />,
                tabBarLabel:"Home",
                tabBarShowLabel: false,
                }}
            component={StackNavigator}
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
                } else {
                  navigation.navigate(route.name);
                }
              },
            })}
        /> 
        */
        }
      <Tab.Screen
        name='Home'
        component={StackNavigator} // Directly using StackNavigator here
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          tabBarLabel: "Home",
          tabBarShowLabel: false,
        }}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            e.preventDefault();

            const state = navigation.getState();
            const currentTabIndex = state.index;
            const targetTabIndex = state.routes.findIndex(r => r.name === route.name);

            // console.log('state: \n\n', JSON.stringify(state, null, 2));

            const activeScreen = getCurrentRouteName(state);
            const noResetScreens = ['DrawerHome', 'AppHome', 'ResetHomeSplashScreen'];

            // console.log(state.routes)
            if (currentTabIndex === targetTabIndex) {
              if(!noResetScreens.includes(activeScreen)){
                console.log('Resetting to Parent')
                // navigation.reset ({
                //   index: 0,
                //   routes: [{ name: 'ResetHomeSplashScreen' }]
                // })
                navigation.navigate("DrawerHome");
                return;
              }
              console.log('Already on the same screen')
            } else {
              navigation.navigate(route.name);
            }
          },
        })}
      />
      <Tab.Screen
        name='BottomStack'
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <HeartIcon color={color} />,
        }}
        component={BottomStack}
        // just go to the Favorite screen when the tab is pressed no matter what
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            e.preventDefault();
            // navigation.navigate("BottomStack", { screen: "Favorite" });
            const state = navigation.getState();
            const currentRoute = getCurrentRouteName(state);
            if (currentRoute.name !== "Favorite") {
              navigation.navigate("BottomStack", { screen: "Favorite" });
            }
          }
        })
        }
      />
    </Tab.Navigator>
  );
}
