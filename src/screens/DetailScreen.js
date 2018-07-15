import React from 'react';
import { View } from 'react-native';
import Details from '../components/Details';

export default class DetailScreen extends React.Component {   
  constructor(props) {
    super(props);
  }  

  render() {    
    return (
      <View>        
        <Details navigation={this.props.navigation} />
      </View>
    );
  }
}