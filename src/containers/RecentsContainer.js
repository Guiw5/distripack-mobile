import { connect } from 'react-redux'
import selectors from '../store/selectors'
import actions from '../store/actions'
import Recents from '../components/Recents'

const mapStateToProps = state => ({
  orders: selectors.getOrdersCreatedWithClients(state),
  results: selectors.getPrintJobState(state),
  printing: selectors.getPrintLoading(state),
  loadingOrders: selectors.getOrdersLoading(state)
})

const mapDispatchToProps = dispatch => ({
  getStatus: () => dispatch(actions.status()),
  printOrders: orders => dispatch(actions.print(orders)),
  deleteOrders: orders => dispatch(actions.deleteOrders(orders)),
  initOrder: (client, order) => dispatch(actions.initOrder(client, order)),
  loadOrders: () => dispatch(actions.fetchOrdersCreated()),
  clearState: () => dispatch(actions.clearState())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recents)
