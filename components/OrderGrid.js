import React from 'react';
import { View, Text, TextInput, ListView } from 'react-native';
import { FormInput, FormLabel } from 'react-native-elements';

export default class OrderGrid extends React.Component {
  constructor(props) {
    super(props);
  }  

  renderRow(item) {
    console.log('orderGridItem',item);
    var cant = 1;
    return (    
      <View>
        <Text>{item.alias? item.alias : item.descripcion}</Text>      
        <FormInput value={cant} onChange={this.setState({cant})} placeholder="Cantidad" keyboardType="numeric" />
        <Text>${item.precio * cant}</Text>
      </View>
    )
  }

  render() {
    const { params } = this.props.navigation.state;
    console.log('params-OrderGrid', params);
    return (    
      <View>
        <ListView dataSource={this.props.rows} renderRow={this.renderRow}/>        
      </View>     
    );
  };
}

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