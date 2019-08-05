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

  hasOrders = id => {
    const { created, pending } = this.props
    return created[id] || pending[id]
  }

  onPress = ({ id, nick }) => () => {
    const parent = this.props.navigation.dangerouslyGetParent()
    //cames from New Order Flow?
    if (parent.state.routeName === 'NewOrder') {
      //check if the client has orders
      if (this.hasOrders(id)) {
        //should see the list
        this.gotoOrdersByClient(id, nick)
      } else {
        //should create a the new one
        this.gotoProducts(id)
      }
    } else {
      //cames from Clients Info Flow
      this.gotoDetails(id)
    }
  }

  gotoDetails = id => {
    this.props.navigation.navigate('Details', {
      clientId: id
    })
  }

  gotoOrdersByClient = (id, nick) => {
    this.props.navigation.navigate('RecentlyOrders', { clientId: id, nick })
  }

  gotoProducts = id => {
    this.props.setClient(id)
    this.props.navigation.navigate('Products')
  }

  goToClient = () => this.props.navigation.navigate('Client')

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
        data={this.props.clients}
        renderItem={this.renderItem}
        button={{
          title: 'Agregar Cliente',
          onPress: this.goToClient
        }}
      />
    )
  }
}
