import * as products from './products/selectors'
import * as order from './order/selectors'
import * as orders from './orders/selectors'
import * as client from './client/selectors'
import * as clients from './clients/selectors'
import * as history from './history/selectors'
import * as printer from './printer/selectors'
import * as account from './account/selectors'
import * as accounts from './accounts/selectors'
import * as transactions from './transactions/selectors'

// export all selectors as modules
export default {
  ...products,
  ...order,
  ...orders,
  ...client,
  ...clients,
  ...history,
  ...printer,
  ...account,
  ...accounts,
  ...transactions
}
