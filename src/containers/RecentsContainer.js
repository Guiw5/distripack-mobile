import { connect } from 'react-redux'
import selectors from '../store/selectors'
import actions from '../store/actions'
import Recents from '../components/Recents'

const mapStateToProps = state => ({
  orders: selectors.getOrdersCreatedWithClients(state),
  clients: selectors.getClientsFromOrdersCreated(state),
  printState: selectors.getPrintJobStatus(state),
  printing: selectors.getPrintLoading(state),
  loadingOrders: selectors.getOrdersLoading(state),
  loadingClients: selectors.getClientsLoading(state)
})

const mapDispatchToProps = dispatch => ({
  checkPrinterStatus: () => dispatch(actions.checkPrinterStatus()),
  printOrders: orders => dispatch(actions.print(orders)),
  setOrder: order => dispatch(actions.setOrder(order)),
  loadOrders: () => dispatch(actions.fetchOrdersCreated()),
  loadClients: () => dispatch(actions.fetchClients())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recents)
