import { combineReducers } from 'redux'
import order from './order/reducer'
import orders from './orders/reducer'
import products from './products/reducer'
import clients from './clients/reducer'
import { reducer as formReducer } from 'redux-form'

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

export const rootReducer = combineReducers({
  order,
  orders,
  products,
  clients,
  form: formReducer
})
