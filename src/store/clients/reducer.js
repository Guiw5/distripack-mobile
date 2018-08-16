import { createReducer } from '../reducers'

const fetchClientsRequest = (state, action) => ({
  ...state,
  loading: true,
  error: null
})

const fetchClientsSuccess = (state, action) => ({
  ...state,
  data: action.data,
  loading: false
})

const fetchClientsError = (state, action) => ({
  ...state,
  data: [],
  loading: false,
  error: action.error
})

const initialState = {
  data: [],
  loading: false,
  error: null
}

const clients = createReducer((state = initialState), {
  ['FETCH_CLIENTS_REQUEST']: fetchClientsRequest,
  ['FETCH_CLIENTS_SUCCESS']: fetchClientsSuccess,
  ['FETCH_CLIENTS_ERROR']: fetchClientsError
})
export default clients
