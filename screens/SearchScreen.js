import { View, Text, Dimensions, Platform, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon, XMarkIcon } from "react-native-heroicons/outline";
import { styles, theme } from "../theme/style";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
// import { debounce } from "lodash";
import { img500, searchMovie } from "../api/api";
import { CustomImage } from "../helper/CustomImage";
import { Global_height, Global_width, fallbackImg } from "../config/config";

export default function SearchScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = React.useState(""); // [searchText, setSearchText
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState(searchText);
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchText);
    }, 500);
    return () => {
      clearTimeout(handler);
      console.log("CANCELED PREVIOUS TIMER")
    };
  }, [searchText]);


  React.useEffect(() => {
    const handleSearch = async () => {
      setLoading(true);
      if (debouncedSearchTerm.length >= 2) {
        try {
          const data = await searchMovie({
            query: debouncedSearchTerm,
            include_adult: true,
            language: "en-US",
            page: 1,
          });
          setResults(data ? data.results : []);
        } catch (error) {
          console.error(error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setLoading(false);
      }
    };

    handleSearch();
  }, [debouncedSearchTerm]);

  const handleClearText = () => {
    setSearchText("");
    setResults([]);
  };

  return (
    <SafeAreaView className='bg-neutral-800 flex-1'>
      <View className='pb-2 pt-5'>
      <View className='mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full flex-nowrap'>
        {/* <TouchableOpacity style={styles.background} className='rounded-xl p-1 m-1 w-1/12' onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size={25} color='white' />
        </TouchableOpacity> */}
        <View className='flex-row items-center w-1.5/12'>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className='rounded-full p-2 m-1 bg-neutral-500'>
            <ChevronLeftIcon size='20' color='white' strokeWidth={3} />
          </TouchableOpacity>
        </View>
        <View className='flex-1 items-center'>
          <TextInput
            placeholder='Search Movies'
            placeholderTextColor={"lightgrey"}
            className='py-3 px-3 text-base font-semibold text-white tracking-wider w-36 overflow-hidden'
            onChangeText={setSearchText}
            value={searchText}
          />
        </View>
        <View className='flex-row items-center w-1.5/12'>
          <TouchableOpacity onPress={handleClearText} className='rounded-full p-2 m-1 bg-neutral-500'>
            <XMarkIcon size='20' color='white' strokeWidth={3} />
          </TouchableOpacity>
        </View>
      </View>
      </View>
      {/* items from Search API */}
      {loading && <Loading />}

      {!loading && results.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 15 }} className='space-y-3'>
            <Text className='text-white text-lg font-semibold ml-4'>Recent Found ({results.length}):</Text>
            <View className='flex-row flex-wrap justify-between'>
              {results?.map((item, index) => {
                return (
                  <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate("Movie", item)}>
                    <View className='w-1/2 p-2 space-y-2 mb-1'>
                      <CustomImage initialSource={img500(item?.poster_path)} fallbackImage={fallbackImg} style={{ width: Global_width * 0.4, height: Global_height * 0.3 }} />
                      <Text className='text-neutral-200 text-center text-sm font-semibold mt-1'>{item.title}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          </ScrollView>
        ):(
        <View className={`flex-row justify-center mx-5 overflow-hidden`}>
          <Image 
              source={require("../assets/search-backdrop-1.webp")} 
              className='aspect-video h-96 w-full' 
              style={{
                transform: [
                  {rotateX: '20deg'},
                  {perspective: 50}
                ], 
              }} 
          />
        </View>
      )}
    </SafeAreaView>
  );
}
