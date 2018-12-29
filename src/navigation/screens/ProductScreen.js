import React from 'react'
import ProductsContainer from '../../containers/ProductsContainer'

export default class ProductScreen extends React.Component {
  render() {
    return <ProductsContainer navigation={this.props.navigation} />
  }
}
