import React from 'react'
import { createStackNavigator } from 'react-navigation'

import ClientsScreen from './screens/ClientsScreen'
import ClientScreen from './screens/ClientScreen'
import ProductScreen from './screens/ProductScreen'
import SkuScreen from './screens/SkuScreen'
import DetailScreen from './screens/SkuDetailsScreen'
import OrderScreen from './screens/OrderScreen'
import MenuButton from './MenuButton'
import SkuDetailsScreen from './screens/SkuDetailsScreen'

export default createStackNavigator(
  {
    Clients: {
      screen: ClientsScreen,
      navigationOptions: props => ({
        title: 'Seleccione Cliente',
        headerLeft: <MenuButton {...props} />
      })
    },
    Client: {
      screen: ClientScreen,
      navigationOptions: {
        title: 'Nuevo Cliente'
      }
    },
    Products: {
      screen: ProductScreen,
      navigationOptions: {
        title: 'Seleccione Productos'
      }
    },
    Skus: {
      screen: SkuScreen,
      navigationOptions: {
        title: 'Unidad de Venta'
      }
    },
    Details: {
      screen: SkuDetailsScreen,
      navigationOptions: {
        title: 'Detalle'
      }
    },
    Order: {
      screen: OrderScreen,
      navigationOptions: {
        title: 'Orden de Compra'
      }
    }
  },
  {
    headerMode: 'float',
    initialRouteName: 'Clients'
  }
)
