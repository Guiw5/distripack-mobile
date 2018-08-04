import { StackNavigator } from 'react-navigation'

import ClientScreen from '../screens/ClientScreen'
import ProductScreen from '../screens/ProductScreen'
import SkuScreen from '../screens/SkuScreen'
import DetailScreen from '../screens/DetailScreen'
import OrderScreen from '../screens/OrderScreen'

export default (OrderFlow = StackNavigator({
  Client: {
    screen: ClientScreen,
    navigationOptions: {
      title: 'Seleccione Cliente'
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
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.item.sku.nick}`
    })
  },
  Order: {
    screen: OrderScreen,
    navigationOptions: {
      title: 'Orden de Compra'
    }
  }
}))
