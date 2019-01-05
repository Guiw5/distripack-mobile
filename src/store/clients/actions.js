import { http } from '../../http/client'

export const fetchClientsRequest = () => ({
  type: 'FETCH_CLIENTS_REQUEST'
})

export const fetchClientsSuccess = clients => ({
  type: 'FETCH_CLIENTS_SUCCESS',
  clients
})

export const fetchClientsError = error => ({
  type: 'FETCH_CLIENTS_ERROR',
  error
})

export const createClientRequest = () => ({
  type: 'CREATE_CLIENT_REQUEST'
})

export const createClientSuccess = client => ({
  type: 'CREATE_CLIENT_SUCCESS',
  client
})

export const createClientError = error => ({
  type: 'CREATE_CLIENT_ERROR',
  error
})

export const fetchClients = () => async dispatch => {
  try {
    dispatch(fetchClientsRequest())
    let { data } = await http.get('/clients')
    dispatch(fetchClientsSuccess(data))
  } catch (error) {
    dispatch(fetchClientsError(error))
  }
}

export const createClient = client => async dispatch => {
  try {
    dispatch(createClientRequest())
    let { data } = await http.post('/clients', client)
    dispatch(createClientSuccess(data))
  } catch (error) {
    dispatch(createClientError(error))
  }
}
