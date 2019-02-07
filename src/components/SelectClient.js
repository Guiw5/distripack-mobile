import React from 'react'
import SelectClientBase from './SelectClientBase'

export default class SelectClient extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.clients.length === 0) this.props.loadClients()
  }

  filter = text => item =>
    item.mail.toLowerCase().includes(text.toLowerCase()) ||
    item.nick.toLowerCase().includes(text.toLowerCase())

  onPress = item => {
    this.props.navigation.navigate('Details', { clientId: item.id })
  }

  goToClient = () => this.props.navigation.navigate('Client')

  render() {
    return (
      <SelectClientBase
        keyExtractor={item => item.mail}
        filter={this.filter}
        onPress={this.onPress}
        data={this.props.clients}
        button={{ title: 'Agregar Cliente', onPress: this.goToClient }}
      />
    )
  }
}
