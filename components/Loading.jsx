import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import { theme } from '../theme/style';

var {height, width} = Dimensions.get('window');

export default function Loading() {
  return (
    <View className="flex-row justify-center items-center min-w-50 min-h-50" style={{height,width}}>
      <Progress.CircleSnail thickness={10} size={100} color={theme.background} duration={500}/>
    </View>
  )
}