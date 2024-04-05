import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from '../theme/style';
import * as Progress from 'react-native-progress';


const SplashScreen = ({navigation}) => {

    
    useEffect(() => {
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        }, 1000);
      }, [navigation]);


  return (
    <View className="bg-neutral-800" style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <View style={{flex:1, flexDirection:'column', height:100, justifyContent:"center", alignItems:"center"}}>
            {/* <Image source={require('../assets/spinner.gif')} style={{height:80, width:80}}/> */}
            <Progress.CircleSnail color={['red', 'yellow', 'black']} animating={true} duration={500}/>
            <Text style={{fontSize:20, fontWeight:"bold", color:"white"}}>Welcome to <Text className="text-xl" style={styles.text}>M</Text>ovies Arena...</Text>
      </View>
    </View>
  )
}

export default SplashScreen;