import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default class SearchList extends React.Component {
  constructor(props){
    super(props); 
    
    this.state = {      
      data: this.props.data      
    }           
  }  

  onSearch = (text) => { 
    let results = this.props.filterFunction(text);        
    this.setState({data:results});
  }  

  renderHeader = () => (
    <SearchBar 
      autoFocus
      clearIcon
      inputStyle={styles.searchBar}              
      onClear={this.props.onClear}
      placeholder={this.props.headerPlaceholder}
      onChangeText={this.onSearch}       
    />
  );

  renderSeparator = () => <View style={{ height: 1, backgroundColor: "#CED0CE" }} />  

  render() {    
    return (
      <View containerStyle={styles.container} >                      
        <FlatList
          keyboardShouldPersistTaps="handled"
          data={this.state.data}
          keyExtractor={item => item[this.props.itemKey]}
          ListHeaderComponent={this.renderHeader}
          ItemSeparatorComponent={this.renderSeparator}          
          renderItem={this.props.renderItem}          
        />             
      </View>
    );
  }
} 

const styles = StyleSheet.create({
  container: { 
    borderTopWidth: 0, 
    borderBottomWidth: 0 
  },
  searchBar: {
    fontSize: 14
  }
});