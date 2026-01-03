import { Ionicons } from "@expo/vector-icons";
import { Camera, CameraView } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ScanPrescriptionScreen() {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedBounds, setDetectedBounds] = useState<any>(null);
  const cameraRef = useRef<any>(null);
  const pulseAnimation = useRef(new Animated.Value(0)).current;

  // Animation values for scanning effect
  const scanAnimation = useRef(new Animated.Value(0)).current;
  const cornerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (!capturedImage) {
      // Scanning line animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scanAnimation, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Corner pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(cornerAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(cornerAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [capturedImage]);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        setIsProcessing(true);
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
        });
        setCapturedImage(photo.uri);
        processImage(photo.uri);
      } catch (error) {
        Alert.alert("Error", "Failed to capture image");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.8,
      });

      if (!result.canceled) {
        setCapturedImage(result.assets[0].uri);
        processImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const processImage = async (imageUri: string) => {
    setIsProcessing(true);
    
    try {
      // Simulate AI object detection
      setTimeout(() => {
        const bounds = {
          x: 10,
          y: 15,
          width: 80,
          height: 70,
        };
        
        setDetectedBounds(bounds);
        setIsProcessing(false);
        
        // Start pulsing animation
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnimation, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnimation, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
          ])
        ).start();
        
        // Navigate to analysis after detection
        setTimeout(() => {
          router.push({
            pathname: "/Docwise-analysis",
            params: { imageUri },
          });
        }, 2000);
        
      }, 1500);
      
    } catch (error) {
      console.error("Error processing image:", error);
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    router.back();
  };

  const handleDelete = () => {
    setCapturedImage(null);
    setDetectedBounds(null);
    pulseAnimation.setValue(0);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.noPermissionText}>No access to camera</Text>
      </View>
    );
  }

  const scanLinePosition = scanAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300],
  });

  const cornerScale = cornerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1],
  });

  const outlineOpacity = pulseAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1],
  });

  const outlineScale = pulseAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.98, 1],
  });

  return (
    <View style={styles.container}>
      {/* Header Buttons */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={handleClose}>
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>

        {capturedImage && (
          <TouchableOpacity style={styles.headerBtn} onPress={handleDelete}>
            <Ionicons name="trash-outline" size={24} color="#000" />
          </TouchableOpacity>
        )}
      </View>

      {/* Camera or Captured Image */}
      <View style={styles.cameraContainer}>
        {!capturedImage ? (
          <>
            <CameraView style={styles.camera} ref={cameraRef} facing="back">
              {/* Scanning Frame with corners */}
              <View style={styles.scanFrame}>
                {/* Top Left Corner */}
                <Animated.View
                  style={[
                    styles.corner,
                    styles.cornerTL,
                    { transform: [{ scale: cornerScale }] },
                  ]}
                />
                {/* Top Right Corner */}
                <Animated.View
                  style={[
                    styles.corner,
                    styles.cornerTR,
                    { transform: [{ scale: cornerScale }] },
                  ]}
                />
                {/* Bottom Left Corner */}
                <Animated.View
                  style={[
                    styles.corner,
                    styles.cornerBL,
                    { transform: [{ scale: cornerScale }] },
                  ]}
                />
                {/* Bottom Right Corner */}
                <Animated.View
                  style={[
                    styles.corner,
                    styles.cornerBR,
                    { transform: [{ scale: cornerScale }] },
                  ]}
                />

                {/* Scanning Line */}
                <Animated.View
                  style={[
                    styles.scanLine,
                    {
                      transform: [{ translateY: scanLinePosition }],
                    },
                  ]}
                />
              </View>
            </CameraView>
          </>
        ) : (
          <View style={styles.previewContainer}>
            <Image source={{ uri: capturedImage }} style={styles.preview} />
            
            {/* Processing Overlay */}
            {isProcessing && (
              <View style={styles.processingOverlay}>
                <View style={styles.processingBox}>
                  <Text style={styles.processingText}>Detecting...</Text>
                </View>
              </View>
            )}
            
            {/* AI Detection frame overlay with animation */}
            {detectedBounds && !isProcessing && (
              <Animated.View
                style={[
                  styles.detectionFrame,
                  {
                    left: `${detectedBounds.x}%`,
                    top: `${detectedBounds.y}%`,
                    width: `${detectedBounds.width}%`,
                    height: `${detectedBounds.height}%`,
                    opacity: outlineOpacity,
                    transform: [{ scale: outlineScale }],
                  },
                ]}
              >
                {/* Animated corners */}
                <Animated.View style={[styles.detectedCorner, styles.detectedCornerTL]} />
                <Animated.View style={[styles.detectedCorner, styles.detectedCornerTR]} />
                <Animated.View style={[styles.detectedCorner, styles.detectedCornerBL]} />
                <Animated.View style={[styles.detectedCorner, styles.detectedCornerBR]} />
                
                {/* Outline border */}
                <View style={styles.outlineBorder} />
                
                {/* Detection label */}
                <View style={styles.detectionLabel}>
                  <Text style={styles.detectionLabelText}>Prescription Detected</Text>
                </View>
              </Animated.View>
            )}
          </View>
        )}
      </View>

      {/* Upload Button */}
      <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
        <Ionicons name="image-outline" size={20} color="#000" />
        <Text style={styles.uploadText}>Upload from gallery</Text>
      </TouchableOpacity>

      {/* Bottom Info Card */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Scan or upload a prescription</Text>
        <Text style={styles.infoDescription}>
          Please upload only medical prescriptions. Avoid sharing personal or
          financial documents.
        </Text>
      </View>

      {/* Capture Button */}
      {!capturedImage && (
        <TouchableOpacity
          style={styles.captureBtn}
          onPress={takePicture}
          disabled={isProcessing}
        >
          <View style={styles.captureBtnInner} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  header: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    zIndex: 10,
  },

  headerBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  cameraContainer: {
    flex: 1,
    marginTop: 120,
    marginBottom: 280,
    marginHorizontal: 20,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#8B7A7A",
  },

  camera: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  scanFrame: {
    width: 280,
    height: 360,
    position: "relative",
  },

  corner: {
    position: "absolute",
    width: 40,
    height: 40,
    borderColor: "#4b8f8b",
    borderWidth: 4,
  },

  cornerTL: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 8,
  },

  cornerTR: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 8,
  },

  cornerBL: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
  },

  cornerBR: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 8,
  },

  scanLine: {
    width: "100%",
    height: 2,
    backgroundColor: "#4b8f8b",
    shadowColor: "#4b8f8b",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },

  previewContainer: {
    flex: 1,
    position: "relative",
  },

  preview: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  detectionFrame: {
    position: "absolute",
    borderWidth: 3,
    borderColor: "#4b8f8b",
    borderRadius: 12,
  },

  detectedCorner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: "#4b8f8b",
    borderWidth: 4,
  },

  detectedCornerTL: {
    top: -2,
    left: -2,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 12,
  },

  detectedCornerTR: {
    top: -2,
    right: -2,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 12,
  },

  detectedCornerBL: {
    bottom: -2,
    left: -2,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
  },

  detectedCornerBR: {
    bottom: -2,
    right: -2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 12,
  },

  outlineBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: "#4b8f8b",
    borderRadius: 12,
    borderStyle: "dashed",
  },

  detectionLabel: {
    position: "absolute",
    top: -30,
    left: 0,
    backgroundColor: "#4b8f8b",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  detectionLabelText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  processingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  processingBox: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },

  processingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  uploadBtn: {
    position: "absolute",
    bottom: 230,
    left: 20,
    right: 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  uploadText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },

  infoCard: {
    position: "absolute",
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
  },

  infoTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
  },

  infoDescription: {
    fontSize: 13,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
  },

  captureBtn: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    marginLeft: -35,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  captureBtnInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4b8f8b",
  },

  noPermissionText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});