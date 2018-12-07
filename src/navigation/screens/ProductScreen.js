import React from 'react'
import SelectProductsContainer from '../../containers/SelectProductsContainer'

export default class ProductScreen extends React.Component {
  render() {
    return <SelectProductsContainer navigation={this.props.navigation} />
  }
}
