import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, ListItem, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { addToOrder } from '../actions/index';

class Details extends React.Component {    
  constructor(props) {
    super(props);    
    this.state = {
      cant: 1            
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

  quantityChanged = (text) => {    
    this.setState({cant: parseInt(text)});
  }

  render() {        
    const { descripcion, precio, cantidad } = this.props.navigation.state.params.product;      
    let subtotal = this.state.cant ? parseFloat(precio) * this.state.cant : parseFloat(precio);    
    return (      
      <View style={{minHeight:'100%', alignContent: "center"}}>
        <ListItem             
          title={descripcion}          
          rightTitle={'$' + precio.toFixed(2)}
          titleStyle={{width:270}}     
          containerStyle={{ borderBottomWidth: 0 }}                  
        />
        <ListItem 
          subtitle="Cantidad por bulto"
          subtitleStyle={{fontSize: 12}}
          rightSubtitle={'' + cantidad}
        />    
        <ListItem 
          title="Indique cuantos bultos"          
          titleStyle={{fontSize: 14, width:200, backgroundColor: '#f6f6f6'}}                                                  
          input={{onChangeText: this.quantityChanged, placeholder:"NRO", inputStyle:{fontSize:14}, keyboardType:"numeric"}}
          chevron
          chevronColor="#2089dc"
        />  
        <ListItem
          title="Subtotal"
          rightSubtitle={'$' + subtotal.toFixed(2)}
          titleStyle={{fontSize: 14}}
        />              
        <Button 
          buttonStyle={styles.button} 
          containerStyle={{backgroundColor:'#fff', flex: 2, flexDirection: 'row', alignItems: 'flex-end', alignContent: 'center', justifyContent: 'center'}}          
          title='Agregar al pedido' 
          onPress={this.addToOrder}
        />        
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
  button: {        
    width:300,      
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    height: 50,    
    position: 'absolute',
    bottom: 5    
  }  
});
