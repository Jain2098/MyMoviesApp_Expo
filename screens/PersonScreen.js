import { View, Text, Dimensions, Platform, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, theme } from "../theme/style";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import MovieList from "../components/MovieList";
import Carousel from "react-native-snap-carousel";
import { MovieCard } from "../components/MovieCard";
import Loading from "../components/Loading";
import { getPersonDetails, getPersonMovies } from "../api/api";
import { CustomImage } from "../components/CustomImage";
import { fallbackPersonImage } from "../config/config";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : "my-3";

export default function PersonScreen() {
  const navigation = useNavigation();
  const { params: item } = useRoute();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [person, setPerson] = React.useState({});
  const [personMovies, setPersonMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  // console.log(item)
  const profileImg = 'https://image.tmdb.org/t/p/original' + item?.profile_path;

  React.useEffect(() => {
    fetchPersonDetails(item.id);
    fetchPersonMovies(item.id);
  }, []);

  const fetchPersonDetails = async (id) => {
    setLoading(true);
    try {
      const response = await getPersonDetails(id);
      // console.log(response);
      if (response) {
        setPerson(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const fetchPersonMovies = async (id) => {
    try {
      const response = await getPersonMovies(id);
      if (response) {
        setPersonMovies(response.cast);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getGender = (id) => {
    switch (id) {
      case 0:
        return "Not specified";
      case 1:
        return "Female";
      case 2:
        return "Male";
      case 3:
        return "Non-binary";
  }
}

  return (
    <ScrollView className='flex-1 bg-neutral-900' contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Header */}
      <SafeAreaView className={`z-20 w-full flex-row justify-between items-center px-4 ${verticalMargin}`}>
        <TouchableOpacity style={styles.background} className='rounded-xl p-1' onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size={28} strokeWidth={2.5} color='white' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <HeartIcon size={35} color={isFavorite ? theme.background : "white"} />
        </TouchableOpacity>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <View>
          {/* Person Details */}
          <View
            className='flex-row justify-center'
            style={{
              shadowColor: "gray",
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
            }}
          >
            <View className='items-center rounded-full overflow-hidden h-72 w-72 border-neutral-500'>
              {/* <Image 
                // className='object-fit' 
                source={source} 
                style={{ width: width * 0.74, height: height * 0.43 }} 
                onError={() => setSource(fallbackImg())}                
              /> */}
              <CustomImage initialSource={profileImg} fallbackImage={fallbackPersonImage(person?.gender)} style={{ width: width * 0.74, height: height * 0.43 }} />
            </View>

            {/* Person Title & Home Location */}
          </View>
          <View className='mt-6'>
            <Text className='text-3xl text-white font-bold text-center'>
              {person?.name}
            </Text>
            {person?.also_known_as && <Text className="text-sm text-neutral-300 font-semibold text-center">{person?.also_known_as[0]}</Text>}
            <Text className='text-base text-neutral-500 font-bold text-center'>{person?.place_of_birth}</Text>
          </View>

          {/* Person Quick Details */}
          <View className='mx-3 mt-4 py-4 px-3 flex-row justify-between items-center bg-neutral-700 rounded-full'>
            <View className='border-r-2 border-r-neutral-400 items-center px-2'>
              <Text className='text-white font-semibold'>Gender</Text>

              {/* 
                  0	Not set / not specified
                  1	Female
                  2	Male
                  3	Non-binary
            */}
              <Text className='text-neutral-300 text-sm'>{getGender(person?.gender) || "n/a"}</Text>
            </View>
            <View className='border-r-2 border-r-neutral-400 items-center px-2'>
              <Text className='text-white font-semibold'>Birthday</Text>
              <Text className='text-neutral-300 text-sm'>{person?.birthday || "n/a"}</Text>
            </View>
            <View className='border-r-2 border-r-neutral-400 items-center px-2'>
              <Text className='text-white font-semibold'>Known For</Text>
              <Text className='text-neutral-300 text-sm'>{person?.known_for_department || "n/a"}</Text>
            </View>
            <View className='items-center px-2'>
              <Text className='text-white font-semibold'>Popularity</Text>
              <Text className='text-neutral-300 text-sm'>{person?.popularity?.toFixed(1)+" %" || "n/a"}</Text>
            </View>
          </View>

          {/* Biography */}
          <View className='my-6 mx-4 space-y-2'>
            <Text className='text-white text-2xl'>Biography</Text>
            <Text className='text-neutral-400 tracking-wide'>
              {person?.biography || "Biography Data not-available."}
            </Text>
          </View>

          {/* Person Posters */}
          {/* <View className='mb-8'>
          <Text className='text-white text-2xl mx-4 mb-5'>Backdrops</Text>
          <Carousel
            data={backdrop}
            renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} width={width} imgWidth={0.6} imgHeight={0.2} height={height}/>}
            firstItem={1}
            inactiveSlideOpacity={0.6}
            sliderWidth={width}
            itemWidth={width * 0.62}
            slideStyle={{ display: "flex", alignItems: "center" }}
            loop={true}
          />
        </View> */}

          {/* Person Movies */}
          {personMovies && <MovieList title='Movies' data={personMovies} hideSeeAll={true} />}
        </View>
      )}
    </ScrollView>
  );
}
