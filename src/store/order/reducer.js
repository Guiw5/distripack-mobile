import createReducer from '../createReducer'

const initialState = {
  data: {
    id: null,
    items: [],
    clientId: null,
    deliveryDate: null,
    deliveredAt: null,
    createdAt: null,
    state: null
  },
  isUpdated: false,
  loading: false,
  error: null
}

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
  ...state,
  data: action.order
})

const setClient = (state, action) => ({
  ...state,
  data: { ...initialState.data, clientId: action.clientId }
})

const setDeliveryDate = (state, action) => ({
  ...state,
  data: { ...state.data, deliveryDate: action.deliveryDate },
  isUpdated: !!state.data.createdAt
})

const fetchOrder = (state, action) => ({ ...state })

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

const order = createReducer((state = initialState), {
  ['FETCH_ORDER']: fetchOrder,
  ['ADD_ITEM']: addToOrder,
  ['UPDATE_ITEM']: updateItem,
  ['SET_ORDER']: setOrder,
  ['SET_CLIENT']: setClient,
  ['SET_DELIVERY_DATE']: setDeliveryDate,
  ['REMOVE_ITEMS']: removeItems,
  ['CREATE_ORDER_REQUEST']: createOrderRequest,
  ['CREATE_ORDER_SUCCESS']: createOrderSuccess,
  ['CREATE_ORDER_ERROR']: createOrderError,
  ['MODIFY_ORDER_REQUEST']: modifyOrderRequest,
  ['MODIFY_ORDER_SUCCESS']: modifyOrderSuccess,
  ['MODIFY_ORDER_ERROR']: modifyOrderError
})

export default order
