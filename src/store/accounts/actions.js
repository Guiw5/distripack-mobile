import { http } from '../../http/client'

export const fetchAccountsRequest = () => ({
  type: 'FETCH_ACCOUNTS_REQUEST'
})

export const fetchAccountsSuccess = data => ({
  type: 'FETCH_ACCOUNTS_SUCCESS',
  data
})

export const fetchAccountsError = error => ({
  type: 'FETCH_ACCOUNTS_ERROR',
  error
})

export const fetchAccounts = () => async dispatch => {
  try {
    dispatch(fetchAccountsRequest())
    let { data } = await http.get(`/accounts`)
    dispatch(fetchAccountsSuccess(data))
  } catch (error) {
    dispatch(fetchAccountsError(error))
  }
}
