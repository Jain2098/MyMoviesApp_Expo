import React, { useEffect, useState } from 'react';
import { BackHandler, ToastAndroid } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export const useCustomBackAction = () => {
  const navigation = useNavigation();
  const [backPressCount, setBackPressCount] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Check if we're at the first screen of the stack
        if (!navigation.isFocused()) {
          // If not focused, do nothing. This means another screen is being displayed
          return false;
        }

        if (navigation.canGoBack()) {
          // If we can go back in the navigation stack, allow the default back action
          return false;
        }

        // Custom back action (double press to exit)
        if (backPressCount === 0) {
          setBackPressCount(1);
          setTimeout(() => setBackPressCount(0), 2000);
          ToastAndroid.showWithGravity("Press back again to exit", ToastAndroid.SHORT, ToastAndroid.CENTER);
          return true; // Prevent the default back behavior (exiting the app)
        } else {
          BackHandler.exitApp(); // Exit the app
          return true;
        }
      };

      // Add the listener for the hardware back button press
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      // Cleanup function
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [backPressCount, navigation])
  );
};