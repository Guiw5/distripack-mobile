import React from 'react'
import NewClientContainer from '../../containers/NewClientContainer'

export default class ClientScreen extends React.Component {
  render() {
    return <NewClientContainer navigation={this.props.navigation} />
  }
}
