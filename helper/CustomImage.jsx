import { useState } from "react";
import { Image } from "react-native";
import { Image as ImageExpo } from "expo-image";
import Loading from "../components/Loading";

export const CustomImage = ({ initialSource, fallbackImage, contentFit='scale-down', ...otherProps }) => {
  const [source, setSource] = useState({ uri: initialSource });
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const [loading, setLoading] = useState(true);

  const handleError = () => {
    if (initialSource === null || initialSource.endsWith("null") || initialSource === "" || initialSource === undefined || initialSource === "null") {
      setSource(fallbackImage);
      return;
    }
    if (retryCount < maxRetries) {
      setLoading(true)
      setRetryCount((retryCount) => retryCount + 1); // Increment retry count
      setSource({ uri: initialSource }); // Attempt to reload
    } else {
      console.log("setting FallBack Image");
      setSource(fallbackImage); // Use fallback after max retries
    }
  };


  return <ImageExpo source={source} onError={handleError} contentFit={contentFit} onLoadStart={LoadingScreen} onLoad={()=> setLoading(false)} {...otherProps} />;
};


const LoadingScreen = () => {
  return (
    // this is a Spinner component
    <Loading />
  )
}
