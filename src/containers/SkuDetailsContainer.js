import { connect } from 'react-redux'
import actions from '../store/actions'
import selectors from '../store/selectors'
import SkuDetails from '../components/SkuDetails'

const mapStateToProps = (state, ownProps) => {
  let skuId = ownProps.navigation.getParam('skuId')
  let sku = selectors.getSkusMap(state)[skuId]
  let isLoading = selectors.getProductsLoading(state)
  let isUpdate = ownProps.navigation.getParam('isUpdate')
  let item = isUpdate
    ? selectors.getItemFromOrder(state, skuId)
    : { skuId, quantity: 1, price: sku.price }
  return { isUpdate, sku, item, isLoading }
}

const mapDispatchToProps = dispatch => ({
  add: item => dispatch(actions.addItem(item)),
  modify: item => dispatch(actions.modifyItem(item))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SkuDetails)
