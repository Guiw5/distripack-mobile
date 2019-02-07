import React from 'react'
import ClientDetailsContainer from '../../containers/ClientDetailsContainer'

export default class ClientDetailScreen extends React.Component {
  render() {
    return <ClientDetailsContainer navigation={this.props.navigation} />
  }
}
