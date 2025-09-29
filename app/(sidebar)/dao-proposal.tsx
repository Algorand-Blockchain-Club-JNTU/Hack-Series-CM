"use client"

import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const COLORS = {
  bg: ["#000000", "#121212"],
  activeBadge: ["#00c6ff", "#0072ff"],
  voteBtn: ["#6a11cb", "#2575fc"],
  stat1: ["#4a00e0", "#8e2de2"],
  stat2: ["#00b09b", "#96c93d"],
  cardBg: ["#141414", "#1E1E1E"],
  passedBadge: ["#333333", "#1a1a1a"],
}

function StatCard({ number, label, colors }: { number: string; label: string; colors: string[] }) {
  return (
    <View style={styles.statCard}>
      <LinearGradient colors={colors} style={styles.statCardGradient}>
        <Text style={styles.statNumber}>{number}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </LinearGradient>
    </View>
  )
}

function ProposalCard({
  title,
  description,
  info,
  status,
  statusColors,
  isPast = false,
}: {
  title: string
  description: string
  info: string
  status: string
  statusColors: string[]
  isPast?: boolean
}) {
  return (
    <TouchableOpacity style={styles.proposalCard}>
      <LinearGradient colors={COLORS.cardBg} style={styles.proposalCardGradient}>
        <View style={styles.proposalHeader}>
          <Text style={styles.proposalTitle}>{title}</Text>
          <LinearGradient colors={statusColors} style={styles.statusBadge}>
            <Text style={[styles.statusText, isPast && { color: "#777" }]}>{status}</Text>
          </LinearGradient>
        </View>

        <Text style={styles.proposalDescription}>{description}</Text>

        <View style={styles.proposalFooter}>
          <Text style={styles.proposalInfo}>{info}</Text>
          {isPast ? (
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>Details</Text>
              <MaterialIcons name="arrow-forward-ios" size={14} color="#FFFFFF" />
            </TouchableOpacity>
          ) : (
            <LinearGradient colors={COLORS.voteBtn} style={styles.voteButton}>
              <Text style={styles.voteButtonText}>Vote</Text>
            </LinearGradient>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default function DAOProposal
