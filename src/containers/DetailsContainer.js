import { connect } from 'react-redux'
import actions from '../store/actions'
import { DetailsTab } from '../components/DetailsTab'
import selectors from '../store/selectors'

const mapStateToProps = state => {
  return { client: selectors.getClient(state) }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return { getClient: id => dispatch(actions.fetchClient(id)) }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsTab)
