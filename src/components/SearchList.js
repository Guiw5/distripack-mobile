import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

export default class SearchList extends React.PureComponent {
  constructor(props){
    super(props);                  
  }  

  renderSeparator = () => <View style={{ height: 1, backgroundColor: "#CED0CE" }} />  

  render() {      
    return (
      <View containerStyle={styles.container} >                      
        <FlatList
          keyboardShouldPersistTaps="handled"
          data={this.props.data}
          keyExtractor={item => item[this.props.itemKey]}          
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
  }  
});