import { View, Text, Platform, Touchable, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { styles } from "../theme/style";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import { getTrendingMovies, getUpcomingMovies, getTopRatedMovies } from "../api/api";

const ios = Platform.OS == "ios";

export default function HomeScreen() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loadingTrendingMovies, setLoadingTrendingMovies] = useState(false);
  const [loadingUpcomingMovies, setLoadingUpcomingMovies] = useState(false);
  const [loadingTopMovies, setLoadingTopMovies] = useState(false);
  const navigation = useNavigation();

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
  }

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
  }

  return (
    <View className='flex-1 bg-neutral-800 px-2'>
      {/* Header */}
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style='light' />
        <View className='flex-row justify-between items-center ms-4'>
          <Bars3CenterLeftIcon size='30' strokeWidth={2} color='white' />
          <Text className='text-white text-3xl font-bold'>
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size='30' strokeWidth={2} color='white' />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
        {/* Trending Movies Slider */}
        {loadingTrendingMovies ? <Loading/>:<TrendingMovies data={trendingMovies} />}
        {/* Upcoming Movies */}
        {loadingUpcomingMovies ? <Loading/>:<MovieList title='Upcoming Movies' data={upcomingMovies} />}

        {/* topRated Movies */}
        {loadingTopMovies ? <Loading/>:<MovieList title='Top Rated Movies' data={topRatedMovies} />}
      </ScrollView>
    </View>
  );
}
