import { connect } from 'react-redux'
import selectors from '../store/selectors'
import SelectSkus from '../components/SelectSkus'

const mapStateToProps = (state, ownProps) => {
  let productId = ownProps.navigation.getParam('productId')
  return {
    order: selectors.getOrder(state),
    skus: selectors.getSkusByProduct(state, productId)
  }
}

export default connect(
  mapStateToProps,
  null
)(SelectSkus)
