import React from 'react'
import OrderClientsContainer from '../../containers/OrderClientsContainer'

export default class OrderClientsScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <OrderClientsContainer navigation={this.props.navigation} />
  }
}
