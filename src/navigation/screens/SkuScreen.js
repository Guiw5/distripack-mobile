import React from 'react'
import SkusContainer from '../../containers/SkusContainer'

export default class SkuScreen extends React.Component {
  render() {
    return <SkusContainer navigation={this.props.navigation} />
  }
}
