import { View, Text, ScrollView, TouchableOpacity, Platform, Dimensions, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { ChevronRightIcon, HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme/style";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import { getSimilarMovie, getSimilarTV, getSingleMovie, getSingleTV, img780, imgOriginal } from "../api/api";
import { CustomImage } from "../helper/CustomImage";
import { Global_topMargin, Global_width, Global_height, fallbackImg } from "../config/config";
import {addFavorites, getFavorites, removeFavorites} from "../helper/favoriteManager";

export default function TvScreen() {
  const navigation = useNavigation();
  const { params: item } = useRoute();
  // console.log(item)

  const [loading, setLoading] = useState(true);
  const [similarTvLoading, setSimilarTvLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);


  useEffect(() => {
    const checkFavorite = async () => {
      const favorites = await getFavorites('my_favorite_tv');
      console.log(favorites);
      setIsFavorite(favorites.includes(item.id));
    }
    checkFavorite();
  }, [item.id]);




  const [tvDetails, setTvDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [similarTv, setSimilarTv] = useState([]);

  // USING IMAGE FROM ITEM INSTEAD OF MOVIE SINGLE API
  const posterImg = img780(item?.poster_path);


  useEffect(() => {
    fetchMovieDetails(item.id);
    fetchSimilarTv(item.id);
  }, []);

  const fetchMovieDetails = async (id) => {
    setLoading(true);
    try {
      const response = await getSingleTV(id);
      // console.log(response);
      if (response) {
        setTvDetails(response);
        setCast(response?.credits?.cast);
        // console.log(response?.credits?.cast)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarTv = async (id) => {
    setSimilarTvLoading(true);
    try {
      const response = await getSimilarTV(id);
      if (response && response.results) setSimilarTv(response.results);
      // console.log(similarMovies.length);
    } catch (error) {
      console.log(error);
    } finally {
      setSimilarTvLoading(false);
    }
  };

  const handleOnPressFavorite = async () => {
    if (isFavorite) {
      removeFavorites(ID = item.id, type='my_favorite_tv');
    } else {
      addFavorites(ID = item.id, type='my_favorite_tv');
    }
    setIsFavorite(!isFavorite);
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className='flex-1 bg-neutral-900'>
      <View className='w-full'>
        <SafeAreaView className={`absolute z-30 w-full flex-row justify-between items-center px-4 ${Global_topMargin}`}>
          <TouchableOpacity style={styles.background} className='rounded-xl p-1' onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={28} strokeWidth={2.5} color='white' />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOnPressFavorite}>
            <HeartIcon size={35} color={isFavorite ? "red" : "white"} className='translate-x-4' />
          </TouchableOpacity>
        </SafeAreaView>

        </View>
      {loading ? (
        <Loading />
        ) : (
        <>
        <View>

          <CustomImage initialSource={posterImg} fallbackImage={fallbackImg} contentFit={"cover"} style={{ width: Global_width, height: Global_height * 0.6 }} />

          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
            style={{ width: Global_width, height: Global_height * 0.2 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className='absolute bottom-0'
          />
        </View>

        {/* Movie Details View */}
      
        <View style={{ marginTop: -(Global_height * 0.09) }} className='space-y-3'>
          {/* Title */}
          <Text className='text-white text-center text-3xl font-bold tracking-wider'>
            {tvDetails?.name?.length > 45 ? tvDetails?.name?.slice(0, 45) + "..." : tvDetails?.name}
          </Text>

          {/* status  •  Release_year  •  runtime */}
          <Text className='text-neutral-500 font-semibold text-base text-center'>
            {tvDetails?.status ? tvDetails?.status : ""}
            {tvDetails?.last_air_date ? "\t\t\t|\t\t\t" + tvDetails?.last_air_date?.split("-")[0] : ""}
            {tvDetails?.episode_run_time > 0 ? "\t\t\t|\t\t\t" + tvDetails?.episode_run_time + " min" : ""}
          </Text>

          {/* Genres */}

          {/* UNABLE TO DO SCROLL AT THE END SET WRAP*/}
          <View className='flex-row flex-wrap justify-center space-x-3 align-middle'>
            {tvDetails?.genres &&
              tvDetails?.genres?.map((genre, index) => {
                return (
                  <Text 
                    key={index} 
                    className='text-blue-400 font-bold text-base text-center'
                    onPress={() => navigation.push("Genre", genre)}
                  >
                    {index < tvDetails.genres.length ? <ChevronRightIcon size={13} strokeWidth={2} color='white' /> : ""} {genre.name}
                  </Text>
                );
              })}
          </View>


          {/* Content here */}
          <Text className='text-neutral-400 px-4 tracking-wider text-justify leading-5'>{tvDetails?.overview}</Text>

          {/* Cast Here */}
          {cast?.length > 0 && <Cast navigation={navigation} cast={cast} />}

          {/* Similar Movies */}
          {similarTvLoading ? (
            <Loading />
          ) : (
            similarTv?.length > 0 && <MovieList title='Similar TV Shows' type='tv' data={similarTv} hideSeeAll={true} />
          )}
        </View>
        </>
      )}
      
    </ScrollView>
  );
}
