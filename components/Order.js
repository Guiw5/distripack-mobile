import React from 'react';
import { View, Text, TextInput, ListView } from 'react-native';
import { FormInput, FormLabel } from 'react-native-elements';

export default class Order extends React.Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {      
      dataSource: ds.cloneWithRows([params.products])
    };
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
    return (    
      <ScrollView keyboardShouldPersistTaps="handled">
        <ListView keyboardShouldPersistTaps="handled" 
          dataSource={this.state.dataSource} 
          renderRow={this.renderRow}/>        
      </ScrollView>     
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