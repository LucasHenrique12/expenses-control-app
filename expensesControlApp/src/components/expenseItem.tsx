import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


interface ExpenseProps {
  title: string;
  amount: number;
  parcelas: number;
  type: 'cartao' | 'dinheiro';
}

const ExpenseItem: React.FC<ExpenseProps> = ({ title, amount, parcelas, type }) => {
  const emoji = type === 'cartao' ? '💳' : '💵';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{emoji} {title}</Text>
      <Text style={styles.amount}>R$ {amount.toFixed(2)}</Text>
      <Text style={styles.parcelas}>{parcelas > 1 ? `Parcelado em ${parcelas}x` : 'À vista'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  amount: { fontSize: 14, color: 'green' },
  parcelas: { fontSize: 12, color: 'gray' },
});

export default ExpenseItem;
