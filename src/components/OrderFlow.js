import { StackNavigator } from 'react-navigation';

import ClientScreen from '../screens/ClientScreen';
import ProductScreen from '../screens/ProductScreen';
import DetailScreen from '../screens/DetailScreen';
import OrderScreen from '../screens/OrderScreen';


export default OrderFlow = StackNavigator({
  Client: { 
    screen: ClientScreen, 
    navigationOptions: {
      title: 'Seleccione Cliente',
      headerStyle: {paddingTop:25}
    } 
  },
  Products: { 
    screen: ProductScreen,
    navigationOptions: {
      title: 'Seleccione Productos',
      headerStyle: {paddingTop:25}
    }
  },
  Details: { 
    screen: DetailScreen,
    navigationOptions: {  
      title: 'Seleccione Cantidad',
      headerStyle: {paddingTop:25}
    }
  }, 
  Order: {
    screen: OrderScreen,
    navigationOptions: {  
      title: 'Orden de Compra',
      headerStyle: {paddingTop:25}
    }
  }  
});