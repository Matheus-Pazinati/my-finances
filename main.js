//Objeto que guarda os métodos de abrir e fechar a modal, utilizando o atributo onclick no HTML
const Modal = {
  open(){
    document.querySelector('[data-modal]').classList.add('active')
  },
  close(){
    document.querySelector('[data-modal]').classList.remove('active')
  }
}