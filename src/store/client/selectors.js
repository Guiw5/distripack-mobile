import { createSelector } from 'reselect'

export const getClient = (state, id) => {
  if (state.client.data !== null && state.client.data.id === id)
    return state.client.data
  return null
}

export const getClientError = state => state.client.error

export const getClientLoading = state => state.client.loading
