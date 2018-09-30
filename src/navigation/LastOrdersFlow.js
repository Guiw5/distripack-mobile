import React from 'react'
import { createStackNavigator } from 'react-navigation'

import LastOrdersScreen from './screens/LastOrdersScreen'
import MenuButton from './MenuButton'

export default createStackNavigator(
  {
    LastOrders: {
      screen: LastOrdersScreen,
      navigationOptions: props => ({
        title: 'Ultimos Pedidos',
        headerLeft: <MenuButton {...props} />
      })
    }
  },
  {
    headerMode: 'float'
  }
)
