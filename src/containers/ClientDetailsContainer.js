import { connect } from 'react-redux'
import actions from '../store/actions'
import selectors from '../store/selectors'
import ClientDetails from '../components/ClientDetails'

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.navigation.getParam('clientId')
  return {
    client: selectors.getClient(state, id),
    account: selectors.getAccount(state, id),
    transactions: selectors.getTransactions(state, id),
    loading: selectors.getTransactionsLoading(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let id = ownProps.navigation.getParam('clientId')
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
)(ClientDetails)
