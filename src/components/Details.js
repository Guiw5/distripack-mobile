import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { addToOrder } from '../actions/index';

class Details extends React.Component {   
  constructor(props) {
    super(props);  
    this.state = {
      cant: ''
    }      
  }    
  
  addToOrder = () => {
    let { state, goBack } = this.props.navigation;
    let product = state.params.product;
    let quantity = parseInt(this.state.cant);
    orderItem = { product, quantity };
    this.props.addToOrder(orderItem);
    goBack();    
  }
  
  render() {        
    const { alias, descripcion, precio, cantidad } = this.props.navigation.state.params.product;          
    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>{alias}</Text>
        <Text style={styles.desc}>{descripcion}</Text>
        <Text>Cantidad por bulto:{cantidad}</Text>
        <Text>Cantidad de bultos:</Text>
        <Input 
          keyboardType="numeric" placeholder="Indique cuantos bultos"
          onChangeText={(text) => this.setState({cant: text})} 
          value={this.state.cant} style={styles.desc}
        />          
        <Text style={styles.price}>Precio x bulto: ${precio}</Text>          
        <Text style={styles.newPrice}>
          Precio Total: ${ this.state.cant
                        ? parseFloat(precio) * this.state.cant
                        : parseFloat(precio) }
        </Text> 
        <Button title='Agregar al pedido' onPress={this.addToOrder}/>        
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToOrder: item => {
      dispatch(addToOrder(item))
    }
  };
}

export default connect(null, mapDispatchToProps)(Details);

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    flexDirection: 'column',
    flexWrap:'wrap',
    alignContent: 'space-between'  
  },
  title: {
    fontSize: 16,
    fontWeight: '400'
  },
  desc: {
    fontSize: 12
  },
  price: {
    fontSize: 20,
    fontWeight: '600'
  },
  newPrice: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'red',
    height: 44,
    paddingLeft: 5
  }
});
