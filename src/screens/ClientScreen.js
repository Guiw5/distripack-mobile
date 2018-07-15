import React from 'react';
import { View } from 'react-native';
import SelectClient from '../components/SelectClient';

export default class ClientScreen extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {    
    if(this.props.clients)
      this.props.getClients();
  }
  
  render() {
    return (
      <View>
        <SelectClient navigation={this.props.navigation} />        
      </View>
    );
  }
}
mapDispatchToProps = dispatch => ({
  getClients: () => {
    dispatch(getClients())
  }
})