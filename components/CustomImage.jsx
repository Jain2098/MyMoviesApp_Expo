import { useState } from "react";
import { Image } from "react-native";


export const CustomImage = ({ initialSource, fallbackImage, ...otherProps }) => {
  const [source, setSource] = useState({ uri: initialSource });

  const handleError = () => {
      setSource(fallbackImage); 
  };

  return (
      <Image source={source} onError={handleError} {...otherProps} />
  )
}
