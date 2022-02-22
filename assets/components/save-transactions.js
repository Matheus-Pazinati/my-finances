import { Utils } from "./utils.js";

export function setLocalStorage() {
  const description = document.querySelector('input#description').value;
  const amount = document.querySelector('input#value').value;
  const date = Utils.transformDate(document.querySelector('input#date').value);
  const type = Utils.typeOfTransaction();

  const transaction = {
      description,
      amount,
      date,
      type
  }

  const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || []
  const allTransactions = [
    ...savedTransactions,
    transaction
]
  localStorage.setItem('transactions', JSON.stringify(allTransactions))
}