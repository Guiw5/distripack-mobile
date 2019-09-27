import { connect } from 'react-redux'
import actions from '../store/actions'
import selectors from '../store/selectors'
import Accounts from '../components/Accounts'

const mapStateToProps = state => ({
  accounts: selectors.getAccounts(state),
  loading: selectors.getAccountsLoading(state)
})

const mapDispatchToProps = dispatch => ({
  loadAccounts: () => dispatch(actions.fetchAccounts()),
  setClient: client => dispatch(actions.setClient(client))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Accounts)
