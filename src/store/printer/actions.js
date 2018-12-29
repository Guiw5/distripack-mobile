import printerService from '../../services/PrinterService'
import { printOrders } from '../orders/actions'
import { ErrorCodes, ASB_PRINT_SUCCESS } from '../../lib/types'

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

export const printRequest = () => ({
  type: 'PRINT_REQUEST'
})

export const printSuccess = () => ({
  type: 'PRINT_SUCCESS'
})

export const printError = error => ({
  type: 'PRINT_ERROR',
  error
})

export const checkPrinterStatus = (data = null) => async dispatch => {
  try {
    dispatch(checkStatusRequest())
    let status = await printerService.status(data)
    dispatch(checkStatusSuccess(status))
  } catch (error) {
    dispatch(checkStatusError(ErrorCodes[error.message]))
  }
}

export const print = orders => async dispatch => {
  try {
    dispatch(printRequest())
    let { data } = await printerService.printOrders(orders)
    if (isOk(data)) {
      dispatch(printOrders(orders.map(o => o.id)))
      dispatch(printSuccess())
    } else {
      dispatch(checkPrinterStatus(data))
      dispatch(printError())
    }
  } catch (error) {
    console.log('error??', error)
    dispatch(printError(error))
  }
}

const isOk = data => {
  let { success, status } = printerService.extract(data)
  return success && Boolean(status & ASB_PRINT_SUCCESS)
}
