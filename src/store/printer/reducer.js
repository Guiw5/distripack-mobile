import createReducer from '../createReducer'

const initialState = {
  data: {
    status: []
  },
  status: null,
  loading: false,
  error: null //hubo un error al imprimir
}

const getStatusRequest = state => ({
  ...state,
  loading: true
})

const getStatusSuccess = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    status: [
      ...state.data.status.filter(
        s => !action.status.some(as => as.key === s.key)
      ),
      ...action.status
    ]
  },
  loading: false
})

const getStatusError = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    status: [...state.data.status, action.error]
  },
  loading: false
})

const getResultsRequest = state => ({
  ...state,
  loading: true
})

const getResultsSuccess = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    status: [
      ...state.data.status.filter(
        s => !action.status.some(as => as.key === s.key)
      ),
      ...action.status
    ]
  },
  loading: false
})

const getResultsError = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    status: [...state.data.status, action.error]
  },
  loading: false
})

const clearStatus = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    status: state.data.status.filter(s => s.key !== action.key)
  }
})

const clearState = state => ({
  ...state,
  status: null
})

const printRequest = state => ({
  ...state,
  loading: true
})

const printSuccess = state => ({
  ...state,
  status: 'ok',
  loading: false
})

const printError = (state, action) => ({
  ...state,
  status: 'notok',
  error: action.error,
  loading: false
})

const printer = createReducer((state = initialState), {
  ['CLEAR_STATUS']: clearStatus,
  ['CLEAR_STATE']: clearState,
  ['GET_RESULTS_REQUEST']: getResultsRequest,
  ['GET_RESULTS_SUCCESS']: getResultsSuccess,
  ['GET_RESULTS_ERROR']: getResultsError,
  ['GET_STATUS_REQUEST']: getStatusRequest,
  ['GET_STATUS_SUCCESS']: getStatusSuccess,
  ['GET_STATUS_ERROR']: getStatusError,
  ['PRINT_REQUEST']: printRequest,
  ['PRINT_SUCCESS']: printSuccess,
  ['PRINT_ERROR']: printError
})
export default printer
