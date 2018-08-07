import React from 'react'
import NewClient from '../components/NewClient'

export default class ClientScreen extends React.Component {
  render() {
    return <NewClient navigation={this.props.navigation} />
  }
}
