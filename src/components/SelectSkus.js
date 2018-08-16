import React from 'react'
import { Keyboard, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import selectors from '../store/selectors'
import { connect } from 'react-redux'
import ListView from './ListView'

class SelectSkus extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  goToDetails = sku => {
    Keyboard.dismiss()
    this.props.navigation.navigate('Details', { skuId: sku.id })
  }

  goToOrder = () => {
    this.props.navigation.navigate('Order')
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        title={item.nick.toProperCase()}
        subtitle={item.description.toProperCase()}
        subtitleStyle={{ fontSize: 12 }}
        rightSubtitle={'$' + item.price.toFixed(2)}
        containerStyle={{ borderBottomWidth: 0 }}
        onPress={() => this.goToDetails(item)}
      />
    )
  }

  render() {
    return (
      <ListView
        keyExtractor={item => item.code}
        renderItem={this.renderItem}
        data={this.props.skus}
      />
    )
  }
}

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
