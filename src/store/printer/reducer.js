import createReducer from '../createReducer'

const initialState = {
  data: {
    status: [],
    state: null
  },
  loading: false,
  error: null //hubo un error al imprimir
}

const checkStatusRequest = state => ({
  ...state
})

const checkStatusSuccess = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    status: action.status
  }
})

const checkStatusError = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    status: action.error
  }
})

const clearStatus = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    status: state.data.status.filter(s => s.key !== action.key)
  }
})

const printRequest = state => ({
  ...state,
  loading: true
})

const printSuccess = (state, action) => ({
  ...state,
  state: 'ok',
  loading: false
})

const printError = (state, action) => ({
  ...state,
  state: 'notok',
  error: action.error,
  loading: false
})

const printer = createReducer((state = initialState), {
  ['CLEAR_STATUS']: clearStatus,
  ['CHECK_STATUS_REQUEST']: checkStatusRequest,
  ['CHECK_STATUS_SUCCESS']: checkStatusSuccess,
  ['CHECK_STATUS_ERROR']: checkStatusError,
  ['PRINT_REQUEST']: printRequest,
  ['PRINT_SUCCESS']: printSuccess,
  ['PRINT_ERROR']: printError
})
export default printer
