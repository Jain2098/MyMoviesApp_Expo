import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const FavoriteHeader = () => {
  const [imageLoaded, setImageLoaded] = useState(true);

  return (
    <View className='w-screen' style={styles.container}>
      {imageLoaded ? (
        <Image
          source={{ uri: "https://new3.imgpress.xyz/images/2024/04/13/Heart-On-Fire.webp" }}
          style={styles.imageStyle}
          onError={() => setImageLoaded(false)}
        />
      ) : (
        <Text className={`text-3xl text-white text-center font-semibold`}>❤️ </Text>
      )}

        <Text className={`text-3xl text-white text-center font-semibold`}> My Collections</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // aligns image and text in a single line
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  imageStyle: {
    width: 50, // width of the image
    height: 50, // height of the image
    marginRight: 0, // space between the image and the text
  },
});

export default FavoriteHeader;
