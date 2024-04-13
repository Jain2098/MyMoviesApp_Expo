import { View, Text, ScrollView, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getGenreSpecificMovies } from "../api/api";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import { Global_topMargin } from "../config/config";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../theme/style";
import Loading from "../components/Loading";
import AchievedScreenPosts from "../components/AchievedScreenPosts";
import PaginationComponent from "../helper/getPaginationArray";

export default function GenreScreen() {
  const navigation = useNavigation();
  const { params: items } = useRoute();
  console.log("GenreScreen: ", items)
  const [loading, setLoading] = React.useState(true);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [ApiData, setApiData] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalResults, setTotalResults] = React.useState(0);
  const totalPages = Math.min(500, Math.ceil(totalResults / 20));



  useEffect(() => {
    fetchGenreBasedMovie();
  }, [currentPage]);

  const fetchGenreBasedMovie = async () => {
    setLoading(true);
    try {
      const response = await getGenreSpecificMovies(items.id, currentPage);
      if (response) {
        setApiData(response.results);
        setTotalResults(response.total_results);
      } else {
        setApiData([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      // console.log(ApiData);
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-neutral-900'>
      
      <View className='w-full'>
        <View className={`absolute z-30 w-full flex-row justify-between items-center px-4 ${Global_topMargin}`}>
          <TouchableOpacity style={styles.background} className='rounded-xl p-1' onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={28} strokeWidth={2.5} color='white' />
          </TouchableOpacity>
        </View>
      </View>

      <View className='flex-1'>
      {loading ? (
        <Loading />
        ) : ApiData.length > 0 ? (
          <>
          <AchievedScreenPosts 
            title={items.name} 
            data={ApiData}
            type={items.type}
            footer={
              <PaginationComponent 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
                totalPages={totalPages} 
              />
            } 
          />
          </>
          ) : (
            <View className='flex-1 justify-center items-center'>
          <Text className='text-white text-2xl'>No Posts Found</Text>
        </View>
      )}
      </View>

      {/* Here is the Pagination */}
      <View>
        
      </View>
    </SafeAreaView>
  );
}
