import React from 'react'
import { createStackNavigator } from 'react-navigation'

import MenuButton from './MenuButton'
import AccountsScreen from './screens/AccountsScreen'
import AccountScreen from './screens/AccountScreen'

export default createStackNavigator(
  {
    Accounts: {
      screen: AccountsScreen,
      navigationOptions: props => ({
        title: 'Cuentas Corrientes',
        headerLeft: <MenuButton {...props} />
      })
    },
    Account: {
      screen: AccountScreen,
      navigationOptions: ({ navigation }) => ({
        title: `Cuenta Cte - ${navigation.getParam('account').client.nick}`
      })
    }
  },
  {
    headerMode: 'float',
    cardStyle: { backgroundColor: '#fff' }
  }
)
