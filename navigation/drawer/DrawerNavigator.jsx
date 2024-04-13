import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerCustomLayout from './DrawerCustomLayout';
import MovieHome from '../../screens/MovieHome';

const Drawer = createDrawerNavigator();
export default function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerCustomLayout {...props} />} screenOptions={{drawerStyle: {width: 220}, overlayColor: 'transparent',}}>
      <Drawer.Screen name="AppHome" options={{headerShown: false}} component={MovieHome} />
    </Drawer.Navigator>
  )
}


{/* <Drawer.Screen name="Parent" options={{headerShown: false}} component={Parent} /> */}