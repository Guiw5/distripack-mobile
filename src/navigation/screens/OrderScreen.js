import React from 'react'
import Order from '../../components/Order'

export default class OrderScreen extends React.Component {
  render() {
    return <Order navigation={this.props.navigation} />
  }
}
