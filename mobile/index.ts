import view from "./view"
import { Text } from "lucide-react"
import { View, StyleSheet } from "react-native"

export default function IndexPage() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Home</Text>
      </View>                                   
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
})
