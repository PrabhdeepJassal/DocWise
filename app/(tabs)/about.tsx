import { View, Text, StyleSheet, Platform } from "react-native";
import Constants from "expo-constants";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Software Information</Text>

      <View style={styles.infoBox}>
        <View style={styles.row}>
          <Text style={styles.label}>Version</Text>
          <Text style={styles.value}>0.0.1</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Platform</Text>
          <Text style={styles.value}>
            {Platform.OS === "ios" ? "iOS" : "Android"}
          </Text>
        </View>
      </View>

      <Text style={styles.heading}>Data Storage Policy</Text>

      <View style={styles.policyBox}>
        <Text style={styles.policyText}>
          DocWise processes your prescription data using external AI services
          to provide features such as prescription understanding, medicine
          guidance, and scheduling. The processed data may be stored securely
          to support ongoing features like reminders and history.
          {"\n\n"}
          You remain in full control of your data and can delete it at any
          time by selecting “Delete My Data” from account settings.
          {"\n\n"}
          DocWise does not sell personal data and does not use it to train AI
          models.
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  heading: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#111827",
  },

  infoBox: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    marginBottom: 24,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },

  label: {
    color: "#6b7280",
  },

  value: {
    fontWeight: "500",
  },

  policyBox: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 16,
  },

  policyText: {
    fontSize: 13,
    color: "#374151",
    lineHeight: 20,
  },
});
