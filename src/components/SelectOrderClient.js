import React from 'react'
import { Alert } from 'react-native'
import moment from 'moment'

import SelectClientBase from './SelectClientBase'

export default class SelectOrderClient extends React.PureComponent {
  constructor(props) {
    super(props)
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

  onPress = item => this.goToProducts(item)

  goToClient = () => this.props.navigation.navigate('Client')

  render() {
    return (
      <SelectClientBase
        keyExtractor={item => item.mail}
        placeholder="Escriba alias o mail del cliente"
        filter={this.filter}
        onPress={this.onPress}
        data={this.props.clients}
        button={{ title: 'Agregar Cliente', onPress: this.goToClient }}
      />
    )
  }
}
