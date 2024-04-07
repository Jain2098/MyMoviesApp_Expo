import { View, Text, Image, FlatList, TouchableOpacity, Linking, Platform } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

var ios = Platform.OS == "ios";
const DrawerItems = ({navigation}) => {
  const openURL = (url) => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  }
  return (
    <SafeAreaView className='bg-gray-900' style={{ flex: 1, paddingBottom: 5, gap: 10, }} >
      <View className='bg-gray-900' style={{ flex:1, flexDirection: 'column', gap:10, maxHeight: 180, justifyContent: "center", alignItems: "center"}} >
        <Image style={{ width: 100, height: 100, borderRadius: 5, }} source={{ uri: "https://cdn-icons-png.flaticon.com/512/2919/2919906.png", }} />
        <Text style={{ color: "white", fontSize: 20, textAlign: "center", fontWeight: "bold", }} >
          Welcome Back,
        </Text>
      </View>
      <View style={{width:"100%"}}>
      <FlatList
        data={[
          {icon:'home' , title:'Home', component:'HomeScreen'},
          {icon:'information-circle-outline' , title:'About Us', component:'About Us'},
          {icon:'mail-outline' , title:'Contact Us', component:'Contact Us'},
        ]}
        renderItem={({item, index}) => {
          return(
          <TouchableOpacity
            style={{width:"100%", flexDirection:'row', alignItems:'center', height: 80}}
            onPress={()=> {
              // navigation.closeDrawer();
              navigation.navigate(item.component);
              
            }}
            >
              {/* <Image source={item.icon} style={{marginLeft: 15}} /> */}
              <Ionicons name={item.icon} size={30} color={'white'} style={{marginLeft: 15}}/>
              <Text style={{fontSize: 16, color: 'wheat', marginLeft: 15}}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
        />
        </View>
        <TouchableOpacity style={{width:"100%", position:'absolute', bottom:0, left:0, flex:1, flexDirection:'row', justifyContent:'space-evenly', alignItems:'center', backgroundColor:"#11001C", paddingVertical:15}}>
        <Ionicons name='logo-facebook' size={30} color={'#316FF6'} onPress={()=> openURL("https://facebook.com")}/>
        <Ionicons name='logo-twitter' size={30} color={'#1DA1F2'} onPress={()=> openURL("https://twitter.com")}/>
        <Ionicons name='logo-whatsapp' size={30} color={'#25D366'} onPress={()=> openURL("https://whatsapp.com")}/>
        <Ionicons name='logo-instagram' size={30} color={'#E1306C'} onPress={()=> openURL("https://instagram.com")}/>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DrawerItems;
