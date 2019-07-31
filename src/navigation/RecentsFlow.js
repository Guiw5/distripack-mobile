import React from 'react'
import { createStackNavigator } from 'react-navigation'

import MenuButton from './MenuButton'
import OrderScreen from './screens/OrderScreen'
import PrinterIcon from '../components/PrinterIcon'
import StatusScreen from './screens/StatusScreen'
import RecentsScreen from './screens/RecentsScreen'
import SkuDetailsScreen from './screens/SkuDetailsScreen'

export default createStackNavigator(
  {
    Recents: {
      screen: RecentsScreen,
      navigationOptions: props => ({
        title: 'Recientes',
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
    Details: {
      screen: SkuDetailsScreen,
      navigationOptions: {
        title: 'Detalle'
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
