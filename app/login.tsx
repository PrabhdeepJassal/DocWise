import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";


const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const [secure, setSecure] = useState(true);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* TOP IMAGE */}
      <Image
        source={require("../assets/auth/toplog.png")}
        style={styles.topImage}
      />

      {/* CENTER CONTENT */}
      <View style={styles.center}>
        {/* LOGO IMAGE */}
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Welcome Back</Text>

        {/* EMAIL */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#6b7280" />
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#9ca3af"
            style={styles.input}
          />
        </View>

        {/* PASSWORD */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#6b7280" />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#9ca3af"
            secureTextEntry={secure}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Ionicons
              name={secure ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#6b7280"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.forgot}>Forgot your password ?</Text>

        <TouchableOpacity
  style={styles.button}
  onPress={() => router.replace("/(tabs)")}
>
  <Text style={styles.buttonText}>Sign in</Text>
</TouchableOpacity>


        <View style={styles.footer}>
          <Text style={styles.footerText}>Don’t have account? </Text>
          <Text style={styles.create}>Create Account</Text>
        </View>
      </View>

      {/* BOTTOM IMAGE */}
      <Image
        source={require("../assets/auth/botlog.png")}
        style={styles.bottomImage}
      />
    </KeyboardAvoidingView>
  );
}const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  /* Decorative Images */
  topImage: {
    width: width,
    height: height * 0.11,
  },

  bottomImage: {
    width: width,
    height: height * 0.10,
  },

  /* Center Area */
  center: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: width * 0.07,
  },

  /* Logo */
  logo: {
    width: width * 0.80,
    height: width * 0.18,
    alignSelf: "center",
    marginBottom: 24,
  },

  title: {
    fontSize: width * 0.065,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 28,
    color: "#111827",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginBottom: 16,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#111827",
  },

  forgot: {
    textAlign: "right",
    color: "#6b7280",
    marginBottom: 28,
    fontSize: 14,
  },

  button: {
    backgroundColor: "#374f4f",
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: "center",
    marginBottom: 28,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
  },

  footerText: {
    color: "#6b7280",
    fontSize: 14,
  },

  create: {
    color: "#3f8f8b",
    fontWeight: "600",
    fontSize: 14,
  },
});
