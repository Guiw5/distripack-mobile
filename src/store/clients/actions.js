import http from '../../http/client'

export const getClients = () => ({
  type: 'FETCH_CLIENTS'
})

export const fetchClients = () => ({
  type: 'FETCH_CLIENTS_REQUEST'
})

export const fetchClientsSuccess = data => ({
  type: 'FETCH_CLIENTS_SUCCESS',
  data
})

export const fetchClientsError = data => ({
  type: 'FETCH_CLIENTS_ERROR',
  data
})

export const loadClients = () => async (dispatch, getState) => {
  try {
    dispatch(fetchClients())
    console.log(http)
    let { data } = await http.get('/clients')
    dispatch(fetchClientsSuccess(data))
  } catch (error) {
    dispatch(fetchClientsError(error))
  }
}
