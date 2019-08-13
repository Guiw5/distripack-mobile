import { createSelector } from 'reselect'

export const getTransactions = state => state.transactions.data

export const getTransactionsError = state => state.transactions.error

export const getTransactionsLoading = state => state.transactions.loading
