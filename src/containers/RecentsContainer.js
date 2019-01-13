import { connect } from 'react-redux'
import selectors from '../store/selectors'
import actions from '../store/actions'
import Recents from '../components/Recents'

const mapStateToProps = state => ({
  clients: selectors.getClients(state),
  orders: selectors.getOrdersCreatedWithClients(state),
  printState: selectors.getPrintJobStatus(state),
  printing: selectors.getPrintLoading(state),
  loadingOrders: selectors.getOrdersLoading(state),
  loadingClients: selectors.getClientsLoading(state)
})

const mapDispatchToProps = dispatch => ({
  checkPrinterStatus: () => dispatch(actions.checkPrinterStatus()),
  printOrders: orders => dispatch(actions.print(orders)),
  deleteOrders: orders => dispatch(actions.deleteOrders(orders)),
  setOrder: order => dispatch(actions.setOrder(order)),
  loadOrders: () => dispatch(actions.fetchOrdersCreated()),
  loadClients: () => dispatch(actions.fetchClients()),
  clearState: () => dispatch(actions.clearState())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recents)
