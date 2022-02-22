export function updateTotal(input, output) {//Calcula o total do balanço e aplica a classe no container dependendo do resultado (negativo ou positivo)
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