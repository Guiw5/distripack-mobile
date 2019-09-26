import { http } from '../../http/client'
import { fetchClients } from '../clients/actions'

export const addToCreated = order => ({
  type: 'ADD_TO_CREATED',
  order
})

export const updateCreated = order => ({
  type: 'UPDATE_ORDERS_CREATED',
  order
})

export const updatePendings = order => ({
  type: 'UPDATE_ORDERS_PENDINGS',
  order
})

export const fetchCreatedRequest = () => ({
  type: 'FETCH_ORDERS_CREATED_REQUEST'
})

export const fetchCreatedSuccess = orders => ({
  type: 'FETCH_ORDERS_CREATED_SUCCESS',
  orders
})

export const fetchCreatedError = error => ({
  type: 'FETCH_ORDERS_CREATED_ERROR',
  error
})

export const fetchPendingsRequest = () => ({
  type: 'FETCH_ORDERS_PENDINGS_REQUEST'
})

export const fetchPendingsSuccess = orders => ({
  type: 'FETCH_ORDERS_PENDINGS_SUCCESS',
  orders
})

export const fetchPendingsError = error => ({
  type: 'FETCH_ORDERS_PENDINGS_ERROR',
  error
})

export const fetchDeliveredRequest = () => ({
  type: 'FETCH_ORDERS_DELIVERED_REQUEST'
})

export const fetchDeliveredSuccess = orders => ({
  type: 'FETCH_ORDERS_DELIVERED_SUCCESS',
  orders
})

export const fetchDeliveredError = error => ({
  type: 'FETCH_ORDERS_DELIVERED_ERROR',
  error
})

export const printOrdersRequest = () => ({
  type: 'PRINT_ORDERS_REQUEST'
})

export const printOrdersSuccess = orders => ({
  type: 'PRINT_ORDERS_SUCCESS',
  orders
})

export const printOrdersError = error => ({
  type: 'PRINT_ORDERS_ERROR',
  error
})

export const deliverOrdersRequest = () => ({
  type: 'DELIVER_ORDERS_REQUEST'
})

export const deliverOrdersSuccess = orders => ({
  type: 'DELIVER_ORDERS_SUCCESS',
  orders
})

export const deliverOrdersError = error => ({
  type: 'DELIVER_ORDERS_ERROR',
  error
})

export const deleteOrdersRequest = () => ({
  type: 'DELETE_ORDERS_REQUEST'
})

export const deleteOrdersSuccess = orderIds => ({
  type: 'DELETE_ORDERS_SUCCESS',
  orderIds
})

export const deleteOrdersError = error => ({
  type: 'DELETE_ORDERS_ERROR',
  error
})

export const updateOrders = order => dispatch => {
  if (order.state.toLowerCase() === 'created') dispatch(updateCreated(order))
  if (order.state.toLowerCase() === 'printed') dispatch(updatePendings(order))
}

export const fetchRecentlyOrders = () => dispatch => {
  Promise.all([
    dispatch(fetchOrdersCreated()),
    dispatch(fetchOrdersPending()),
    dispatch(fetchOrdersDelivered())
  ])
}

export const fetchOrdersCreated = () => async dispatch => {
  try {
    dispatch(fetchCreatedRequest())
    let { data } = await http.get('/orders/created')
    dispatch(fetchCreatedSuccess(data))
  } catch (error) {
    dispatch(fetchCreatedError(error))
  }
}

/**
 *  fetch orders with status = "printed"
 */
export const fetchOrdersPending = () => async dispatch => {
  try {
    dispatch(fetchPendingsRequest())
    let { data } = await http.get('/orders/pendings')
    dispatch(fetchPendingsSuccess(data))
  } catch (error) {
    dispatch(fetchPendingsError(error))
  }
}

/**
 *  fetch orders with status = "delivered"
 */
export const fetchOrdersDelivered = () => async dispatch => {
  try {
    dispatch(fetchDeliveredRequest())
    let { data } = await http.get('/orders/delivered')
    dispatch(fetchDeliveredSuccess(data))
  } catch (error) {
    dispatch(fetchDeliveredError(error))
  }
}

export const printOrders = orderIds => async dispatch => {
  try {
    dispatch(printOrdersRequest())
    const { data } = await http.put('orders/print', orderIds)
    dispatch(printOrdersSuccess(data))
  } catch (error) {
    dispatch(printOrdersError(error))
  }
}

export const deliverOrders = orderIds => async dispatch => {
  try {
    dispatch(deliverOrdersRequest())
    const { data } = await http.put('orders/deliver', orderIds)
    dispatch(deliverOrdersSuccess(data))
    dispatch(fetchClients())
  } catch (error) {
    dispatch(deliverOrdersError(error))
  }
}

export const deleteOrders = orderIds => async dispatch => {
  try {
    dispatch(deleteOrdersRequest())
    const { data } = await http.delete('orders', { data: orderIds })
    dispatch(deleteOrdersSuccess(data))
  } catch (error) {
    dispatch(deleteOrdersError(error))
  }
}
