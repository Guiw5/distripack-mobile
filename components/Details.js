import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input } from 'react-native-elements';

export default class Details extends React.Component {   
  constructor(props) {
    super(props);    
    this.state = {
      cant: ''
    };
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
            onChangeText={(text) => this.setState({cant:parseInt(text)})} 
            value={this.state.cant} style={styles.desc}
          />          
          <Text style={styles.price}>Precio x bulto: ${precio}</Text>          
          <Text style={styles.newPrice}>
            Precio Total: ${ this.state.cant
                          ? parseFloat(precio) * this.state.cant
                          : parseFloat(precio) }
          </Text>         
      </View>
    )
  }
}

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