import { http } from '../../http/client'

export const fetchClientRequest = () => ({
  type: 'FETCH_CLIENT_REQUEST'
})

export const fetchClientSuccess = data => ({
  type: 'FETCH_CLIENT_SUCCESS',
  data
})

export const fetchClientError = error => ({
  type: 'FETCH_CLIENT_ERROR',
  error
})

export const setClient = client => ({
  type: 'SET_CLIENT',
  client
})

export const fetchClient = id => async dispatch => {
  try {
    dispatch(fetchClientRequest())
    let { data } = await http.get(`/clients/${id}`)
    dispatch(fetchClientSuccess(data))
  } catch (error) {
    dispatch(fetchClientError(error))
  }
}
