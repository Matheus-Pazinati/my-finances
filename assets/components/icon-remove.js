import { removeTransaction } from "./remove-transaction.js"

export function listenIconRemove() {
  const iconRemove = document.querySelectorAll('.table-icon-remove img')
  iconRemove.forEach((icon) => {
    icon.addEventListener('click', (event) => {
      const transactionRemove = event.target.id
      removeTransaction(transactionRemove)
    })
  })
}