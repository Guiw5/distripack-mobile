import { connect } from 'react-redux'
import actions from '../store/actions'
import selectors from '../store/selectors'
import RecentlyOrders from '../components/RecentlyOrders'

const mapStateToProps = state => ({
  client: selectors.getClient(state),
  created: selectors.getOrdersCreatedFromClient(state),
  pending: selectors.getOrdersPendingFromClient(state),
  delivered: selectors.getOrdersDeliveredFromClient(state)
})

const mapDispatchToProps = dispatch => ({
  init: clientId => dispatch(actions.init(clientId)),
  setOrder: order => dispatch(actions.setOrder(order))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentlyOrders)
