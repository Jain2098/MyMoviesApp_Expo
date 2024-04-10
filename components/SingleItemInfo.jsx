import { View, Text } from 'react-native'
import React from 'react'

export default function SingleItemInfo({tmdb_id}) {
  const [loading, setLoading] = React.useState(true);
  const [movieDetails, setMovieDetails] = React.useState({});


  useEffect(() => {
    fetchMovieDetails(item.id, 'my_favorite');
  }, []);

  const fetchMovieDetails = async (id) => {
    setLoading(true);
    try {
      const response = await getSingleMovie(id);
      // console.log(response);
      if (response) {
        setMovieDetails(response);
        setCast(response?.credits?.cast);
        // console.log(response?.credits?.cast)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View>
      <Text>SingleItemInfo</Text>
    </View>
  )
}