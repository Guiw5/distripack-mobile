let itemId = 0
export const addToOrder = item => ({
  type: 'ADD_TO_ORDER',
  id: itemId++,
  item
})

export const getOrder = () => ({
  type: 'FETCH_ORDER'
})

export const modifyOrder = item => ({
  type: 'UPDATE_ORDER',
  item
})

export const removeItems = items => ({
  type: 'REMOVE_FROM_ORDER',
  items
})

export const setClient = client => ({
  type: 'SET_ORDER_CLIENT',
  client
})

export const createOrder = order => ({
  type: 'CREATE_ORDER',
  order
})
