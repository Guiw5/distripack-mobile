import React from 'react'
import { createStackNavigator } from 'react-navigation'

import MenuButton from './MenuButton'
import ClientsScreen from './screens/ClientsScreen'
import ClientDetailsScreen from './screens/ClientDetailsScreen'

export default createStackNavigator(
  {
    Clients: {
      screen: ClientsScreen,
      navigationOptions: props => ({
        title: 'Seleccione Cliente',
        headerLeft: <MenuButton {...props} />
      })
    },
    Details: {
      screen: ClientDetailsScreen,
      navigationOptions: {
        title: 'Detalle Cliente'
      }
    }
  },
  {
    headerMode: 'float'
  }
)
