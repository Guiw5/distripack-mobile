import { createSelector } from 'reselect'

export const getHistory = state => state.history.data

export const getHistoryError = state => state.history.error

export const getHistoryLoading = state => state.history.loading
