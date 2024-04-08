import React, { useEffect, useState, useRef } from "react";
import { View, Text, Platform, TouchableOpacity, FlatList, Dimensions, StyleSheet, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { styles } from "../theme/style";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";
import Loading from "../components/Loading";
import { getTrendingMovies, getUpcomingMovies, getTopRatedMovies } from "../api/api";
import { useCustomBackAction } from "../helper/useCustomBackAction";
import { useDrawerStatus } from "@react-navigation/drawer";
import { Global_ios } from "../config/config";

export default function MovieHome() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loadingTrendingMovies, setLoadingTrendingMovies] = useState(false);
  const [loadingUpcomingMovies, setLoadingUpcomingMovies] = useState(false);
  const [loadingTopMovies, setLoadingTopMovies] = useState(false);
  // console.log('isDrawerOpen', isDrawerOpen);
  // const [backPressCount, setBackPressCount] = useState(0);

  // useEffect(() => {
  //   const backAction = () => {
  //     if (backPressCount === 0) {
  //       setBackPressCount(1);
  //       setTimeout(() => setBackPressCount(0), 2000);
  //       // Alert.alert("Hold on!", "Press back again to exit", [{text: "OK",}]);
  //       ToastAndroid.showWithGravity("Press back again to exit", ToastAndroid.SHORT, ToastAndroid.CENTER);
  //       return true;
  //     } else {
  //       BackHandler.exitApp();
  //     }
  //   };
  //   const backButtonPress = BackHandler.addEventListener("hardwareBackPress", backAction);
  //   return () => backButtonPress.remove();
  // }, [backPressCount]);

  useCustomBackAction();

  const navigation = useNavigation();
  
  // const navigationState = useNavigationState(state => state);
  // const [currentDrawerStatus, setCurrentDrawerStatus] = useState(false);

  // useEffect(() => {
  //   // Update the component state based on the navigation state
  //   console.log("Checking....")
  //   setCurrentDrawerStatus(isDrawerOpen(navigationState));
  // }, [navigationState]);


  const drawerStatus = useDrawerStatus();
  const isDrawerOpen = drawerStatus === 'open';
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animatedStyle = {
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



  useEffect(() => {
    fetchTrendingMovies();
    fetchUpcomingMovies();
    fetchTopRatedMovies();
  }, []);

  const fetchTrendingMovies = async () => {
    setLoadingTrendingMovies(true);
    try {
      const response = await getTrendingMovies();
      setTrendingMovies(response.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingTrendingMovies(false);
    }
  };

  const fetchUpcomingMovies = async () => {
    setLoadingUpcomingMovies(true);
    try {
      const response = await getUpcomingMovies();
      setUpcomingMovies(response.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUpcomingMovies(false);
    }
  };

  const fetchTopRatedMovies = async () => {
    setLoadingTopMovies(true);
    try {
      const response = await getTopRatedMovies();
      setTopRatedMovies(response.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingTopMovies(false);
    }
  };

  const mainListData = [
    { type: "TrendingMovies", data: trendingMovies },
    { type: "UpcomingMovies", data: upcomingMovies },
    { type: "TopRatedMovies", data: topRatedMovies },
  ];

  const renderItem = ({ item }) => {
    switch (item.type) {
      case "TrendingMovies":
        return <View>{loadingTrendingMovies ? <Loading /> : <TrendingMovies data={trendingMovies} />}</View>;
      case "UpcomingMovies":
        return <View>{loadingUpcomingMovies ? <Loading /> : <MovieList title='Upcoming Movies' data={upcomingMovies} />}</View>;
      case "TopRatedMovies":
        return <View>{loadingTopMovies ? <Loading /> : <MovieList title='Top Rated Movies' data={topRatedMovies} />}</View>;
      default:
        return null;
    }
  };

  return (
    <View className={`flex-1 bg-neutral-800 px-2 pb-20`}>
    <Animated.View style={animatedStyle}>
      {/* Header */}
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
      <FlatList data={mainListData} renderItem={renderItem} keyExtractor={(item) => item.type} />
    </Animated.View>
    </View>
  );
}


// const customStyles = StyleSheet.create({
//   style1: {
//     transform: [
//       {perspective: 800},
//       {translateX: Dimensions.get('window').width * 0.25},
//       {rotateY: '-60deg'},
//     ]
//   }
// });