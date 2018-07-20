import React from 'react';
import { View } from 'react-native';
import SelectClient from '../components/SelectClient';

export default class ClientScreen extends React.Component {
  render() {
    return (
      <View>
        <SelectClient navigation={this.props.navigation} />        
      </View>
    );
  }
}