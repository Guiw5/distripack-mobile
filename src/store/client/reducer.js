import createReducer from '../createReducer'

const fetchClientRequest = (state, action) => ({
  ...state,
  loading: true,
  error: null
})

const fetchClientSuccess = (state, action) => ({
  ...state,
  data: action.data,
  loading: false
})

const fetchClientError = (state, action) => ({
  ...initialState,
  loading: false,
  error: action.error
})

const setClient = (state, action) => ({
  ...initialState,
  data: action.client
})

const initialState = {
  data: null,
  loading: false,
  error: null
}

const clients = createReducer((state = initialState), {
  ['FETCH_CLIENT_REQUEST']: fetchClientRequest,
  ['FETCH_CLIENT_SUCCESS']: fetchClientSuccess,
  ['FETCH_CLIENT_ERROR']: fetchClientError,
  ['SET_CLIENT']: setClient
})

export default clients
