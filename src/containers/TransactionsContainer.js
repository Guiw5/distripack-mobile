import { connect } from 'react-redux'
import actions from '../store/actions'
import selectors from '../store/selectors'
import { TransactionsTab } from '../components/TransactionsTab'

const mapStateToProps = state => ({
  account: selectors.getAccount(state),
  transactions: selectors.getTransactions(state),
  loading: selectors.getTransactionsLoading(state)
})

const mapDispatchToProps = (dispatch, ownProps) => {
  let { id } = ownProps.navigation.getParam('account').client
  return {
    getAccount: () => dispatch(actions.fetchAccount(id)),
    getTransactions: () => dispatch(actions.fetchTransactions(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsTab)
