import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";


export default function AboutScreen() {
  const router = useRouter();
  const handleScan = () => {
    router.push("/Scancam");
  };
  

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.profileRow}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=47" }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.name}>Emma Stone</Text>
          </View>
        </View>

        <View style={styles.headerActions}>
        <TouchableOpacity style={styles.scanBtn} onPress={handleScan}>
        <Ionicons name="scan-outline" size={18} color="#fff" />
            <Text style={styles.scanText}>Scan</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="sparkles-outline" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* SOFTWARE INFORMATION */}
      <Text style={styles.sectionTitle}>Software Information</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableLabel}>Version</Text>
          <Text style={styles.tableValue}>0.0.1</Text>
        </View>
        <View style={[styles.tableRow, styles.tableRowLast]}>
          <Text style={styles.tableLabel}>Platform</Text>
          <Text style={styles.tableValue}>Android</Text>
        </View>
      </View>

      {/* DATA STORAGE POLICY */}
      <Text style={styles.sectionTitle}>Data Storage Policy</Text>
      <View style={styles.policyCard}>
        <Text style={styles.policyText}>
          DocWise processes your prescription data using external AI services to
          provide features such as prescription understanding, medicine guidance,
          and scheduling. The processed data may be stored securely in our
          database to support ongoing features like reminders and history. You
          remain in full control of your data and can delete it at any time by
          going to your account settings and selecting "Delete My Data," after
          which your data will be permanently removed from our systems. Please
          note that while DocWise does not use your data to train AI models, we
          are not responsible for how external AI (LLM) providers may process or
          retain data according to their own policies. DocWise does not sell your
          personal data and uses it only to deliver app functionality.
        </Text>
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },

  greeting: {
    color: "#6b7280",
    fontSize: 13,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  scanBtn: {
    flexDirection: "row",
    backgroundColor: "#4b8f8b",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
    gap: 6,
  },

  scanText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },

  iconBtn: {
    backgroundColor: "#f3f4f6",
    padding: 8,
    borderRadius: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginTop: 22,
    marginBottom: 10,
  },

  table: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
  },

  tableRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },

  tableRowLast: {
    borderBottomWidth: 0,
  },

  tableLabel: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },

  tableValue: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },

  policyCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  policyText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#374151",
  },

  bottomSpacer: {
    height: 100,
  },
});