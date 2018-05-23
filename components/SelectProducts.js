import React from 'react';
import { Text, View, ListView, TextInput, StyleSheet, ScrollView } from 'react-native';
import { FormLabel, FormInput, SearchBar, Icon, List, ListItem } from 'react-native-elements';
import Products from '../data/test-products.json';

export default class SelectProducts extends React.Component {
  constructor(props) {
    super(props);   
    console.log(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
    this.state = {           
      dataSource: ds.cloneWithRows([])             
    };

    this.renderRow = this.renderRow.bind(this);    
  }
  
  search = text => {  
    if(!text) {
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
      this.setState({ dataSource : ds.cloneWithRows([]) }); 
      return;
    }

    let results = Products.filter(product =>
      product.alias.toLowerCase().includes(text.toLowerCase()) ||
      product.descripcion.toLowerCase().includes(text.toLowerCase())      
    );

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});    
    this.setState({       
      dataSource : ds.cloneWithRows(results)             
    });       
    
  }      

  renderRow = (rowData) => (
    <ListItem          
      key={rowData.id}
      title={rowData.alias}
      subtitle={rowData.descripcion}   
      onPress={() => this.onPress(rowData)}
    />
  )

  onPress = (product) => {      
    const { params } = this.props.navigation.state;    
    this.props.navigation.navigate('Details', { product: product });
  }  

  render() {                 
    return (
      <ScrollView keyboardShouldPersistTaps="handled">                
        <SearchBar autoFocus placeholder='Escriba nombre, o alias del producto' 
          onChangeText={ (text) => this.search(text) }           
        />                      
        <ListView keyboardShouldPersistTaps="handled"
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />          
      </ScrollView>
    );
  }
}      
styles = StyleSheet.create({ 
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10    
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  },
  count: {
    width:80
  }
})