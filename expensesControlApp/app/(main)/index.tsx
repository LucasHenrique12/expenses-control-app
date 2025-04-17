import Example from "@/src/components/signout";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, Redirect } from "expo-router";
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function Page() {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <SignedIn>
        <Redirect href={"/(main)/code"} />
      </SignedIn>
      <SignedOut>
        <Text style={styles.title}>Faça login ou crie uma conta</Text>
        <TouchableOpacity style={styles.button}>
          <Link href="/(auth)/signIn" asChild>
            <Text style={styles.buttonText}>Entrar</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.signUpButton]}>
          <Link href="/(auth)/signUp" asChild>
            <Text style={[styles.buttonText, styles.signUpText]}>
              Cadastrar
            </Text>
          </Link>
        </TouchableOpacity>
      </SignedOut>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#222",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  signUpText: {
    color: "#007AFF",
  },
});
