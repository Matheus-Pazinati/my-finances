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
const form = document.querySelector('.modal-form')
form.addEventListener('submit', (event) => {
  event.preventDefault()
  setLocalStorage()
  innerTransaction()
  calculateValues()
  Utils.clearFields()
  Modal.close()
})

function setLocalStorage() {
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

function calculateValues() {
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

  function updateTotal(input, output) {//Calcula o total do balanço e aplica a classe no container dependendo do resultado (negativo ou positivo)
    const cardTotal = document.querySelector('[data-card-total]');
    const containerTotal = cardTotal.parentElement
    const total =  input - output
    if (total < 0 ) {
      containerTotal.classList.remove('balance-card-positive')
      containerTotal.classList.add('balance-card-negative')
    } else {
      containerTotal.classList.remove('balance-card-negative')
      containerTotal.classList.add('balance-card-positive')
    }
    return total;
  }
  
  function innerTransaction() {
    let body = document.querySelector('[data-table-body]')
    body.innerHTML = ""
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || []
    savedTransactions.forEach((transaction, id) => {
      body.appendChild(Transaction(transaction, id))
    }) 
  }

  function Transaction({description, amount, date, type}, id) {
    let tr = document.createElement('tr')
    const content = `<td class="table-body-description">${description}</td>
    <td class="table-body-value ${type}">${Utils.transformCurrency(amount)}</td>
    <td class="table-body-date">${date}</td>
    <td class="table-icon-remove"><img onclick="removeTransaction(${id})" src="./assets/images/minus.svg" alt="Ícone de remover"></td>`;
    tr.innerHTML = content
    return tr
  }

  function removeTransaction(id) {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || []
    savedTransactions.splice(id, 1)
    localStorage.setItem('transactions', JSON.stringify(savedTransactions))
    innerTransaction()
    calculateValues()
  }

  innerTransaction()
  calculateValues()