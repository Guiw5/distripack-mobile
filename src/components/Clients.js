import React from 'react'
import Select from './Select'
import { ListItem } from 'react-native-elements'

export default class Clients extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.clients.length === 0) this.props.loadClients()
  }

  hasOrders = clientId => {
    const { created, pending } = this.props
    return created[clientId] || pending[clientId]
  }

  onPress = client => () => {
    //check if the client has recents orders
    if (this.hasOrders(client.id)) {
      //should see last orders
      this.props.setClient(client)
      this.gotoRecentlyOrders(client)
    } else {
      //should create a the new one
      this.props.initOrder(client)
      this.gotoProducts()
    }
  }

  gotoRecentlyOrders = ({ nick }) => {
    const { navigate } = this.props.navigation
    navigate('RecentlyOrders', { title: `Ultimos Pedidos - ${nick}` })
  }

  gotoProducts = () => {
    this.props.navigation.navigate('Products')
  }

  goToNewClient = () => this.props.navigation.navigate('NewClient')

  filter = text => item =>
    item.email.toLowerCase().includes(text.toLowerCase()) ||
    item.nick.toLowerCase().includes(text.toLowerCase())

  renderItem = ({ item }) => (
    <ListItem
      title={item.nick}
      subtitle={item.email}
      bottomDivider
      subtitleStyle={{ fontSize: 12 }}
      containerStyle={{ paddingVertical: 15 }}
      onPress={this.onPress(item)}
    />
  )

  render() {
    return (
      <Select
        keyExtractor={item => item.email}
        placeholder="Escriba alias o email del cliente"
        filter={this.filter}
        refreshing={this.props.loading}
        onRefresh={this.props.loadClients}
        data={this.props.clients}
        renderItem={this.renderItem}
        button={{
          title: 'Agregar Cliente',
          onPress: this.goToNewClient
        }}
      />
    )
  }
}
