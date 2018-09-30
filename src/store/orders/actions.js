import { http } from '../../http/client'

export const addToOrders = order => ({
  type: 'ADD_TO_ORDERS',
  order
})

export const fetchOrdersRequest = () => ({
  type: 'FETCH_ORDERS_REQUEST'
})

export const fetchOrdersSuccess = orders => ({
  type: 'FETCH_ORDERS_SUCCESS',
  orders
})

export const fetchOrdersError = error => ({
  type: 'FETCH_ORDERS_ERROR',
  error
})

export const fetchOrders = () => async dispatch => {
  try {
    dispatch(fetchOrdersRequest())
    let { data } = await http.get('/orders')
    dispatch(fetchOrdersSuccess(data))
  } catch (error) {
    dispatch(fetchOrdersError(error))
  }
}
