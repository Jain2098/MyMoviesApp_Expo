import { View, Text, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { MovieCard } from './MovieCard';

var {width, height} = Dimensions.get('window');

export default function TrendingMovies({ data, title, type}) {

    const navigation = useNavigation();
    const handleClick = (item) => {
      if (type === 'movie'){
        navigation.navigate('Movie', item);
      } else if (type === 'tv'){
        navigation.navigate('Tv', item);
      }
    }


  return (
    <View className="mb-8 mt-3">
      <Text className="text-white text-xl mx-4 mb-5 font-semibold">{title}</Text>
      <Carousel
        data={data}
        renderItem={({item}) => <MovieCard item={item} type={'tv'} handleClick={handleClick} width={width} imgWidth={0.6} imgHeight={0.4} height={height}/>}
        firstItem={1}
        inactiveSlideOpacity={0.60}
        sliderWidth={width}
        itemWidth={width*0.62}
        slideStyle={{display: 'flex', alignItems: 'center'}}
        loop={true}
        />
    </View>
  )
}

