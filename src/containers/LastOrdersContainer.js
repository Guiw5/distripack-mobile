import { connect } from 'react-redux'
import selectors from '../store/selectors'
import actions from '../store/actions'
import LastOrders from '../components/LastOrders'

const mapStateToProps = state => ({
  clientsLoaded: selectors.getClients(state),
  clients: selectors.getClientsFromOrders(state),
  orders: selectors.getOrders(state)
})

const mapDispatchToProps = dispatch => ({
  setOrder: order => dispatch(actions.setOrder(order)),
  loadOrders: () => dispatch(actions.fetchOrders()),
  loadClients: () => dispatch(actions.loadClients())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LastOrders)
