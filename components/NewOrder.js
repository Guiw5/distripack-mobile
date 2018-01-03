import React from 'react';
import { View } from 'react-native';
import SelectClient from './SelectClient';
import OrderList from './OrderList';
import TotalComponent from './TotalComponent';

export default class NewOrder extends React.Component {
  render() {
    return (
      <View>
        <SelectClient />
        <OrderList />               
      </View>
    );
  }
}