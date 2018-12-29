import React from 'react'
import ClientsContainer from '../../containers/ClientsContainer'

export default class ClientsScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <ClientsContainer navigation={this.props.navigation} />
  }
}
