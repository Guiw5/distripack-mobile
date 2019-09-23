import { connect } from 'react-redux'
import actions from '../store/actions'
import selectors from '../store/selectors'
import Clients from '../components/Clients'

const mapStateToProps = state => {
  return {
    clients: selectors.getClients(state),
    created: selectors.getOrdersCreatedByClient(state),
    pending: selectors.getOrdersPendingByClient(state),
    delivered: selectors.getOrdersDeliveredByClient(state),
    loading: selectors.getClientsLoading(state)
  }
}

const mapDispatchToProps = dispatch => ({
  loadClients: () => dispatch(actions.fetchClients()),
  setClient: client => dispatch(actions.setClient(client))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Clients)
