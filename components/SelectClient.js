import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import SearchList from './SearchList';

export default class SelectClient extends React.Component {
  constructor(props){
    super(props);    
  }  
 
  filterFunction = (text) => {
    let results = this.props.clients;        
    if(text) {      
      results = results.filter(item =>         
        item.mail.toLowerCase().includes(text.toLowerCase()) ||
        item.name.toLowerCase().includes(text.toLowerCase())
      );
    }       
    return results;
  };

  onPress = (client) => {      
    this.props.navigation.navigate('Products', { client: client });
  }    

  renderItem = ({ item }) => (
    <ListItem              
      title={item.name}
      subtitle={item.mail} 
      subtitleStyle={{fontSize: 12}}            
      containerStyle={{ borderBottomWidth: 0 }}
      onPress={() => this.onPress(item)}
    />
  )
  render() {    
    return (
      <SearchList 
        itemKey='mail'
        headerPlaceholder='Escriba nombre, alias o mail del cliente'        
        renderItem={this.renderItem}
        filterFunction={this.filterFunction}
        data={this.props.clients}        
      />
    );
  }
}