import { createReducer } from '../reducers'

const initialState = {
  data: [],
  loading: false,
  error: null,
  status: []
}

const checkStatusRequest = state => ({
  ...state
})

const checkStatusSuccess = (state, action) => ({
  ...state,
  status: action.status
})

const checkStatusError = (state, action) => ({
  ...state,
  status: { error: action.error }
})

const clearStatus = (state, action) => ({
  ...state,
  status: state.status.filter(s => s.key !== action.key)
})

const printOrdersRequest = state => ({
  ...state,
  loading: true
})

const printOrdersSuccess = (state, action) => ({
  ...state,
  data: action.data,
  loading: false
})

const printOrdersError = (state, action) => ({
  ...state,
  error: action.error,
  loading: false
})

const printer = createReducer((state = initialState), {
  ['CLEAR_STATUS']: clearStatus,
  ['CHECK_STATUS_REQUEST']: checkStatusRequest,
  ['CHECK_STATUS_SUCCESS']: checkStatusSuccess,
  ['CHECK_STATUS_ERROR']: checkStatusError,
  ['PRINT_ORDERS_REQUEST']: printOrdersRequest,
  ['PRINT_ORDERS_SUCCESS']: printOrdersSuccess,
  ['PRINT_ORDERS_ERROR']: printOrdersError
})
export default printer
