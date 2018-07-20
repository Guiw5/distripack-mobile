import React from 'react';
import { View, Text } from 'react-native';
import SelectProducts from '../components/SelectProducts';

export default class ProductScreen extends React.Component {
  render() {       
    return (
      <View>        
        <SelectProducts navigation={this.props.navigation} />                  
      </View>
    );
  }
}