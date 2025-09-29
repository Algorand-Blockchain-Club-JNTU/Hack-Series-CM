"use client"

import { useState, memo } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from "react-native"
import { MaterialIcons, AntDesign } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"

const consentData = [
  {
    id: "1",
    title: "Medical Data Sharing",
    organization: "City Hospital",
    status: "active",
    date: "15 Mar 2023",
  },
  {
    id: "2",
    title: "Research Participation",
    organization: "Health Research Institute",
    status: "pending",
    date: "22 Apr 2023",
  },
  {
    id: "3",
    title: "Marketing Communications",
    organization: "Wellness Products Inc.",
    status: "declined",
    date: "10 Jan 2023",
  },
  {
    id: "4",
    title: "Data Processing Agreement",
    organization: "Health Insurance Co.",
    status: "active",
    date: "05 Feb 2023",
  },
  {
    id: "5",
    title: "Clinical Trial Participation",
    organization: "Medical Research Center",
    status: "active",
    date: "18 May 2023",
  },
]

const STATUS_STYLES = {
  active: { gradient: ["#00c6ff", "#0072ff"], text: "#FFFFFF" },
  pending: { gradient: ["#ff9966", "#ff5e62"], text: "#FFFFFF" },
  declined: { gradient: ["#fc4a1a", "#f7b733"], text: "#FFFFFF" },
  default: { gradient: ["#141414", "#333333"], text: "#AAAAAA" },
}

const FILTERS = [
  { key: "all", label: "All", gradient: ["#6a11cb", "#2575fc"] },
  { key: "active", label: "Active", gradient: ["#00c6ff", "#0072ff"] },
  { key: "pending", label: "Pending", gradient: ["#ff9966", "#ff5e62"] },
  { key: "declined", label: "Declined", gradient: ["#fc4a1a", "#f7b733"] },
]

function StatusBadge({ status }: { status: string }) {
  const { gradient, text } = STATUS_STYLES[status as keyof typeof STATUS_STYLES] || STATUS_STYLES.default
  return (
    <LinearGradient colors={gradient} style={styles.statusBadge}>
      <Text style={[styles.statusText, { color: text }]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Text>
    </LinearGradient>
  )
}

const ConsentItem = memo(({ item }: { item: (typeof consentData)[0] }) => (
  <TouchableOpacity style={styles.consentCard} activeOpacity={0.8}>
    <LinearGradient colors={["#141414", "#1E1E1E"]} style={styles.consentCardGradient}>
      <View style={styles.consentHeader}>
        <Text style={styles.consentTitle}>{item.title}</Text>
        <StatusBadge status={item.status} />
      </View>
      <Text style={styles.organizationText}>{item.organization}</Text>
      <View style={styles.consentFooter}>
        <Text style={styles.dateText}>Created: {item.date}</Text>
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>Details</Text>
          <MaterialIcons name="arrow-forward-ios" size={14} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  </TouchableOpacity>
))

export default function Consents() {
  const [activeFilter, setActiveFilter] = useState("all")

  const filteredData = activeFilter === "all" ? consentData : consentData.filter((item) => item.status === activeFilter)

  return (
    <LinearGradient colors={["#000000", "#121212"]} style={styles.container}>
      {/* Filters */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {FILTERS.map((f) =>
