import React from 'react'
import ProductsContainer from '../../containers/ProductsContainer'
import ProductsPerformance from '../../components/ProductsPerformance'

export default class ProductScreen extends React.Component {
  render() {
    return <ProductsPerformance navigation={this.props.navigation} />
  }
}
