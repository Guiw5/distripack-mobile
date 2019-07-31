import { connect } from 'react-redux'
import actions from '../store/actions'
import selectors from '../store/selectors'
import RecentlyOrders from '../components/RecentlyOrders'

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.navigation.getParam('clientId')
  return {
    created: selectors.getOrdersCreatedByClient(state)[id],
    pending: selectors.getOrdersPendingByClient(state)[id],
    delivered: selectors.getOrdersDeliveredByClient(state)[id]
  }
}

const mapDispatchToProps = dispatch => ({
  setOrder: order => dispatch(actions.setOrder(order)),
  setClient: id => dispatch(actions.setClient(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentlyOrders)
