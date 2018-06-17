import React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import SearchList from './SearchList';

export default class SelectProducts extends React.Component {
  constructor(props){
    super(props);  
    
    this.state = { 
      order: []
    }
  }     

  filterFunction = (text) => {
    let results = this.props.products;        
    if(text) {      
      results = results.filter(item =>         
        item.alias.toLowerCase().includes(text.toLowerCase()) ||
        item.descripcion.toLowerCase().includes(text.toLowerCase()));
    }
    return results;
  }

  onPress = (product) => {      
    this.props.navigation.navigate('Details', { product: product });
  }

  renderItem = ({ item }) => (
    <ListItem              
      title={item.alias}
      subtitle={item.descripcion} 
      subtitleStyle={{fontSize: 12}}      
      rightSubtitle={'$' + item.precio.toFixed(2)}     
      containerStyle={{ borderBottomWidth: 0 }}
      onPress={() => this.onPress(item)}
    />
  );  

  render() {                 
    return (
      <View>
        <SearchList 
          itemKey='id'
          headerPlaceholder='Escriba nombre, o alias del producto'          
          renderItem={this.renderItem}  
          filterFunction={this.filterFunction}
          data={this.props.products}         
        />
        {/* this.props.order && <ViewOrder order={this.props.order} /> */}
      </View>
    );
  }
}      
// styles = StyleSheet.create({ 
//   subtitleView: {
//     flexDirection: 'row',
//     paddingLeft: 10    
//   },
//   ratingText: {
//     paddingLeft: 10,
//     color: 'grey'
//   },
//   count: {
//     width:80
//   }
// });