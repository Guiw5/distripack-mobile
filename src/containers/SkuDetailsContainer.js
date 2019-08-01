import { connect } from 'react-redux'
import actions from '../store/actions'
import SkuDetails from '../components/SkuDetails'
import selectors from '../store/selectors'

const mapStateToProps = (state, ownProps) => {
  let item = ownProps.navigation.getParam('item')
  let isUpdate = ownProps.navigation.getParam('isUpdate')
  let sku = selectors.getSkusMap(state)[item.skuId]
  return { isUpdate, item, sku }
}

const mapDispatchToProps = dispatch => ({
  add: item => dispatch(actions.addItem(item)),
  modify: item => dispatch(actions.modifyItem(item))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SkuDetails)
