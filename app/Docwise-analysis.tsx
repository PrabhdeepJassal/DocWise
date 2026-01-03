import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BUTTON_WIDTH = SCREEN_WIDTH - 40; // 20px padding on each side
const SLIDER_WIDTH = 60;

export default function AnalysisScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [analysisStage, setAnalysisStage] = useState<'loading' | 'processing' | 'results'>('loading');
  const [isLoadingContent, setIsLoadingContent] = useState(true);
  const [isSliderComplete, setIsSliderComplete] = useState(false);
  
  const slideAnim = useRef(new Animated.Value(0)).current;
  const pan = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    // Stage 1: Loading (2 seconds)
    const loadingTimer = setTimeout(() => {
      setAnalysisStage('processing');
      
      // Stage 2: Processing (3 seconds)
      const processingTimer = setTimeout(() => {
        setAnalysisStage('results');
        
        // Stage 3: Load content (1.5 seconds)
        const contentTimer = setTimeout(() => {
          setIsLoadingContent(false);
        }, 1500);
        
        return () => clearTimeout(contentTimer);
      }, 3000);
      
      return () => clearTimeout(processingTimer);
    }, 2000);

    return () => clearTimeout(loadingTimer);
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: 0,
        });
      },
      onPanResponderMove: (_, gesture) => {
        const maxSlide = BUTTON_WIDTH - SLIDER_WIDTH - 10;
        if (gesture.dx >= 0 && gesture.dx <= maxSlide) {
          pan.setValue({ x: gesture.dx, y: 0 });
        }
      },
      onPanResponderRelease: (_, gesture) => {
        const maxSlide = BUTTON_WIDTH - SLIDER_WIDTH - 10;
        const threshold = maxSlide * 0.8; // 80% of the way

        if (gesture.dx >= threshold) {
          // Complete the slide
          Animated.spring(pan, {
            toValue: { x: maxSlide, y: 0 },
            useNativeDriver: false,
          }).start(() => {
            setIsSliderComplete(true);
            handleContinue();
          });
        } else {
          // Reset to start
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
        pan.flattenOffset();
      },
    })
  ).current;

  const handleContinue = () => {
    // Navigate to chat or next screen
    console.log("Continue to chat");
  };

  // Loading Stage
  if (analysisStage === 'loading') {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4b8f8b" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DocWise Analysis</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Processing Stage */}
      {analysisStage === 'processing' && (
        <>
          <View style={styles.processingContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="medical" size={32} color="#4b8f8b" />
            </View>
            <Text style={styles.processingTitle}>Processing image</Text>
            
            {/* Skeleton Loading */}
            <View style={styles.skeletonContainer}>
              <View style={[styles.skeleton, styles.skeletonLong]} />
              <View style={[styles.skeleton, styles.skeletonMedium]} />
              <View style={[styles.skeleton, styles.skeletonShort]} />
            </View>
          </View>

          <View style={styles.disclaimer}>
            <Text style={styles.disclaimerText}>
              DocWise Guidance is based on your current prescription and may not replace medical advice.
            </Text>
          </View>
        </>
      )}

      {/* Results Stage */}
      {analysisStage === 'results' && (
        <>
          <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Summary Section */}
            <View style={styles.summaryHeader}>
              <Ionicons name="document-text" size={24} color="#4b8f8b" />
              <Text style={styles.summaryTitle}>Summary</Text>
            </View>

            {isLoadingContent ? (
              // Skeleton Loading for Summary
              <View style={styles.contentSkeleton}>
                <View style={[styles.skeleton, styles.skeletonLine]} />
                <View style={[styles.skeleton, styles.skeletonLine]} />
                <View style={[styles.skeleton, styles.skeletonLineShort]} />
              </View>
            ) : (
              <Text style={styles.summaryText}>
                I've analyzed your prescription and found available medicines across pharmacies, along with prices and how to take them.
              </Text>
            )}

            {/* Pharmacy Card */}
            {!isLoadingContent && (
              <View style={styles.pharmacyCard}>
                <View style={styles.pharmacyHeader}>
                  <View style={styles.pharmacyBadge}>
                    <Ionicons name="medical" size={16} color="#4b8f8b" />
                  </View>
                  <Text style={styles.pharmacyName}>PharmEasy</Text>
                </View>

                {/* Prescribed Med */}
                <View style={styles.medSection}>
                  <Text style={styles.medLabel}>Prescribed Med</Text>
                  <Text style={styles.medName}>Ibuprofen 200 mg</Text>
                </View>

                {/* Medicine Card */}
                <View style={styles.medicineCard}>
                  <Image
                    source={{ uri: "https://via.placeholder.com/60x60" }}
                    style={styles.medicineImage}
                  />
                  <View style={styles.medicineInfo}>
                    <Text style={styles.medicineName}>
                      Brufen 200mg Strip Of 15 Tablets
                    </Text>
                    <View style={styles.priceRow}>
                      <Text style={styles.priceOriginal}>₹11.3</Text>
                      <Text style={styles.priceDiscounted}>₹10.73</Text>
                    </View>
                  </View>
                </View>

                {/* Total */}
                <Text style={styles.totalText}>
                  Your PharmEasy total comes to ₹100
                </Text>
              </View>
            )}

            {/* Instructions */}
            {!isLoadingContent && (
              <Text style={styles.instructions}>
                Take Brufen 200mg three times a day for 7 days.
              </Text>
            )}

            {/* Set Reminders Button */}
            {!isLoadingContent && (
              <TouchableOpacity style={styles.reminderButton}>
                <Ionicons name="flash" size={20} color="#000" />
                <Text style={styles.reminderText}>Set reminders for these medicines</Text>
              </TouchableOpacity>
            )}

            <View style={{ height: 150 }} />
          </ScrollView>

          {/* Bottom Chat Button */}
          {!isLoadingContent && (
            <View style={styles.bottomContainer}>
              <View style={styles.sliderContainer}>
                <Text style={styles.sliderText}>
                  {isSliderComplete ? "Opening chat..." : "Doubts? Slide to continue chatting"}
                </Text>
                <Animated.View
                  style={[
                    styles.slider,
                    {
                      transform: [{ translateX: pan.x }],
                    },
                  ]}
                  {...panResponder.panHandlers}
                >
                  <Ionicons name="arrow-forward" size={24} color="#fff" />
                </Animated.View>
              </View>

              <Text style={styles.bottomDisclaimer}>
                DocWise Guidance is based on your current prescription and may not replace medical advice.
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },

  backBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },

  processingContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E8F5F3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  processingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 24,
  },

  skeletonContainer: {
    gap: 12,
  },

  skeleton: {
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
    height: 12,
  },

  skeletonLong: {
    width: "100%",
  },

  skeletonMedium: {
    width: "80%",
  },

  skeletonShort: {
    width: "60%",
  },

  skeletonLine: {
    width: "100%",
    marginBottom: 8,
  },

  skeletonLineShort: {
    width: "70%",
  },

  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
  },

  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 20,
    marginBottom: 16,
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },

  contentSkeleton: {
    marginBottom: 24,
  },

  summaryText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#374151",
    marginBottom: 24,
  },

  pharmacyCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    marginBottom: 16,
  },

  pharmacyHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },

  pharmacyBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E8F5F3",
    justifyContent: "center",
    alignItems: "center",
  },

  pharmacyName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  medSection: {
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },

  medLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },

  medName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },

  medicineCard: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 12,
    gap: 12,
    marginBottom: 12,
  },

  medicineImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
  },

  medicineInfo: {
    flex: 1,
    justifyContent: "center",
  },

  medicineName: {
    fontSize: 14,
    color: "#111827",
    marginBottom: 6,
    lineHeight: 18,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  priceOriginal: {
    fontSize: 14,
    color: "#9CA3AF",
    textDecorationLine: "line-through",
  },

  priceDiscounted: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  totalText: {
    fontSize: 14,
    color: "#374151",
  },

  instructions: {
    fontSize: 15,
    color: "#374151",
    marginBottom: 16,
    lineHeight: 22,
  },

  reminderButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9FAFB",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 8,
  },

  reminderText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111827",
  },

  bottomContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },

  sliderContainer: {
    position: "relative",
    height: 60,
    backgroundColor: "#F9FAFB",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    overflow: "hidden",
  },

  sliderText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#6B7280",
    zIndex: 1,
  },

  slider: {
    position: "absolute",
    left: 5,
    width: SLIDER_WIDTH,
    height: 50,
    backgroundColor: "#4b8f8b",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  disclaimer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  disclaimerText: {
    fontSize: 11,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 16,
  },

  bottomDisclaimer: {
    fontSize: 11,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 16,
  },
});