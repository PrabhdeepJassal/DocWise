import { Ionicons } from "@expo/vector-icons";

import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";



const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
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
        <TouchableOpacity 
        style={styles.scanBtn}
        onPress={() => router.push('/Scancam')}
      >
        <Ionicons name="scan-outline" size={18} color="#fff" />
        <Text style={styles.scanText}>Scan</Text>
      </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="sparkles-outline" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* DATE */}
      <Text style={styles.date}>Fri, 26 Dec</Text>

      {/* WEEKLY STATS */}
      <TouchableOpacity style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Your Weekly Stats</Text>
        <Ionicons name="chevron-forward" size={18} />
      </TouchableOpacity>

      <View style={styles.weekCard}>
        {["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"].map((day, i) => (
          <View key={i} style={styles.dayItem}>
            <View style={styles.circle} />
            <Text style={styles.dayText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* UPCOMING REMINDERS */}
      <Text style={styles.sectionTitle}>Upcoming Reminders</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>No reminders yet</Text>
      </View>

      {/* TODAY SUMMARY */}
      <Text style={styles.sectionTitle}>Today’s Summary</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>
          You’re all caught up for today
        </Text>
      </View>
    </View>
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

  date: {
    marginTop: 20,
    color: "#6b7280",
    fontSize: 13,
  },

  sectionHeader: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginTop: 22,
    marginBottom: 10,
  },

  weekCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  dayItem: {
    alignItems: "center",
    gap: 6,
  },

  circle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: "#9ca3af",
  },

  dayText: {
    fontSize: 12,
    color: "#6b7280",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 8,
  },

  cardText: {
    color: "#6b7280",
    fontSize: 14,
  },
});
