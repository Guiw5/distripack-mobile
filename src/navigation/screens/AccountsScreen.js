import React from 'react'
import AccountsContainer from '../../containers/AccountsContainer'

export default class AccountsScreen extends React.Component {
  render() {
    return <AccountsContainer navigation={this.props.navigation} />
  }
}
