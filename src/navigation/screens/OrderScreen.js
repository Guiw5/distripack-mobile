import React from 'react'
import OrderContainer from '../../containers/OrderContainer'

export default class OrderScreen extends React.Component {
  render() {
    return <OrderContainer navigation={this.props.navigation} />
  }
}
