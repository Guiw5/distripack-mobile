import React from 'react'
import { createStackNavigator } from 'react-navigation'

import MenuButton from './MenuButton'
import OrderScreen from './screens/OrderScreen'
import PendingsScreen from './screens/PendingsScreen'

export default createStackNavigator(
  {
    Pendings: {
      screen: PendingsScreen,
      navigationOptions: props => ({
        title: 'Pendientes',
        headerLeft: <MenuButton {...props} />
      })
    },
    Order: {
      screen: OrderScreen,
      navigationOptions: {
        title: 'Orden de Compra'
      }
    }
  },
  {
    headerMode: 'float'
  }
)
