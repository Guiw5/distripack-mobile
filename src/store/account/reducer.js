import createReducer from '../createReducer'

const fetchAccountRequest = (state, action) => ({
  ...state,
  loading: true,
  error: null
})

const fetchAccountSuccess = (state, action) => ({
  ...state,
  data: action.data,
  loading: false
})

const fetchAccountError = (state, action) => ({
  ...state,
  data: null,
  loading: false,
  error: action.error
})

const createAccountRequest = (state, action) => ({
  ...state,
  loading: true,
  error: null
})

const createAccountSuccess = (state, action) => ({
  ...initialState
})

const createAccountError = (state, action) => ({
  ...state,
  data: null,
  loading: false,
  error: action.error
})

const initialState = {
  data: null,
  loading: false,
  error: null
}

const account = createReducer((state = initialState), {
  ['FETCH_ACCOUNT_REQUEST']: fetchAccountRequest,
  ['FETCH_ACCOUNT_SUCCESS']: fetchAccountSuccess,
  ['FETCH_ACCOUNT_ERROR']: fetchAccountError,
  ['CREATE_ACCOUNT_REQUEST']: createAccountRequest,
  ['CREATE_ACCOUNT_SUCCESS']: createAccountSuccess,
  ['CREATE_ACCOUNT_ERROR']: createAccountError
})

export default account
