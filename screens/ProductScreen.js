import React from 'react';
import { View, Text } from 'react-native';
import OrderList from '../components/OrderList';


export default class ProductScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {       
    return (
      <View>        
        <OrderList />                  
      </View>
    );
  }
}