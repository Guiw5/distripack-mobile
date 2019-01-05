import * as products from './products/actions'
import * as order from './order/actions'
import * as orders from './orders/actions'
import * as clients from './clients/actions'
import * as printer from './printer/actions'

// export all actions as modules
export default { ...products, ...order, ...orders, ...clients, ...printer }
