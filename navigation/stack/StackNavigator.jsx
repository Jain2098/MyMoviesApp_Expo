import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen';
import MovieScreen from '../../screens/MovieScreen';
import PersonScreen from '../../screens/PersonScreen';
import SearchScreen from '../../screens/SearchScreen';
import SplashScreen from '../../screens/SplashScreen';
import Parent from './Parent';


const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Splash" options ={{headerShown: false}} component = {SplashScreen} />
        <Stack.Screen name ="Parent" options={{headerShown: false}} component={Parent} />
        <Stack.Screen name ="Movie" options={{headerShown: false}} component={MovieScreen} />
        <Stack.Screen name="Person" options={{headerShown: false}} component={PersonScreen} />
        <Stack.Screen name="Search" options={{headerShown: false}} component={SearchScreen} />
        <Stack.Screen name ="HomeScreen" options={{headerShown: false}} component={HomeScreen} />
      </Stack.Navigator>
  );
}
