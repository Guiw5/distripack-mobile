import { createSelector } from 'reselect'

export const getClient = state => state.client.data

export const getClientError = state => state.client.error

export const getClientLoading = state => state.client.loading
