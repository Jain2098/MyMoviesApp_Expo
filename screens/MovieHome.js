import React, { useEffect, useState, useRef } from "react";
import { View, Text, Platform, TouchableOpacity, FlatList, Dimensions, StyleSheet, Animated, Switch } from "react-native";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";

import Loading from "../components/Loading";
import { getTrendingMovies, getUpcomingMovies, getTopRatedMovies, getTrendingTV, getPopularTV, getTopRatedTV } from "../api/api";
import { useCustomBackAction } from "../helper/useCustomBackAction";
import {  } from "react-native-heroicons/outline";
import { MainHeader } from "../components/MainHeader";

export default function MovieHome() {
  const [currentView, setCurrentView] = useState("movie");
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setCurrentView(currentView === "movie" ? "tv" : "movie");
  }

  // MOVIE //
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loadingTrendingMovies, setLoadingTrendingMovies] = useState(false);
  const [loadingUpcomingMovies, setLoadingUpcomingMovies] = useState(false);
  const [loadingTopMovies, setLoadingTopMovies] = useState(false);


  //  TV //
  const [trendingTV, setTrendingTV] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);
  const [loadingTrendingTV, setLoadingTrendingTV] = useState(false);
  const [loadingUpcomingTV, setLoadingUpcomingTV] = useState(false);
  const [loadingTopTV, setLoadingTopTV] = useState(false);
    
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

  // const navigation = useNavigation();

  // const navigationState = useNavigationState(state => state);
  // const [currentDrawerStatus, setCurrentDrawerStatus] = useState(false);

  // useEffect(() => {
  //   // Update the component state based on the navigation state
  //   console.log("Checking....")
  //   setCurrentDrawerStatus(isDrawerOpen(navigationState));
  // }, [navigationState]);

  useEffect(() => {
    if (currentView === "movie") {
    fetchTrendingMovies();
    fetchUpcomingMovies();
    fetchTopRatedMovies();
    } else if (currentView === "tv") {
      fetchTrendingTV();
      fetchPopularTV();
      fetchTopRatedTV();
    }
  }, [currentView]);


  // MOVIE //
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

  // TV //
  const fetchTrendingTV = async () => {
    setLoadingTrendingTV(true);
    try {
      const response = await getTrendingTV();
      setTrendingTV(response.results);
      // console.log('Trending TV', response.results)
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingTrendingTV(false);
    }
  }

  const fetchPopularTV = async () => {
    setLoadingUpcomingTV(true);
    try {
      const response = await getPopularTV();
      setPopularTV(response.results);
      // console.log('Popular TV', response.results)
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUpcomingTV(false);
    }
  }

  const fetchTopRatedTV = async () => {
    setLoadingTopTV(true);
    try {
      const response = await getTopRatedTV();
      setTopRatedTV(response.results);
      // console.log('Top Rated TV', response.results)
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingTopTV(false);
    }
  }



  const mainListData = [
    { type: "TrendingMovies", data: trendingMovies },
    { type: "TopRatedMovies", data: topRatedMovies },
    { type: "UpcomingMovies", data: upcomingMovies },
  ];

  const mainListDataTV = [
    { type: "TrendingTV", data: trendingTV },
    { type: "TopRatedTV", data: topRatedTV },
    { type: "UpcomingTV", data: popularTV },
  ]

  const renderItem = ({ item }) => {
    switch (item.type) {
      case "TrendingMovies":
        return <View>{loadingTrendingMovies ? <Loading /> : <TrendingMovies title='Trending Movies' type={"movie"} data={trendingMovies}/>}</View>;
      case "UpcomingMovies":
        return <View>{loadingUpcomingMovies ? <Loading /> : <MovieList title='Upcoming Movies' type={"movie"} data={upcomingMovies} />}</View>;
      case "TopRatedMovies":
        return <View>{loadingTopMovies ? <Loading /> : <MovieList title='Top Rated Movies' type={"movie"} data={topRatedMovies} />}</View>;
      case "TrendingTV":
        return <View>{loadingTrendingTV ? <Loading /> : <TrendingMovies title='Trending TV' type={"tv"} data={trendingTV} />}</View>;
      case "UpcomingTV":
        return <View>{loadingUpcomingTV ? <Loading /> : <MovieList title='Popular TV' type={"tv"} data={popularTV} />}</View>;
      case "TopRatedTV":
        return <View>{loadingTopTV ? <Loading /> : <MovieList title='Top Rated TV' type={"tv"} data={topRatedTV} />}</View>;
      default:
        return null;
    }
  };


  return (
    <View className={`flex-1 bg-neutral-800 px-2 pb-40`}>
      {/* Header */}
      <MainHeader>
        <PostSwitch isChecked={isChecked} handleCheckboxChange={handleCheckboxChange} />
        {currentView === "movie" ? <FlatList data={mainListData} renderItem={renderItem} keyExtractor={(item) => item.type} /> : 
        <FlatList data={mainListDataTV} renderItem={renderItem} keyExtractor={(item) => item.type} />
        }
      </MainHeader>
    </View>
  );
}




const PostSwitch = ({isChecked, handleCheckboxChange}) => {
  return (
    <View className=" px-3">
      <View className='flex-row justify-center items-center space-x-2'>
      <Text className="text-white text-center font-semibold p-3" onPress={handleCheckboxChange}>Movie</Text>
      
        <Switch
          // trackColor={{ false: "#767577", true: "#81b0ff" }}
          trackColor={{ false: "#81b0ff", true: "#81b0ff" }}
          thumbColor={isChecked ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleCheckboxChange}
          value={isChecked}
        />
        <Text className="text-white text-center font-semibold p-3" onPress={handleCheckboxChange}>TV</Text>
      </View>

    </View>
  );
};
