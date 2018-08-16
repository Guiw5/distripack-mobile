import { createSelector } from 'reselect'
import { getClients } from '../clients/selectors'
import { getSku } from '../products/selectors'

export const getOrder = state => state.order.data

export const getOrderError = state => state.order.error

export const getClientFromOrder = createSelector(
  getClients,
  getOrder,
  (clients, order) => {
    return clients.find(c => c.id === order.clientId)
  }
)

export const getItemFromOrder = (state, skuId) =>
  getOrder(state).items.find(i => i.skuId === skuId)
