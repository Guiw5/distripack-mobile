import createSelector from 'reselect'

export const getClients = state => state.clients.data

export const getClientsError = state => state.clients.error

export const getClientsLoading = state => state.clients.loading

export const getClientsMap = state => getClients(state).toDictionary()
