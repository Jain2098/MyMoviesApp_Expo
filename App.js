import React from "react";
import AppNavigator from "./AppNavigator";
import { View } from "react-native";
import { MoviesFavoriteList_Context } from "./store/favoriteItems_store";
import { getFavorites, removeFavorites, addFavorites, removeAllFavorites } from "./helper/favoriteManager";

export default function App() {
  const [favoriteMovies, setFavoritesMovies] = React.useState([]);
  const [favoritePeople, setFavoritesPeople] = React.useState([]);

  React.useEffect(() => {
    const fetchFavorites = async () => {
      const favoriteMovies_ls = await getFavorites("my_favorite_movies");
      const favoritePeople_ls = await getFavorites("my_favorite_persons");
      setFavoritesMovies(favoriteMovies_ls);
      setFavoritesPeople(favoritePeople_ls);
    };
    fetchFavorites();
  }, []);

  const removeFavorite = async (id, type) => {
    await removeFavorites(id, type);
    
    if (type === "my_favorite_movies") {
      setFavoritesMovies([...favoriteMovies.filter((item) => item !== id)]);
    } else if (type === "my_favorite_persons") {
      console.log("type: ", type)
      setFavoritesPeople([...favoritePeople.filter((item) => item !== id)]);
    }
  };

  const addFavoriteViaMain = async (id, type) => {
    await addFavorites(id, type);
    // console.log("type: ", type)
    // setFavoritesMovies([...favoritesMovies, id]);
    if (type === "my_favorite_movies") {
      setFavoritesMovies((prevFavorites) => [...prevFavorites, id]);
    } else if (type === "my_favorite_persons") {
      setFavoritesPeople((prevFavorites) => [...prevFavorites, id]);
    }
  };

  return (
    <MoviesFavoriteList_Context.Provider
      value={{
        favoriteMovies: favoriteMovies,
        favoritePeople: favoritePeople,
        removeFavorite: removeFavorite,
        addFavoriteViaMain: addFavoriteViaMain,
      }}>
      <View style={{ flex: 1 }}>
        <AppNavigator />
      </View>
    </MoviesFavoriteList_Context.Provider>
  );
}
