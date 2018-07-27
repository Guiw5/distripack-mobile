import React from 'react'
import Details from '../components/Details'

export default class DetailScreen extends React.Component {
  render() {
    return <Details navigation={this.props.navigation} />
  }
}
