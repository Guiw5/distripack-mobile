import React from 'react'
import AccountContainer from '../../containers/AccountContainer'

export default class AccountScreen extends React.Component {
  render() {
    return <AccountContainer navigation={this.props.navigation} />
  }
}
