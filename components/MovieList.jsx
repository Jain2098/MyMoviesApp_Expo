import { View, Text, TouchableOpacity, TouchableWithoutFeedback, FlatList } from "react-native";
import React, { useCallback, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { img500 } from "../api/api";
import { CustomImage } from "../helper/CustomImage";
import { Global_height, Global_width, fallbackImg } from "../config/config";
import { styles } from "../theme/style";

export default function MovieList({ title, data, type, hideSeeAll = false }) {
  const navigation = useNavigation();
  // console.log("MovieList: ", type, title)
  const handleOnPress = useCallback((item) => {
    if (type === "movie") {
      navigation.push("Movie", item)
    } else if (type === "tv") {
      navigation.push("Tv", item)
    }
  }, [navigation, type]);

  const renderItems = useCallback(({ item }) => {
    const movieTitle = item?.title || item?.name || item?.original_title || item?.original_name || "No Title";
    return (
      <TouchableWithoutFeedback onPress={() => handleOnPress(item)}>
        <View className='space-y-1 mr-4 relative overflow-hidden mx-3' style={{ width: Global_width * 0.33 }}>
          <CustomImage
            initialSource={img500(item.poster_path)} 
            fallbackImage={fallbackImg}
            type='MOVIE CAROUSEL'
            style={{ width: Global_width * 0.32, height: Global_height * 0.25 }}
          />
          <Text className='text-neutral-300 ml-1 text-center'>{movieTitle.length > 14 ? movieTitle.slice(0, 14) + "..." : movieTitle}</Text>
          {item.vote_average > 0 && (
            <View className='absolute origin-top-left top-0 left-0 p-2 rounded-br-3xl bg-red-900/90'>
              <Text className='text-xs font-bold text-center text-white'>
                {parseFloat(item.vote_average.toFixed(1))}
              </Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }, [Global_width, Global_height, handleOnPress]);

  const memoizedFlatList = useMemo(() => (
    <FlatList
      data={data}
      renderItem={renderItems}
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
    />
  ), [data, renderItems]);

  return (
    <View className='mb-8 space-y-4'>
      <View className='mx-4 flex-row justify-between items-center'>
        <Text className='text-white text-2xl'>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity 
            onPress={() => navigation.navigate("VerticalDataScreen", { data, title, type })}
          >
            <Text style={styles.text} className='text-lg'>
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {memoizedFlatList}
    </View>
  );
}
