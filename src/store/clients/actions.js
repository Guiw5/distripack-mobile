import { http } from '../../http/client'

export const fetchClients = () => ({
  type: 'FETCH_CLIENTS_REQUEST'
})

export const fetchClientsSuccess = data => ({
  type: 'FETCH_CLIENTS_SUCCESS',
  data
})

export const fetchClientsError = error => ({
  type: 'FETCH_CLIENTS_ERROR',
  error
})

export const loadClients = () => async dispatch => {
  try {
    dispatch(fetchClients())
    let { data } = await http.get('/clients')
    dispatch(fetchClientsSuccess(data))
  } catch (error) {
    console.log(error, error.message)
    dispatch(fetchClientsError(error))
  }
}
