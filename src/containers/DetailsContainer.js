import React from 'react'
import { colors } from 'react-native-elements'
import { connect } from 'react-redux'
import actions from '../store/actions'
import selectors from '../store/selectors'

const editIconProps = {
  type: 'materialIcons',
  name: 'edit',
  color: colors.primary,
  size: 20
}

const mapStateToProps = (state, ownProps) => {
  let skuId = ownProps.navigation.getParam('skuId')
  let isUpdate = selectors.getItemFromOrder(state, skuId)
  let skus = selectors.getSkusMap(state)
  let sku = skus[skuId]
  let item = isUpdate ? isUpdate : { skuId, quantity: 1, price: sku.price }
  return { isUpdate, sku, item }
}

const mapDispatchToProps = dispatch => ({
  add: item => dispatch(actions.addItem(item)),
  modify: item => dispatch(actions.modifyItem(item))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details)
