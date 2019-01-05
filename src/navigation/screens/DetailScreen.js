import React from 'react'
import DetailsContainer from '../../containers/DetailsContainer'

export default class DetailScreen extends React.Component {
  render() {
    return <DetailsContainer navigation={this.props.navigation} />
  }
}
