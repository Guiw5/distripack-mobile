import React from 'react'
import RecentlyOrdersContainer from '../../containers/RecentlyOrdersContainer'

export default class RecentlyOrdersScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <RecentlyOrdersContainer navigation={this.props.navigation} />
  }
}
