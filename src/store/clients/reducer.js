import Clients from '../../data/test-clients.json'
import { createReducer } from '../reducers'

const fetchClients = (state, action) => ({ ...state, data: Clients })

const fetchClientsRequest = (state, action) => ({ ...state, isLoading: true })

const fetchClientsSuccess = (state, action) => ({
  ...state,
  data: action.data,
  isLoading: false
})

const fetchClientsError = (state, action) => ({
  ...state,
  error: action.data,
  isLoading: false
})

const initialState = {
  data: [],
  loading: false,
  error: null
}

const clients = createReducer((state = initialState), {
  ['FETCH_CLIENTS']: fetchClients,
  ['FETCH_CLIENTS_REQUEST']: fetchClientsRequest,
  ['FETCH_CLIENTS_SUCCESS']: fetchClientsSuccess,
  ['FETCH_CLIENTS_ERROR']: fetchClientsError
})
export default clients
