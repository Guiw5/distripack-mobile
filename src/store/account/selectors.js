import { createSelector } from 'reselect'

export const getAccount = state => state.account.data

export const getAccountError = state => state.account.error

export const getAccountLoading = state => state.account.loading
