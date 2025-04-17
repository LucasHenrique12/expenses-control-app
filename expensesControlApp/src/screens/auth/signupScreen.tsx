import * as React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      await signUp.create({ emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
      Alert.alert("Código enviado!", "Verifique seu e-mail para continuar.");
    } catch (err) {
      Alert.alert("Erro ao cadastrar", "Verifique os dados e tente novamente.");
    }
    setLoading(false);
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        Alert.alert("Cadastro concluído!", "Você foi autenticado com sucesso.");
        router.replace("/");
      } else {
        Alert.alert("Erro na verificação", "Código inválido. Tente novamente.");
      }
    } catch (err) {
      Alert.alert(
        "Erro na verificação",
        "Verifique o código e tente novamente."
      );
    }
    setLoading(false);
  };

  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Verifique seu e-mail</Text>
        <TextInput
          style={styles.input}
          value={code}
          placeholder="Digite o código"
          onChangeText={setCode}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={onVerifyPress}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Verificando..." : "Confirmar"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar conta</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Digite seu e-mail"
        onChangeText={setEmailAddress}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Digite sua senha"
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={onSignUpPress}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Criando conta..." : "Continuar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007bff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
