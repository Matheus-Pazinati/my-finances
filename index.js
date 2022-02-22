import { Modal } from "./assets/components/utils.js"
import { Utils } from "./assets/components/utils.js"
import { setLocalStorage } from "./assets/components/save-transactions.js"
import { calculateValues } from "./assets/components/inner-values.js"
import { innerTransaction } from "./assets/components/inner-transaction.js"

const buttonAddTransaction = document.querySelector('.new-transaction')
buttonAddTransaction.addEventListener('click', () => {
  Modal.open()
})
const buttonCancel = document.querySelector('.form-button-cancel')
buttonCancel.addEventListener('click', () => {
  Modal.close()
})

const form = document.querySelector('.modal-form')
form.addEventListener('submit', (event) => {
  event.preventDefault()
  setLocalStorage()
  innerTransaction()
  calculateValues()
  Utils.clearFields()
  Modal.close()
})

innerTransaction()
calculateValues()