import { innerTransaction } from "./inner-transaction.js"
import { calculateValues } from "./inner-values.js"

export function removeTransaction(id) {
  const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || []
  savedTransactions.splice(id, 1)
  localStorage.setItem('transactions', JSON.stringify(savedTransactions))
  innerTransaction()
  calculateValues()
}