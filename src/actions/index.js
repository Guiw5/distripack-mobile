let itemId = 0;
export const addToOrder = item => ({
  type: 'ADD_TO_ORDER',
  id: itemId++,
  item: item.product,
  quantity: item.quantity
})

export const setClient = id => ({
  type: 'SET_CLIENT',
  clientId: id
})

export const getClients = () => ({
  type: 'FETCH_CLIENTS'
})

export const getProducts = () => ({
  type: 'FETCH_PRODUCTS'
})

export const getOrder = () => ({
  type: 'FETCH_ORDER'
})