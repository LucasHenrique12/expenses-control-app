import * as Crypto from "expo-crypto";

interface TExpenseAttr {
  id: string;
  title: string;
  amount: number;
  parcelas: number;
  type: "cartao" | "dinheiro";
}
const emptyExpense: TExpenseAttr = {
  id: "",
  title: "",
  amount: 0,
  parcelas: 0,
  type: "cartao",
};

export class expenses implements TExpenseAttr {
  private _data: TExpenseAttr = emptyExpense;

  constructor(
    title?: string,
    amount?: number,
    parcelas?: number,
    type?: "cartao" | "dinheiro"
  ) {
    this._data.id = Crypto.randomUUID();
    this._data.title = title ?? "";
    this._data.amount = amount ?? 0;
    this._data.parcelas = parcelas ?? 0;
    this._data.type = type ?? "cartao";
  }

  get id() {
    return this._data.id;
  }

  get title() {
    return this._data.title;
  }
  set title(s: string) {
    this._data.title = s;
  }

  get amount() {
    return this._data.amount;
  }
  set amount(value: number) {
    this._data.amount = value;
  }

  get parcelas() {
    return this._data.parcelas;
  }
  set parcelas(value: number) {
    this._data.parcelas = value;
  }

  get type() {
    return this._data.type;
  }
  set type(t: "cartao" | "dinheiro") {
    this._data.type = t;
  }

  get data(): TExpenseAttr {
    return this._data;
  }

  get datacpy(): TExpenseAttr {
    return { ...this._data };
  }
}
