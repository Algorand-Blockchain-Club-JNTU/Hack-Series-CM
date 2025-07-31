"use client"

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { useNavigation } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const SettingToggleItem = ({ icon, label, value, onValueChange, gradient }: any) => (
  <View style={styles.settingItem}>
    <LinearGradient colors={["#141414", "#1E1E1E"]} style={styles.settingItemGradient}>
      <View style={styles.settingInfo}>
        <LinearGradient colors={gradient} style={styles.settingIconContainer}>
          <Ionicons name={icon} size={22} color="#FFFFFF" />
        </LinearGradient>
        <Text style={styles.settingText}>{label}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#333333", true: "#6a11cb" }}
        thumbColor={value ? "#FFFFFF" : "#777777"}
      />
    </LinearGradient>
  </View>
)

const SettingNavItem = ({ icon, label, gradient }: any) => (
  <TouchableOpacity style={styles.settingItem}>
    <LinearGradient colors={["#141414", "#1E1E1E"]} style={styles.settingItemGradient}>
      <View style={styles.settingInfo}>
        <LinearGradient colors={gradient} style={styles.settingIconContainer}>
          <Ionicons name={icon} size={22} color="#FFFFFF" />
        </LinearGradient>
        <Text style={styles.settingText}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#777777" />
    </LinearGradient>
  </TouchableOpacity>
)

export default function Settings() {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

  const [notifications, setNotifications] = useState(true)
  const [biometrics, setBiometrics] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [dataSync, setDataSync] = useState(true)

  return (
    <LinearGradient colors={["#000000", "#121212"]} style={styles.container}>
      <View style={[styles.header, { marginTop: insets.top }]}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.rightPlaceholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* App Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Preferences</Text>

          <SettingToggleItem
            icon="notifications-outline"
            label="Notifications"
            value={notifications}
            onValueChange={setNotifications}
            gradient={["#4a00e0", "#8e2de2"]}
          />

          <SettingToggleItem
            icon="moon-outline"
            label="Dark Mode"
            value={darkMode}
            onValueChange={setDarkMode}
            gradient={["#00b09b", "#96c93d"]}
          />

          <SettingToggleItem
            icon="sync-outline"
            label="Data Synchronization"
            value={dataSync}
            onValueChange={setDataSync}
            gradient={["#ff9966", "#ff5e62"]}
          />
        </View>

        {/* Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>

          <SettingToggleItem
            icon="finger-print-outline"
            label="Biometric Authentication"
            value={biometrics}
            onValueChange={setBiometrics}
            gradient={["#6a11cb", "#2575fc"]}
          />

          <SettingNavItem
            icon="lock-closed-outline"
            label="Change Password"
            gradient={["#4a00e0", "#8e2de2"]}
          />

          <SettingNavItem
            icon="shield-checkmark-outline"
            label="Privacy Settings"
            gradient={["#00b09b", "#96c93d"]}
          />
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>

          <SettingNavItem
            icon="information-circle-outline"
            label="App Information"
            gradient={["#ff9966", "#ff5e62"]}
          />

          <SettingNavItem
            icon="document-text-outline"
            label="Terms of Service"
            gradient={["#6a11cb", "#2575fc"]}
          />

          <SettingNavItem
            icon="shield-outline"
            label="Privacy Policy"
            gradient={["#4a00e0", "#8e2de2"]}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  )
}
