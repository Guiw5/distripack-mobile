import { connect } from 'react-redux'
import actions from '../store/actions'
import selectors from '../store/selectors'
import Order from '../components/Order'

const mapStateToProps = state => ({
  client: selectors.getClientFromOrder(state),
  order: selectors.getOrder(state),
  error: selectors.getOrderError(state),
  isUpdate: selectors.isOrderUpdate(state)
})

const mapDispatchToProps = dispatch => ({
  removeItems: items => dispatch(actions.removeItems(items)),
  create: order => dispatch(actions.createOrder(order)),
  modify: order => dispatch(actions.modifyOrder(order))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order)
