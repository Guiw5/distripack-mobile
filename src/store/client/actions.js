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

export const fetchClient = id => async dispatch => {
  try {
    dispatch(fetchClientRequest())
    let { data } = await http.get(`/clients/${id}`)
    console.log('client', data)
    dispatch(fetchClientSuccess(data))
  } catch (error) {
    console.log('error', error)
    dispatch(fetchClientError(error))
  }
}
