import { http } from '../../http/client'

export const fetchHistoryRequest = () => ({
  type: 'FETCH_HISTORY_REQUEST'
})

export const fetchHistorySuccess = data => ({
  type: 'FETCH_HISTORY_SUCCESS',
  data
})

export const fetchHistoryError = error => ({
  type: 'FETCH_HISTORY_ERROR',
  error
})

export const fetchHistory = id => async dispatch => {
  try {
    dispatch(fetchHistoryRequest())
    let { data } = await http.get(`/clients/${id}/history`)
    dispatch(fetchHistorySuccess(data))
  } catch (error) {
    dispatch(fetchHistoryError(error))
  }
}
