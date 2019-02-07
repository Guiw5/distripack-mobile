import * as products from './products/actions'
import * as order from './order/actions'
import * as orders from './orders/actions'
import * as client from './client/actions'
import * as clients from './clients/actions'
import * as history from './history/actions'
import * as printer from './printer/actions'

// export all actions as modules
export default {
  ...products,
  ...order,
  ...orders,
  ...client,
  ...clients,
  ...history,
  ...printer
}
