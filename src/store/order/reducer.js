import createReducer from '../createReducer'

const addToOrder = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    items: [...state.data.items, { id: action.id, ...action.item }]
  }
})

const removeItems = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    items: state.data.items.filter(item => !action.items[item.skuId])
  }
})

const updateItem = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    items: state.data.items.map(item =>
      item.skuId !== action.item.skuId
        ? item
        : {
            ...item,
            price: action.item.price,
            quantity: action.item.quantity
          }
    )
  }
})

const updateOrder = (state, action) => ({
  ...state,
  data: { ...action.order }
})

const setOrder = (state, action) => ({
  ...state,
  data: { ...action.order }
})

const setClient = (state, action) => ({
  ...state,
  data: { ...initialState.data, clientId: action.clientId }
})

const fetchOrder = (state, action) => {
  return state
}

const createOrderRequest = (state, action) => ({
  ...state,
  loading: true,
  error: null
})

const createOrderSuccess = (state, action) => ({
  ...state,
  data: initialState.data,
  loading: false
})

const createOrderError = (state, action) => ({
  ...state,
  loading: false,
  error: action.error
})

const initialState = {
  data: {
    id: null,
    items: [],
    clientId: null
  },
  loading: false,
  error: null
}
const order = createReducer((state = initialState), {
  ['FETCH_ORDER']: fetchOrder,
  ['ADD_ITEM']: addToOrder,
  ['UPDATE_ITEM']: updateItem,
  ['UPDATE_ORDER']: updateOrder,
  ['SET_ORDER']: setOrder,
  ['SET_CLIENT']: setClient,
  ['REMOVE_ITEMS']: removeItems,
  ['CREATE_ORDER_REQUEST']: createOrderRequest,
  ['CREATE_ORDER_SUCCESS']: createOrderSuccess,
  ['CREATE_ORDER_ERROR']: createOrderError
})

export default order
