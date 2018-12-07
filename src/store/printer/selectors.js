import { createSelector } from 'reselect'

export const getPrintStatus = state => state.printer.status
export const getPrintLoading = state => state.printer.loading
