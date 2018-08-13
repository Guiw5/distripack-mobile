import { combineReducers } from 'redux'
import order from './order/reducer'
import products from './products/reducer'
import clients from './clients/reducer'

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
  products,
  clients
})
