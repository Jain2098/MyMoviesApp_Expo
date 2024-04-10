import { View, Text } from 'react-native';
import React from 'react';
import {addFavorites, getFavorites, removeFavorites} from "../helper/favouriteManager";

export default function FavoriteScreen() {
  const [favoritesMovies, setFavoritesMovies] = React.useState([]);
  React.useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = await getFavorites('my_favorite_movies');
      setFavoritesMovies(favorites);
    }
    fetchFavorites();
  }, []);
  return (
    <View className='flex-1 bg-neutral-900 justify-center items-center'>
      {favoritesMovies.map((item, index) => {
        return (
          <View key={index} className='flex-row items-center justify-between w-full px-4 py-2 bg-neutral-800 border-b border-neutral-700'>
            <Text className='text-white'>{item}</Text>
            <View className='flex-row items-center'>
              <Text className='text-white'>Remove</Text>
            </View>
          </View>
        )

      })}
    </View>
  )
}