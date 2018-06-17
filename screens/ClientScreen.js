import React from 'react';
import { View } from 'react-native';
import SelectClient from '../components/SelectClient';
import { Button } from 'react-native-elements';
import Clients from '../data/test-clients.json';

export default class ClientScreen extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <View>
        <SelectClient navigation={this.props.navigation} clients={Clients} />        
      </View>
    );
  }
}