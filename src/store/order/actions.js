import { http } from '../../http/client'
import { addToCreated, updateCreated } from '../orders/actions'
import moment from 'moment'

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

export const setDeliveryDate = deliveryDate => ({
  type: 'SET_DELIVERY_DATE',
  deliveryDate
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

export const modifyOrderRequest = () => ({
  type: 'MODIFY_ORDER_REQUEST'
})

export const modifyOrderSuccess = order => ({
  type: 'MODIFY_ORDER_SUCCESS',
  order
})

export const modifyOrderError = error => ({
  type: 'MODIFY_ORDER_ERROR',
  error
})

export const createOrder = order => async dispatch => {
  try {
    dispatch(createOrderRequest())
    let today = moment().format()
    order.createdAt = today
    if (!order.deliveryDate) order.deliveryDate = today
    let { data } = await http.post('/orders', order)
    dispatch(createOrderSuccess(data))
    dispatch(addToCreated(data))
  } catch (error) {
    console.log(error)
    dispatch(createOrderError(error))
  }
}

export const modifyOrder = order => async dispatch => {
  try {
    dispatch(modifyOrderRequest())
    console.log('update order', order)
    let { data } = await http.put('/orders', order)
    dispatch(modifyOrderSuccess(data))
    dispatch(updateCreated(data))
  } catch (error) {
    dispatch(modifyOrderError(error))
  }
}
