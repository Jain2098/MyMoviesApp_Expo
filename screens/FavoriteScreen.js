import { View, Text, TouchableOpacity, Button, FlatList, ScrollView, Animated, Alert } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FavoriteItemViewer from "../components/FavoriteItemViewer";
import { MoviesFavoriteList_Context } from "../store/favoriteItems_store";
import FavoriteHeader from "../components/FavoriteHeader";
import { TrashIcon} from "react-native-heroicons/solid";

export default function FavoriteScreen() {
  const { favoriteMovies, favoritePeople, favoriteTv, removeAllFavorites } = useContext(MoviesFavoriteList_Context);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const [moviesSet, setMoviesSet] = React.useState([]);
  const [tvSet, setTvSet] = React.useState([]);
  const [peopleSet, setPeopleSet] = React.useState([]);

  useEffect(() => {
    setMoviesSet([...new Set(favoriteMovies)]);
    setPeopleSet([...new Set(favoritePeople)]);
    setTvSet([...new Set(favoriteTv)]);
    // console.log("FavoriteScreen.js : Movie: ", favoriteMovies, "\t", favoritePeople);
    // console.log("FavoriteScreen.js : People ", favoritePeople, "\t", peopleSet);
    // console.log("FavoriteScreen.js : TV ", favoriteTv, "\t", tvSet);
  }, [favoriteMovies, favoritePeople, favoriteTv]);

  const deleteAllFavorites = (type) => {
    Alert.alert("Delete All Favorites", "Are you sure you want to delete all favorites?", [
      {
        text: "Cancel",
        onPress: async () => {
          console.log("Cancelling: ", type)
          // await removeAllFavorites(type)
        },
      },
      {
        text: "Delete",
        onPress: async () => {
          console.log("Delete All Favorites: ", type)
          // await removeAllFavorites(type)
        },
      },
    ]
    );
    // await removeAllFavorites(type);
  }

  return (
    <SafeAreaView className={`flex-1 bg-neutral-800 `}>
      <ScrollView className='pt-3 '>
        {/* <Text className={`text-3xl text-white text-center py-5 font-semibold`}>❤️ Collections</Text> */}
        <FavoriteHeader />
        {moviesSet?.length === 0 && peopleSet?.length === 0 && <NoFavorite />}
        {moviesSet?.length > 0 && (
          <>
            <View className="flex-row justify-between items-center px-2">
            <Text className={`text-2xl text-white text-start font-semibold pt-4 pb-2`}>Movies</Text>
            <TouchableOpacity onPress={() => deleteAllFavorites('my_favorite_movies')}>
              <TrashIcon className={`w-6 h-6 text-white`} color={'red'} size={25}/>
            </TouchableOpacity>
            </View>
            <Animated.View className={`flex-row justify-start flex-wrap`} style={{opacity: fadeAnim}}>
              {moviesSet?.map((item, index) => {
                // console.log("Movies ITEM", item);
                return <FavoriteItemViewer key={index} id={item} type={"movie"} />;
              })}
            </Animated.View>
          </>
        )}

        {tvSet?.length > 0 && (
          <>
          <View className="flex-row justify-between items-center px-2">
            <Text className={`text-2xl text-white text-start font-semibold pt-4 pb-2`}>TV Shows</Text>
            <TouchableOpacity onPress={() => deleteAllFavorites('my_favorite_tv')}>
              <TrashIcon className={`w-6 h-6 text-white`} color={'red'} size={25}/>
            </TouchableOpacity>
            </View>
            <Animated.View className={`flex-row justify-start flex-wrap`} style={{opacity: fadeAnim}}>
              {tvSet?.map((item, index) => {
                // console.log("TV ITEM", item);
                return <FavoriteItemViewer key={index} id={item} type={"tv"} />;
              })}
            </Animated.View>
          </>
        )}

        {peopleSet?.length > 0 && (
          <>
            <View className="flex-row justify-between items-center px-2">
            <Text className={`text-2xl text-white text-start font-semibold pt-4 pb-2`}>Person</Text>
            <TouchableOpacity onPress={() => deleteAllFavorites('my_favorite_persons')}>
              <TrashIcon className={`w-6 h-6 text-white`} color={'red'} size={25}/>
            </TouchableOpacity>
            </View>
            <Animated.View className={`flex-row justify-center flex-wrap m-0 pb-5`} style={{opacity: fadeAnim}}>
              {peopleSet?.map((item, index) => {
                return <FavoriteItemViewer key={index} id={item} type={"person"} />;
              })}
            </Animated.View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const NoFavorite = () => {
  return (
    <View className={`flex-1 justify-center items-center h-screen`}>
      <Text className={`text-lg text-neutral-500 text-center font-semibold`}>Your favorites are just a tap away!</Text>
      <Text className={`text-base text-neutral-400 text-center font-semibold`}> Start adding some to fill this empty space.</Text>
      {/* <Text className={`text-xl text-neutral-500 text-center py-5`}>Start adding some to fill this empty space.</Text> */}
      {/* <Button title="Add Favorites" onPress={() => navigation.navigate("Home")} /> */}
    </View>
  );
};
