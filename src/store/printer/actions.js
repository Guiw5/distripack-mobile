import printerService from '../../services/PrinterService'
import { http } from '../../http/client'
import { ErrorCodes } from '../../lib/types'

export const checkStatusRequest = () => ({
  type: 'CHECK_STATUS_REQUEST'
})

export const checkStatusSuccess = status => ({
  type: 'CHECK_STATUS_SUCCESS',
  status
})

export const checkStatusError = error => ({
  type: 'CHECK_STATUS_ERROR',
  error
})

export const clearStatus = key => ({
  type: 'CLEAR_STATUS',
  key
})

export const checkPrinterStatus = data => async dispatch => {
  try {
    dispatch(checkStatusRequest())
    let status = await printerService.status(data)
    dispatch(checkStatusSuccess(status))
  } catch (error) {
    dispatch(checkStatusError(ErrorCodes[error.message]))
  }
}

export const printOrdersRequest = () => ({
  type: 'PRINT_ORDERS_REQUEST'
})

export const printOrdersSuccess = data => ({
  type: 'PRINT_ORDERS_SUCCESS',
  data
})

export const printOrdersError = error => ({
  type: 'PRINT_ORDERS_ERROR',
  error
})

export const printOrders = orders => async dispatch => {
  try {
    dispatch(printOrdersRequest())
    console.log(orders)
    let { data } = await printerService.printOrders(orders)
    dispatch(checkPrinterStatus(data))
    dispatch(updatePrintedOrders(orders))
    dispatch(printOrdersSuccess(data))
  } catch (error) {
    dispatch(printOrdersError(error))
  }
}

export const updatePrintedOrders = orders => async dispatch => {
  try {
    let orderIds = orders.map(o => o.id)
    await http.put('orders/print', orderIds)
  } catch (error) {
    console.log('Error updating printed orders', error)
  }
}
