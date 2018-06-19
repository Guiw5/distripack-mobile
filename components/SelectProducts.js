import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
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

  addToOrder = (product) => {
    let { order } = this.state;
    console.log("order", order);
    order.push(product);
    this.setState({order});
  }

  goToDetails = (product) => {      
    this.props.navigation.navigate('Details', { product: product, 'addToOrder': (product) => this.addToOrder(product) });
  }

  goToOrder = (order) => {
    this.props.navigation.navigate('Order', { order: order });
  }

  renderItem = ({ item }) => (
    <ListItem              
      title={item.alias}
      subtitle={item.descripcion} 
      subtitleStyle={{fontSize: 12}}      
      rightSubtitle={'$' + item.precio.toFixed(2)}     
      containerStyle={{ borderBottomWidth: 0 }}
      onPress={() => this.goToDetails(item)}
    />
  );  


  render() {                 
    let order = this.state.order;
    return (
      <View>
        <SearchList 
          itemKey='id'
          headerPlaceholder='Escriba nombre, o alias del producto'          
          renderItem={this.renderItem}  
          filterFunction={this.filterFunction}
          data={this.props.products}
        />
        { order.length > 0 
          ? <Button title='Ver Pedido' onPress={() => this.goToOrder(order)} /> 
          : <View />
        }
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