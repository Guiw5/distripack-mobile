import createReducer from '../createReducer'

const initialState = {
  data: [],
  loading: false,
  error: null
}

const fetchTransactionsRequest = (state, action) => ({
  ...state,
  loading: true,
  error: null
})

const fetchTransactionsSuccess = (state, action) => ({
  ...state,
  data: action.data,
  loading: false
})

const fetchTransactionsError = (state, action) => ({
  ...state,
  data: null,
  loading: false,
  error: action.error
})

const transactions = createReducer((state = initialState), {
  ['FETCH_TRANSACTIONS_REQUEST']: fetchTransactionsRequest,
  ['FETCH_TRANSACTIONS_SUCCESS']: fetchTransactionsSuccess,
  ['FETCH_TRANSACTIONS_ERROR']: fetchTransactionsError
})

export default transactions
