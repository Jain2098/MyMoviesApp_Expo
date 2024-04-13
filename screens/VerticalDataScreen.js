import { View, Text, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { Global_topMargin } from "../config/config";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../theme/style";
import Loading from "../components/Loading";
import AchievedScreenPosts from "../components/AchievedScreenPosts";
import { useRoute } from "@react-navigation/native";


export default function VerticalDataScreen() {
  const navigation = useNavigation();
  const { data } = useRoute().params;
  const { title } = useRoute().params;
  const { type } = useRoute().params;
  return (
    <SafeAreaView className='flex-1 bg-neutral-900 pb-5'>
      <View className='w-full'>
        <View className={`absolute z-30 w-full flex-row justify-between items-center px-4 ${Global_topMargin}`}>
          <TouchableOpacity style={styles.background} className='rounded-xl p-1' onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={28} strokeWidth={2.5} color='white' />
          </TouchableOpacity>
        </View>
      </View>
      <View className='flex-1 min-h-full'>
        {data.length > 0 ? (
          <AchievedScreenPosts title={title} data={data} type={type} />
        ) : (
          <View className='flex-1 justify-center items-center'>
            <Text className='text-white text-2xl'>No Posts Found</Text>
          </View>
        )}
      </View>
      
    </SafeAreaView>
  );
}


