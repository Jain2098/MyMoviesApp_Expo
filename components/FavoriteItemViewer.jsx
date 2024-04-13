import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getPersonDetails, getSingleMovie, img500 } from "../api/api";
import { fallbackImg, fallbackPersonImage } from "../config/config";
import { CustomImage } from "../helper/CustomImage";
import { useNavigation } from "@react-navigation/native";
import { MoviesFavoriteList_Context } from "../store/favoriteItems_store";

export default function FavoriteItemViewer({ id, type }) {
  const [item, setItem] = useState({});
  const navigation = useNavigation();
  // console.log("id: ", id, "\ntype: ", type, "\n");

  useEffect(() => {
    // console.log("I am Running");
    if (type === "movie") {
      fetchMovieDetails(id);
    } else if (type === "person") {
      fetchPersonDetails(id);
    }
  }, []);

  const fetchMovieDetails = async (id) => {
    try {
      const response = await getSingleMovie(id);
      if (response) {
        // console.log("Response:", response);
        setItem(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPersonDetails = async (id) => {
    try {
      const response = await getPersonDetails(id);
      if (response) {
        setItem(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [posterImg, setPosterImg] = useState("null");

  useEffect(() => {
    if (item) {
      // console.log("item: ", item.id);
      const newPosterImg = img500(item?.poster_path || item?.profile_path);
      setPosterImg(newPosterImg);
      // console.log("Poster Img:", newPosterImg); // Log the newPosterImg directly
    }
  }, [item]);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("state", () => {
  //     console.log(navigation.getState());
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  return (
    <>
      {type === "person" ? (
        <TouchableOpacity className='w-3/12 m-2 rounded-full overflow-hidden' onPress={() => navigation.navigate("Person", item)}>
          <CustomImage initialSource={posterImg} fallbackImage={fallbackPersonImage(item.gender)} contentFit='cover' style={{ aspectRatio: 1 }} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className='w-1/3 rounded-sm overflow-hidden'
          onPress={() =>
            navigation.navigate("Movie", item)
          }>
          <CustomImage initialSource={posterImg} fallbackImage={fallbackImg} style={{ aspectRatio: 2 / 3 }} />
        </TouchableOpacity>
      )}
    </>
  );
}
