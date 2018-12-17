import { createSelector } from 'reselect'
import { getClientsMap } from '../clients/selectors'

export const getOrders = state => state.orders.data

export const getOrdersError = state => state.orders.error

export const getOrdersLoading = state => state.orders.loading

export const getOrdersCreated = state =>
  state.orders.data.filter(o => o.state === 'Created')

export const getOrdersMap = createSelector(
  getOrdersCreated,
  orders => ({
    ordersMap: orders.reduce((dict, order) => {
      dict[order.clientId] = order
      return dict
    }, {})
  })
)

export const getClientsFromOrders = createSelector(
  getClientsMap,
  getOrders,
  (clientsMap, orders) => {
    return orders.map(o => clientsMap[o.clientId])
  }
)

export const getOrdersWithClients = createSelector(
  getOrdersCreated,
  getClientsMap,
  (orders, clientsMap) => {
    return orders.map(order => ({
      ...order,
      client: clientsMap[order.clientId]
    }))
  }
)
