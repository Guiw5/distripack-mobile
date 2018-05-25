import React from 'react';
import { View, FlatList, ScrollView, StyleSheet } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import Products from '../data/test-products.json';

export default class SelectProducts extends React.Component {
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
    return Products.filter(product => 
            product.alias.toLowerCase().includes(text.toLowerCase()) ||
            product.descripcion.toLowerCase().includes(text.toLowerCase())
          );    
  }

  renderHeader = () => {
    return  <SearchBar 
              autoFocus 
              inputStyle={{ fontSize:14 }}
              clearIcon={{ color: 'red' }}
              onClear={() => this.setState({data: []})}
              placeholder='Escriba nombre, o alias del producto' 
              onChangeText={this.search}           
            />
  }

  renderSeparator = () => <View style={{ height: 1, backgroundColor: "#CED0CE" }} />  

  onPress = (product) => {       
    this.props.navigation.navigate('Details', { product: product });
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
          keyExtractor={item => item.id}
          ListHeaderComponent={this.renderHeader}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={item.alias}
              subtitle={item.descripcion}            
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={() => this.onPress(item)}
            />            
          )}        
        />
      </ScrollView>
    );
  }
}      
styles = StyleSheet.create({ 
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10    
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  },
  count: {
    width:80
  }
});