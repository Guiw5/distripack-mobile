import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import SearchList from './SearchList';
import { getOrder, getProducts } from '../actions/index';
import { connect } from 'react-redux';

class SelectProducts extends React.Component {
  constructor(props){
    super(props);          
  }     

  componentDidMount() {
    if(this.props.products.length === 0)
      this.props.getProducts();
    if(this.props.order)
      this.props.getOrder();
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

  goToDetails = (product) => {      
    this.props.navigation.navigate('Details', { product: product });
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
    let order = this.props.order;
    let show = order && order.items.length > 0;
    return (
      this.props.products.length > 0 && 
      this.props.order &&
      <View style={styles.container}>
        <SearchList 
          itemKey='id'
          headerPlaceholder='Escriba nombre, o alias del producto'          
          renderItem={this.renderItem}  
          filterFunction={this.filterFunction}
          data={this.props.products}
        />
        <Button style={{backfaceVisibility: show? "visible": "hidden"}} buttonStyle={styles.button} title={'Ver Pedido ('+ order.items.length +')'} onPress={() => this.goToOrder(order)} />      
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    order: state.order
  }
}


const mapDispatchToProps = dispatch => {
  return {
    getOrder: item => {
      dispatch(getOrder(item))
    },
    getProducts: () => {
      dispatch(getProducts())
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(SelectProducts);

styles = StyleSheet.create({   
  button: {    
    bottom: 0,
    left: 0,
    position: 'absolute'
  }  
});