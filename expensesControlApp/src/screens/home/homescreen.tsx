import React, { useEffect, useState } from "react";
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
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "@/src/db/schema";
import { expensesTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import uuid from "react-native-uuid";

const ExpensesScreen: React.FC = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const [expensesList, setExpensesList] = useState<
    (typeof expensesTable.$inferSelect)[]
  >([]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [parcelas, setParcelas] = useState("");
  const [type, setType] = useState<"cartao" | "dinheiro">("cartao");
  const [modalVisible, setModalVisible] = useState(false);

  const fetchExpenses = async () => {
    const result = await drizzleDb.select().from(expensesTable);
    setExpensesList(result);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = async () => {
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

    try {
      await drizzleDb.insert(expensesTable).values({
        id: uuid.v4().toString(),
        title: title.trim(),
        amount: parsedAmount,
        parcelas: parsedParcelas,
        type,
      });

      await fetchExpenses();
      setTitle("");
      setAmount("");
      setParcelas("");
      Keyboard.dismiss();
      setModalVisible(false);
    } catch (err) {
      showAlert("Erro", "Não foi possível salvar o gasto.");
      console.error(err);
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      await drizzleDb.delete(expensesTable).where(eq(expensesTable.id, id));
      fetchExpenses();
      showAlert("Sucesso", "Gasto removido com sucesso.");
    } catch (error) {
      console.error("Erro ao deletar:", error);
      showAlert("Erro", "Não foi possível deletar o gasto.");
    }
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

      <FlashList
        data={expensesList}
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={80}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <View style={{ flex: 1 }}>
              <ExpenseItem
                title={item.title}
                amount={item.amount}
                parcelas={item.parcelas}
                type={item.type}
              />
            </View>
            <TouchableOpacity
              onPress={() => deleteExpense(item.id)}
              style={styles.trashButton}
            >
              <Text style={styles.trashIcon}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  trashButton: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  trashIcon: {
    fontSize: 18,
    color: "red",
  },
});

export default ExpensesScreen;
