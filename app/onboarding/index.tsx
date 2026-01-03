import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function OnboardingOne() {
  const scrollRef = useRef<ScrollView>(null);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;

    // If user scrolls enough → go next
    if (offsetX > width * 0.3) {
      router.replace("/onboarding/page2");
    }
  };

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={onScrollEnd}
      style={styles.container}
    >
      {/* PAGE 1 */}
      <View style={styles.page}>
        {/* TOP AREA */}
        <View style={styles.top}>
          <Image
            source={require("../../assets/presecription.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* BOTTOM CARD */}
        <View style={styles.card}>
          <Text style={styles.title}>Understand Your Prescription</Text>

          <Text style={styles.desc}>
            Scan handwritten prescriptions and instantly see clear medicine
            details, dosage, and instructions — no confusion, no guesswork.
          </Text>

          {/* DOTS */}
          <View style={styles.dots}>
            <View style={styles.activeDot} />
            <View style={styles.dot} />
          </View>

          {/* BUTTON */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace("/onboarding/page2")}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#374f4f",
  },

  page: {
    width,
    height,
    justifyContent: "space-between",
  },

  top: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: width * 0.6,
    height: width * 0.6,
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
  },

  desc: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },

  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
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
