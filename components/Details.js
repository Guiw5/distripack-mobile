import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

export default class Details extends React.Component {   
  constructor(props) {
    super(props);    
  }    
    
  render() {    
    const { params } = this.props.navigation.state;
    const { alias, descripcion, precio, cantidad } = params.product;
    console.log(alias, descripcion, precio, cantidad);
    const { wrapper } = styles;
    return (
      <View>
          <Text style={styles.title}>{alias}</Text>
          <Text style={styles.desc}>{descripcion}</Text>
          <Text style={styles.price}>{cantidad}</Text>
          <Text style={styles.price}>{precio}</Text>         
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    flex: 2
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
