import { Utils } from "./utils.js";
import { updateTotal } from "./calculate-total.js";

export function calculateValues() {
  let input = 0
  let output = 0
  const cardIncome = document.querySelector('[data-card-income]');
  const cardExpense = document.querySelector('[data-card-expense]');
  const cardTotal = document.querySelector('[data-card-total]');

  const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || []
  const listaData = [...savedTransactions]

  const income = listaData.filter((item) => {
    return item.type == 'income'
  })

  const expense = listaData.filter((item) => {
    return item.type == 'expense'
  })

  income.forEach((item) => {
    input += Number(item.amount)
  })
  expense.forEach((item) => {
    output += Number(item.amount)
  })
  cardIncome.textContent = Utils.transformCurrency(input)
  cardExpense.textContent = Utils.transformCurrency(output)
  cardTotal.textContent = Utils.transformCurrency(updateTotal(input, output))
}