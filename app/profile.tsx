import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Account</Text>
      </View>

      {/* AVATAR */}
      <Image
        source={{ uri: "https://i.pravatar.cc/300?img=47" }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Emma Stone</Text>

      {/* SETTINGS */}
      <View style={styles.settings}>
        <SettingItem icon="color-palette-outline" label="Color Scheme" value="Light" />
        <SettingItem icon="lock-closed-outline" label="Change Password" />
        <SettingItem icon="language-outline" label="Language" />
        <SettingItem icon="chatbubble-outline" label="Feedback" />
        <SettingItem
          icon="trash-outline"
          label="Delete my data"
          danger
        />
      </View>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* FOOTER */}
      <Text style={styles.footer}>
        Made with ❤️ by team{"\n"}RUBBER DUCKY MAFIA © 2026
      </Text>
    </View>
  );
}

function SettingItem({ icon, label, value, danger }: any) {
  return (
    <TouchableOpacity style={styles.settingRow}>
      <Ionicons
        name={icon}
        size={20}
        color={danger ? "#ef4444" : "#374151"}
      />
      <Text style={[styles.settingText, danger && { color: "#ef4444" }]}>
        {label}
      </Text>
      {value && <Text style={styles.value}>{value}</Text>}
      {!danger && <Ionicons name="chevron-forward" size={18} />}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignSelf: "center",
    marginVertical: 12,
  },

  name: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
  },

  settings: {
    backgroundColor: "#f9fafb",
    borderRadius: 14,
    padding: 6,
  },

  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 12,
  },

  settingText: {
    flex: 1,
    fontSize: 14,
  },

  value: {
    color: "#6b7280",
    marginRight: 6,
  },

  logoutBtn: {
    backgroundColor: "#374151",
    padding: 16,
    borderRadius: 999,
    alignItems: "center",
    marginVertical: 24,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "600",
  },

  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#6b7280",
  },
});
