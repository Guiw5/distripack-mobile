import { combineReducers } from 'redux'
import order from './order/reducer'
import orders from './orders/reducer'
import products from './products/reducer'
import clients from './clients/reducer'
import printer from './printer/reducer'

import { reducer as formReducer } from 'redux-form'

export const rootReducer = combineReducers({
  order,
  orders,
  products,
  clients,
  printer,
  form: formReducer
})
