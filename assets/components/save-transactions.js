import { Utils } from "./utils.js";
import { orderDates } from "./order-dates.js";

export function setLocalStorage() {
  const description = document.querySelector('input#description').value;
  const amount = document.querySelector('input#value').value;
  const date = document.querySelector('input#date').value;
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

  orderDates(allTransactions)

  localStorage.setItem('transactions', JSON.stringify(allTransactions))
}