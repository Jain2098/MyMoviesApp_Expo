import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from '../../screens/HomeScreen';
import MovieScreen from '../../screens/MovieScreen';
import PersonScreen from '../../screens/PersonScreen';
import SearchScreen from '../../screens/SearchScreen';
import SplashScreen, { ResetHomeSplashScreen } from '../../screens/SplashScreen';

import GenreScreen from '../../screens/GenreScreen';
import VerticalDataScreen from '../../screens/VerticalDataScreen';
import TvScreen from '../../screens/TvScreen';
import FavoriteScreen from '../../screens/FavoriteScreen';
import DrawerNavigator from '../drawer/DrawerNavigator';



const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Splash" options ={{headerShown: false}} component = {SplashScreen} />
        <Stack.Screen name ="DrawerHome" options={{headerShown: false}} component={DrawerNavigator} />
        <Stack.Screen name ="Movie" options={{headerShown: false}} component={MovieScreen} />
        <Stack.Screen name ="Tv" options={{headerShown: false}} component={TvScreen} />
        <Stack.Screen name="Person" options={{headerShown: false}} component={PersonScreen} />
        <Stack.Screen name="Search" options={{headerShown: false}} component={SearchScreen} />
        {/* <Stack.Screen name ="HomeScreen" options={{headerShown: false}} component={HomeScreen} /> */}
        <Stack.Screen name ="Genre" options={{headerShown: false}} component={GenreScreen} />
        <Stack.Screen name ="VerticalDataScreen" options={{headerShown: false}} component={VerticalDataScreen} />
        <Stack.Screen name ="ResetHomeSplashScreen" options={{headerShown: false}} component={ResetHomeSplashScreen} />
        {/* <Stack.Screen name ="Favorite" options={{headerShown: false}} component={FavoriteScreen} /> */}
      </Stack.Navigator>
  );
}
