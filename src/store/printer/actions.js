import printerService from '../../services/PrinterService'
import { printOrders } from '../orders/actions'
import { ErrorCodes, ASB_PRINT_SUCCESS } from '../../lib/types'
import { Alert } from 'react-native'
import Config from '../../../config.json'

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

export const clearState = () => ({
  type: 'CLEAR_STATE'
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
    if (Config.printer.productive) {
      let { data } = await printerService.printOrders(orders)
      if (isOk(data)) {
        dispatch(printOrders(orders.map(o => o.id)))
        dispatch(printSuccess())
      } else {
        dispatch(checkPrinterStatus(data))
        dispatch(printError())
      }
      dispatch(alert(isOk(data)))
    } else {
      dispatch(printSuccess())
      dispatch(alert('ok'))
    }
  } catch (error) {
    dispatch(printError(error))
  }
}

const isOk = data => {
  let { success, status } = printerService.extract(data)
  return success && Boolean(status & ASB_PRINT_SUCCESS)
}

export const alert = ok => async dispatch => {
  if (ok === 'ok') {
    Alert.alert('Excelente', 'Los pedidos fueron impresos correctamente', [
      {
        text: 'Ok',
        onPress: () => dispatch(clearState())
      }
    ])
  }

  if (ok === 'notok') {
    Alert.alert('Ups', 'No se ha podido imprimir, intente de nuevo', [
      {
        text: 'Ok',
        onPress: () => () => dispatch(clearState())
      }
    ])
  }
}
