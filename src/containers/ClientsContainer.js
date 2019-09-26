import { connect } from 'react-redux'
import actions from '../store/actions'
import selectors from '../store/selectors'
import Clients from '../components/Clients'

const mapStateToProps = state => {
  return {
    clients: selectors.getClients(state),
    created: selectors.getOrdersCreatedByClients(state),
    pending: selectors.getOrdersPendingByClients(state),
    delivered: selectors.getOrdersDeliveredByClients(state),
    loading: selectors.getClientsLoading(state)
  }
}

const mapDispatchToProps = dispatch => ({
  loadClients: () => dispatch(actions.fetchClients()),
  initOrder: clientId => dispatch(actions.initOrder(clientId)),
  setClient: client => dispatch(actions.setClient(client))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Clients)
