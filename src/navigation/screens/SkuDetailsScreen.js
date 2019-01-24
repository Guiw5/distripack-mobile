import React from 'react'
import SkuDetailsContainer from '../../containers/SkuDetailsContainer'

export default class SkuDetailsScreen extends React.Component {
  render() {
    return <SkuDetailsContainer navigation={this.props.navigation} />
  }
}
