import printerService from '../../services/PrinterService'
import { printOrders } from '../orders/actions'
import { ErrorCodes } from '../../lib/types'

export const getResultsRequest = () => ({
  type: 'CHECK_RESULTS_REQUEST'
})

export const getResultsSuccess = status => ({
  type: 'CHECK_RESULTS_SUCCESS',
  status
})

export const getResultsError = error => ({
  type: 'CHECK_RESULTS_ERROR',
  error
})

export const getStatusRequest = () => ({
  type: 'GET_STATUS_REQUEST'
})

export const getStatusSuccess = status => ({
  type: 'GET_STATUS_SUCCESS',
  status
})

export const getStatusError = error => ({
  type: 'GET_STATUS_ERROR',
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

export const clearState = () => ({
  type: 'CLEAR_STATE'
})

export const status = () => async dispatch => {
  try {
    dispatch(getStatusRequest())
    let status = await printerService.status()
    dispatch(getStatusSuccess(status))
  } catch (error) {
    dispatch(getStatusError(ErrorCodes[error.message]))
  }
}

export const results = data => async dispatch => {
  try {
    dispatch(getResultsRequest())
    let status = await printerService.results(data)
    dispatch(getResultsSuccess(status))
  } catch (error) {
    dispatch(getResultsError(ErrorCodes[error.message]))
  }
}

export const print = orders => async dispatch => {
  try {
    dispatch(printRequest())
    const { data } = await printerService.print(orders)
    const ok = printerService.isOk(data)
    if (ok) {
      dispatch(printOrders(orders.map(o => o.id)))
      dispatch(printSuccess())
    } else {
      dispatch(results(data))
      dispatch(printError())
    }
  } catch (error) {
    dispatch(printError(error))
  }
}

export const reprint = orders => async dispatch => {
  try {
    dispatch(printRequest())
    const { data } = await printerService.print(orders)
    const ok = printerService.isOk(data)
    if (ok) {
      dispatch(printSuccess())
    } else {
      dispatch(results(data))
      dispatch(printError())
    }
  } catch (error) {
    dispatch(printError(error))
  }
}
