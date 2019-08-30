import { connect } from 'react-redux'
import actions from '../store/actions'
import selectors from '../store/selectors'
import Account from '../components/Account'

const mapStateToProps = (state, ownProps) => {
  const { client } = ownProps.navigation.getParam('account')
  return {
    client: client,
    account: selectors.getAccount(state),
    transactions: selectors.getTransactions(state),
    loading: selectors.getTransactionsLoading(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let { id } = ownProps.navigation.getParam('account').client
  return {
    getClient: () => dispatch(actions.fetchClient(id)),
    getAccount: () => dispatch(actions.fetchAccount(id)),
    getTransactions: () => dispatch(actions.fetchTransactions(id))
  }
}

const mergeProps = (state, dispatch, ownProps) => {
  let { navigation, ...myOwnProps } = ownProps
  return {
    ...myOwnProps,
    screenProps: {
      ...myOwnProps.screenProps,
      ...state,
      ...dispatch,
      rootNavigation: navigation
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Account)
