"use client"

import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Ionicons, FontAwesome5 } from "@expo/vector-icons"
import { useState } from "react"
import { useNavigation } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const SettingNavItem = ({ icon, label, subtext, gradient }: any) => (
  <TouchableOpacity style={styles.settingItem}>
    <LinearGradient colors={["#141414", "#1E1E1E"]} style={styles.settingItemGradient}>
      <View style={styles.settingInfo}>
        <LinearGradient colors={gradient} style={styles.settingIconContainer}>
          <Ionicons name={icon} size={22} color="#FFFFFF" />
        </LinearGradient>
        <View>
          <Text style={styles.settingText}>{label}</Text>
          {subtext && <Text style={styles.settingSubtext}>{subtext}</Text>}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#777777" />
    </LinearGradient>
  </TouchableOpacity>
)

export default function WalletSettings() {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const [walletAddress] = useState("0x71C7656EC7ab88b098defB751B7401B5f6d8976F")

  const sections = [
    {
      title: "Security",
      items: [
        { icon: "key-outline", label: "Export Private Key", gradient: ["#4a00e0", "#8e2de2"] },
        { icon: "document-text-outline", label: "Backup Seed Phrase", gradient: ["#00b09b", "#96c93d"] },
        { icon: "lock-closed-outline", label: "Change PIN", gradient: ["#ff9966", "#ff5e62"] },
      ],
    },
    {
      title: "Network",
      items: [
        { icon: "globe-outline", label: "Network", subtext: "Ethereum Mainnet", gradient: ["#6a11cb", "#2575fc"] },
        { icon: "speedometer-outline", label: "Gas Settings", subtext: "Standard", gradient: ["#4a00e0", "#8e2de2"] },
      ],
    },
    {
      title: "Advanced",
      items: [
        { icon: "trash-outline", label: "Clear Cache", gradient: ["#00b09b", "#96c93d"] },
        { icon: "alert-circle-outline", label: "Reset Wallet", gradient: ["#ff9966", "#ff5e62"] },
      ],
    },
  ]

  return (
    <LinearGradient colors={["#000000", "#121212"]} style={styles.container}>
      <View style={[styles.header, { marginTop: insets.top }]}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wallet Settings</Text>
        <View style={styles.rightPlaceholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.walletCard}>
          <LinearGradient colors={["#141414", "#1E1E1E"]} style={styles.walletCardContent}>
            <View style={styles.walletHeader}>
              <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.walletIconContainer}>
                <FontAwesome5 name="ethereum" size={24} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.walletTitle}>Ethereum Wallet</Text>
            </View>

            <View style={styles.walletAddressContainer}>
              <Text style={styles.walletAddressLabel}>Wallet Address</Text>
              <View style={styles.walletAddressRow}>
                <Text style={styles.walletAddress}>
                  {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
                </Text>
                <TouchableOpacity style={styles.copyButton}>
                  <Ionicons name="copy-outline" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.walletActions}>
              <TouchableOpacity style={styles.walletActionButtonContainer}>
                <LinearGradient colors={["#4a00e0", "#8e2de2"]} style={styles.walletActionButton}>
                  <Ionicons name="swap-horizontal" size={20} color="#FFFFFF" />
                  <Text style={styles.walletActionText}>Transfer</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.walletActionButtonContainer}>
                <LinearGradient colors={["#00b09b", "#96c93d"]} style={styles.walletActionButton}>
                  <Ionicons name="qr-code" size={20} color="#FFFFFF" />
                  <Text style={styles.walletActionText}>Show QR</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {sections.map((section, idx) => (
          <View style={styles.section} key={idx}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, i) => (
              <SettingNavItem key={i} {...item} />
            ))}
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  )
}
