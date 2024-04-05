import { Image, Text, TouchableWithoutFeedback, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { img500 } from '../api/api';



export const MovieCard = ({ item, handleClick, width, height, imgWidth, imgHeight }) => {
    const url = img500(item?.poster_path);
    // console.log(item)
  return (
      <TouchableWithoutFeedback onPress={()=>handleClick(item)}>
        <View className='relative'>
          <Image 
              source={{uri: url}} 
              style={{width: width*imgWidth, height: height*imgHeight}} 
              className="rounded-3xl"
          />
          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
            style={{ width, height: height * 0.1 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className='absolute bottom-0'
          />
          <View className='absolute bottom-0 left-0 right-0 p-2 rounded-b-3xl '>
                <Text className='text-lg text-center font-semibold text-white'>{item.title}</Text>
          </View>
          {item.vote_average>0 && <View className='absolute top-0 left-0 p-2 rounded-tl-3xl rounded-br-3xl bg-red-900/70'>
                <Text className='text-base text-center font-semibold text-white'>{parseFloat(item.vote_average.toFixed(1))}</Text>
          </View>}
          </View>
      </TouchableWithoutFeedback>
  )
}


