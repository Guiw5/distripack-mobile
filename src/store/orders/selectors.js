import { createSelector } from 'reselect'
import { getClientsMap } from '../clients/selectors'

export const getOrders = state => state.orders.data

export const getOrdersError = state => state.orders.error

export const getOrdersLoading = state => state.orders.loading

export const getOrdersCreated = state => state.orders.data.created

export const getOrdersPending = state => state.orders.data.pending

export const getOrdersDelivered = state => state.orders.data.delivered

export const getOrdersCreatedByClient = createSelector(
  getOrdersCreated,
  orders => {
    return orders.reduce((dict, order) => {
      dict[order.clientId] = dict[order.clientId]
        ? [...dict[order.clientId], order]
        : [order]
      return dict
    }, {})
  }
)

export const getOrdersPendingByClient = createSelector(
  getOrdersPending,
  orders => {
    return orders.reduce((dict, order) => {
      dict[order.clientId] = dict[order.clientId]
        ? [...dict[order.clientId], order]
        : [order]
      return dict
    }, {})
  }
)

export const getOrdersDeliveredByClient = createSelector(
  getOrdersDelivered,
  orders => {
    return orders.reduce((dict, order) => {
      dict[order.clientId] = dict[order.clientId]
        ? [...dict[order.clientId], order]
        : [order]
      return dict
    }, {})
  }
)

export const getOrdersPendingMap = createSelector(
  getOrdersPending,
  orders => {
    return orders.reduce((dict, order) => {
      dict[order.clientId] = order
      return dict
    }, {})
  }
)

export const getClientsFromOrdersPending = createSelector(
  getOrdersPending,
  getClientsMap,
  (orders, clientsMap) => {
    return orders.map(o => clientsMap[o.clientId])
  }
)

export const getClientsFromOrdersCreated = createSelector(
  getOrdersCreated,
  getClientsMap,
  (orders, clientsMap) => {
    return orders.map(o => clientsMap[o.clientId])
  }
)

export const getOrdersCreatedWithClients = createSelector(
  getClientsMap,
  getOrdersCreated,
  (clientsMap, orders) => {
    if (clientsMap) {
      return orders.map(order => ({
        ...order,
        client: clientsMap[order.clientId]
      }))
    }
    return []
  }
)

export const getOrdersPendingWithClients = createSelector(
  getOrdersPending,
  getClientsMap,
  (orders, clientsMap) => {
    if (!clientsMap) return []
    return orders.map(order => ({
      ...order,
      client: clientsMap[order.clientId]
    }))
  }
)

export const getOrdersDeliveredWithClients = createSelector(
  getOrdersDelivered,
  getClientsMap,
  (orders, clientsMap) => {
    if (!clientsMap) return []
    return orders.map(order => ({
      ...order,
      client: clientsMap[order.clientId]
    }))
  }
)
