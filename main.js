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
    return operation.id
  } else {
    return "expense"
  }
}

const transactions = new Array()
const Form = {
  transactions: transactions,
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
    Modal.close()
  }
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

function innerTransaction() {
  let tr = document.createElement('tr')
  let body = document.querySelector('[data-table-body]')
  transactions.forEach((transaction, index) => {
    tr.innerHTML = `<td class="table-body-description">${transaction.description}</td>
      <td class="table-body-value ${transaction.type}">${transformCurrency(transaction.amount)}</td>
      <td class="table-body-date">${transformDate(transaction.date)}</td>
      <td class="table-icon-remove"><img src="./assets/images/minus.svg" alt="Ícone de remover"></td>`
    }
  )
  body.appendChild(tr)
}

