import { View, Text, TouchableWithoutFeedback, FlatList } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { img780 } from "../api/api";
import { CustomImage } from "../helper/CustomImage";
import { fallbackImg } from "../config/config";
import { StarIcon } from "react-native-heroicons/solid";

export default function AchievedScreenPosts({ title, data, footer=""}) {

  const navigation = useNavigation();

  const renderItems = ({ item, index}) => {
    const movieTitle = item?.title;
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => navigation.push("Movie", item)}
      >
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
            {/* SAMPLE: "release_date": "2024-03-27" */}
            {item.release_date && (
              <View className='absolute bottom-0 right-1.5 px-1.5 py-1.5 rounded-tl-2xl bg-blue-600/70'>
                <Text className='text-xs font-bold text-center text-white'>
                  {extractYear(item.release_date)}
                </Text>
              </View>
            )}
            </View>
            <Text className='text-base text-neutral-200 font-semibold pt-1 ml-1 text-center overflow-hidden tracking-wide'>{movieTitle.length > 20 ? movieTitle.slice(0, 20) + "..." : movieTitle}</Text>
          </View>
        </TouchableWithoutFeedback>
    );
  }

  return (
    <View className='mb-16 px-3'>
      <View className='mx-4 flex-row justify-center items-center py-5'>
        <Text className='text-white font-semibold text-3xl'>{title}</Text>
      </View>

      {/* SHowing as a HORIZONTAL */}
      <FlatList
        data={data}
        renderItem={renderItems}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        horizontal={false}
        ListFooterComponent={footer}
        />


    </View>
  );
}


const extractYear = (date) => {
  return date.split("-")[0];
}