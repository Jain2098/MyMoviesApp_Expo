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
import { getSimilarMovie, getSingleMovie, img780, imgOriginal } from "../api/api";
import { CustomImage } from "../helper/CustomImage";
import { Global_topMargin, Global_width, Global_height, fallbackImg } from "../config/config";

export default function MovieScreen() {
  const navigation = useNavigation();
  const { params: item } = useRoute();
  // console.log(item)

  const [loading, setLoading] = useState(true);
  const [similarMoviesLoading, setSimilarMoviesLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const [movieDetails, setMovieDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  // USING IMAGE FROM ITEM INSTEAD OF MOVIE SINGLE API
  const posterImg = img780(item?.poster_path);
  const [sourceImg, setSourceImg] = useState({ uri: posterImg });



  useEffect(() => {
    fetchMovieDetails(item.id);
    fetchSimilarMovies(item.id);
  }, []);

  const fetchMovieDetails = async (id) => {
    setLoading(true);
    try {
      const response = await getSingleMovie(id);
      // console.log(response);
      if (response) {
        setMovieDetails(response);
        setCast(response?.credits?.cast);
        // console.log(response?.credits?.cast)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarMovies = async (id) => {
    setSimilarMoviesLoading(true);
    try {
      const response = await getSimilarMovie(id);
      if (response && response.results) setSimilarMovies(response.results);
      // console.log(similarMovies.length);
    } catch (error) {
      console.log(error);
    } finally {
      setSimilarMoviesLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className='flex-1 bg-neutral-900'>
      <View className='w-full'>
        <SafeAreaView className={`absolute z-30 w-full flex-row justify-between items-center px-4 ${Global_topMargin}`}>
          <TouchableOpacity style={styles.background} className='rounded-xl p-1' onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={28} strokeWidth={2.5} color='white' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
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
            {movieDetails?.title?.length > 45 ? movieDetails?.title?.slice(0, 45) + "..." : movieDetails?.title}
          </Text>

          {/* status  •  Release_year  •  runtime */}
          <Text className='text-neutral-500 font-semibold text-base text-center'>
            {movieDetails?.status ? movieDetails?.status : ""}
            {movieDetails?.release_date ? "\t\t\t|\t\t\t" + movieDetails?.release_date?.split("-")[0] : ""}
            {movieDetails?.runtime > 0 ? "\t\t\t|\t\t\t" + movieDetails?.runtime + "min" : ""}
          </Text>

          {/* Genres */}

          {/* UNABLE TO DO SCROLL AT THE END SET WRAP*/}
          <View className='flex-row flex-wrap justify-center space-x-3 align-middle'>
            {movieDetails?.genres &&
              movieDetails?.genres?.map((genre, index) => {
                return (
                  <Text 
                    key={index} 
                    className='text-blue-400 font-bold text-base text-center'
                    onPress={() => navigation.navigate("Genre", genre)}
                  >
                    {index < movieDetails.genres.length ? <ChevronRightIcon size={13} strokeWidth={2} color='white' /> : ""} {genre.name}
                  </Text>
                );
              })}
          </View>


          {/* Content here */}
          <Text className='text-neutral-400 px-4 tracking-wider text-justify leading-5'>{movieDetails?.overview}</Text>

          {/* Cast Here */}
          {cast?.length > 0 && <Cast navigation={navigation} cast={cast} />}

          {/* Similar Movies */}
          {similarMoviesLoading ? (
            <Loading />
          ) : (
            similarMovies?.length > 0 && <MovieList title='Similar Movies' data={similarMovies} hideSeeAll={true} />
          )}
        </View>
        </>
      )}
      
    </ScrollView>
  );
}
