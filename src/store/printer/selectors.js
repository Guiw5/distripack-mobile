import { createSelector } from 'reselect'

export const getPrintJobState = state => state.printer.status
export const getPrinterStatus = state =>
  state.printer.data.status.sort((a, b) => a.timestamp > b.timestamp)
export const getPrintLoading = state =>
  state.printer.loading || state.orders.loading
