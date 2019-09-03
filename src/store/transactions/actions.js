import { http } from '../../http/client'

export const fetchTransactionsRequest = () => ({
  type: 'FETCH_TRANSACTIONS_REQUEST'
})

export const fetchTransactionsSuccess = data => ({
  type: 'FETCH_TRANSACTIONS_SUCCESS',
  data
})

export const fetchTransactionsError = error => ({
  type: 'FETCH_TRANSACTIONS_ERROR',
  error
})

export const fetchTransactions = clientId => async dispatch => {
  try {
    dispatch(fetchTransactionsRequest())
    let { data } = await http.get(`/transactions/${clientId}`)
    dispatch(fetchTransactionsSuccess(data))
  } catch (error) {
    console.log('error', error)
    dispatch(fetchTransactionsError(error))
  }
}
