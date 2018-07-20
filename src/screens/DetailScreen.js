import React from 'react';
import { View } from 'react-native';
import Details from '../components/Details';

export default class DetailScreen extends React.Component {   
  render() {    
    return (
      <View>        
        <Details navigation={this.props.navigation} />
      </View>
    );
  }
}