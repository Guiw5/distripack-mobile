import React from 'react'
import LastOrdersContainer from '../../containers/LastOrdersContainer'

export default class LastOrdersScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <LastOrdersContainer navigation={this.props.navigation} />
  }
}
