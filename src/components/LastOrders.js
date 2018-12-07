import React from 'react'
import { ListItem } from 'react-native-elements'

import Select from './Select'

export default class LastOrders extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadClients()
    this.props.loadOrders()
  }

  filter = text => item =>
    item.mail.toLowerCase().includes(text.toLowerCase()) ||
    item.nick.toLowerCase().includes(text.toLowerCase())

  onPress = item => {
    console.log(item)
  }

  renderItem = ({ item }) => (
    <ListItem
      title={item.nick}
      subtitle={item.mail}
      subtitleStyle={{ fontSize: 12 }}
      onPress={this.onPress}
      containerStyle={{ borderBottomWidth: 0, paddingVertical: 10 }}
    />
  )

  render() {
    return (
      <Select
        keyExtractor={item => item.mail}
        placeholder="Escriba alias o mail del cliente"
        filter={this.filter}
        data={this.props.clients}
        renderItem={this.renderItem}
      />
    )
  }
}
