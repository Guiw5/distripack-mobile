import { connect } from 'react-redux'
import selectors from '../store/selectors'
import actions from '../store/actions'
import LastOrders from '../components/LastOrders'

const mapStateToProps = state => ({
  clientsLoaded: selectors.getClients(state),
  orders: selectors.getOrders(state),
  clients: selectors.getClientsFromOrders(state),
  ordersMap: selectors.getOrdersMap(state)
})

const mapDispatchToProps = dispatch => ({
  setOrder: order => dispatch(actions.setOrder(order)),
  loadOrders: () => dispatch(actions.fetchOrders()),
  loadClients: () => dispatch(actions.fetchClients())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LastOrders)
