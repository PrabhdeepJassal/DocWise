import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";



const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const navigation = useNavigation();

  return (
<Pressable
  style={styles.container}
  onPress={() => router.replace("/onboarding")}
>

      {/* TOP IMAGE */}
      <Image
        source={require("../assets/splash_main.png")}
        style={styles.topImage}
        resizeMode="cover"
      />

      {/* BOTTOM AREA */}
      <View style={styles.footer}>
        {/* LEFT DECOR */}
        <Image
          source={require("../assets/Ellipse.png")}
          style={styles.ellipse}
          resizeMode="contain"
        />

        {/* RIGHT DECOR */}
        <Image
          source={require("../assets/rectangle.png")}
          style={styles.rectangle}
          resizeMode="contain"
        />

        {/* LOGO */}
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  topImage: {
    width: width,
    height: height * 0.6,
  },

  footer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },

  logo: {
    width: width * 0.8,
    height: width * 0.25,
    zIndex: 10,
  },

  ellipse: {
    position: "absolute",
    width: 300,
    height: 300,
    bottom: -60,
    left: -60,
    opacity: 0.6,
  },

  rectangle: {
    position: "absolute",
    width: 120,
    height: 120,
    bottom: -30,
    right: -30,
  },
});
