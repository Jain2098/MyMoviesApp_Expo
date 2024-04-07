import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { img500, imgOriginal } from '../api/api';
import { CustomImage } from '../helper/CustomImage';
import { fallbackPersonImage } from '../config/config';

export default function Cast({cast, navigation}) {
  return (
    <View className="my-6">
      <Text className='text-white text-2xl mx-4 mb-5'>Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 15 }}
      >
        {cast && cast.map((person, index) => {
          let poster = person?.profile_path ? imgOriginal(person?.profile_path):"null";

          const fallback = () => fallbackPersonImage(person?.gender);
          return (
            <TouchableOpacity key={index} className="mr-4 items-center" onPress={()=> navigation.push('Person', person)}>
              <View className="overflow-hidden rounded-full h-24 w-20 items-center">
                <CustomImage initialSource={poster} fallbackImage={fallback} contentFit='cover' className='rounded duration-200 w-20 h-24' />
              </View> 
              <Text className="text-white text-xs mt-1">{person?.character?.length>10 ? person?.character?.slice(0, 10):person?.character}</Text>
              <Text className="text-neutral-500 text-xs mt-1">{person?.name?.length>10? person?.name?.slice(0,10):person?.name}</Text>

            </TouchableOpacity>
          );
          })
        }
        </ScrollView>
    </View>
  )
}