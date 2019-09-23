import { http } from '../../http/client'
import { updateClient } from '../clients/actions'

export const fetchAccountRequest = () => ({
  type: 'FETCH_ACCOUNT_REQUEST'
})

export const fetchAccountSuccess = data => ({
  type: 'FETCH_ACCOUNT_SUCCESS',
  data
})

export const fetchAccountError = error => ({
  type: 'FETCH_ACCOUNT_ERROR',
  error
})

export const createAccountRequest = () => ({
  type: 'CREATE_ACCOUNT_REQUEST'
})

export const createAccountSuccess = data => ({
  type: 'CREATE_ACCOUNT_SUCCESS',
  data
})

export const createAccountError = error => ({
  type: 'CREATE_ACCOUNT_ERROR',
  error
})

export const setInitialAmountRequest = () => ({
  type: 'SET_INITIAL_AMOUNT_REQUEST'
})

export const setInitialAmountSuccess = data => ({
  type: 'SET_INITIAL_AMOUNT_SUCCESS',
  data
})

export const setInitialAmountError = error => ({
  type: 'SET_INITIAL_AMOUNT_ERROR',
  error
})

export const fetchAccount = clientId => async dispatch => {
  try {
    dispatch(fetchAccountRequest())
    let { data } = await http.get(`/accounts/${clientId}`)
    dispatch(fetchAccountSuccess(data))
  } catch (error) {
    dispatch(fetchAccountError(error))
  }
}

export const createAccount = ({ clientId, amount }) => async dispatch => {
  try {
    dispatch(createAccountRequest())
    console.log(clientId, amount)
    const { data } = await http.post(`/accounts/${clientId}`, amount)
    console.log('data', data)
    dispatch(createAccountSuccess(data))
    dispatch(updateClient(data.client))
  } catch (error) {
    console.log('error', error)
    dispatch(createAccountError(error))
  }
}

export const setInitialAmount = ({ clientId, amount }) => async dispatch => {
  try {
    dispatch(setInitialAmountRequest())
    let { data } = await http.put(`/accounts/${clientId}`, amount)
    dispatch(setInitialAmountSuccess(data))
  } catch (error) {
    console.log('error', error)
    dispatch(setInitialAmountError(error))
  }
}
