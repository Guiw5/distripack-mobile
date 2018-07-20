import React from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import Select from './Select';
import { getOrder, getProducts } from '../actions/index';
import { connect } from 'react-redux';

class SelectProducts extends React.Component {
  constructor(props){
    super(props);   
    this.state = { 
      query: ''
    }       
  }     

  componentDidMount() {
    if(this.props.products.length === 0)
      this.props.getProducts();

    if(this.props.order.items.length === 0)
      this.props.getOrder();
  }  
  
  filterProducts = (text) => {
    let results = this.props.products;        
    if(text) {      
      results = results.filter(item =>         
        item.alias.toLowerCase().includes(text.toLowerCase()) ||
        item.descripcion.toLowerCase().includes(text.toLowerCase()));
    }
    return results;
  }  

  goToDetails = (product) => {
    Keyboard.dismiss();      
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
      <View style={styles.container}>
        <Select           
          placeholder='Escriba nombre o alias del producto'          
          itemKey='id'
          renderItem={this.renderItem}
          getData={this.filterProducts}          
        />        
        { show && 
          <Button 
            buttonStyle={styles.btnOrder} 
            title={'Ver Pedido ('+ order.items.length +')'} 
            onPress={() => this.goToOrder(order)} 
          />          
        }
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
  btnOrder: {    
    bottom: 0,    
    position: 'absolute',
    width: 350,    
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  }  
});