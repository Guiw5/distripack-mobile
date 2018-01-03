import React from 'react';
import { View } from 'react-native';


export default class OrderScreen extends React.Component {
  render() {
    return (
      <View>        
        <View>          
          <Text>{client.id}</Text>
          <Text>{client.name}</Text>
          <Text>{client.mail}</Text>
        </View>
      </View>
    );
  }
}