import { View, Text, TouchableOpacity, TouchableWithoutFeedback, FlatList, Animated } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { img500 } from "../api/api";
import { CustomImage } from "../helper/CustomImage";
import { Global_height, Global_width, fallbackImg } from "../config/config";
import { styles } from "../theme/style";

export default function MovieList({ title, data, type, hideSeeAll = false }) {
  const navigation = useNavigation();

  // each item width is 33% & height is 25% of the screen
  const itemWidth = Global_width * 0.33;
  const itemHeight = Global_height * 0.25;

  const scrollX = useRef(new Animated.Value(0)).current;

  // console.log("MovieList: ", type, title)
  const handleOnPress = useCallback(
    (item) => {
      if (type === "movie") {
        navigation.push("Movie", item);
      } else if (type === "tv") {
        navigation.push("Tv", item);
      }
    },
    [navigation, type]
  );



  // RENDER ITEM FUNCTION, Used useCallback, as it memorize the function, to prevent re-rendering until unless its dependencies change
  const renderItems = useCallback(
    ({ item, index }) => {

      const inputRange = [
        itemWidth * (index - 1), // Previous item is centered
        itemWidth * index + 1, // Current item is centered
        itemWidth * (index + 2.7), // Next item is centered
      ];

      const isFirstOrSecondItem = index === 0 || index === 1;
      const isLastOrSecondToLastItem = index === data.length - 1 || index === data.length - 2 || index === data.length - 3;

      const scale =
        isFirstOrSecondItem || isLastOrSecondToLastItem
          ? 1
          : scrollX.interpolate({
              inputRange,
              outputRange: [1, 1, 0],
              extrapolate: "clamp",
            });

      const opacity =
        isFirstOrSecondItem || isLastOrSecondToLastItem
          ? 1
          : scrollX.interpolate({
              inputRange,
              outputRange: [1, 0.5, 1],
              extrapolate: "clamp",
            });
      return <MovieItem item={item} onPress={() => handleOnPress(item)} scale={scale} opacity={opacity} />;
    },
    [handleOnPress, scrollX, data.length]
  );

  // MOVIE ITEM COMPONENT, Used React.memo, as it memorize the output, to prevent re-rendering of the component if the props are same
  const MovieItem = React.memo(({ item, onPress, scale, opacity }) => {
    const movieTitle = item?.title || item?.name || item?.original_title || item?.original_name || "No Title";
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <Animated.View
          className='mr-1 relative overflow-hidden mx-1'
          style={{
            // width: Global_width * 0.33,
            transform: [{ scale }],
            opacity,
          }}>
          <CustomImage
            initialSource={img500(item.poster_path)}
            fallbackImage={fallbackImg}
            style={{ width: itemWidth, height: itemHeight }}
          />
          <Text className='text-neutral-300 ml-1 text-center'>{movieTitle.length > 14 ? movieTitle.slice(0, 14) + "..." : movieTitle}</Text>
          {item.vote_average > 0 && (
            <View className='absolute origin-top-left top-0 left-0 p-2 rounded-br-3xl bg-red-900/90'>
              <Text className='text-xs font-bold text-center text-white'>{parseFloat(item.vote_average.toFixed(1))}</Text>
            </View>
          )}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  });





  // MAIN FlatList
  const memoizedFlatList = useMemo(
    () => (
      <Animated.FlatList
        data={data}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
        renderItem={renderItems}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        scrollEventThrottle={16}
      />
    ),
    [data, renderItems]
  );





  // MAIN RETURN OF THE COMPONENT
  return (
    <View className='mb-8 space-y-4'>
      <View className='mx-4 flex-row justify-between items-center'>
        <Text className='text-white text-2xl'>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity onPress={() => navigation.navigate("VerticalDataScreen", { data, title, type })}>
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
