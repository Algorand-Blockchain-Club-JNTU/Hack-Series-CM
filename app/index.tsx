"use client"

import { Redirect } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, Animated, Easing, StyleSheet } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

export default function Index() {
  const [isLoading, setIsLoading] = useState(true)
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false)
  const opacity = new Animated.Value(0)

  const fadeIn = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start()
  }, [])

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const onboardingComplete = await AsyncStorage.getItem("onboardingComplete")
        setIsOnboardingComplete(onboardingComplete === "true")
      } catch (error) {
        console.error("❌ Error checking onboarding status:", error)
        setIsOnboardingComplete(false)
      } finally {
        setIsLoading(false)
        fadeIn()
      }
    }

    checkOnboarding()
  }, [fadeIn])

  if (isLoading) {
    return (
      <LinearGradient
        colors={["#1f005c", "#5b0060", "#870160"]}
        style={styles.container}
      >
        <Animated.View style={[styles.content, { opacity }]}>
          <ActivityIndicator size="large" color="#ffffff" />
        </Animated.View>
      </LinearGradient>
    )
  }

  return isOnboardingComplete ? <Redirect href="/(tabs)" /> : <Redirect href="/(onboarding)" />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
})
