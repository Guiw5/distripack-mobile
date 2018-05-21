import React from 'react';
import { Text, View, ListView, ScrollView } from 'react-native';
import { FormLabel, FormInput, SearchBar, Icon, List, ListItem } from 'react-native-elements';
import Clients from '../data/test-clients.json';

export default class SelectClient extends React.Component {
  constructor(props) {
    super(props);   
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
    this.state = {           
      dataSource: ds.cloneWithRows([]),
      isLoading: true         
    };

    this.renderRow = this.renderRow.bind(this);    
    this.onPress = this.onPress.bind(this);
  }
 
  search = text => {            
    let results = Clients.filter(client =>
      client.name.toLowerCase().includes(text.toLowerCase()) ||
      client.mail.toLowerCase().includes(text.toLowerCase())      
    ); 

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({ 
      isLoading: false, 
      dataSource : ds.cloneWithRows(results)                 
    });        
  }      

  renderRow = (rowData, sectionID) => (
    <ListItem 
      roundAvatar       
      key={sectionID}
      title={rowData.name}
      subtitle={rowData.mail}   
      onPress={() => this.onPress(rowData)}
    />
  )

  onPress = (client) => {         
    this.props.navigation.navigate('Products', { client: client });
  }

  render() {    
    return (
      <ScrollView keyboardShouldPersistTaps="handled">                      
        <SearchBar placeholder='Escriba nombre, local o e-mail del cliente' 
          onChangeText={ (text) => this.search(text) } 
        />                
        <ListView keyboardShouldPersistTaps="handled"  
          dataSource={this.state.dataSource} renderRow={this.renderRow} 
        />             
      </ScrollView>
    );
  }
}      
