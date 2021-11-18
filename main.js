//Objeto que guarda os métodos de abrir e fechar a modal, utilizando o atributo onclick no HTML
const Modal = {
  open(){
    document.querySelector('[data-modal]').classList.add('active')
  },
  close(){
    document.querySelector('[data-modal]').classList.remove('active')
  }
}

function typeOfTransaction() { //Verifica o tipo da operação, se é Entrada ou Saída através dos radio buttons
  const operation = document.querySelector('input#income')
  if (operation.checked) {
    return operation.id //Retorna "income"
  } else {
    return "expense"
  }
}
const transactions = [];
const Form = {
  submit(event) {
    event.preventDefault()
    let transaction = {
      description: document.querySelector('input#description').value,
      amount: document.querySelector('input#value').value,
      date: document.querySelector('input#date').value,
      type: typeOfTransaction(),
    }
    transactions.push(transaction)
    innerTransaction()
    Balance.updateBalance(transaction)
    clearFields()
    Modal.close()
  }
}
function clearFields(){//Limpa os campos do form após serem submetidos
  const formInputs = document.querySelectorAll('.form-data input')
  formInputs.forEach((input) => {
    input.value = "";
  })
  const radioIncome = document.querySelector('input#income')
  radioIncome.checked = true;
}

function transformCurrency(amount) { //Transforma o valor capturado no input e transforma em formato de dinheiro
  amount = Number(amount).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
  return amount;
}

function transformDate(date) {//Altera a visualização da data para o formato BR
  const updatedDate = date.split("-")
  date = `${updatedDate[2]}/${updatedDate[1]}/${updatedDate[0]}`
  return date
}

function removeTransaction(index) {//Remove a linha da transação quando o botão de excluir for clicado
  let allTransactions = [...transactions]
  let removedTransaction = allTransactions[index]
  if (removedTransaction.type == "income"){
    Balance.incomes -= removedTransaction.amount
  } else {
    Balance.expenses -= removedTransaction.amount
  }
  innerBalanceValues()
  let rowTransaction = document.querySelector(`[data-index="${index}"]`)
  rowTransaction.remove()
}

function innerTransaction() {
  let body = document.querySelector('[data-table-body]')
  let tr = document.createElement('tr')
  transactions.forEach((transaction, index) => {
    tr.dataset.index = index;
    tr.innerHTML = `<td class="table-body-description">${transaction.description}</td>
      <td class="table-body-value ${transaction.type}">${transformCurrency(transaction.amount)}</td>
      <td class="table-body-date">${transformDate(transaction.date)}</td>
      <td class="table-icon-remove"><img onclick="removeTransaction(${index})" src="./assets/images/minus.svg" alt="Ícone de remover"></td>`;
    }
  )
  body.appendChild(tr)
}

let Balance = {
  incomes: 0,
  expenses: 0,
  cardIncome: document.querySelector('[data-card-income]'),
  cardExpense: document.querySelector('[data-card-expense]'),
  cardTotal: document.querySelector('[data-card-total]'),
  updateBalance(transaction) {
    if (transaction.type == "income") {
      Balance.updateIncomes(Number(transaction.amount))
    } else {
      Balance.updateExpenses(Number(transaction.amount))
    }
    innerBalanceValues()
  },
  updateIncomes(value) {
    Balance.incomes += value;
  },
  updateExpenses(value) {
    Balance.expenses += value;
  },
  updateTotal() {
    const containerTotal = Balance.cardTotal.parentElement
    const total =  Balance.incomes - Balance.expenses
    if (total < 0 ) {
      containerTotal.classList.remove('balance-card-positive')
      containerTotal.classList.add('balance-card-negative')
    } else {
      containerTotal.classList.remove('balance-card-negative')
      containerTotal.classList.add('balance-card-positive')
    }
    return total;
  }
}
function innerBalanceValues() { //Função para inserir no HTML os valores do balanço
  Balance.cardIncome.textContent = transformCurrency(Balance.incomes)
  Balance.cardExpense.textContent = transformCurrency(Balance.expenses)
  Balance.cardTotal.textContent = transformCurrency(Balance.updateTotal())
}
innerBalanceValues()//Neste momento, os valores vão estar zerados