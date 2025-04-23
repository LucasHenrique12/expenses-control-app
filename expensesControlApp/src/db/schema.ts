import { expenses } from "./../model/expense";
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const DATABASE_NAME = "lab3db";
export const TABLENAME_EXPENSE = "expense";

export const expensesTable = sqliteTable(TABLENAME_EXPENSE, {
  id: text().primaryKey(),
  title: text().notNull(),
  amount: real().notNull(), // Valor com casas decimais
  parcelas: integer().notNull(), // Número de parcelas
  type: text({ enum: ["cartao", "dinheiro"] }).notNull(), // Enumeração de tipo
});

export type expensesTable = typeof expensesTable.$inferSelect;
