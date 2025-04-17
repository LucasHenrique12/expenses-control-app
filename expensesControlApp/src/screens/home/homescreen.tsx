import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Keyboard,
  Modal,
  Platform,
  ToastAndroid,
  TouchableOpacity,
  Text,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import ExpenseItem from "@/src/components/expenseItem";
import { expenses } from "@/src/model";

const ExpensesScreen: React.FC = () => {
  const [expensesList, setExpensesList] = useState<
    InstanceType<typeof expenses>[]
  >([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [parcelas, setParcelas] = useState("");
  const [type, setType] = useState<"cartao" | "dinheiro">("cartao");
  const [modalVisible, setModalVisible] = useState(false);

  const addExpense = () => {
    if (!title.trim() || !amount || !parcelas) {
      showAlert("Erro", "Preencha todos os campos corretamente!");
      return;
    }

    const parsedAmount = parseFloat(amount.replace(",", "."));
    const parsedParcelas = parseInt(parcelas, 10);

    if (
      isNaN(parsedAmount) ||
      isNaN(parsedParcelas) ||
      parsedAmount <= 0 ||
      parsedParcelas <= 0
    ) {
      showAlert("Erro", "Insira valores válidos!");
      return;
    }

    const newExpense = new expenses(
      title.trim(),
      parsedAmount,
      parsedParcelas,
      type
    );

    setExpensesList((prev) => [...prev, newExpense]);

    setTitle("");
    setAmount("");
    setParcelas("");
    Keyboard.dismiss();
    setModalVisible(false);
  };

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert(title, message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Adicionar Gasto</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Novo Gasto</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome do gasto"
              value={title}
              onChangeText={setTitle}
              autoCapitalize="words"
              returnKeyType="done"
            />
            <TextInput
              style={styles.input}
              placeholder="Valor (R$)"
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
            />
            <TextInput
              style={styles.input}
              placeholder="Parcelas"
              keyboardType="number-pad"
              value={parcelas}
              onChangeText={setParcelas}
            />

            <View style={styles.buttonContainer}>
              <Button
                title="💳 Cartão"
                color={type === "cartao" ? "blue" : "gray"}
                onPress={() => setType("cartao")}
              />
              <Button
                title="💵 Dinheiro"
                color={type === "dinheiro" ? "blue" : "gray"}
                onPress={() => setType("dinheiro")}
              />
            </View>

            <View style={styles.modalButtons}>
              <Button
                title="Cancelar"
                color="red"
                onPress={() => setModalVisible(false)}
              />
              <Button title="Salvar" onPress={addExpense} />
            </View>
          </View>
        </View>
      </Modal>

      {/* Lista de gastos usando FlashList */}
      <FlashList
        data={expensesList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseItem
            title={item.title}
            amount={item.amount}
            parcelas={item.parcelas}
            type={item.type}
          />
        )}
        estimatedItemSize={80} // Tamanho estimado do item para melhor performance
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  addButton: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
});

export default ExpensesScreen;
