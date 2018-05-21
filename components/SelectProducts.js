import React from 'react';
import { Text, View, ListView, TextInput, StyleSheet, ScrollView } from 'react-native';
import { FormLabel, FormInput, SearchBar, Icon, List, ListItem } from 'react-native-elements';
import Products from '../data/test-products.json';
import OrderGrid from './OrderGrid';

export default class SelectProducts extends React.Component {
  constructor(props) {
    super(props);   
    console.log(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
    this.state = {           
      dataSource: ds.cloneWithRows([]),
      rows: ds.cloneWithRows([]),
      isLoading: true,
      list: []
    };

    this.renderRow = this.renderRow.bind(this);
    //this.addListItem = this.addListItem.bind(this);
  }

 // addListItem = (item) => {    
  //   item['cant'] = 1;
  //   let list = this.state.list;    
  //   list.push(item);
  //   let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});    
  //   this.setState({
  //     list: list,
  //     rows: ds.cloneWithRows(list),
  //     dataSource: ds.cloneWithRows([])
  //   });
  // }  
  
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
      isLoading: false, 
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
    console.log('onpress-selectProduct', product);
    const { params } = this.props.navigation.state;
    console.log('params-selectProduct', params);
    this.props.navigation.navigate('Order', { client : this.props.client, product: product });
  }  

  render() {             
    console.log(this.state.rows);
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