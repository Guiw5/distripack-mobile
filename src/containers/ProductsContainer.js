import { connect } from 'react-redux'
import actions from '../store/actions'
import selectors from '../store/selectors'
import Products from '../components/Products'

const mapStateToProps = state => ({
  products: selectors.getProducts(state),
  client: selectors.getClientFromOrder(state),
  order: selectors.getOrder(state),
  loading: selectors.getProductsLoading(state)
})

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(actions.loadProducts())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products)
