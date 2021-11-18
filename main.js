//Objeto que guarda os métodos de abrir e fechar a modal, utilizando o atributo onclick no HTML
const Modal = {
  open(){
    document.querySelector('[data-modal]').classList.add('active')
  },
  close(){
    document.querySelector('[data-modal]').classList.remove('active')
  }
}
const Utils = {//Pequenas funções de controle e tratamento de dados da aplicação
  clearFields() {//Limpa os campos do modal após ser submetido;
    const formInputs = document.querySelectorAll('.form-data input')
    formInputs.forEach((input) => {
    input.value = "";
    })
    const radioIncome = document.querySelector('input#income')
    radioIncome.checked = true;
  },

  transformCurrency(amount) { //Transforma o valor capturado no input e transforma em formato de dinheiro
    amount = Number(amount).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
    })
    return amount;
  },

  transformDate(date) {//Altera a visualização da data para o formato BR
    const updatedDate = date.split("-")
    date = `${updatedDate[2]}/${updatedDate[1]}/${updatedDate[0]}`
    return date
  },

  typeOfTransaction() {//Verifica o tipo da operação, se é Entrada ou Saída através dos radio buttons
    const operation = document.querySelector('input#income')
    if (operation.checked) {
      return operation.id //Retorna "income"
    } else {
      return "expense"
    }
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
      type: Utils.typeOfTransaction(),
    }
    transactions.push(transaction)
    innerTransaction()
    Balance.updateBalance(transaction)
    Utils.clearFields()
    Modal.close()
  }
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
      <td class="table-body-value ${transaction.type}">${Utils.transformCurrency(transaction.amount)}</td>
      <td class="table-body-date">${Utils.transformDate(transaction.date)}</td>
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
  updateBalance(transaction) {//Atualiza os valores do balanço, verificando tipo da transação
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
  updateTotal() {//Calcula o total do balanço e aplica a classe no container dependendo do resultado (negativo ou positivo)
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
  Balance.cardIncome.textContent = Utils.transformCurrency(Balance.incomes)
  Balance.cardExpense.textContent = Utils.transformCurrency(Balance.expenses)
  Balance.cardTotal.textContent = Utils.transformCurrency(Balance.updateTotal())
}
innerBalanceValues()//Neste momento, os valores vão estar zerados