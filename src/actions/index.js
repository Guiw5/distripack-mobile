let itemId = 0
export const addToOrder = item => ({
  type: 'ADD_TO_ORDER',
  id: itemId++,
  item
})

export const modifyOrder = item => ({
  type: 'UPDATE_ORDER',
  item
})

export const removeItems = items => ({
  type: 'REMOVE_FROM_ORDER',
  items
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
