import { connect } from 'react-redux'
import actions from '../store/actions'
import { DetailsTab } from '../components/DetailsTab'

const mapStateToProps = (state, ownProps) => {
  const { client } = ownProps.navigation.getParam('account')
  return { client: client }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let { id } = ownProps.navigation.getParam('account').client
  return { getClient: () => dispatch(actions.fetchClient(id)) }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsTab)
