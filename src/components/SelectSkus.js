import React from 'react'
import { Keyboard } from 'react-native'
import { ListItem } from 'react-native-elements'
import ListView from './ListView'
import memoize from 'lodash/memoize'

export default class SelectSkus extends React.PureComponent {
  constructor(props) {
    super(props)
    this.onPress = memoize(item => () => this.goToDetails(item))
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
        rightSubtitle={`${item.price.toFixed(2)}`}
        containerStyle={{ borderBottomWidth: 0 }}
        onPress={this.onPress(item)}
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
