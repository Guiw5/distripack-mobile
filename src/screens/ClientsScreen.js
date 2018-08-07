import React from 'react'
import SelectClient from '../components/SelectClient'

export default class ClientsScreen extends React.Component {
  render() {
    return <SelectClient navigation={this.props.navigation} />
  }
}
