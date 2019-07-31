import { connect } from 'react-redux'
import actions from '../store/actions'
import selectors from '../store/selectors'
import Clients from '../components/Clients'

const mapStateToProps = state => {
  return {
    clients: selectors.getClients(state),
    created: selectors.getOrdersCreatedByClient(state),
    pending: selectors.getOrdersPendingByClient(state),
    delivered: selectors.getOrdersDeliveredByClient(state)
  }
}

const mapDispatchToProps = dispatch => ({
  setOrder: order => dispatch(actions.setOrder(order)),
  setClient: id => dispatch(actions.setClient(id)),
  loadClients: () => dispatch(actions.fetchClients())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Clients)
