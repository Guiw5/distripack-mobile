import React from 'react'
import Select from './Select'
import { ListItem, Icon } from 'react-native-elements'
import { myColors } from '../lib/commons'

export default class Accounts extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.accounts.length === 0) this.props.loadAccounts()
  }

  gotoDetails = account => () => {
    const { navigation, setClient } = this.props
    setClient(account.client)
    navigation.navigate('Account', { account })
  }

  filter = text => item =>
    item.client.email.toLowerCase().includes(text.toLowerCase()) ||
    item.client.nick.toLowerCase().includes(text.toLowerCase())

  renderItem = ({ item: account }) => (
    <ListItem
      title={account.client.nick}
      subtitle={account.client.email}
      rightTitle={`$ ${account.currentBalance.toFixed(2)}`}
      rightTitleStyle={{
        color: account.currentBalance >= 0 ? myColors.green : myColors.danger
      }}
      bottomDivider
      leftIcon={
        <Icon type="material-community" name="format-list-checks" size={24} />
      }
      subtitleStyle={{ fontSize: 12 }}
      containerStyle={{ paddingVertical: 15 }}
      onPress={this.gotoDetails(account)}
    />
  )

  render() {
    return (
      <Select
        keyExtractor={item => item.client.email}
        placeholder="Escriba alias o email del cliente"
        filter={this.filter}
        refreshing={this.props.loading}
        onRefresh={this.props.loadAccounts}
        data={this.props.accounts}
        renderItem={this.renderItem}
      />
    )
  }
}
