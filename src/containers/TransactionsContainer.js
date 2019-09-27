import { connect } from 'react-redux'
import actions from '../store/actions'
import selectors from '../store/selectors'
import { TransactionsTab } from '../components/TransactionsTab'

const mapStateToProps = (state, ownProps) => ({
  account: ownProps.navigation.getParam('account'),
  transactions: selectors.getTransactions(state),
  loading: selectors.getTransactionsLoading(state)
})

const mapDispatchToProps = (dispatch, ownProps) => {
  let {
    client: { id }
  } = ownProps.navigation.getParam('account')
  return {
    getAccount: () => dispatch(actions.fetchAccount(id)),
    getTransactions: () => dispatch(actions.fetchTransactions(id)),
    loadOrder: orderId => dispatch(actions.loadOrder(orderId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsTab)
