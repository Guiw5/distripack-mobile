import React from 'react'

export default class ProductScreen extends React.Component {
  render() {
    return <SelectProductsContainers navigation={this.props.navigation} />
  }
}
