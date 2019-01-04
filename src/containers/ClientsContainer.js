import { connect } from 'react-redux'
import actions from '../store/actions'
import selectors from '../store/selectors'
import SelectClient from '../components/SelectClient'

const mapStateToProps = state => ({
  clients: selectors.getClients(state),
  ordersByClient: selectors.getOrdersCreatedByClient(state)
})

const mapDispatchToProps = dispatch => ({
  setOrder: order => dispatch(actions.setOrder(order)),
  setClient: id => dispatch(actions.setClient(id)),
  loadClients: () => dispatch(actions.fetchClients())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectClient)
