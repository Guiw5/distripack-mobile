import createReducer from '../createReducer'

const initialState = {
  data: [],
  loading: false,
  error: null
}

const fetchAccountsRequest = state => ({
  ...state,
  loading: true,
  error: null
})

const fetchAccountsSuccess = (state, action) => ({
  ...state,
  data: action.data,
  loading: false
})

const fetchAccountsError = (state, action) => ({
  ...state,
  loading: false,
  error: action.error
})

const accounts = createReducer((state = initialState), {
  ['FETCH_ACCOUNTS_REQUEST']: fetchAccountsRequest,
  ['FETCH_ACCOUNTS_SUCCESS']: fetchAccountsSuccess,
  ['FETCH_ACCOUNTS_ERROR']: fetchAccountsError
})

export default accounts
