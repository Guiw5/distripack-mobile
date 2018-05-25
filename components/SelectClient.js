import React from 'react';
import { View, FlatList, StyleSheet, ScrollView } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import Clients from '../data/test-clients.json';

export default class SelectClient extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      data: []
    };
  }

  search = (text) => {  
    let results = [];    
    if(text) {      
      results = this.filterData(text);
    }
    this.setState({data: results});            
  }      

  filterData = (text) => {
    return Clients.filter(client => 
            client.name.toLowerCase().includes(text.toLowerCase()) ||
            client.mail.toLowerCase().includes(text.toLowerCase())
          );
  }

  renderHeader = () => {
    return  <SearchBar 
              autoFocus
              inputStyle={styles.searchBar} 
              clearIcon={{ color: 'red' }}
              onClear={() => this.setState({data: []})}
              placeholder='Escriba nombre, local o e-mail del cliente' 
              onChangeText={this.search} 
            />
  }

  renderSeparator = () => <View style={{ height: 1, backgroundColor: "#CED0CE" }} />  

  onPress = (client) => {      
    this.props.navigation.navigate('Products', { client: client });
  }  

  render() {    
    return (
      <ScrollView 
        keyboardShouldPersistTaps="handled"
        containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
      >                      
        <FlatList
          keyboardShouldPersistTaps="handled"
          data={this.state.data}
          keyExtractor={item => item.mail}
          ListHeaderComponent={this.renderHeader}
          ItemSeparatorComponent={this.renderSeparator}          
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={item.name}
              subtitle={item.mail}            
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={() => this.onPress(item)}
            />
          )}          
        />             
      </ScrollView>
    );
  }
} 

const styles = StyleSheet.create({
  searchBar: {
    fontSize: 14
  }
});