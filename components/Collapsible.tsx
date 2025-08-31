import { PropsWithChildren, useState, useRef, useEffect } from "react"
import { StyleSheet, Pressable, Animated, Easing } from "react-native"

import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { IconSymbol } from "@/components/ui/IconSymbol"
import { Colors } from "@/constants/Colors"
import { useColorScheme } from "@/hooks/useColorScheme"

type CollapsibleProps = PropsWithChildren & {
  title: string
  defaultOpen?: boolean
}

export function Collapsible({ children, title, defaultOpen = false }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const theme = useColorScheme() ?? "light"

  // animated rotation
  const rotation = useRef(new Animated.Value(defaultOpen ? 1 : 0)).current

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start()
  }, [isOpen, rotation])

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  })

  return (
    <ThemedView>
      <Pressable
        style={styles.heading}
        onPress={() => setIsOpen((prev) => !prev)}
        android_ripple={{ color: theme === "light" ? "#ddd" : "#444", borderless: false }}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <IconSymbol
            name="chevron.right"
            size={18}
            weight="medium"
            color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
          />
        </Animated.View>
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </Pressable>

      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
})
