import React from 'react'
import SelectSkus from '../components/SelectSkus'

export default class SkuScreen extends React.Component {
  render() {
    return <SelectSkus navigation={this.props.navigation} />
  }
}
