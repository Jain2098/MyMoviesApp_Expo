import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from '../stack/StackNavigator';
import DrawerCustomLayout from './DrawerCustomLayout';

const Drawer = createDrawerNavigator();
export default function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerCustomLayout {...props} />} screenOptions={{drawerStyle: {width: 220}, overlayColor: 'transparent',}}>
      <Drawer.Screen name="StackHome" options={{headerShown: false}} component={StackNavigator} />
    </Drawer.Navigator>
  )
}