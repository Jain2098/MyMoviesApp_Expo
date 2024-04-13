import { View, Text, TouchableWithoutFeedback, FlatList } from "react-native";
import React, { useCallback, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { img780 } from "../api/api";
import { CustomImage } from "../helper/CustomImage";
import { fallbackImg } from "../config/config";
import { StarIcon } from "react-native-heroicons/solid";

export default function AchievedScreenPosts({ title, data, type, footer=""}) {
  const navigation = useNavigation();

  const handleOnPress = useCallback((item) => {
    console.log("first")
    console.log("item: ", item)
    console.log("type: ", type)
    if (type === "movie") {
      navigation.push("Movie", item)
    } else if (type === "tv") {
      navigation.push("Tv", item)
    }
  }, [navigation, type]);

  const extractYear = useCallback((date) => {
    return date.split("-")[0];
  }, []);

  const renderItems = useCallback(({ item }) => {
    const titleName = item?.title || item?.name || item?.original_title || item?.original_name || "No Title";
    return (
      <TouchableWithoutFeedback onPress={() => handleOnPress(item)}>
          <View className='pb-5 overflow-hidden w-1/2'>
            <View className='relative'>
              <CustomImage
                initialSource={img780(item.poster_path)} 
                fallbackImage={fallbackImg}
                type='SeeAll'
                style={{width:"100%", height: 270, }}
              />
              
              {item.vote_average > 0 && (
                <View className='absolute origin-top-left top-0 left-1.5 p-2 rounded-br-3xl bg-red-900/90 flex-row items-center'>
                  <View className='flex-row justify-center align-middle pr-1'>
                    <StarIcon size={15} color='yellow' />
                  </View>
                  <Text className='text-xs font-bold text-center text-white'>
                    {parseFloat(item.vote_average.toFixed(1))}
                  </Text>
                </View>
              )}
              {item.release_date && (
                <View className='absolute bottom-0 right-1.5 px-1.5 py-1.5 rounded-tl-2xl bg-blue-600/70'>
                  <Text className='text-xs font-bold text-center text-white'>
                    {extractYear(item.release_date)}
                  </Text>
                </View>
              )}
            </View>
            <Text className='text-base text-neutral-200 font-semibold pt-1 ml-1 text-center overflow-hidden tracking-wide'>
              {titleName.length > 20 ? titleName.slice(0, 20) + "..." : titleName}
            </Text>
          </View>
        </TouchableWithoutFeedback>
    );
  }, [handleOnPress, extractYear]);

  const memoizedFlatList = useMemo(() => (
    <FlatList
      data={data}
      renderItem={renderItems}
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      numColumns={2}
      horizontal={false}
      ListFooterComponent={footer}
    />
  ), [data, renderItems, footer]);

  return (
    <View className='mb-16 px-3'>
      <View className='mx-4 flex-row justify-center items-center py-5'>
        <Text className='text-white font-semibold text-3xl'>{title}</Text>
      </View>
      {memoizedFlatList}
    </View>
  );
}
