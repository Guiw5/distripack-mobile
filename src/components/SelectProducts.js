import React from 'react'
import { Keyboard } from 'react-native'
import { ListItem } from 'react-native-elements'
import memoize from 'lodash/memoize'

import Select from './Select'

export default class SelectProducts extends React.PureComponent {
  constructor(props) {
    super(props)
    this.onPress = memoize(item => () => this.goToDetails(item))
    this.rightSubtitle = memoize(item => this.rightSubtitleFn(item))
  }

  componentDidMount() {
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

  rightSubtitleFn = item =>
    item.skus.length > 1 ? '+' : `$${item.skus[0].price.toFixed(2)}`

  renderItem = ({ item }) => (
    <ListItem
      title={item.nick.toUpperCase()}
      subtitle={item.name.toProperCase()}
      subtitleStyle={{ fontSize: 12 }}
      rightSubtitle={this.rightSubtitle(item)}
      bottomDivider
      containerStyle={{ paddingVertical: 15 }}
      onPress={this.onPress(item)}
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
        button={this.getButtonProps(order)}
      />
    )
  }

  getButtonProps = order => {
    if (order.items && order.items.length > 0)
      return {
        title: 'Ver Pedido (' + order.items.length + ')',
        onPress: this.goToOrder
      }
    return null
  }
}
