import { connect } from 'react-redux'
import actions from '../store/actions'
import selectors from '../store/selectors'
import SelectProducts from '../components/SelectProducts'

const mapStateToProps = state => ({
  products: selectors.getProducts(state),
  order: selectors.getOrder(state)
})

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(actions.loadProducts())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectProducts)
