import { connect } from 'react-redux'
import actions from '../store/actions'
import selectors from '../store/selectors'
import ClientDetails from '../components/ClientDetails'

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.navigation.getParam('clientId')
  return {
    client: selectors.getClient(state, id),
    history: selectors.getHistory(state, id)
  }
}

const mapDispatchToProps = dispatch => ({
  getClient: id => dispatch(actions.fetchClient(id)),
  getHistory: id => dispatch(actions.fetchHistory(id))
})

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
