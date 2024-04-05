import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { img500, imgOriginal } from '../api/api';
import { CustomImage } from './CustomImage';
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
          let poster = imgOriginal(person?.profile_path);
          // console.log(person)
          // console.log('\n\n')
          return (
            <TouchableOpacity key={index} className="mr-4 items-center" onPress={()=> navigation.push('Person', person)}>
              <View className="overflow-hidden rounded-full h-20 w-20 items-center">
              {/* <Image className="rounded scale-125 duration-200 w-20 h-24 object-cover" source={source} onError={() => setSource(fallbackImg())} /> */}
              {/* <Image 
                  source={{ uri: poster }} 
                  className='rounded scale-125 duration-200 w-20 h-24 object-cover'
                  onError={() => source.uri = fallbackImg}
                /> */}
                <CustomImage initialSource={poster} fallbackImage={fallbackPersonImage(person?.gender)} className='rounded scale-125 duration-200 w-20 h-24 object-cover' />
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