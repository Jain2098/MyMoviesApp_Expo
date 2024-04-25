import axios from "axios";



const apiKey = 'YOUR_API_KEY'
const append = '&append_to_response=credits'
// endpoints
const baseUrl = "https://api.themoviedb.org/3"


export const imgOriginal = path => `https://image.tmdb.org/t/p/original${path}`
export const img1280 = path => `https://image.tmdb.org/t/p/w1280${path}`
export const img780 = path => `https://image.tmdb.org/t/p/w780${path}`
export const img500 = path => `https://image.tmdb.org/t/p/w500${path}`
export const img342 = path => `https://image.tmdb.org/t/p/w342${path}`
export const img185 = path => `https://image.tmdb.org/t/p/w185${path}`


const trendingMoviesEndpoint = `${baseUrl}/trending/movie/day?api_key=${apiKey}`
const upcomingMoviesEndpoint = `${baseUrl}/movie/upcoming?api_key=${apiKey}`
const topRatedMoviesEndpoint = `${baseUrl}/movie/top_rated?api_key=${apiKey}`

const trendingTVEndpoint = `${baseUrl}/trending/tv/day?api_key=${apiKey}`
const popularTVEndpoint = `${baseUrl}/tv/popular?api_key=${apiKey}`
const topRatedTVEndpoint = `${baseUrl}/tv/top_rated?api_key=${apiKey}`

const personDetailsEndpoint = id => `${baseUrl}/person/${id}?api_key=${apiKey}`
const personMoviesEndpoint = id => `${baseUrl}/person/${id}/movie_credits?api_key=${apiKey}`
const personTvEndpoint = id => `${baseUrl}/person/${id}/tv_credits?api_key=${apiKey}`

const movieDetailsEndpoint = id => `${baseUrl}/movie/${id}?api_key=${apiKey}${append}`
const movieCreditsEndpoint = id => `${baseUrl}/movie/${id}/credits?api_key=${apiKey}`
const movieSimilarEndpoint = id => `${baseUrl}/movie/${id}/similar?api_key=${apiKey}`

const tvDetailsEndpoint = id => `${baseUrl}/tv/${id}?api_key=${apiKey}${append}`
const tvCreditsEndpoint = id => `${baseUrl}/tv/${id}/credits?api_key=${apiKey}`
const tvSimilarEndpoint = id => `${baseUrl}/tv/${id}/similar?api_key=${apiKey}`

const movieGenreSpecificEndpoint = (id,pageNumber) => `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=${id}&page=${pageNumber}`

const searchMovieEndpoint = `${baseUrl}/search/movie?api_key=${apiKey}`
const searchTvEndpoint = `${baseUrl}/search/tv?api_key=${apiKey}`


const apiCall = async (endpoint, params) => {
  const controller = new AbortController();
  const signal = controller.signal;

  const options = {
    method: "GET",
    url: endpoint,
    params: params? params : {},
    signal: signal
  }

  try {
    // console.log('Endpoint:', endpoint);
    const response = await axios.request(options);
    return response.data
  }
  catch (error) {
    console.log(endpoint);
    console.error(error);
    return {}
  }
  finally {
    controller.abort();
  }
}


export const getTrendingMovies = async () => {
  return await apiCall(endpoint=trendingMoviesEndpoint)
}


export const getUpcomingMovies = async () => {
  return await apiCall(upcomingMoviesEndpoint)
}


export const getTopRatedMovies = async () => {
  return await apiCall(topRatedMoviesEndpoint)
}

export const getSingleMovie = async (movieId) => {
  return await apiCall(movieDetailsEndpoint(movieId))
}

export const getSingleMovie_credits = async (movieId) => {
  return await apiCall(movieCreditsEndpoint(movieId))
}


export const getSimilarMovie = async (movieId) => {
  return await apiCall(movieSimilarEndpoint(movieId))
}


export const getPersonDetails = async (personId) => {
  return await apiCall(personDetailsEndpoint(personId))
}


export const getPersonMovies = async (personId) => {
  return await apiCall(personMoviesEndpoint(personId))
}


export const searchMovie = async (type, query) => {
  const searchEndpoint = type === 'movie' ? searchMovieEndpoint : searchTvEndpoint
  // console.log(searchEndpoint)
  // console.log(query)
  return await apiCall(searchEndpoint, query)
}


export const getGenreSpecificMovies = async (genreId, pageNumber) => {
  return await apiCall(movieGenreSpecificEndpoint(genreId, pageNumber))
}







/// TV  ///
export const getTrendingTV = async () => {
  return await apiCall(trendingTVEndpoint)
}


export const getPopularTV = async () => {
  return await apiCall(popularTVEndpoint)
}


export const getTopRatedTV = async () => {
  return await apiCall(topRatedTVEndpoint)
}


export const getSingleTV = async (tvId) => {
  return await apiCall(tvDetailsEndpoint(tvId))
}

export const getSimilarTV = async (tvId) => {
  return await apiCall(tvSimilarEndpoint(tvId))
}

export const getPersonTv = async (personId) => {
  return await apiCall(personTvEndpoint(personId))
}