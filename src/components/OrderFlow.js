import { createStackNavigator } from 'react-navigation'

import ClientsScreen from '../screens/ClientsScreen'
import ClientScreen from '../screens/ClientScreen'
import ProductScreen from '../screens/ProductScreen'
import SkuScreen from '../screens/SkuScreen'
import DetailScreen from '../screens/DetailScreen'
import OrderScreen from '../screens/OrderScreen'

export default (OrderFlow = createStackNavigator({
  Clients: {
    screen: ClientsScreen,
    navigationOptions: {
      title: 'Seleccione Cliente'
    }
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
    screen: DetailScreen,
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
}))
