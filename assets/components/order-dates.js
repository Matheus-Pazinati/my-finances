export function orderDates(list) {
  list.sort((x,y) => {
      let a = new Date(x.date);
      let b = new Date(y.date);
      return a - b;
  })
}