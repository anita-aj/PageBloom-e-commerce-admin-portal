// Revenue = the money from every order that was not cancelled
export const revenueOf = (orders) => // a function that takes a list of orders
  orders
    .filter((o) => o.status !== "Cancelled") // keep only the orders that are not cancelled
    .reduce((sum, o) => sum + o.total, 0); // add their totals together, starting from 0