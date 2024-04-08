import { Dimensions, Platform } from "react-native";






const { width, height } = Dimensions.get("window");
export const Global_width = width;
export const Global_height = height;
export const Global_ios = Platform.OS == "ios";
export const Global_topMargin = Global_ios ? "" : "mt-3";

export const fallbackImg = require("../assets/ImageNotFound.jpg");

export const fallbackPersonImage = (gender) => {
  const images = {
    1: require('../assets/girl-icon.png'),
    2: require('../assets/boy-icon.png'),
    default: require('../assets/anonymous.png') 
  };
  return images[gender] || images.default;
}

