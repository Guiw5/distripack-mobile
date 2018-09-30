import React from 'react'
import SelectProducts from '../../components/SelectProducts'

export default class ProductScreen extends React.Component {
  render() {
    return <SelectProducts navigation={this.props.navigation} />
  }
}
