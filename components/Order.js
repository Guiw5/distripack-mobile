import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { FormInput } from 'react-native-elements';

export default class Order extends React.Component {
  constructor(props) {
    super(props);    
  }    

  renderItem = (item) => {
    console.log('orderGridItem', item);
    var cant = item.cant;
    return (    
      <View>
        <Text>{item.alias? item.product.alias : item.product.descripcion}</Text>      
        <FormInput value={cant} onChange={this.setState({cant})} placeholder="Cantidad" keyboardType="numeric" />
        <Text>${item.product.precio * cant}</Text>
      </View>
    );
  }

  renderSeparator = () => <View style={{ height: 1, backgroundColor: "#CED0CE" }} />

  render() {    
    let { order } = this.props.navigation.state.params;
    console.log(order);
    return (    
      <View containerStyle={styles.container} >                      
        <FlatList
          keyboardShouldPersistTaps="handled"
          data={order}
          keyExtractor={item => item.id}          
          ItemSeparatorComponent={this.renderSeparator}          
          renderItem={this.renderItem}          
        />
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