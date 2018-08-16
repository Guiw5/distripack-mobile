import { http } from '../../http/client'

let itemId = 0
export const addToOrder = item => ({
  type: 'ADD_TO_ORDER',
  id: itemId++,
  item
})

export const getOrder = () => ({
  type: 'FETCH_ORDER'
})

export const modifyOrder = item => ({
  type: 'UPDATE_ORDER',
  item
})

export const removeItems = items => ({
  type: 'REMOVE_FROM_ORDER',
  items
})

export const setClient = clientId => ({
  type: 'SET_ORDER_CLIENT',
  clientId
})

export const createOrderRequest = () => ({
  type: 'CREATE_ORDER_REQUEST'
})

export const createOrderSuccess = order => ({
  type: 'CREATE_ORDER_SUCCESS',
  order
})

export const createOrderError = error => ({
  type: 'CREATE_ORDER_ERROR',
  error
})

export const createOrder = order => async dispatch => {
  try {
    dispatch(createOrderRequest())
    order.createdAt = new Date()
    let { data } = await http.post('/orders', order)
    dispatch(createOrderSuccess(data))
  } catch (error) {
    console.log(error)
    dispatch(createOrderError(error))
  }
}
