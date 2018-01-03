import React from 'react';
import { Text, View, ListView, TextInput, StyleSheet } from 'react-native';
import { FormLabel, FormInput, SearchBar, Icon, List, ListItem } from 'react-native-elements';
import Products from '../data/test-products.json';
import OrderGrid from './OrderGrid';

export default class OrderList extends React.Component {
  constructor(props) {
    super(props);   
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
    this.state = {           
      dataSource: ds.cloneWithRows([]),
      rows: ds.cloneWithRows([]),
      isLoading: true,
      list: []      
    };

    this.renderRow = this.renderRow.bind(this);
    this.addListItem = this.addListItem.bind(this);
  }
 
  search = text => {  
    if(!text) {
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
      this.setState({         
        dataSource : ds.cloneWithRows([])             
      }); 
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
      onPress={() => this.addListItem(rowData)}
    />
  )

  addListItem = (item) => {    
    item['cant'] = 1;
    let list = this.state.list;    
    list.push(item);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});    
    this.setState({
      list: list,
      rows: ds.cloneWithRows(list),
      dataSource: ds.cloneWithRows([])
    });
  }


  render() {             
    console.log(this.state.rows);
    return (
      <View>                
        <SearchBar 
          onChangeText={ (text) => this.search(text) } 
          placeholder='Escriba nombre, o alias del producto' 
        />                
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />  
        <OrderGrid rows={this.state.rows} />
      </View>
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