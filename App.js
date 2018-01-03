import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import ClientScreen from './screens/ClientScreen';
import OrderScreen from './screens/OrderScreen';
import ProductScreen from './screens/ProductScreen';

const SimpleApp = StackNavigator({
  Clients: { 
    screen: ClientScreen, 
    navigationOptions: {
      title: 'Cliente',
      headerStyle: {paddingTop:25}
    } 
  },
  Products: { 
    screen: ProductScreen,
    navigationOptions: {
      title: 'Productos',
      headerStyle: {paddingTop:25}
    }
  },
  Orders: { screen: OrderScreen,
    navigationOptions: {
      title: 'Pedidos',
      headerStyle: {paddingTop:25}
    }
  }  
});

export default class App extends React.Component {
  render() {
    return <SimpleApp style={{marginTop:20}} />;
  }
}

const styles = StyleSheet.create({
   simpleApp: {
    paddingTop: 100
  }
 });