import React from 'react';
import { View, Text, TextInput, ListView } from 'react-native';
import { FormInput, FormLabel } from 'react-native-elements';


export default class OrderGrid extends React.Component {
  constructor(props) {
    super(props);
  //   var rows = this.props.rows.foreach(item => {
  //     var row = [];
  //     row.push();
  //     row.push( <FormInput keyboardType="numeric" placeholder='Cantidad' placeholderTextColor={'black'} 
  //                         onChangeText={(cant) => {item.cant = cant}}>
  //                 {item.cant > 1? this.state.cant: ''} 
  //               </FormInput>);
  //   }); 
  //   row.push()   
  }

  renderRow(item) {
    console.log('orderGridItem',item);
    return (    
    <Row>
      <Cell>{item.alias? item.alias : item.descripcion}</Cell>      
      <EditableCell value={item.cantidad} keyboardType="numeric" />
      <Cell>${item.precio * item.cantidad}</Cell>
    </Row>
    )
  }

  render() {
    // const { container, quantityStyle, aliasStyle, totalStyle } = styles;
    return (    
      <View>
        <DataTable dataSource={this.props.rows} renderRow={this.renderRow}/>        
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