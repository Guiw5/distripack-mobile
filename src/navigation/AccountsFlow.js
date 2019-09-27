import React from 'react'
import { createStackNavigator } from 'react-navigation'

import MenuButton from './MenuButton'
import AccountsScreen from './screens/AccountsScreen'
import AccountScreen from './screens/AccountScreen'
import OrderScreen from './screens/OrderScreen'

export default createStackNavigator({
  Accounts: {
    screen: AccountsScreen,
    navigationOptions: props => ({
      title: 'Cuentas Corrientes',
      headerLeft: <MenuButton {...props} />
    })
  },
  Account: {
    screen: AccountScreen,
    navigationOptions: props => ({
      title: `Cta Cte - ${props.navigation.getParam('account').client.nick}`
    })
  },
  Order: {
    screen: OrderScreen,
    navigationOptions: {
      title: 'Orden de Compra'
    }
  }
})
