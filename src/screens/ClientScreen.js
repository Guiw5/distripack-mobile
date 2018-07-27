import React from 'react'
import SelectClient from '../components/SelectClient'

export default class ClientScreen extends React.Component {
  render() {
    return <SelectClient navigation={this.props.navigation} />
  }
}
