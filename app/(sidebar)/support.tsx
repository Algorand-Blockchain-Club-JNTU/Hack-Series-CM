"use client"

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { useNavigation } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import { useSafeAreaInsets } from "react-native-safe-area-context"

// 🎨 Centralized colors
const COLORS = {
  bg: ["#000000", "#121212"],
  card: ["#141414", "#1E1E1E"],
  userGuide: ["#4a00e0", "#8e2de2"],
  liveChat: ["#00b09b", "#96c93d"],
  email: ["#ff9966", "#ff5e62"],
  video: ["#6a11cb", "#2575fc"],
  button: ["#6a11cb", "#2575fc"],
}

const supportOptions = [
  { title: "User Guide", icon: "document-text", colors: COLORS.userGuide },
  { title: "Live Chat", icon: "chatbubble-ellipses", colors: COLORS.liveChat },
  { title: "Email Support", icon: "mail", colors: COLORS.email },
  { title: "Video Tutorials", icon: "videocam", colors: COLORS.video },
]

const faqs = [
  {
    question: "How do I manage my consent preferences?",
    answer:
      "You can manage your consent preferences by navigating to the Consents tab and selecting the specific consent you wish to modify. From there, you can update your preferences or revoke consent entirely.",
  },
  {
    question: "How secure is my data in the app?",
    answer:
      "We use industry-standard encryption and security protocols to protect your data. All information is stored securely and is only accessible to authorized parties with your explicit consent.",
  },
  {
    question: "Can I download my consent history?",
    answer:
      "Yes, you can download your complete consent history by going to the Documents tab and selecting 'Export Consent History'.",
  },
  {
    question: "How do I delete my account?",
    answer:
      "To delete your account, go to Settings > Privacy Settings > Delete Account. Please note this action is irreversible.",
  },
  {
    question: "What happens when a consent expires?",
    answer:
      "When a consent is about to expire, you'll receive a notification prompting you to review and renew it if desired. If no action is taken, it will automatically expire.",
  },
]

// 🔹 Support option card
function SupportOptionCard({ title, icon, colors }: { title: string; icon: any; colors: string[] }) {
  return (
    <TouchableOpacity style={styles.supportOptionCard}>
      <LinearGradient colors={COLORS.card} style={styles.supportOptionCardGradient}>
        <LinearGradient colors={colors} style={styles.supportOptionIcon}>
          <Ionicons name={icon} size={24} color="#FFF" />
        </LinearGradient>
        <Text style={styles.supportOptionText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

// 🔹 FAQ item
function FaqItem({
  faq,
  isExpanded,
  onToggle,
}: {
  faq: { question: string; answer: string }
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <TouchableOpacity style={styles.faqItem} onPress={onToggle}>
      <LinearGradient colors={COLORS.card} style={styles.faqItemGradient}>
        <View style={styles.faqHeader}>
          <Text style={styles.faqQuestion}>{faq.question}</Text>
          <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={20} color="#FFF" />
        </View>
        {isExpanded && <Text style={styles.faqAnswer}>{faq.answer}</Text>}
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default function Support() {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <LinearGradient colors={COLORS.bg} style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { marginTop: insets.top }]}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu-outline" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Support</Text>
        <View style={styles.rightPlaceholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Search */}
        <View style={styles.searchContainer}>
          <LinearGradient colors={COLORS.card} style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color="#AAA" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for help..."
              placeholderTextColor="#777"
              value={searchQuery}
              onChangeText={setSearchQuery}
              selectionColor="#FFF"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#AAA" />
              </TouchableOpacity>
            )}
          </LinearGradient>
        </View>

        {/* Support options */}
        <View style={styles.supportOptionsContainer}>
          <Text style={styles.sectionTitle}>How can we help you?</Text>
          <View style={styles.supportOptionsGrid}>
            {supportOptions.map((opt, idx) => (
              <SupportOptionCard key={idx} {...opt} />
            ))}
          </View>
        </View>

        {/* FAQs */}
        <View style={styles.faqContainer}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <FaqItem
                key={index}
                faq={faq}
                isExpanded={expandedFaq === index}
                onToggle={() => setExpandedFaq(expandedFaq === index ? null : index)}
              />
            ))
          ) : (
            <LinearGradient colors={COLORS.card} style={styles.noResultsContainer}>
              <Ionicons name="search-outline" size={40} color="#777" />
              <Text style={styles.noResultsText}>No results found</Text>
              <Text style={styles.noResultsSubtext}>
                Try different keywords or contact our support team
              </Text>
            </LinearGradient>
          )}
        </View>

        {/* Contact support button */}
        <View style={styles.contactSupportContainer}>
          <TouchableOpacity
            style={styles.contactSupportButtonContainer}
            onPress={() => navigation.navigate("(sidebar)/contact" as never)}
          >
            <LinearGradient colors={COLORS.button} style={styles.contactSupportButton}>
              <Text style={styles.contactSupportText}>Contact Support Team</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  menuButton: { width: 40, height: 40, justifyContent: "center", alignItems: "center" },
  headerTitle: { fontSize: 20, fontFamily: "Poppins-Bold", color: "#FFF" },
  rightPlaceholder: { width: 40 },
  scrollView: { flex: 1, paddingTop: 20 },

  // 🔍 Search
  searchContainer: { paddingHorizontal: 20, marginBottom: 25 },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontFamily: "Poppins-Regular", fontSize: 14, color: "#FFF" },

  // 🆘 Support options
  supportOptionsContainer: { paddingHorizontal: 20, marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontFamily: "Poppins-Bold", marginBottom: 15, color: "#FFF" },
  supportOptionsGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  supportOptionCard: {
    width: "48%",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
      android: { elevation: 3 },
    }),
  },
  supportOptionCardGradient: { padding: 15, alignItems: "center" },
  supportOptionIcon: {
    width: 50, height: 50, borderRadius: 25, justifyContent: "center", alignItems: "center", marginBottom: 10,
  },
  supportOptionText: { fontSize: 14, fontFamily: "Poppins-Medium", textAlign: "center", color: "#FFF" },

  // ❓ FAQ
  faqContainer: { paddingHorizontal: 20, marginBottom: 30 },
  faqItem: {
    borderRadius: 12,
    marginBottom: 10,
    overflow: "hidden",
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
      android: { elevation: 3 },
    }),
  },
  faqItemGradient: { padding: 15 },
  faqHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  faqQuestion: { fontSize: 16, fontFamily: "Poppins-Medium", flex: 1, marginRight: 10, color: "#FFF" },
  faqAnswer: { fontSize: 14, fontFamily: "Poppins-Regular", lineHeight: 22, marginTop: 15, color: "#AAA" },

  // 🔎 No results
  noResultsContainer: { padding: 30, borderRadius: 12, alignItems: "center" },
  noResultsText: { fontSize: 18, fontFamily: "Poppins-Medium", marginTop: 15, marginBottom: 5, color: "#FFF" },
  noResultsSubtext: { fontSize: 14, fontFamily: "Poppins-Regular", textAlign: "center", color: "#AAA" },

  // 📞 Contact support
  contactSupportContainer: { paddingHorizontal: 20, marginBottom: 40 },
  contactSupportButtonContainer: { borderRadius: 8, overflow: "hidden" },
  contactSupportButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", height: 50 },
  contactSupportText: { fontSize: 16, fontFamily: "Poppins-Medium", marginRight: 10, color: "#FFF" },
})
