import * as products from './products/selectors'
import * as order from './order/selectors'
import * as orders from './orders/selectors'
import * as clients from './clients/selectors'

// export all selectors as modules
export default { ...products, ...order, ...orders, ...clients }
