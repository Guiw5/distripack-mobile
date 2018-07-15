import React from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getOrder, setClient, getProducts } from '../actions/index';
import OrderItem from './OrderItem';

class Order extends React.Component {
  constructor(props) {
    super(props);   
    this.props.order = this.props.navigation.state.params.order;     
  }  

  renderItem = ({ item }) => {        
    return <OrderItem item={item} /> ;
  }    

  renderSeparator = () => <View style={{ height: 1, backgroundColor: "#CED0CE" }} />

  render() {    
    let { order } = this.props;    
    return (          
      this.props.products.length > 0 &&
      <View containerStyle={styles.container}>                   
        <FlatList
          keyboardShouldPersistTaps="handled"
          data={order.items}
          keyExtractor={item => item.id}          
          ItemSeparatorComponent={this.renderSeparator}          
          renderItem={this.renderItem}          
        />
      </View>   
    );
  };
}


const mapStateToProps = state => { 
  return { 
    clients: state.clients, 
    order: state.order,
    products: state.products
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setClient: id => {
      dispatch(setClient(id))
    },
    getOrder: () => {
      dispatch(getOrder())
    },
    getProducts: () => {
      dispatch(getProducts())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);

const styles = {
  container: { 
    flex:1,
    flexWrap:'wrap',
    flexDirection: 'row',    
    paddingTop: 15,
    justifyContent: 'space-between'
  },
  aliasStyle: {    
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent: 'space-between',
    paddingTop: 15
  },
  quantityStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',    
    height: 30,  
    width: 100   
  },   
  totalStyle: {       
    flexDirection: 'row',
    justifyContent: 'space-between',    
  },
  price: {

  }
};