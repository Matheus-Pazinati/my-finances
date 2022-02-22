import { Transaction } from "./transaction-row.js"
import { listenIconRemove } from "./icon-remove.js"

export function innerTransaction() {
  let body = document.querySelector('[data-table-body]')
  body.innerHTML = ""
  const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || []
  savedTransactions.forEach((transaction, id) => {
    body.appendChild(Transaction(transaction, id))
  })
  listenIconRemove()
}