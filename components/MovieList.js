import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Dimensions, FlatList } from "react-native";
import React from "react";
import { styles } from "../theme/style";
import { useNavigation } from "@react-navigation/native";
import { img500 } from "../api/api";
import { CustomImage } from "../helper/CustomImage";
import { fallbackImg } from "../config/config";

var { height, width } = Dimensions.get("window");

export default function MovieList({ title, data, hideSeeAll = false }) {

  const navigation = useNavigation();

  // EACH ITEM RENDERING TEMPLATE FROM FLATLIST
  const renderItems = ({ item, index }) => {
    const movieTitle = item?.title;
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => navigation.push("Movie", item)}
      >
          <View className='space-y-1 mr-4 relative overflow-hidden mx-3' style={{ width: width * 0.33 }}>
            <CustomImage
              initialSource={img500(item.poster_path)} 
              fallbackImage={fallbackImg}
              style={{ width: width * 0.33, height: height * 0.25 }}
            />
            <Text className='text-neutral-300 ml-1 text-center'>{movieTitle.length > 14 ? movieTitle.slice(0, 14) + "..." : movieTitle}</Text>
            {item.vote_average > 0 && (
              <View className='absolute top-0 left-0 px-2 py-2 rounded-br-3xl bg-red-900/90'>
                <Text className='text-xs font-bold text-center text-white'>
                  {parseFloat(item.vote_average.toFixed(1))}
                </Text>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
    );
  }

  return (
    <View className='mb-8 space-y-4'>
      <View className='mx-4 flex-row justify-between items-center'>
        <Text className='text-white text-2xl'>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className='text-lg'>
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* SHowing as a HORIZONTAL */}
      <FlatList
        data={data}
        renderItem={renderItems}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        // contentContainerStyle={{flexDirection: 'row' }}
        />
    </View>
  );
}
