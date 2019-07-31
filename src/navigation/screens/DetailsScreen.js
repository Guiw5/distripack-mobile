import React from 'react'
import DetailsContainer from '../../containers/DetailsContainer'

export default class DetailsScreen extends React.Component {
  render() {
    return <DetailsContainer navigation={this.props.navigation} />
  }
}
