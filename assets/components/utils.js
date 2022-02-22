export const Modal = {
  open(){
    document.querySelector('[data-modal]').classList.add('active')
  },
  close(){
    document.querySelector('[data-modal]').classList.remove('active')
  }
}

export const Utils = {//Pequenas funções de controle e tratamento de dados da aplicação
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