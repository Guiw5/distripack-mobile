import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import ClientScreen from './screens/ClientScreen';
import OrderScreen from './screens/OrderScreen';
import ProductScreen from './screens/ProductScreen';

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
  Order: { screen: OrderScreen,
    navigationOptions: {      
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
   SimpleApp: {
    paddingTop: 100
  }
 });