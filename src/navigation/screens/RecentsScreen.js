import React from 'react'
import RecentsContainer from '../../containers/RecentsContainer'

export default class RecentsScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <RecentsContainer navigation={this.props.navigation} />
  }
}
