"use client"

import { Drawer } from "expo-router/drawer"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { useFonts } from "expo-font"
import {
  Text,
  ActivityIndicator,
  View,
  StyleSheet,
  Animated,
  Pressable,
} from "react-native"
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { DrawerContentScrollView } from "@react-navigation/drawer"
import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useRef, useState } from "react"
import * as Haptics from "expo-haptics"

function CustomDrawerItem({ label, icon, isActive, onPress }) {
  const scaleAnim = useRef(new Animated.Value(1)).current

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      friction: 5,
      tension: 100,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 100,
      useNativeDriver: true,
    }).start()
  }

  const handlePress = () => {
    Haptics.selectionAsync()
    onPress()
  }

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.customDrawerItem,
          isActive && styles.activeDrawerItem,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <LinearGradient
          colors={isActive ? ["#2A2A2A", "#333333"] : ["transparent", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.itemGradient, isActive && styles.activeItemGradient]}
        >
          <View style={styles.iconContainer}>{icon}</View>
          <Text
            style={[styles.drawerItemLabel, isActive && styles.activeDrawerItemLabel]}
          >
            {label}
          </Text>
          {isActive && <View style={styles.activeIndicator} />}
        </LinearGradient>
      </Animated.View>
    </Pressable>
  )
}

function CustomDrawerContent(props) {
  const [activeRoute, setActiveRoute] = useState("(tabs)")

  useEffect(() => {
    if (props.state && props.state.routes) {
      const currentRouteName = props.state.routes[props.state.index]?.name
      setActiveRoute(currentRouteName)
    }
  }, [props.state])

  const drawerItems = [
    {
      name: "(tabs)",
      label: "Dashboard",
      icon: (color) => <FontAwesome5 name="th-large" size={18} color={color} />,
    },
    {
      name: "(sidebar)/dao-proposal",
      label: "DAO Proposal",
      icon: (color) => <FontAwesome5 name="vote-yea" size={18} color={color} />,
    },
    {
      name: "(sidebar)/settings",
      label: "Settings",
      icon: (color) => <Ionicons name="settings-outline" size={20} color={color} />,
    },
    {
      name: "(sidebar)/wallet-settings",
      label: "Wallet Settings",
      icon: (color) => <Ionicons name="wallet-outline" size={20} color={color} />,
    },
    {
      name: "(sidebar)/contact",
      label: "Contact",
      icon: (color) => <Ionicons name="mail-outline" size={20} color={color} />,
    },
    {
      name: "(sidebar)/support",
      label: "Support",
      icon: (color) => <Ionicons name="help-circle-outline" size={20} color={color} />,
    },
  ]

  return (
    <View style={styles.drawerContainer}>
      <LinearGradient colors={["#121212", "#000000"]} style={styles.drawerGradient}>
        <View style={styles.drawerHeader}>
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={["#333", "#222"]}
              style={styles.logoBackground}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <MaterialCommunityIcons name="shield-check" size={28} color="#FFFFFF" />
            </LinearGradient>
          </View>
          <Text style={styles.drawerTitle}>Consent Manager</Text>
          <Text style={styles.drawerSubtitle}>Secure • Private • Trusted</Text>
        </View>

        <View style={styles.divider} />

        <DrawerContentScrollView
          {...props}
          style={styles.drawerScrollView}
          contentContainerStyle={styles.drawerContentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.drawerItemsContainer}>
            {drawerItems.map((item) => (
              <CustomDrawerItem
                key={item.name}
                label={item.label}
                icon={item.icon(activeRoute === item.name ? "#FFFFFF" : "#AAAAAA")}
                isActive={activeRoute === item.name}
                onPress={() => {
                  if (activeRoute !== item.name) {
                    props.navigation.navigate(item.name)
                  }
                }}
              />
            ))}
          </View>
        </DrawerContentScrollView>

        <View style={styles.drawerFooter}>
          <LinearGradient
            colors={["rgba(18, 18, 18, 0.8)", "rgba(0, 0, 0, 0.9)"]}
            style={styles.footerGradient}
          >
            <Pressable style={styles.logoutButton}>
              <Ionicons name="log-out-outline" size={20} color="#FF5555" />
              <Text style={styles.logoutText}>Disconnect</Text>
            </Pressable>
            <Text style={styles.versionText}>v1.2.0</Text>
          </LinearGradient>
        </View>
      </LinearGradient>
    </View>
  )
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  })

  if (fontError) {
    console.error("Font loading error:", fontError)
    return null
  }

  if (!fontsLoaded) {
    return (
      <SafeAreaProvider>
        <StatusBar style="light" />
        <LinearGradient colors={["#000000", "#121212"]} style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Loading...</Text>
        </LinearGradient>
      </SafeAreaProvider>
    )
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerShown: false,
            drawerStyle: {
              backgroundColor: "transparent",
              width: 300,
            },
            drawerType: "front",
            overlayColor: "rgba(0, 0, 0, 0.7)",
            sceneContainerStyle: {
              backgroundColor: "#000000",
            },
          }}
        >
          {[
            "(tabs)",
            "(sidebar)/dao-proposal",
            "(sidebar)/settings",
            "(sidebar)/wallet-settings",
            "(sidebar)/contact",
            "(sidebar)/support",
            "(onboarding)",
            "index",
            "+not-found",
          ].map((name) => (
            <Drawer.Screen
              key={name}
              name={name}
              options={{ drawerItemStyle: { display: "none" } }}
            />
          ))}
        </Drawer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  // ...unchanged from your original code
})
