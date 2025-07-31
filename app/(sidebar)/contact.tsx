"use client"

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { useNavigation } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const DARK_BG = ["#000000", "#121212"]
const FIELD_GRADIENT = ["#141414", "#1E1E1E"]
const EMAIL_GRADIENT = ["#4a00e0", "#8e2de2"]
const PHONE_GRADIENT = ["#00b09b", "#96c93d"]
const LOCATION_GRADIENT = ["#ff9966", "#ff5e62"]
const SUBMIT_GRADIENT = ["#6a11cb", "#2575fc"]

export default function Contact() {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (!name || !email || !message) {
      Alert.alert("Missing Fields", "Please fill in all required fields.")
      return
    }

    // Future submission logic (e.g., API call)
    Alert.alert("Message Sent", "We'll get back to you soon!")
    setName("")
    setEmail("")
    setSubject("")
    setMessage("")
  }

  return (
    <LinearGradient colors={DARK_BG} style={styles.container}>
      <View style={[styles.header, { marginTop: insets.top }]}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Us</Text>
        <View style={styles.rightPlaceholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.contactInfo}>
          <Text style={styles.contactTitle}>Get in Touch</Text>
          <Text style={styles.contactDescription}>
            Have questions or need assistance? Fill out the form below and our team will get back to you as soon as
            possible.
          </Text>
        </View>

        <View style={styles.formContainer}>
          {[
            { label: "Name", icon: "person-outline", value: name, setValue: setName, placeholder: "Your Name" },
            {
              label: "Email",
              icon: "mail-outline",
              value: email,
              setValue: setEmail,
              placeholder: "Your Email",
              keyboardType: "email-address",
            },
            {
              label: "Subject",
              icon: "help-circle-outline",
              value: subject,
              setValue: setSubject,
              placeholder: "Subject",
            },
          ].map(({ label, icon, value, setValue, placeholder, keyboardType }, idx) => (
            <View style={styles.inputGroup} key={idx}>
              <Text style={styles.inputLabel}>{label}</Text>
              <LinearGradient colors={FIELD_GRADIENT} style={styles.inputContainer}>
                <Ionicons name={icon as any} size={20} color="#AAAAAA" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder={placeholder}
                  placeholderTextColor="#777777"
                  value={value}
                  onChangeText={setValue}
                  selectionColor="#FFFFFF"
                  keyboardType={keyboardType || "default"}
                />
              </LinearGradient>
            </View>
          ))}

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Message</Text>
            <LinearGradient colors={FIELD_GRADIENT} style={styles.textareaContainer}>
              <TextInput
                style={styles.textarea}
                placeholder="Your Message"
                placeholderTextColor="#777777"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                value={message}
                onChangeText={setMessage}
                selectionColor="#FFFFFF"
              />
            </LinearGradient>
          </View>

          <TouchableOpacity style={styles.submitButtonContainer} onPress={handleSend}>
            <LinearGradient colors={SUBMIT_GRADIENT} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Send Message</Text>
              <Ionicons name="send" size={18} color="#FFFFFF" style={styles.submitButtonIcon} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.contactMethodsContainer}>
          <Text style={styles.contactMethodsTitle}>Other Ways to Reach Us</Text>

          {[
            {
              icon: "mail",
              label: "Email",
              value: "support@consentmanager.com",
              gradient: EMAIL_GRADIENT,
            },
            {
              icon: "call",
              label: "Phone",
              value: "+1 (555) 123-4567",
              gradient: PHONE_GRADIENT,
            },
            {
              icon: "location",
              label: "Address",
              value: "123 Privacy Street, Security Building, Suite 456, Data City, DC 10101",
              gradient: LOCATION_GRADIENT,
            },
          ].map(({ icon, label, value, gradient }, idx) => (
            <View style={styles.contactMethodCard} key={idx}>
              <LinearGradient colors={FIELD_GRADIENT} style={styles.contactMethodCardGradient}>
                <LinearGradient colors={gradient} style={styles.contactMethodIcon}>
                  <Ionicons name={icon as any} size={24} color="#FFFFFF" />
                </LinearGradient>
                <View style={styles.contactMethodInfo}>
                  <Text style={styles.contactMethodLabel}>{label}</Text>
                  <Text style={styles.contactMethodValue}>{value}</Text>
                </View>
              </LinearGradient>
            </View>
          ))}
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
    borderBottomColor: "#333333",
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
  },
  rightPlaceholder: { width: 40 },
  scrollView: { flex: 1, paddingTop: 20 },
  contactInfo: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  contactTitle: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    marginBottom: 10,
    color: "#FFFFFF",
  },
  contactDescription: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    lineHeight: 22,
    color: "#AAAAAA",
  },
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    marginBottom: 8,
    color: "#FFFFFF",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#FFFFFF",
  },
  textareaContainer: {
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  textarea: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    height: 120,
    color: "#FFFFFF",
  },
  submitButtonContainer: {
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 10,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#FFFFFF",
  },
  submitButtonIcon: {
    marginLeft: 10,
  },
  contactMethodsContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  contactMethodsTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    marginBottom: 15,
    color: "#FFFFFF",
  },
  contactMethodCard: {
    borderRadius: 12,
    marginBottom: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  contactMethodCardGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  contactMethodIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  contactMethodInfo: {
    flex: 1,
  },
  contactMethodLabel: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    marginBottom: 5,
    color: "#FFFFFF",
  },
  contactMethodValue: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#AAAAAA",
  },
})
