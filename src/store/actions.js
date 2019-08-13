import * as products from './products/actions'
import * as order from './order/actions'
import * as orders from './orders/actions'
import * as client from './client/actions'
import * as clients from './clients/actions'
import * as history from './history/actions'
import * as printer from './printer/actions'
import * as account from './account/actions'
import * as transactions from './transactions/actions'
// export all actions as modules

export const initApp = () => dispatch => {
  Promise.all([
    dispatch(products.loadProducts()),
    dispatch(clients.fetchClients()),
    dispatch(orders.fetchRecentlyOrders())
  ])
}

export default {
  ...products,
  ...order,
  ...orders,
  ...client,
  ...clients,
  ...history,
  ...printer,
  ...account,
  ...transactions
}
