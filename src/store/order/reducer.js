import { createReducer } from '../reducers'

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
    items: state.data.items.filter(i => !action.items.includes(i.id))
  }
})

const updateOrder = (state, action) => ({
  ...state,
  order: {
    ...state.order,
    items: state.data.items.map(
      item =>
        item.id !== action.item.id
          ? item
          : {
              ...item,
              price: action.item.price,
              quantity: action.item.quantity
            }
    )
  }
})

const setClient = (state, action) => ({
  ...state,
  data: { ...state.data, clientId: action.clientId }
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
  data: action.data,
  loading: false
})

const createOrderError = (state, action) => ({
  ...state,
  loading: false,
  error: action.error
})

const initialState = {
  data: {
    items: [],
    clientId: null
  },
  loading: false,
  error: null
}
const order = createReducer((state = initialState), {
  ['FETCH_ORDER']: fetchOrder,
  ['ADD_TO_ORDER']: addToOrder,
  ['UPDATE_ORDER']: updateOrder,
  ['SET_ORDER_CLIENT']: setClient,
  ['REMOVE_FROM_ORDER']: removeItems,
  ['CREATE_ORDER_REQUEST']: createOrderRequest,
  ['CREATE_ORDER_SUCCESS']: createOrderSuccess,
  ['CREATE_ORDER_ERROR']: createOrderError
})

export default order
