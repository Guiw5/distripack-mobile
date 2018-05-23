import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import ClientScreen from './screens/ClientScreen';
import ProductScreen from './screens/ProductScreen';
import DetailScreen from './screens/DetailScreen';
import OrderScreen from './screens/OrderScreen';

const SimpleApp = StackNavigator({
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

export default class App extends React.Component {  
  render() {
    return <SimpleApp style={styles.SimpleApp} />;
  }
}

const styles = StyleSheet.create({
   SimpleApp: {
    paddingTop: 110
  }
 });