import { View, Text, TouchableOpacity, Button, FlatList, ScrollView } from "react-native";
import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FavoriteItemViewer from "../components/FavoriteItemViewer";
import { MoviesFavoriteList_Context } from "../store/favoriteItems_store";
import FavoriteHeader from "../components/FavoriteHeader";

export default function FavoriteScreen() {
  const { favoriteMovies, favoritePeople } = useContext(MoviesFavoriteList_Context);

  const [moviesSet, setMoviesSet] = React.useState([]);
  const [peopleSet, setPeopleSet] = React.useState([]);

  useEffect(() => {
    setMoviesSet([...new Set(favoriteMovies)]);
    setPeopleSet([...new Set(favoritePeople)]);
    console.log("FavoriteScreen.js: ", favoriteMovies, favoritePeople);
    console.log("FavoriteScreen.js: ", moviesSet, peopleSet);
  }, [favoriteMovies, favoritePeople]);

  return (
    <SafeAreaView className={`flex-1 bg-neutral-800`}>
      <ScrollView className='py-3'>
        {/* <Text className={`text-3xl text-white text-center py-5 font-semibold`}>❤️ Collections</Text> */}
        <FavoriteHeader />
        {moviesSet?.length === 0 && peopleSet?.length === 0 && <NoFavorite />}
        {moviesSet?.length > 0 && (
          <>
            <Text className={`text-2xl text-white text-start font-semibold px-3 pt-3 pb-2`}>Movies</Text>
            <View className={`flex-row justify-start flex-wrap`}>
              {moviesSet?.map((item, index) => {
                console.log("Movies ITEM", item);
                return <FavoriteItemViewer key={index} id={item} type={"movie"} />;
              })}
            </View>
          </>
        )}
        {peopleSet?.length > 0 && (
          <>
            <Text className={`text-2xl text-white text-start font-semibold px-3 pt-6 pb-2`}>Person</Text>
            <View className={`flex-row justify-center flex-wrap pb-5`}>
              {peopleSet?.map((item, index) => {
                console.log("Person ITEM", item);
                return <FavoriteItemViewer key={index} id={item} type={"person"} />;
              })}
            </View>
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
