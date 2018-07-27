import { StackNavigator } from 'react-navigation'

import ClientScreen from '../screens/ClientScreen'
import ProductScreen from '../screens/ProductScreen'
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
  Details: {
    screen: DetailScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.item.product.alias}`
    })
  },
  Order: {
    screen: OrderScreen,
    navigationOptions: {
      title: 'Orden de Compra'
    }
  }
}))
