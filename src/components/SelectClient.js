import React from 'react'
import { Alert } from 'react-native'
import { ListItem } from 'react-native-elements'
import memoize from 'lodash/memoize'
import moment from 'moment'

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
    let orders = this.props.ordersByClient[client.id]
    if (!orders) {
      this.props.setClient(client.id)
      this.props.navigation.navigate('Products')
    } else {
      Alert.alert(
        'Pepitoo',
        `Ya existe` +
          `${orders.length > 1 ? 'n' : ' un'} pedido` +
          `${orders.length > 1 ? 's' : ''} reciente` +
          `${orders.length > 1 ? 's' : ''} para:` +
          `\n\n${client.nick}`,
        [
          ...orders.map(o => {
            return {
              text:
                `Modificar pedido` +
                `${moment(o.deliveryDate).format('DD-MM HH:mm')}hs`,
              onPress: () => {
                this.props.setOrder(o)
                this.props.navigation.navigate('Order')
              }
            }
          }),
          {
            text: 'Crear Pedido Nuevo',
            onPress: () => {
              this.props.setClient(client.id)
              this.props.navigation.navigate('Products')
            }
          }
        ]
      )
    }
  }

  renderItem = ({ item }) => (
    <ListItem
      title={item.nick}
      subtitle={item.mail}
      bottomDivider
      subtitleStyle={{ fontSize: 12 }}
      containerStyle={{ paddingVertical: 15 }}
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
