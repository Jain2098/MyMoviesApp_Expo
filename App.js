import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import MovieScreen from './screens/MovieScreen';
import SplashScreen from './screens/SplashScreen';
import PersonScreen from './screens/PersonScreen';
import SearchScreen from './screens/SearchScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" options ={{headerShown: false}} component = {SplashScreen} />
        <Stack.Screen name ="Home" options={{headerShown: false}} component={HomeScreen} />
        <Stack.Screen name ="Movie" options={{headerShown: false}} component={MovieScreen} />
        <Stack.Screen name="Person" options={{headerShown: false}} component={PersonScreen} />
        <Stack.Screen name="Search" options={{headerShown: false}} component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}