import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function OnboardingTwo() {
  return (
    <View style={styles.container}>
      {/* TOP AREA */}
      <View style={styles.top}>
        <Image
          source={require("../../assets/clock.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* BOTTOM CARD */}
      <View style={styles.card}>
        <Text style={styles.title}>Never miss a dose</Text>

        <Text style={styles.desc}>
          DocWise creates medication schedules from your prescription and sends
          timely reminders to help you take your medicines correctly and
          consistently.
        </Text>

        {/* DOTS */}
        <View style={styles.dots}>
          <View style={styles.dot} />
          <View style={styles.activeDot} />
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/login")}
        >
          <Text style={styles.buttonText}>Let’s go</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#374f4f",
  },

  top: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: width * 0.55,
    height: width * 0.55,
  },

  card: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: 36,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
    color: "#111827",
  },

  desc: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 22,
  },

  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 22,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#d1d5db",
  },

  activeDot: {
    width: 18,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#374f4f",
  },

  button: {
    backgroundColor: "#374f4f",
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: "center",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
