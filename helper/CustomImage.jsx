import { useState } from "react";
import { Image } from "react-native";
import { Image as ImageExpo } from "expo-image";
import Loading from "../components/Loading";

export const CustomImage = ({ initialSource, fallbackImage, contentFit='scale-down', type='', ...otherProps }) => {
  // console.log("initialSource: ", initialSource)
  const [source, setSource] = useState({ uri: initialSource });
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const [loading, setLoading] = useState(true);

  const LoadingScreen = () => {
    return (
      // this is a Spinner component
      <Loading />
    )
  }

  const handleError = (e) => {
    // console.log("inside Image Handle Error");
    // console.log("TYPE: ", type);
    if (initialSource === null || initialSource.endsWith("null") || initialSource === "" || initialSource === undefined || initialSource === "null") {
      // console.log("Image initialSource is NULL");
      // console.log("TYPE: ", type);
      setSource(fallbackImage);
      return;
    }
    if (!initialSource || !isValidHttpUrl(initialSource)) {
      // console.error("Invalid or missing initialSource:", initialSource);
      // console.log("TYPE: ", type);
      setSource(fallbackImage);
      return;
    }
    if (retryCount < maxRetries) {
      // console.log('Retrying image load...');
      // console.log("TYPE: ", type);
      setLoading(true)
      setRetryCount((retryCount) => retryCount + 1); // Increment retry count
      // setSource({ uri: initialSource }); // Attempt to reload
      setTimeout(() => setSource({ uri: initialSource }), 500);
    } else {
      console.log("setting FallBack Image");
      console.log("TYPE: ", type);
      setSource(fallbackImage); // Use fallback after max retries
    }
  };


  return <ImageExpo 
            source={source} 
            onError={handleError} 
            contentFit={contentFit} 
            onLoadStart={LoadingScreen} 
            onLoad={()=> setLoading(false)} {...otherProps}
          />;
};



