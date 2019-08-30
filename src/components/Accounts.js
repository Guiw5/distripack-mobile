import React from 'react'
import Select from './Select'
import { ListItem } from 'react-native-elements'

export default class Accounts extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.accounts.length === 0) this.props.loadAccounts()
  }

  gotoDetails = account => () => {
    this.props.navigation.navigate('Account', {
      account
    })
  }

  filter = text => item =>
    item.client.email.toLowerCase().includes(text.toLowerCase()) ||
    item.client.nick.toLowerCase().includes(text.toLowerCase())

  renderItem = ({ item }) => (
    <ListItem
      title={item.client.nick}
      subtitle={item.client.email}
      rightTitle={`$ ${item.currentBalance}`}
      bottomDivider
      subtitleStyle={{ fontSize: 12 }}
      containerStyle={{ paddingVertical: 15 }}
      onPress={this.gotoDetails(item)}
    />
  )

  render() {
    return (
      <Select
        keyExtractor={item => item.client.email}
        placeholder="Escriba alias o email del cliente"
        filter={this.filter}
        data={this.props.accounts}
        renderItem={this.renderItem}
      />
    )
  }
}
