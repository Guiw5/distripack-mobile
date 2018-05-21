import React from 'react';
import { View } from 'react-native';
import OrderGrid from '../components/OrderGrid';

export default class OrderScreen extends React.Component {
  constructor(props) {
    super(props);
  }  

  render() {
    console.log('state', this.props.navigation.state);
    return (
      <View>        
        <OrderGrid navigation={this.props.navigation} />
      </View>
    );
  }
}