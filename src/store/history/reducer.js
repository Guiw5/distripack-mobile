import createReducer from '../createReducer'

const fetchHistoryRequest = (state, action) => ({
  ...state,
  loading: true,
  error: null
})

const fetchHistorySuccess = (state, action) => ({
  ...state,
  data: action.data,
  loading: false
})

const fetchHistoryError = (state, action) => ({
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

const history = createReducer((state = initialState), {
  ['FETCH_HISTORY_REQUEST']: fetchHistoryRequest,
  ['FETCH_HISTORY_SUCCESS']: fetchHistorySuccess,
  ['FETCH_HISTORY_ERROR']: fetchHistoryError
})

export default history
