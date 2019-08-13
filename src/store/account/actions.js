import { http } from '../../http/client'

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

export const fetchAccount = id => async dispatch => {
  try {
    dispatch(fetchAccountRequest())
    let { data } = await http.get(`/transactions/${id}/account`)
    dispatch(fetchAccountSuccess(data))
  } catch (error) {
    dispatch(fetchAccountError(error))
  }
}
