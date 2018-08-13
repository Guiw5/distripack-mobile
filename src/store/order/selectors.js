import createSelector from 'reselect'
import selectors from '../selectors'

export const getOrder = state => state.order.order

// export const getFullOrder = createSelector(
//   selectors.getClientsMap,
//   selectors.getSkus,
//   selectors.getOrder,
//   (clients, skus, order) => {
//     order[client] = clients[order.clientId]
//     order.skus.map(s => skus[s])
//   }
// )
