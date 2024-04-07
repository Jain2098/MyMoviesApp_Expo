export const fallbackImg = require("../assets/ImageNotFound.jpg");

export const fallbackPersonImage = (gender) => {
  const images = {
    1: require('../assets/girl-icon.png'),
    2: require('../assets/boy-icon.png'),
    // Default case
    default: require('../assets/anonymous.png') 
  };

  return images[gender] || images.default;
}

