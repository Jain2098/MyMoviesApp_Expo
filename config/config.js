export const fallbackImg = require("../assets/ImageNotFound.jpg");

export const fallbackPersonImage = (gender) => {
  if (gender === 1) {
    return require('../assets/girl-icon.png');
  } else if(gender === 2) {
    return require('../assets/boy-icon.png');
  }else {
    return require('../assets/anonymous.png');
  }
}