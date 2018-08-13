import { createReducer } from '../reducers'

const addToOrder = (state, action) => {
  let newItem = { id: action.id, ...action.item }
  let items = [...state.order.items, newItem]
  let order = { ...state.order, items }
  return { ...state, order }
}

const removeItem = (state, action) => {
  let { items } = state.order
  items = items.filter(i => !action.items.includes(i.id))
  let order = { ...state.order, items }
  return { ...state, order }
}

const updateOrder = (state, action) => {
  let neww = { ...action.item }
  let { items } = state.order
  items = items.map(item => (item.sku.code === neww.sku.code ? neww : item))
  let order = { ...state.order, items }
  return { ...state, order }
}

const setClient = (state, action) => {
  let order = { ...state.order, client: action.client }
  return { ...state, order }
}

const fetchOrder = (state, action) => {
  return state
}

const createOrder = (state, action) => {
  console.log('Se ha creado la orden correctamente')
  return state
}

const initialState = {
  order: {
    items: [],
    client: {}
  }
}
const order = createReducer((state = initialState), {
  ['ADD_TO_ORDER']: addToOrder,
  ['REMOVE_ITEM']: removeItem,
  ['UPDATE_ORDER']: updateOrder,
  ['CREATE_ORDER']: createOrder,
  ['SET_ORDER_CLIENT']: setClient,
  ['FETCH_ORDER']: fetchOrder,
  ['CREATE_ORDER']: createOrder
})

export default order
