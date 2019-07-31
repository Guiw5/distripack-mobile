import React from 'react'
import { createStackNavigator } from 'react-navigation'

import MenuButton from './MenuButton'
import OrderScreen from './screens/OrderScreen'
import PendingsScreen from './screens/PendingsScreen'
import SkuDetailsScreen from './screens/SkuDetailsScreen'

export default createStackNavigator(
  {
    Pendings: {
      screen: PendingsScreen,
      navigationOptions: props => ({
        title: 'En Reparto',
        headerLeft: <MenuButton {...props} />
      })
    },
    Order: {
      screen: OrderScreen,
      navigationOptions: {
        title: 'Orden de Compra'
      }
    },
    Details: {
      screen: SkuDetailsScreen,
      navigationOptions: {
        title: 'Detalle'
      }
    }
  },
  {
    headerMode: 'float'
  }
)
