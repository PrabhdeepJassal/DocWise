import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function MedicationScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [reminderEnabled, setReminderEnabled] = useState(true);

  const medications = [
    {
      id: 1,
      name: "Brufen 200mg",
      image: "https://via.placeholder.com/60x60",
      dose: "Dose: 1 Tablet",
      time: "02:00 PM",
    },
    // Add more medications here as needed
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
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

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#6b7280"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Medications List */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {medications.map((med) => (
          <View key={med.id} style={styles.medicationCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.medicationName}>{med.name}</Text>
            </View>

            <View style={styles.cardBody}>
              <Image source={{ uri: med.image }} style={styles.medicineImage} />
              <View style={styles.medicineDetails}>
                <Text style={styles.doseText}>{med.dose}</Text>
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{med.time}</Text>
              </View>
            </View>

            <View style={styles.cardFooter}>
              <Text style={styles.reminderLabel}>Activate Reminders</Text>
              <Switch
                value={reminderEnabled}
                onValueChange={setReminderEnabled}
                trackColor={{ false: "#E5E7EB", true: "#A7D9D4" }}
                thumbColor={reminderEnabled ? "#4b8f8b" : "#f4f3f4"}
              />
            </View>
          </View>
        ))}

        {medications.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="medical-outline" size={64} color="#E5E7EB" />
            <Text style={styles.emptyStateText}>No medications yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Scan a prescription to add medications
            </Text>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
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
    marginBottom: 20,
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

  searchContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  searchIcon: {
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },

  searchButton: {
    width: 48,
    height: 48,
    backgroundColor: "#3B5563",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  scrollView: {
    flex: 1,
  },

  medicationCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  cardHeader: {
    marginBottom: 12,
  },

  medicationName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  cardBody: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },

  medicineImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },

  medicineDetails: {
    flex: 1,
  },

  doseText: {
    fontSize: 14,
    color: "#6B7280",
  },

  timeContainer: {
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },

  timeText: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },

  reminderLabel: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
  },

  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },

  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#9CA3AF",
    marginTop: 16,
  },

  emptyStateSubtext: {
    fontSize: 14,
    color: "#D1D5DB",
    marginTop: 8,
  },
});