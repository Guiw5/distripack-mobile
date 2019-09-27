import { connect } from 'react-redux'
import selectors from '../store/selectors'
import actions from '../store/actions'
import Pendings from '../components/Pendings'

const mapStateToProps = state => ({
  orders: selectors.getOrdersPendingWithClients(state),
  loading: selectors.getOrdersLoading(state)
})

const mapDispatchToProps = dispatch => ({
  deliverOrders: orders => dispatch(actions.deliverOrders(orders)),
  initOrder: (client, order) => dispatch(actions.initOrder(client, order)),
  loadOrders: () => dispatch(actions.fetchOrdersPending()),
  deleteOrders: orders => dispatch(actions.deleteOrders(orders))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pendings)
