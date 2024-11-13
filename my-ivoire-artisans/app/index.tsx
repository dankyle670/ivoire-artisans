import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { darkGreen } from "./Constants";
import Btn from "./Btn";
import Background from "./Home_bg";

const Index = () => {
  const router = useRouter();

  return (
    <Background>
      <View style={styles.container}>
        {/* Button placed at the bottom-right */}
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => router.push("/Home")}
        >
          <Text style={styles.arrowText}>→</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative", // Allows absolute positioning of button
  },
  arrowButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: darkGreen,
    padding: 15,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    elevation: 5, // Optional: Adds shadow to the button
  },
  arrowText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Index;
