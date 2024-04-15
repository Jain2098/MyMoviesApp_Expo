import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoriteScreen from "../../screens/FavoriteScreen";
import MovieScreen from "../../screens/MovieScreen";
import TvScreen from "../../screens/TvScreen";
import PersonScreen from "../../screens/PersonScreen";
import GenreScreen from "../../screens/GenreScreen";


const Stack = createNativeStackNavigator();

export default function BottomStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Favorite' options={{ headerShown: false }} component={FavoriteScreen} />
      <Stack.Screen name='Movie' options={{ headerShown: false }} component={MovieScreen} />
      <Stack.Screen name='Tv' options={{ headerShown: false }} component={TvScreen} />
      <Stack.Screen name='Person' options={{ headerShown: false }} component={PersonScreen} />
      <Stack.Screen name='Genre' options={{ headerShown: false }} component={GenreScreen} />
    </Stack.Navigator>
  );
}
