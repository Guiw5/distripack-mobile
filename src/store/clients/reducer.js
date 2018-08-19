import { createReducer } from '../reducers'

const fetchClientsRequest = (state, action) => ({
  ...state,
  loading: true,
  error: null
})

const fetchClientsSuccess = (state, action) => ({
  ...state,
  data: action.clients,
  loading: false
})

const fetchClientsError = (state, action) => ({
  ...state,
  data: [],
  loading: false,
  error: action.error
})

const createClientRequest = (state, action) => ({
  ...state,
  loading: true,
  error: null
})

const createClientSuccess = (state, action) => ({
  ...state,
  data: [...state.data, { ...action.client }],
  loading: false
})

const createClientError = (state, action) => ({
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
  ['FETCH_CLIENTS_ERROR']: fetchClientsError,
  ['CREATE_CLIENT_REQUEST']: createClientRequest,
  ['CREATE_CLIENT_SUCCESS']: createClientSuccess,
  ['CREATE_CLIENT_ERROR']: createClientError
})

export default clients
