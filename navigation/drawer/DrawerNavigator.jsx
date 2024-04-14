import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerCustomLayout from './DrawerCustomLayout';
import MovieHome from '../../screens/MovieHome';

const Drawer = createDrawerNavigator();
export default function DrawerNavigator() {
  return (
    <Drawer.Navigator edgeWidth={0} drawerContent={props => <DrawerCustomLayout {...props} />} screenOptions={{drawerStyle: {width: 220}, overlayColor: 'transparent',}}>
      <Drawer.Screen name="AppHome" options={{headerShown: false, swipeEnabled: false,}} component={MovieHome} />
    </Drawer.Navigator>
  )
}


{/* <Drawer.Screen name="Parent" options={{headerShown: false}} component={Parent} /> */}