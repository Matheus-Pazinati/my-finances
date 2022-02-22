import { Utils } from "./utils.js";

export function Transaction({description, amount, date, type}, id) {
  let tr = document.createElement('tr')
  const content = `<td class="table-body-description">${description}</td>
  <td class="table-body-value ${type}">${Utils.transformCurrency(amount)}</td>
  <td class="table-body-date">${date}</td>
  <td class="table-icon-remove"><img id="${id}"src="./assets/images/minus.svg" alt="Ícone de remover"></td>`;
  tr.innerHTML = content
  return tr
}