import { http } from '../../http/client'

export const addToCreated = order => ({
  type: 'ADD_TO_CREATED',
  order
})

export const updateCreated = order => ({
  type: 'UPDATE_IN_CREATED',
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

export const fetchDeliverdRequest = () => ({
  type: 'FETCH_ORDERS_DELIVERED_REQUEST'
})

export const fetchDeliverdSuccess = orders => ({
  type: 'FETCH_ORDERS_DELIVERED_SUCCESS',
  orders
})

export const fetchDeliverdError = error => ({
  type: 'FETCH_ORDERS_DELIVERED_ERROR',
  error
})

export const printOrdersRequest = () => ({
  type: 'PRINT_ORDERS_REQUEST'
})

export const printOrdersSuccess = orderIds => ({
  type: 'PRINT_ORDERS_SUCCESS',
  orderIds
})

export const printOrdersError = error => ({
  type: 'PRINT_ORDERS_ERROR',
  error
})

export const deliverOrdersRequest = () => ({
  type: 'DELIVER_ORDERS_REQUEST'
})

export const deliverOrdersSuccess = orderIds => ({
  type: 'DELIVER_ORDERS_SUCCESS',
  orderIds
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

export const fetchOrdersCreated = () => async dispatch => {
  try {
    dispatch(fetchCreatedRequest())
    let { data } = await http.get('/orders')
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
    await http.put('orders/print', orderIds)
    dispatch(printOrdersSuccess(orderIds))
  } catch (error) {
    dispatch(printOrdersError(error))
  }
}

export const deliverOrders = orderIds => async dispatch => {
  try {
    dispatch(deliverOrdersRequest())
    await http.put('orders/deliver', orderIds)
    dispatch(deliverOrdersSuccess(orderIds))
  } catch (error) {
    console.log('upa', error)
    dispatch(deliverOrdersError(error))
  }
}

export const deleteOrders = orderIds => async dispatch => {
  try {
    dispatch(deleteOrdersRequest())
    await http.delete('orders', { data: orderIds })
    dispatch(deleteOrdersSuccess(orderIds))
  } catch (error) {
    console.log('delete error', error.message)
    dispatch(deleteOrdersError(error))
  }
}
