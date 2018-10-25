import React from 'react'
import SelectSkusContainer from '../../containers/SelectSkusContainer'

export default class SkuScreen extends React.Component {
  render() {
    return <SelectSkusContainer navigation={this.props.navigation} />
  }
}
