"use client"

import { Redirect } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useRef, useState } from "react"
import { ActivityIndicator, Animated, Easing, StyleSheet } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

export default function Index() {
  const [isLoading, setIsLoading] = useState(true)
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false)
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem("onboardingComplete")
        setIsOnboardingComplete(value === "true")
      } catch (error) {
