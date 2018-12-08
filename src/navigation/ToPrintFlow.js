import React from 'react'
import { createStackNavigator } from 'react-navigation'
import ToPrintScreen from './screens/ToPrintScreen'

import MenuButton from './MenuButton'
import OrderScreen from './screens/OrderScreen'
import PrinterIcon from '../components/PrinterIcon'
import StatusScreen from './screens/StatusScreen'

export default createStackNavigator(
  {
    ToPrint: {
      screen: ToPrintScreen,
      navigationOptions: props => ({
        title: 'Para Imprimir',
        headerLeft: <MenuButton {...props} />,
        headerRight: <PrinterIcon {...props} />
      })
    },
    Order: {
      screen: OrderScreen,
      navigationOptions: {
        title: 'Orden de Compra'
      }
    },
    Status: {
      screen: StatusScreen,
      navigationOptions: {
        title: 'Status de la Impresora'
      }
    }
  },
  {
    headerMode: 'float'
  }
)
