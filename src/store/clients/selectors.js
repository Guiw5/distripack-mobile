import createSelector from 'reselect'

export const getClients = state => state.clients.data

export const getClientsMap = state => getClients(state).toDictionary()
