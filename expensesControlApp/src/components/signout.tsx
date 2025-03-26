import { useAuth } from "@clerk/clerk-expo";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function LogoutButton() {
  const { signOut } = useAuth();

  return (
    <TouchableOpacity style={styles.button} onPress={() => signOut()}>
      <Text style={styles.buttonText}>Sair</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
