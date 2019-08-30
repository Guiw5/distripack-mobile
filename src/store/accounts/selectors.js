import { createSelector } from 'reselect'

export const getAccounts = state => state.accounts.data

export const getAccountsError = state => state.accounts.error

export const getAccountsLoading = state => state.accounts.loading
