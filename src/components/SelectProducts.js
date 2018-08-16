import React from 'react'
import { connect } from 'react-redux'
import { Keyboard } from 'react-native'
import { ListItem } from 'react-native-elements'

import Select from './Select'
import actions from '../store/actions'
import selectors from '../store/selectors'

class SelectProducts extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('products did mount', this.props.products.length)
    if (this.props.products.length === 0) this.props.loadProducts()
  }

  filter = text => item => {
    if (text.length < 1) return true
    let name = item.name.toLowerCase()
    let nick = item.nick.replace('/', ' ').toLowerCase()
    let query = text.replace('/', ' ').toLowerCase()

    let isInProductName = text => name.contains(text) || nick.contains(text)

    let words = query.split(' ')
    return isInProductName(query) || words.every(isInProductName)
  }

  goToDetails = product => {
    Keyboard.dismiss()

    if (product.skus.length > 1)
      this.props.navigation.navigate('Skus', { productId: product.id })
    else {
      let skuId = product.skus[0].id
      this.props.navigation.navigate('Details', { skuId })
    }
  }

  goToOrder = () => {
    this.props.navigation.navigate('Order')
  }

  renderItem = ({ item }) => (
    <ListItem
      title={item.nick.toProperCase()}
      subtitle={item.name.toProperCase()}
      subtitleStyle={{ fontSize: 12 }}
      rightSubtitle={
        item.skus.length > 1 ? '+' : '$' + item.skus[0].price.toFixed(2)
      }
      containerStyle={{ borderBottomWidth: 0 }}
      onPress={() => this.goToDetails(item)}
    />
  )

  render() {
    const { order } = this.props
    return (
      <Select
        keyExtractor={item => `${item.id}`}
        placeholder="Escriba nombre o alias del producto"
        renderItem={this.renderItem}
        filter={this.filter}
        data={this.props.products}
        button={
          order.items && order.items.length > 0
            ? {
                title: 'Ver Pedido (' + order.items.length + ')',
                onPress: this.goToOrder
              }
            : null
        }
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    products: selectors.getProducts(state),
    order: selectors.getOrder(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadProducts: () => {
      dispatch(actions.loadProducts())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectProducts)
