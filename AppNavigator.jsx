import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomNavigator from './navigation/bottom/BottomNavigator'

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <BottomNavigator />
    </NavigationContainer>
  )
}