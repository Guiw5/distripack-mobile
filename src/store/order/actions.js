import { http } from '../../http/client'

let itemId = 0
export const addItem = item => ({
  type: 'ADD_ITEM',
  id: itemId++,
  item
})

export const modifyItem = item => ({
  type: 'UPDATE_ITEM',
  item
})

export const removeItems = items => ({
  type: 'REMOVE_ITEMS',
  items
})

export const setClient = clientId => ({
  type: 'SET_CLIENT',
  clientId
})

export const setOrder = order => ({
  type: 'SET_ORDER',
  order
})

export const getOrder = () => ({
  type: 'FETCH_ORDER'
})

export const modifyOrder = order => ({
  type: 'UPDATE_ORDER',
  order
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

export const updateOrder = order => async dispatch => {
  try {
    dispatch(modifyOrderRequest())
    let { data } = await http.put('/orders', order)
    dispatch(modifyOrderSuccess(data))
  } catch (error) {
    dispatch(modifyOrderError(error))
  }
}
