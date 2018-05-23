import React from 'react';
import { View } from 'react-native';
import Order from '../components/Order';

export default class OrderScreen extends React.Component {   
  constructor(props) {
    super(props);
  }  

  render() {
    console.log('navigation_order', this.props.navigation.state);
    return (
      <View>        
        <Order navigation={this.props.navigation} />
      </View>
    );
  }
}