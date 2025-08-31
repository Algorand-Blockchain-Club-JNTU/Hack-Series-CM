"use client"

import { Redirect } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useRef, useState } from "react"
import { ActivityIndicator, Animated, Easing, StyleSheet } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

export default function Index() {
  const [isReady, setIsReady] = useState(false)
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false)
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    let isMounted = true

    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem("onboardingComplete")
        if (isMounted) {
          setIsOnboardingComplete(value === "true")
        }
      } catch (error) {
        console.error("Error checking onboarding:", error)
      } finally {
        if (isMounted) setIsReady(true)
      }
    }

    checkOnboarding()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start()
  }, [opacity])

  if (!isReady) {
    return (
      <LinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]} style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </LinearGradient>
    )
  }

  if (isOnboardingComplete) {
    return <Redirect href="/home" />
  }

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <LinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]} style={styles.container}>
        {/* Your onboarding content here */}
      </LinearGradient>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
