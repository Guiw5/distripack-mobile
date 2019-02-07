import { connect } from 'react-redux'
import actions from '../store/actions'
import selectors from '../store/selectors'
import SelectClient from '../components/SelectClient'

const mapStateToProps = state => ({
  clients: selectors.getClients(state)
})

const mapDispatchToProps = dispatch => ({
  loadClients: () => dispatch(actions.fetchClients())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectClient)
