import React from 'react'
import PendingsContainer from '../../containers/PendingsContainer'

export default class PendingsScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <PendingsContainer navigation={this.props.navigation} />
  }
}
