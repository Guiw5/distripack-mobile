import createReducer from '../createReducer'

const addToOrder = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    items: [...state.data.items, action.item]
  },
  isUpdated: !!state.data.createdAt
})

const removeItems = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    items: state.data.items.filter((item, index) => !action.items[index])
  },
  isUpdated: !!state.data.createdAt
})

const updateItem = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    items: state.data.items.map((item, index) =>
      index !== action.item.index
        ? item
        : {
            ...item,
            price: action.item.price,
            quantity: action.item.quantity
          }
    )
  },
  isUpdated: !!state.data.createdAt
})

const setOrder = (state, action) => ({
  ...initialState,
  data: action.order
})

const init = (state, action) => ({
  ...initialState,
  data: {
    ...initialState.data,
    clientId: action.clientId
  }
})

const setDeliveryDate = (state, action) => ({
  ...state,
  data: { ...state.data, deliveryDate: action.deliveryDate },
  isUpdated: !!state.data.createdAt
})

const createOrderRequest = (state, action) => ({
  ...state,
  loading: true,
  error: null
})

const createOrderSuccess = (state, action) => ({
  ...initialState
})

const createOrderError = (state, action) => ({
  ...state,
  loading: false,
  error: action.error
})

const modifyOrderRequest = (state, action) => ({
  ...state,
  loading: true,
  error: null
})

const modifyOrderSuccess = (state, action) => ({
  ...initialState
})

const modifyOrderError = (state, action) => ({
  ...state,
  loading: false,
  error: action.error
})

const setPreviousBalance = (state, { previousBalance }) => ({
  ...state,
  data: { ...state.data, previousBalance: previousBalance }
})

const fetchOrderRequest = (state, action) => ({
  ...state,
  loading: true,
  error: null
})

const fetchOrderSuccess = (state, action) => ({
  ...state,
  data: action.order,
  loading: false,
  error: null
})

const fetchOrderError = (state, action) => ({
  ...state,
  loading: false,
  error: action.error
})

const initialState = {
  data: {
    id: null,
    items: [],
    clientId: null,
    deliveryDate: null,
    deliveredAt: null,
    createdAt: null,
    updatedAt: null,
    state: null,
    previousBalance: null
  },
  isUpdated: false,
  loading: false,
  error: null
}

const order = createReducer((state = initialState), {
  ['ADD_ITEM']: addToOrder,
  ['UPDATE_ITEM']: updateItem,
  ['SET_ORDER']: setOrder,
  ['INIT']: init,
  ['SET_DELIVERY_DATE']: setDeliveryDate,
  ['SET_PREVIOUS_BALANCE']: setPreviousBalance,
  ['REMOVE_ITEMS']: removeItems,
  ['CREATE_ORDER_REQUEST']: createOrderRequest,
  ['CREATE_ORDER_SUCCESS']: createOrderSuccess,
  ['CREATE_ORDER_ERROR']: createOrderError,
  ['MODIFY_ORDER_REQUEST']: modifyOrderRequest,
  ['MODIFY_ORDER_SUCCESS']: modifyOrderSuccess,
  ['MODIFY_ORDER_ERROR']: modifyOrderError,
  ['FETCH_ORDER_REQUEST']: fetchOrderRequest,
  ['FETCH_ORDER_SUCCESS']: fetchOrderSuccess,
  ['FETCH_ORDER_ERROR']: fetchOrderError
})

export default order
