import React from 'react'
import { Keyboard } from 'react-native'
import { ListItem } from 'react-native-elements'
import { ListView } from './ListView'

export default class Skus extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  goToDetails = ({ id, price }) => () => {
    Keyboard.dismiss()
    const item = { skuId: id, price, quantity: 1 }
    this.props.navigation.navigate('Details', { item })
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
        rightSubtitle={`$${item.price.toFixed(2)}`}
        bottomDivider
        containerStyle={{ paddingVertical: 15 }}
        onPress={this.goToDetails(item)}
      />
    )
  }

  render() {
    return (
      <ListView
        keyExtractor={item => `${item.id}`}
        renderItem={this.renderItem}
        data={this.props.skus}
      />
    )
  }
}
