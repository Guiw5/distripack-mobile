import React, { PureComponent } from 'react'
import { Keyboard } from 'react-native'
import { ListItem } from 'react-native-elements'
import memoize from 'lodash/memoize'

import Select from './Select'

export default class Products extends PureComponent {
  constructor(props) {
    super(props)
    this.onPress = memoize(item => () => this.goToDetails(item))
    this.rightSubtitle = memoize(item => this.rightSubtitleFn(item))
  }

  componentDidMount() {
    if (this.props.products.length === 0) this.props.loadProducts()
  }

  filter = text => item => {
    if (text.length < 2) return true
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
      const { id, price } = product.skus[0]
      const item = { skuId: id, price, quantity: 1 }
      this.props.navigation.navigate('Details', { item })
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
    const { order, navigation } = this.props
    return (
      <Select
        keyExtractor={item => `${item.id}`}
        placeholder="Escriba nombre o alias del producto"
        renderItem={this.renderItem}
        refreshing={this.props.loading}
        onRefresh={this.props.loadProducts}
        filter={this.filter}
        data={this.props.products}
        button={{
          title: `${this.props.client.nick} (${order.items.length})`,
          onPress: this.goToOrder,
          disabled: order.items.length == 0
        }}
      />
    )
  }
}
