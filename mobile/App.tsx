import { View, Text, StyleSheet, Pressable } from "react-native"
import { ExpoRoot } from "expo-router"
import { useState } from "react"

export default function App() {
  const [enterApp, setEnterApp] = useState(false)

  if (enterApp) {
    return <ExpoRoot />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RoomFinder</Text>
      <Text style={styles.subtitle}>
        Find rooms. Faster. Smarter.
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => setEnterApp(true)}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#cbd5f5",
    marginBottom: 32,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#6366f1",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
})
