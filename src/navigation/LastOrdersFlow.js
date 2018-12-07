import React from 'react'
import { createStackNavigator } from 'react-navigation'

import MenuButton from './MenuButton'
import OrderScreen from './screens/OrderScreen'
import LastOrdersScreen from './screens/LastOrdersScreen'

export default createStackNavigator(
  {
    LastOrders: {
      screen: LastOrdersScreen,
      navigationOptions: props => ({
        title: 'Ultimas Ventas',
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
