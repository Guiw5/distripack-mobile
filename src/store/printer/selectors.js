import { createSelector } from 'reselect'

export const getPrintJobStatus = state => state.printer.data.state
export const getPrinterStatus = state =>
  state.printer.data.status.sort((a, b) => a.timestamp > b.timestamp)
export const getPrintLoading = state => state.printer.loading
