import { combineReducers } from 'redux'
import order from './order/reducer'
import orders from './orders/reducer'
import products from './products/reducer'
import client from './client/reducer'
import clients from './clients/reducer'
import history from './history/reducer'
import printer from './printer/reducer'
import account from './account/reducer'
import accounts from './accounts/reducer'
import transactions from './transactions/reducer'

import { reducer as formReducer } from 'redux-form'

export const rootReducer = combineReducers({
  order,
  orders,
  products,
  client,
  clients,
  history,
  printer,
  account,
  accounts,
  transactions,
  form: formReducer
})
