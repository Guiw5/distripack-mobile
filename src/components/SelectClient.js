import React from 'react'
import { ListItem } from 'react-native-elements'
import memoize from 'lodash/memoize'

import Select from './Select'

export default class SelectClient extends React.PureComponent {
  constructor(props) {
    super(props)
    this.onPress = memoize(item => () => this.goToProducts(item))
  }

  componentDidMount() {
    if (this.props.clients.length === 0) this.props.loadClients()
  }

  filter = text => item =>
    item.mail.toLowerCase().includes(text.toLowerCase()) ||
    item.nick.toLowerCase().includes(text.toLowerCase())

  goToProducts = client => {
    let order = this.props.ordersMap[client.id]
    if (order) {
      this.props.setOrder(order)
      this.props.navigation.navigate('Order')
    } else {
      this.props.setClient(client.id)
      this.props.navigation.navigate('Products')
    }
  }

  renderItem = ({ item }) => (
    <ListItem
      title={item.nick}
      subtitle={item.mail}
      subtitleStyle={{ fontSize: 12 }}
      containerStyle={{ borderBottomWidth: 0 }}
      onPress={this.onPress(item)}
    />
  )

  goToClient = () => this.props.navigation.navigate('Client')

  render() {
    return (
      <Select
        keyExtractor={item => item.mail}
        placeholder="Escriba alias o mail del cliente"
        filter={this.filter}
        data={this.props.clients}
        renderItem={this.renderItem}
        button={{ title: 'Agregar Cliente', onPress: this.goToClient }}
      />
    )
  }
}
