import createReducer from '../createReducer'

const initialState = {
  data: [],
  loading: false,
  error: null
}

const addToOrders = order => ({
  ...state,
  data: [...data, order]
})

const fetchOrdersRequest = (state, action) => ({
  ...state,
  loading: true
})

const fetchOrdersSuccess = (state, action) => ({
  ...state,
  data: action.orders,
  loading: false
})

const fetchOrdersError = (state, action) => ({
  ...state,
  error: action.error,
  loading: false
})

const orders = createReducer((state = initialState), {
  ['ADD_TO_ORDERS']: addToOrders,
  ['FETCH_ORDERS_REQUEST']: fetchOrdersRequest,
  ['FETCH_ORDERS_SUCCESS']: fetchOrdersSuccess,
  ['FETCH_ORDERS_ERROR']: fetchOrdersError
})
export default orders
