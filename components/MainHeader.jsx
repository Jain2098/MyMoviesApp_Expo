import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Dimensions, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { styles } from "../theme/style";
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";
import { useDrawerStatus } from "@react-navigation/drawer";
import { Global_ios } from "../config/config";


export const MainHeader = ({ children }) => {
  const drawerStatus = useDrawerStatus();
  const isDrawerOpen = drawerStatus === 'open';
  const animatedValue = useRef(new Animated.Value(0)).current;
  

  const menuAnimatedStyle = {
    backgroundColor: 'rgb(38 38 38)',
    transform: [
      {
        translateX: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, Dimensions.get('window').width * 0.25]
      })
    },
      {
        rotateY: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-60deg']
      })
    },
      {perspective: 800},
    ]
  };

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isDrawerOpen ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isDrawerOpen, animatedValue]);

  return (
    <Animated.View style={menuAnimatedStyle}>
      <MenuHeader />
      {children}
    </Animated.View>
  );
};


const MenuHeader = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className={`${Global_ios ? "-mb-2" : "mb-3"} mt-2`}>
    <StatusBar style='light' />
    <View className='flex-row justify-between items-center ms-4'>
      <TouchableOpacity style={{width:40}} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Bars3CenterLeftIcon size='30' strokeWidth={3} color='white' />
      </TouchableOpacity>
      <Text className='text-white text-3xl font-bold'>
        <Text style={styles.text}>M</Text>ovies
      </Text>
      <TouchableOpacity style={{width:40}} onPress={() => navigation.navigate("Search")}>
        <MagnifyingGlassIcon size='30' strokeWidth={3} color='white' />
      </TouchableOpacity>
    </View>
  </SafeAreaView>
  );
}


