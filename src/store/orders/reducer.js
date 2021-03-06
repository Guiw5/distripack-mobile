import createReducer from '../createReducer'

const initialState = {
  data: {
    created: [],
    pending: [],
    delivered: []
  },
  loading: false,
  error: null
}

const addToCreated = (state, action) => ({
  ...state,
  data: { ...state.data, created: [...state.data.created, action.order] }
})

const updateCreated = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    created: state.data.created.map(o =>
      o.id !== action.order.id ? o : action.order
    )
  }
})

const updatePendings = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    created: state.data.created.filter(o => o.id !== action.order.id),
    pending: state.data.pending.map(o =>
      o.id !== action.order.id ? o : action.order
    )
  }
})

const fetchCreatedRequest = (state, action) => ({
  ...state,
  loading: true
})

const fetchCreatedSuccess = (state, action) => ({
  ...state,
  data: { ...state.data, created: action.orders },
  loading: false
})

const fetchCreatedError = (state, action) => ({
  ...state,
  error: action.error,
  loading: false
})

const fetchPendingsRequest = (state, action) => ({
  ...state,
  loading: true
})

const fetchPendingsSuccess = (state, action) => ({
  ...state,
  data: { ...state.data, pending: action.orders },
  loading: false
})

const fetchPendingsError = (state, action) => ({
  ...state,
  error: action.error,
  loading: false
})

const fetchDeliveredRequest = (state, action) => ({
  ...state,
  loading: true
})

const fetchDeliveredSuccess = (state, action) => ({
  ...state,
  data: { ...state.data, delivered: action.orders },
  loading: false
})

const fetchDeliveredError = (state, action) => ({
  ...state,
  error: action.error,
  loading: false
})

const printOrdersRequest = (state, action) => ({
  ...state,
  loading: true
})

const printOrdersSuccess = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    pending: [...state.data.pending, ...action.orders],
    created: state.data.created.filter(
      c => !action.orders.map(o => o.id).includes(c.id)
    )
  },
  loading: false
})

const printOrdersError = (state, action) => ({
  ...state,
  error: action.error,
  loading: false
})

const deliverOrdersRequest = (state, action) => ({
  ...state,
  loading: true
})

const deliverOrdersSuccess = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    delivered: [...state.data.delivered, ...action.orders],
    pending: state.data.pending.filter(
      p => !action.orders.map(o => o.id).includes(p.id)
    )
  },
  loading: false
})

const deliverOrdersError = (state, action) => ({
  ...state,
  error: action.error,
  loading: false
})

const deleteOrdersRequest = (state, action) => ({
  ...state,
  loading: true
})

const deleteOrdersSuccess = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    created: state.data.created.filter(
      o => !action.orderIds.includes(`${o.id}`)
    ),
    pending: state.data.pending.filter(
      o => !action.orderIds.includes(`${o.id}`)
    ),
    delivered: state.data.delivered.filter(
      o => !action.orderIds.includes(`${o.id}`)
    )
  },
  loading: false
})

const deleteOrdersError = (state, action) => ({
  ...state,
  error: action.error,
  loading: false
})

const orders = createReducer((state = initialState), {
  ['ADD_TO_CREATED']: addToCreated,
  ['UPDATE_ORDERS_CREATED']: updateCreated,
  ['UPDATE_ORDERS_PENDINGS']: updatePendings,
  ['FETCH_ORDERS_CREATED_REQUEST']: fetchCreatedRequest,
  ['FETCH_ORDERS_CREATED_SUCCESS']: fetchCreatedSuccess,
  ['FETCH_ORDERS_CREATED_ERROR']: fetchCreatedError,
  ['FETCH_ORDERS_PENDINGS_REQUEST']: fetchPendingsRequest,
  ['FETCH_ORDERS_PENDINGS_SUCCESS']: fetchPendingsSuccess,
  ['FETCH_ORDERS_PENDINGS_ERROR']: fetchPendingsError,
  ['FETCH_ORDERS_DELIVERED_REQUEST']: fetchDeliveredRequest,
  ['FETCH_ORDERS_DELIVERED_SUCCESS']: fetchDeliveredSuccess,
  ['FETCH_ORDERS_DELIVERED_ERROR']: fetchDeliveredError,
  ['PRINT_ORDERS_REQUEST']: printOrdersRequest,
  ['PRINT_ORDERS_SUCCESS']: printOrdersSuccess,
  ['PRINT_ORDERS_ERROR']: printOrdersError,
  ['DELIVER_ORDERS_REQUEST']: deliverOrdersRequest,
  ['DELIVER_ORDERS_SUCCESS']: deliverOrdersSuccess,
  ['DELIVER_ORDERS_ERROR']: deliverOrdersError,
  ['DELETE_ORDERS_REQUEST']: deleteOrdersRequest,
  ['DELETE_ORDERS_SUCCESS']: deleteOrdersSuccess,
  ['DELETE_ORDERS_ERROR']: deleteOrdersError
})

export default orders
