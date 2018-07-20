import React from 'react';
import { SearchBar } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import SearchList from './SearchList';

export default class Select extends React.Component {
  constructor(props){
    super(props);    
    this.state = { 
      query: ''
    }
  }    

  onChangeText = (query) => {
    this.setState({query: query || '' });
  }
  
  getData = () => {
    let { getData } = this.props;
    return getData(this.state.query);     
  }
  
  render() {       
    return (      
      <View>
        <SearchBar
          autoFocus
          inputStyle={styles.searchBar}   
          placeholder={this.props.placeholder}                    
          onChangeText={this.onChangeText} 
          value={this.state.query}
        />         
        <SearchList 
          itemKey={this.props.itemKey}
          renderItem={this.props.renderItem}
          data={this.getData()}              
        />        
      </View>      
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {
    fontSize: 14
  }  
});
