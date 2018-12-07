import { connect } from 'react-redux'
import selectors from '../store/selectors'
import actions from '../store/actions'
import ToPrint from '../components/ToPrint'

const mapStateToProps = state => ({
  orders: selectors.getOrdersWithClients(state),
  clients: selectors.getClientsFromOrders(state),
  status: selectors.getPrintStatus(state),
  printing: selectors.getPrintLoading(state),
  loadingOrders: selectors.getOrdersLoading(state),
  loadingClients: selectors.getClientsLoading(state)
})

const mapDispatchToProps = dispatch => ({
  clearStatus: key => dispatch(actions.clearStatus(key)),
  checkPrinterStatus: () => dispatch(actions.checkPrinterStatus()),
  printOrders: orders => dispatch(actions.printOrders(orders)),
  setOrder: order => dispatch(actions.setOrder(order)),
  loadOrders: () => dispatch(actions.fetchOrders()),
  loadClients: () => dispatch(actions.fetchClients())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToPrint)
