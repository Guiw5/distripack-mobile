import { createSelector } from 'reselect'

export const getPrintJobStatus = state => state.printer.data.state
export const getPrinterStatus = state => state.printer.data.status
export const getPrintLoading = state => state.printer.loading
