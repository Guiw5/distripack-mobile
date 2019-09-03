import { createSelector } from 'reselect'

export const getClients = state => state.clients.data

export const getClientsError = state => state.clients.error

export const getClientsLoading = state => state.clients.loading

export const getClientEmails = createSelector(
  getClients,
  clients => {
    return clients.map(x => x.email)
  }
)

export const getClientsMap = createSelector(
  getClients,
  clients => {
    if (clients.length === 0) return null
    return clients.reduce((dict, client) => {
      dict[client.id] = client
      return dict
    }, {})
  }
)
